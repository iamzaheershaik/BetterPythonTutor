import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Play, Square, RotateCcw, ArrowRight } from 'lucide-react';

const FlowDiagram = ({ steps, currentStep, onStepClick }) => {
  const getStepIcon = (step) => {
    switch (step?.operation) {
      case 'assignment': return '📝';
      case 'loop': return '🔄';
      case 'condition': return '🤔';
      case 'function_call': return '📞';
      case 'print': return '📺';
      case 'comparison': return '⚖️';
      default: return '▶️';
    }
  };

  const getStepColor = (step, index) => {
    if (index === currentStep) return 'from-purple-500 to-pink-500';
    if (index < currentStep) return 'from-green-500 to-teal-500';
    return 'from-gray-500 to-gray-600';
  };

  const getStepDescription = (step) => {
    if (!step) return 'Unknown step';
    
    const descriptions = {
      assignment: 'Variable Assignment',
      loop: 'Loop Iteration',
      condition: 'Conditional Check',
      function_call: 'Function Call',
      print: 'Output Display',
      comparison: 'Value Comparison'
    };

    return descriptions[step.operation] || 'Code Execution';
  };

  if (steps.length === 0) {
    return (
      <motion.div
        className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <GitBranch className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-400">Execution Flow</h3>
        </div>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-gray-400">No execution steps yet</p>
          <p className="text-sm text-gray-500">The flow diagram will appear when you run your code</p>
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
          className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <GitBranch className="w-5 h-5" />
        </motion.div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
          Execution Flow
        </h3>
        <div className="ml-auto bg-orange-500/20 px-2 py-1 rounded text-sm text-orange-300">
          {steps.length} steps
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto">
        <div className="space-y-2">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-white/20 to-white/10" />
              )}

              <motion.button
                onClick={() => onStepClick(index)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50 shadow-lg shadow-purple-500/20'
                    : index < currentStep
                    ? 'bg-gradient-to-r from-green-500/10 to-teal-500/10 border-green-400/30 hover:border-green-400/50'
                    : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-400/20 hover:border-gray-400/40'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Step indicator */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getStepColor(step, index)} flex items-center justify-center text-white font-bold relative`}>
                  {index === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                  <span className="relative z-10 text-lg">
                    {getStepIcon(step)}
                  </span>
                </div>

                {/* Step info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">
                      Step {index + 1}
                    </span>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                      Line {step.line}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300">
                    {getStepDescription(step)}
                  </div>
                  {step.code && (
                    <div className="text-xs font-mono text-gray-400 mt-1 truncate">
                      {step.code}
                    </div>
                  )}
                </div>

                {/* Status indicator */}
                <div className="flex items-center space-x-2">
                  {index === currentStep ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Play className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  ) : index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Square className="w-4 h-4 text-green-400 fill-current" />
                    </motion.div>
                  ) : (
                    <Square className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Progress summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">
            Progress: {currentStep + 1} / {steps.length}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-300 text-xs">Completed</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-purple-300 text-xs">Current</span>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-gray-300 text-xs">Pending</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlowDiagram;