import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Database, Cpu, MemoryStick } from 'lucide-react';

const VisualizationCanvas = ({ step, variables, output, language }) => {
  const canvasRef = useRef(null);

  const renderDataStructures = () => {
    return Object.entries(variables).map(([name, value], index) => (
      <motion.div
        key={name}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-blue-300">{name}</span>
        </div>
        <div className="text-lg font-mono">
          {renderValue(value)}
        </div>
      </motion.div>
    ));
  };

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <motion.div
              key={index}
              className="bg-green-500/20 px-3 py-1 rounded border border-green-400/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-xs text-green-300">{index}</span>
              <div className="text-white">{item}</div>
            </motion.div>
          ))}
        </div>
      );
    } else if (typeof value === 'object' && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="flex justify-between">
              <span className="text-yellow-300">{key}:</span>
              <span className="text-white">{String(val)}</span>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <motion.span
          className="text-white"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value)}
        </motion.span>
      );
    }
  };

  const renderExecutionFlow = () => {
    if (!step) return null;

    return (
      <motion.div
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-purple-300">Current Execution</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Line:</span>
            <span className="bg-purple-500/30 px-2 py-1 rounded text-sm font-mono">
              {step.line}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">Operation:</span>
            <span className="bg-pink-500/30 px-2 py-1 rounded text-sm">
              {step.operation}
            </span>
          </div>
          
          {step.code && (
            <div className="mt-3 p-3 bg-black/30 rounded border border-white/10">
              <code className="text-sm text-green-300 font-mono">
                {step.code}
              </code>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderOutput = () => {
    if (output.length === 0) return null;

    return (
      <motion.div
        className="bg-gradient-to-r from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <Monitor className="w-5 h-5 text-green-400" />
          <h3 className="font-semibold text-green-300">Program Output</h3>
        </div>
        
        <div className="bg-black/40 rounded p-3 font-mono text-sm max-h-32 overflow-y-auto">
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div
                key={index}
                className="text-green-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const renderMemoryVisualization = () => {
    const memorySlots = Object.keys(variables).slice(0, 8);
    
    return (
      <motion.div
        className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-white/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-3">
          <MemoryStick className="w-5 h-5 text-orange-400" />
          <h3 className="font-semibold text-orange-300">Memory Layout</h3>
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 8 }, (_, index) => {
            const varName = memorySlots[index];
            const isActive = varName && variables[varName] !== undefined;
            
            return (
              <motion.div
                key={index}
                className={`h-12 rounded border-2 flex items-center justify-center text-xs font-mono ${
                  isActive 
                    ? 'bg-orange-500/30 border-orange-400 text-orange-200' 
                    : 'bg-gray-500/10 border-gray-600 text-gray-500'
                }`}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  borderColor: isActive ? '#fb923c' : '#4b5563'
                }}
                transition={{ duration: 0.3 }}
              >
                {varName ? varName.slice(0, 4) : `0x${index.toString(16).padStart(2, '0')}`}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <motion.div
          className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Cpu className="w-5 h-5" />
        </motion.div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Live Visualization
        </h2>
      </div>

      <div className="space-y-6">
        {renderExecutionFlow()}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderMemoryVisualization()}
          {renderOutput()}
        </div>
        
        {Object.keys(variables).length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-300">Variables & Data Structures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderDataStructures()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationCanvas;