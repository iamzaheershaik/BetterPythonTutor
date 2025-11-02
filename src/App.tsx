import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PromptForm } from './components/PromptForm';
import { PreviewPanel } from './components/PreviewPanel';
import { PromptData, defaultPromptData } from './types/prompt';
import { generateXML, generateMarkdown } from './utils/formatters';

function App() {
  const [promptData, setPromptData] = useState<PromptData>(defaultPromptData);
  const [xmlOutput, setXmlOutput] = useState('');
  const [markdownOutput, setMarkdownOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  useEffect(() => {
    setXmlOutput(generateXML(promptData));
    setMarkdownOutput(generateMarkdown(promptData));
  }, [promptData]);

  const handleReset = () => {
    setPromptData(defaultPromptData);
  };

  const hasContent = promptData.scene.trim() !== '' || promptData.visualStyle.trim() !== '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Video Prompt Creator
            </h1>
            <p className="mt-2 text-gray-600">
              Generate dynamic video prompts in XML and Markdown formats
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden mb-6 flex gap-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${activeTab === 'form' ? 'block' : 'hidden'} lg:block`}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Prompt Details</h2>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  Reset
                </button>
              </div>
              <PromptForm data={promptData} onChange={setPromptData} />
            </div>
          </motion.div>

          {/* Right Column - Preview */}
          <div className={`space-y-6 ${activeTab === 'preview' ? 'block' : 'hidden'} lg:block`}>
            {!hasContent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center"
              >
                <p className="text-yellow-800 font-medium">
                  👈 Start filling out the form to see your prompts generated in real-time!
                </p>
              </motion.div>
            )}

            <PreviewPanel
              title="XML Format"
              content={xmlOutput}
              format="xml"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              }
            />

            <PreviewPanel
              title="Markdown Format"
              content={markdownOutput}
              format="markdown"
              icon={
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fill the Form</h4>
              <p className="text-gray-600 text-sm">
                Enter your video prompt details including scene, style, camera movements, and technical specs
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Preview Formats</h4>
              <p className="text-gray-600 text-sm">
                See your prompt automatically formatted in both XML and Markdown in real-time
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-pink-600">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Export & Use</h4>
              <p className="text-gray-600 text-sm">
                Copy to clipboard or download as .xml or .md files for use in your AI video tools
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            AI Video Prompt Creator - Generate professional video prompts for AI tools
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
