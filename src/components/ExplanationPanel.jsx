import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target, ArrowRight } from 'lucide-react';

const ExplanationPanel = ({ explanation, step, language }) => {
  const getSimpleExplanation = (step, language) => {
    if (!step) return "Ready to start! Click the play button to begin execution.";

    const explanations = {
      assignment: {
        simple: "We're putting a value into a box (variable) so we can use it later! 📦",
        detailed: `The computer is storing the value ${step.value || 'something'} in a memory location called '${step.variable || 'a variable'}'. Think of it like putting a toy in a labeled box.`
      },
      loop: {
        simple: "We're doing the same thing over and over again! 🔄",
        detailed: `This is a loop - it repeats the same instructions multiple times. We're currently on repetition ${step.iteration || 1}.`
      },
      condition: {
        simple: "The computer is making a decision! 🤔",
        detailed: `This is an if-statement. The computer checks if something is true or false, then decides which path to take.`
      },
      function_call: {
        simple: "We're asking another piece of code to do some work for us! 📞",
        detailed: `We're calling a function named '${step.function || 'a function'}'. Functions are like mini-programs that do specific tasks.`
      },
      print: {
        simple: "We're showing something on the screen! 📺",
        detailed: `The computer is displaying information for us to see. This is how programs communicate with users.`
      },
      comparison: {
        simple: "We're comparing two things to see which is bigger, smaller, or equal! ⚖️",
        detailed: `The computer is comparing values to make decisions. It's like asking 'Is A bigger than B?'`
      }
    };

    const operation = step.operation || 'unknown';
    const explanation = explanations[operation] || {
      simple: "The computer is following the instructions we wrote! 💻",
      detailed: "The computer is executing the code step by step, just like following a recipe."
    };

    return explanation;
  };

  const getCurrentExplanation = () => {
    if (explanation) return explanation;
    return getSimpleExplanation(step, language);
  };

  const getLanguageSpecificTips = (language) => {
    const tips = {
      python: [
        "Python uses indentation (spaces) to group code together",
        "Variables don't need to be declared with a type",
        "Python is great for beginners because it reads like English!"
      ],
      javascript: [
        "JavaScript runs in web browsers and makes websites interactive",
        "Variables can be declared with 'let', 'const', or 'var'",
        "JavaScript is event-driven - it responds to user actions!"
      ],
      cpp: [
        "C++ is a compiled language - it gets translated to machine code",
        "You need to declare variable types explicitly",
        "C++ gives you direct control over computer memory!"
      ],
      java: [
        "Java code runs on a 'virtual machine' for portability",
        "Everything in Java is inside a class",
        "Java is strongly typed - variables have specific types!"
      ]
    };

    return tips[language] || [];
  };

  const currentExplanation = getCurrentExplanation();
  const tips = getLanguageSpecificTips(language);

  return (
    <motion.div
      className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        <motion.div
          className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BookOpen className="w-5 h-5" />
        </motion.div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
          What's Happening?
        </h3>
      </div>

      {/* Main Explanation */}
      <motion.div
        className="bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-lg p-4 mb-4 border border-green-400/20"
        key={step?.line || 'default'}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-start space-x-3">
          <Lightbulb className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
          <div>
            <p className="text-white text-base leading-relaxed">
              {typeof currentExplanation === 'string' 
                ? currentExplanation 
                : currentExplanation.simple}
            </p>
            {typeof currentExplanation === 'object' && (
              <p className="text-gray-300 text-sm mt-2">
                {currentExplanation.detailed}
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Current Step Info */}
      {step && (
        <motion.div
          className="bg-blue-500/10 rounded-lg p-3 mb-4 border border-blue-400/20"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 font-semibold">Current Step</span>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-gray-300">Line:</span>
              <span className="bg-blue-500/20 px-2 py-1 rounded text-blue-200 font-mono">
                {step.line}
              </span>
            </div>
            {step.operation && (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Action:</span>
                <span className="bg-purple-500/20 px-2 py-1 rounded text-purple-200">
                  {step.operation.replace('_', ' ')}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Language Tips */}
      {tips.length > 0 && (
        <motion.div
          className="bg-purple-500/10 rounded-lg p-3 border border-purple-400/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-semibold">
              {language.charAt(0).toUpperCase() + language.slice(1)} Tips
            </span>
          </div>
          <ul className="text-sm space-y-1">
            {tips.slice(0, 2).map((tip, index) => (
              <motion.li
                key={index}
                className="text-gray-300 flex items-start space-x-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-purple-400 mt-1">•</span>
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExplanationPanel;