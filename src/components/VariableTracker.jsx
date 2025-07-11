import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, TrendingUp, Hash, Type } from 'lucide-react';

const VariableTracker = ({ variables }) => {
  const getVariableType = (value) => {
    if (Array.isArray(value)) return 'Array';
    if (typeof value === 'object' && value !== null) return 'Object';
    if (typeof value === 'string') return 'String';
    if (typeof value === 'number') return 'Number';
    if (typeof value === 'boolean') return 'Boolean';
    return 'Unknown';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Array': return '📋';
      case 'Object': return '📦';
      case 'String': return '📝';
      case 'Number': return '🔢';
      case 'Boolean': return '✅';
      default: return '❓';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Array': return 'from-blue-500 to-cyan-500';
      case 'Object': return 'from-purple-500 to-pink-500';
      case 'String': return 'from-green-500 to-teal-500';
      case 'Number': return 'from-orange-500 to-red-500';
      case 'Boolean': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const formatValue = (value) => {
    if (Array.isArray(value)) {
      return `[${value.slice(0, 3).join(', ')}${value.length > 3 ? '...' : ''}]`;
    }
    if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value);
      return `{${keys.slice(0, 2).join(', ')}${keys.length > 2 ? '...' : ''}}`;
    }
    if (typeof value === 'string') {
      return `"${value.length > 20 ? value.slice(0, 20) + '...' : value}"`;
    }
    return String(value);
  };

  if (Object.keys(variables).length === 0) {
    return (
      <motion.div
        className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Database className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-400">Variable Tracker</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-400">No variables yet</p>
          <p className="text-sm text-gray-500">Variables will appear here as your code runs</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <motion.div
          className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Database className="w-5 h-5" />
        </motion.div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Variable Tracker
        </h3>
        <div className="ml-auto bg-blue-500/20 px-2 py-1 rounded text-sm text-blue-300">
          {Object.keys(variables).length} variables
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {Object.entries(variables).map(([name, value], index) => {
            const type = getVariableType(value);
            const typeIcon = getTypeIcon(type);
            const typeColor = getTypeColor(type);

            return (
              <motion.div
                key={name}
                className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.3)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{typeIcon}</span>
                    <span className="font-semibold text-white font-mono">{name}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${typeColor} text-white`}>
                    {type}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm text-gray-300 bg-black/30 px-3 py-1 rounded border border-white/10">
                    {formatValue(value)}
                  </div>
                  
                  {Array.isArray(value) && (
                    <div className="flex items-center space-x-1 text-xs text-blue-300">
                      <Hash className="w-3 h-3" />
                      <span>{value.length} items</span>
                    </div>
                  )}
                  
                  {typeof value === 'string' && (
                    <div className="flex items-center space-x-1 text-xs text-green-300">
                      <Type className="w-3 h-3" />
                      <span>{value.length} chars</span>
                    </div>
                  )}
                </div>

                {/* Value visualization for arrays */}
                {Array.isArray(value) && value.length <= 10 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {value.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-blue-500/20 px-2 py-1 rounded text-xs text-blue-200 border border-blue-400/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {String(item)}
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default VariableTracker;