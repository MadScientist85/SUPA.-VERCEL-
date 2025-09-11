export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ModelCapabilities {
  maxTokens: number;
  contextWindow: number;
  supportsVision: boolean;
  supportsFunctionCalling: boolean;
  supportsStreaming: boolean;
  supportsReasoning: boolean;
}

export interface ChatModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  capabilities: ModelCapabilities;
  costPer1kTokens: {
    input: number;
    output: number;
  };
  guardrailStrength: 'high' | 'medium' | 'low';
  tier: 'free' | 'standard' | 'premium';
}

export const chatModels: Array<ChatModel> = [
  // OpenAI Models
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable GPT-4 model with vision support',
    capabilities: {
      maxTokens: 128000,
      contextWindow: 128000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.01, output: 0.03 },
    guardrailStrength: 'high',
    tier: 'premium',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Optimized GPT-4 for faster responses',
    capabilities: {
      maxTokens: 128000,
      contextWindow: 128000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.005, output: 0.015 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Smaller, faster, cheaper GPT-4',
    capabilities: {
      maxTokens: 128000,
      contextWindow: 128000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.00015, output: 0.0006 },
    guardrailStrength: 'high',
    tier: 'free',
  },

  // Anthropic Models
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    description: 'Most powerful Claude model',
    capabilities: {
      maxTokens: 200000,
      contextWindow: 200000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.015, output: 0.075 },
    guardrailStrength: 'high',
    tier: 'premium',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced performance and cost',
    capabilities: {
      maxTokens: 200000,
      contextWindow: 200000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.003, output: 0.015 },
    guardrailStrength: 'high',
    tier: 'standard',
  },

  // Groq Models
  {
    id: 'groq-llama-3.1-70b',
    name: 'Llama 3.1 70B (Groq)',
    provider: 'Groq',
    description: 'Fast Llama 3.1 inference',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0007, output: 0.0008 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'deepseek-r1-distill',
    name: 'DeepSeek R1 Distill',
    provider: 'Groq',
    description: 'Distilled reasoning model',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.0005, output: 0.0006 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },

  // OpenRouter Models
  {
    id: 'openrouter-gpt-oss-20b',
    name: 'GPT-OSS 20B',
    provider: 'OpenRouter',
    description: 'Open-source GPT variant (20B)',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 8192,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0002, output: 0.0003 },
    guardrailStrength: 'low',
    tier: 'free',
  },
  {
    id: 'openrouter-gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'OpenRouter',
    description: 'Open-source GPT variant (120B)',
    capabilities: {
      maxTokens: 16384,
      contextWindow: 16384,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.001, output: 0.002 },
    guardrailStrength: 'low',
    tier: 'standard',
  },

  // xAI Models
  {
    id: 'grok-2-vision',
    name: 'Grok 2 Vision',
    provider: 'xAI',
    description: 'Advanced multimodal model with vision',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.002, output: 0.01 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'grok-3-mini',
    name: 'Grok 3 Mini',
    provider: 'xAI',
    description: 'Chain-of-thought reasoning model',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.001, output: 0.005 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },

  // V0 Models
  {
    id: 'v0-1.5-md',
    name: 'v0 1.5 Medium',
    provider: 'Vercel',
    description: 'Optimized for UI generation and everyday tasks',
    capabilities: {
      maxTokens: 64000,
      contextWindow: 128000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.001, output: 0.002 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
  {
    id: 'v0-1.5-lg',
    name: 'v0 1.5 Large',
    provider: 'Vercel',
    description: 'Advanced reasoning and complex tasks',
    capabilities: {
      maxTokens: 64000,
      contextWindow: 512000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.003, output: 0.006 },
    guardrailStrength: 'high',
    tier: 'premium',
  },

  // Perplexity Models
  {
    id: 'perplexity-sonar-large',
    name: 'Sonar Large',
    provider: 'Perplexity',
    description: 'Web-search enhanced responses',
    capabilities: {
      maxTokens: 128000,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.001, output: 0.001 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
];

// Helper function to get model by ID
export const getModelById = (id: string): ChatModel | undefined => {
  return chatModels.find(model => model.id === id);
};

// Helper function to filter models by capabilities
export const filterModelsByCapability = (
  capability: keyof ModelCapabilities,
  value: boolean
): ChatModel[] => {
  return chatModels.filter(model => model.capabilities[capability] === value);
};

// Helper function to get models by tier
export const getModelsByTier = (tier: 'free' | 'standard' | 'premium'): ChatModel[] => {
  return chatModels.filter(model => model.tier === tier);
};
