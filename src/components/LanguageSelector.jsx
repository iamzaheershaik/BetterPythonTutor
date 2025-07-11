import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Code2 } from 'lucide-react';

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      id: 'python', 
      name: 'Python', 
      icon: '🐍',
      color: 'from-green-400 to-blue-500',
      description: 'Easy to learn, powerful to use'
    },
    { 
      id: 'javascript', 
      name: 'JavaScript', 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      description: 'The language of the web'
    },
    { 
      id: 'cpp', 
      name: 'C++', 
      icon: '⚙️',
      color: 'from-blue-400 to-purple-500',
      description: 'High performance programming'
    },
    { 
      id: 'java', 
      name: 'Java', 
      icon: '☕',
      color: 'from-red-400 to-pink-500',
      description: 'Write once, run anywhere'
    }
  ];

  const selectedLang = languages.find(lang => lang.id === selectedLanguage);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl">{selectedLang?.icon}</span>
          <div className="text-left">
            <div className="font-semibold text-white">{selectedLang?.name}</div>
            <div className="text-xs text-gray-300">{selectedLang?.description}</div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-300" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-2 w-80 bg-black/80 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              {languages.map((language) => (
                <motion.button
                  key={language.id}
                  onClick={() => {
                    onLanguageChange(language.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    selectedLanguage === language.id
                      ? 'bg-white/20 border border-white/30'
                      : 'hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${language.color} flex items-center justify-center text-xl`}>
                    {language.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white">{language.name}</div>
                    <div className="text-sm text-gray-300">{language.description}</div>
                  </div>
                  {selectedLanguage === language.id && (
                    <motion.div
                      className="w-2 h-2 bg-green-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;