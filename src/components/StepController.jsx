import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipBack, 
  SkipForward, 
  FastForward,
  Rewind
} from 'lucide-react';

const StepController = ({ 
  isPlaying, 
  currentStep, 
  totalSteps, 
  onTogglePlayback, 
  onReset, 
  onStepChange,
  playbackSpeed,
  onSpeedChange 
}) => {
  const speedOptions = [
    { value: 2000, label: '0.5x', icon: Rewind },
    { value: 1000, label: '1x', icon: Play },
    { value: 500, label: '2x', icon: FastForward },
    { value: 250, label: '4x', icon: FastForward }
  ];

  const handlePrevStep = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
    }
  };

  const progress = totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Execution Control</h3>
        <div className="text-sm text-gray-300">
          Step {currentStep + 1} of {totalSteps}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onStepChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          disabled={totalSteps === 0}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-3 mb-4">
        <motion.button
          onClick={onReset}
          className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg border border-red-400/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={totalSteps === 0}
        >
          <RotateCcw className="w-5 h-5 text-red-400" />
        </motion.button>

        <motion.button
          onClick={handlePrevStep}
          className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-400/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep === 0 || totalSteps === 0}
        >
          <SkipBack className="w-5 h-5 text-blue-400" />
        </motion.button>

        <motion.button
          onClick={onTogglePlayback}
          className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </motion.button>

        <motion.button
          onClick={handleNextStep}
          className="p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-400/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentStep >= totalSteps - 1 || totalSteps === 0}
        >
          <SkipForward className="w-5 h-5 text-blue-400" />
        </motion.button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center justify-center space-x-2">
        <span className="text-sm text-gray-300 mr-2">Speed:</span>
        {speedOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => onSpeedChange(option.value)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              playbackSpeed === option.value
                ? 'bg-purple-500/30 text-purple-300 border border-purple-400/50'
                : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </motion.div>
  );
};

export default StepController;