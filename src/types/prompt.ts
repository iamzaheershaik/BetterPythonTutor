export interface PromptData {
  scene: string;
  visualStyle: string;
  cameraMovement: string;
  lighting: string;
  mood: string;
  duration: string;
  aspectRatio: string;
  fps: string;
  resolution: string;
  additionalParams: string;
}

export interface CustomParameter {
  key: string;
  value: string;
}

export const defaultPromptData: PromptData = {
  scene: '',
  visualStyle: '',
  cameraMovement: '',
  lighting: '',
  mood: '',
  duration: '',
  aspectRatio: '16:9',
  fps: '24',
  resolution: '1920x1080',
  additionalParams: '',
};
