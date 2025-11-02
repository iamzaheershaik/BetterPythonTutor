import React from 'react';
import { PromptData } from '../types/prompt';

interface PromptFormProps {
  data: PromptData;
  onChange: (data: PromptData) => void;
}

export const PromptForm: React.FC<PromptFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PromptData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
  const textareaClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white min-h-[100px] resize-y";

  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Scene Description *</label>
        <textarea
          className={textareaClass}
          value={data.scene}
          onChange={(e) => handleChange('scene', e.target.value)}
          placeholder="Describe the scene in detail (e.g., A serene mountain landscape at sunset with golden light reflecting off a crystal-clear lake)"
        />
      </div>

      <div>
        <label className={labelClass}>Visual Style *</label>
        <input
          type="text"
          className={inputClass}
          value={data.visualStyle}
          onChange={(e) => handleChange('visualStyle', e.target.value)}
          placeholder="e.g., Cinematic, Anime, Photorealistic, Oil Painting, Cyberpunk"
        />
      </div>

      <div>
        <label className={labelClass}>Camera Movement</label>
        <input
          type="text"
          className={inputClass}
          value={data.cameraMovement}
          onChange={(e) => handleChange('cameraMovement', e.target.value)}
          placeholder="e.g., Slow pan left to right, Drone shot ascending, Static wide shot"
        />
      </div>

      <div>
        <label className={labelClass}>Lighting</label>
        <input
          type="text"
          className={inputClass}
          value={data.lighting}
          onChange={(e) => handleChange('lighting', e.target.value)}
          placeholder="e.g., Golden hour, Soft diffused light, Dramatic side lighting"
        />
      </div>

      <div>
        <label className={labelClass}>Mood & Atmosphere</label>
        <input
          type="text"
          className={inputClass}
          value={data.mood}
          onChange={(e) => handleChange('mood', e.target.value)}
          placeholder="e.g., Peaceful, Mysterious, Energetic, Melancholic"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Duration</label>
          <input
            type="text"
            className={inputClass}
            value={data.duration}
            onChange={(e) => handleChange('duration', e.target.value)}
            placeholder="e.g., 5 seconds, 30s"
          />
        </div>

        <div>
          <label className={labelClass}>Aspect Ratio</label>
          <select
            className={inputClass}
            value={data.aspectRatio}
            onChange={(e) => handleChange('aspectRatio', e.target.value)}
          >
            <option value="16:9">16:9 (Widescreen)</option>
            <option value="9:16">9:16 (Vertical)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="4:3">4:3 (Standard)</option>
            <option value="21:9">21:9 (Ultrawide)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>FPS</label>
          <select
            className={inputClass}
            value={data.fps}
            onChange={(e) => handleChange('fps', e.target.value)}
          >
            <option value="24">24 fps (Cinematic)</option>
            <option value="30">30 fps (Standard)</option>
            <option value="60">60 fps (Smooth)</option>
            <option value="120">120 fps (High Speed)</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Resolution</label>
          <select
            className={inputClass}
            value={data.resolution}
            onChange={(e) => handleChange('resolution', e.target.value)}
          >
            <option value="1920x1080">1920x1080 (Full HD)</option>
            <option value="3840x2160">3840x2160 (4K)</option>
            <option value="1280x720">1280x720 (HD)</option>
            <option value="2560x1440">2560x1440 (2K)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Parameters</label>
        <textarea
          className={textareaClass}
          value={data.additionalParams}
          onChange={(e) => handleChange('additionalParams', e.target.value)}
          placeholder="Add any additional parameters or notes here..."
        />
      </div>
    </div>
  );
};
