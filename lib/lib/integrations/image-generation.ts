import * as fal from '@fal-ai/client';
import Replicate from 'replicate';

// Initialize FAL client
fal.config({
  credentials: process.env.FAL_KEY,
});

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export interface ImageGenerationOptions {
  prompt: string;
  model?: 'fal' | 'replicate';
  width?: number;
  height?: number;
  numImages?: number;
}

export async function generateImage(options: ImageGenerationOptions) {
  const {
    prompt,
    model = 'fal',
    width = 1024,
    height = 1024,
    numImages = 1,
  } = options;

  try {
    if (model === 'fal') {
      const result = await fal.run('fal-ai/flux/schnell', {
        input: {
          prompt,
          image_size: `${width}x${height}`,
          num_images: numImages,
        },
      });

      return {
        success: true,
        images: result.images,
        model: 'fal-flux-schnell',
      };
    } else if (model === 'replicate') {
      const output = await replicate.run(
        'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
        {
          input: {
            prompt,
            width,
            height,
            num_outputs: numImages,
          },
        }
      );

      return {
        success: true,
        images: output as string[],
        model: 'replicate-sdxl',
      };
    }
  } catch (error) {
    console.error('Image generation error:', error);
    return {
      success: false,
      error: 'Image generation failed',
    };
  }
}

export const imageGenerationTool: Tool = {
  name: 'generate_image',
  description: 'Generate images from text descriptions',
  parameters: {
    type: 'object',
    properties: {
      prompt: {
        type: 'string',
        description: 'The image description',
      },
      model: {
        type: 'string',
        enum: ['fal', 'replicate'],
        description: 'The model to use',
        default: 'fal',
      },
    },
    required: ['prompt'],
  },
  execute: generateImage,
};
