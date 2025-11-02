import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { copyToClipboard, downloadFile } from '../utils/formatters';

interface PreviewPanelProps {
  title: string;
  content: string;
  format: 'xml' | 'markdown';
  icon: React.ReactNode;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ title, content, format, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const extension = format === 'xml' ? 'xml' : 'md';
    const mimeType = format === 'xml' ? 'application/xml' : 'text/markdown';
    const filename = `ai-video-prompt-${Date.now()}.${extension}`;
    downloadFile(content, filename, mimeType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 text-sm font-medium backdrop-blur-sm"
          >
            Download
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm font-mono border border-gray-200 max-h-[600px] overflow-y-auto">
          <code className="text-gray-800">{content}</code>
        </pre>
      </div>
    </motion.div>
  );
};
