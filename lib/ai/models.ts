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
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    description: 'Most capable multimodal model',
    capabilities: {
      maxTokens: 128000,
      contextWindow: 128000,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0025, output: 0.01 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    description: 'Affordable small model with vision',
    capabilities: {
      maxTokens: 16384,
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
  {
    id: 'o1-preview',
    name: 'O1 Preview',
    provider: 'OpenAI',
    description: 'Advanced reasoning model',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: false,
      supportsStreaming: false,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.015, output: 0.06 },
    guardrailStrength: 'high',
    tier: 'premium',
  },
  {
    id: 'o1-mini',
    name: 'O1 Mini',
    provider: 'OpenAI',
    description: 'Fast reasoning model',
    capabilities: {
      maxTokens: 65536,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: false,
      supportsStreaming: false,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.003, output: 0.012 },
    guardrailStrength: 'high',
    tier: 'standard',
  },

  // Anthropic Models
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    description: 'Most intelligent Claude model',
    capabilities: {
      maxTokens: 8192,
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
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    description: 'Fast and affordable Claude',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 200000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0008, output: 0.004 },
    guardrailStrength: 'high',
    tier: 'free',
  },

  // Groq Models
  {
    id: 'groq-llama-3.3-70b',
    name: 'Llama 3.3 70B (Groq)',
    provider: 'Groq',
    description: 'Latest Llama with fast inference',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 131072,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.00059, output: 0.00079 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'groq-llama-3.2-90b',
    name: 'Llama 3.2 90B Vision (Groq)',
    provider: 'Groq',
    description: 'Multimodal Llama model',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 131072,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0009, output: 0.0009 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'deepseek-r1-distill',
    name: 'DeepSeek R1 Distill',
    provider: 'Groq',
    description: 'Reasoning-optimized model',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: true,
    },
    costPer1kTokens: { input: 0.00027, output: 0.00027 },
    guardrailStrength: 'medium',
    tier: 'free',
  },

  // xAI Models
  {
    id: 'grok-2',
    name: 'Grok 2',
    provider: 'xAI',
    description: 'Advanced conversational AI',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.002, output: 0.01 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'grok-2-vision',
    name: 'Grok 2 Vision',
    provider: 'xAI',
    description: 'Multimodal Grok model',
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
    id: 'chat-model-reasoning',
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

  // OpenRouter Models
  {
    id: 'openrouter-auto',
    name: 'OpenRouter Auto',
    provider: 'OpenRouter',
    description: 'Automatically selects best model',
    capabilities: {
      maxTokens: 16384,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0, output: 0.0 },
    guardrailStrength: 'low',
    tier: 'free',
  },

  // Together AI Models
  {
    id: 'together-llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Together',
    description: 'Latest open model',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 131072,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0009, output: 0.0009 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'together-deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'Together',
    description: 'Advanced coding model',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 64000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0003, output: 0.0003 },
    guardrailStrength: 'medium',
    tier: 'free',
  },
  {
    id: 'together-qwen-2.5-72b',
    name: 'Qwen 2.5 72B',
    provider: 'Together',
    description: 'Multilingual AI model',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0009, output: 0.0009 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },

  // Perplexity Models
  {
    id: 'perplexity-sonar-large',
    name: 'Sonar Large',
    provider: 'Perplexity',
    description: 'Web-enhanced responses',
    capabilities: {
      maxTokens: 4096,
      contextWindow: 127072,
      supportsVision: false,
      supportsFunctionCalling: false,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.001, output: 0.001 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
  {
    id: 'perplexity-sonar-huge',
    name: 'Sonar Huge',
    provider: 'Perplexity',
    description: 'Most capable with web search',
    capabilities: {
      maxTokens: 4096,
      contextWindow: 127072,
      supportsVision: false,
      supportsFunctionCalling: false,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.005, output: 0.005 },
    guardrailStrength: 'high',
    tier: 'premium',
  },

  // Google Models
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    description: 'Fast multimodal model',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 1048576,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0, output: 0.0 },
    guardrailStrength: 'high',
    tier: 'free',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    description: 'Advanced multimodal reasoning',
    capabilities: {
      maxTokens: 8192,
      contextWindow: 2097152,
      supportsVision: true,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.00125, output: 0.005 },
    guardrailStrength: 'high',
    tier: 'standard',
  },

  // V0 Models
  {
    id: 'v0-1.5-md',
    name: 'v0 1.5 Medium',
    provider: 'Vercel',
    description: 'UI generation specialist',
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
    description: 'Advanced UI and reasoning',
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

  // Mistral Models
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral',
    description: 'Flagship model with 128k context',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.002, output: 0.006 },
    guardrailStrength: 'medium',
    tier: 'standard',
  },
  {
    id: 'mistral-codestral',
    name: 'Codestral',
    provider: 'Mistral',
    description: 'Code generation specialist',
    capabilities: {
      maxTokens: 32768,
      contextWindow: 32768,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0002, output: 0.0006 },
    guardrailStrength: 'medium',
    tier: 'free',
  },

  // Cohere Models
  {
    id: 'cohere-command-r-plus',
    name: 'Command R+',
    provider: 'Cohere',
    description: 'Advanced RAG and tool use',
    capabilities: {
      maxTokens: 4096,
      contextWindow: 128000,
      supportsVision: false,
      supportsFunctionCalling: true,
      supportsStreaming: true,
      supportsReasoning: false,
    },
    costPer1kTokens: { input: 0.0025, output: 0.01 },
    guardrailStrength: 'high',
    tier: 'standard',
  },
];

// Helper functions
export const getModelById = (id: string): ChatModel | undefined => {
  return chatModels.find(model => model.id === id);
};

export const filterModelsByCapability = (
  capability: keyof ModelCapabilities,
  value: boolean
): ChatModel[] => {
  return chatModels.filter(model => model.capabilities[capability] === value);
};

export const getModelsByTier = (tier: 'free' | 'standard' | 'premium'): ChatModel[] => {
  return chatModels.filter(model => model.tier === tier);
};

export const getModelsByProvider = (provider: string): ChatModel[] => {
  return chatModels.filter(model => model.provider === provider);
};
