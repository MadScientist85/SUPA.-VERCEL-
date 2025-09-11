import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  type LanguageModelV1,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createCohere } from '@ai-sdk/cohere';
import { createMistral } from '@ai-sdk/mistral';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import { createPerplexity } from '@ai-sdk/perplexity';
import { xai } from '@ai-sdk/xai';
import { gateway } from '@ai-sdk/gateway';
import Together from 'together-ai';
import { isTestEnvironment } from '../constants';
import { guardrailMiddleware } from './guardrails';

// Initialize Together AI
const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

// OpenAI Provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

// Anthropic Provider
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// OpenRouter Provider (using OpenAI SDK with custom baseURL)
const openrouter = createOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// Groq Provider
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

// Together AI Provider (using OpenAI compatibility)
const togetherProvider = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://api.together.xyz/v1',
});

// Perplexity Provider
const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

// Cohere Provider
const cohere = createCohere({
  apiKey: process.env.COHERE_API_KEY,
});

// Mistral Provider
const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

// Google Provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_AI_API_KEY,
});

// Fireworks Provider
const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: 'https://api.fireworks.ai/inference/v1',
});

// Apply guardrails to all models
const wrapWithGuardrails = (model: LanguageModelV1) => {
  return wrapLanguageModel({
    model,
    middleware: [guardrailMiddleware],
  });
};

// Main provider configuration
export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require('./models.mock');
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // OpenAI Models
        'gpt-4-turbo': wrapWithGuardrails(openai('gpt-4-turbo-preview')),
        'gpt-4o': wrapWithGuardrails(openai('gpt-4o')),
        'gpt-4o-mini': wrapWithGuardrails(openai('gpt-4o-mini')),
        'gpt-3.5-turbo': wrapWithGuardrails(openai('gpt-3.5-turbo')),
        'o1-preview': wrapWithGuardrails(openai('o1-preview')),
        'o1-mini': wrapWithGuardrails(openai('o1-mini')),
        
        // Anthropic Models
        'claude-3-5-sonnet': wrapWithGuardrails(anthropic('claude-3-5-sonnet-20241022')),
        'claude-3-5-haiku': wrapWithGuardrails(anthropic('claude-3-5-haiku-20241022')),
        'claude-3-opus': wrapWithGuardrails(anthropic('claude-3-opus-20240229')),
        'claude-3-sonnet': wrapWithGuardrails(anthropic('claude-3-sonnet-20240229')),
        'claude-3-haiku': wrapWithGuardrails(anthropic('claude-3-haiku-20240307')),
        
        // OpenRouter Models
        'openrouter-gpt-oss-20b': wrapWithGuardrails(
          openrouter('openai/gpt-oss-20b')
        ),
        'openrouter-gpt-oss-120b': wrapWithGuardrails(
          openrouter('openai/gpt-oss-120b')
        ),
        'openrouter-auto': wrapWithGuardrails(
          openrouter('openrouter/auto')
        ),
        
        // Groq Models
        'groq-llama-3.3-70b': wrapWithGuardrails(groq('llama-3.3-70b-versatile')),
        'groq-llama-3.2-90b': wrapWithGuardrails(groq('llama-3.2-90b-text-preview')),
        'groq-llama-3.2-11b': wrapWithGuardrails(groq('llama-3.2-11b-vision-preview')),
        'groq-llama-3.1-70b': wrapWithGuardrails(groq('llama-3.1-70b-versatile')),
        'groq-llama-3.1-8b': wrapWithGuardrails(groq('llama-3.1-8b-instant')),
        'groq-mixtral-8x7b': wrapWithGuardrails(groq('mixtral-8x7b-32768')),
        'deepseek-r1-distill': wrapWithGuardrails(groq('deepseek-r1-distill-llama-70b')),
        'groq-gemma-2-9b': wrapWithGuardrails(groq('gemma2-9b-it')),
        
        // xAI Models (using the xai provider)
        'grok-2': wrapWithGuardrails(xai('grok-2-1212')),
        'grok-2-vision': wrapWithGuardrails(xai('grok-2-vision-1212')),
        'grok-beta': wrapWithGuardrails(xai('grok-beta')),
        
        // xAI Models via Gateway (legacy support)
        'chat-model': wrapWithGuardrails(gateway.languageModel('xai/grok-2-vision-1212')),
        'chat-model-reasoning': wrapLanguageModel({
          model: gateway.languageModel('xai/grok-3-mini'),
          middleware: [guardrailMiddleware, extractReasoningMiddleware({ tagName: 'think' })],
        }),
        
        // Together AI Models
        'together-llama-3.3-70b': wrapWithGuardrails(
          togetherProvider('meta-llama/Llama-3.3-70B-Instruct-Turbo')
        ),
        'together-llama-3.2-90b': wrapWithGuardrails(
          togetherProvider('meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo')
        ),
        'together-qwen-2.5-72b': wrapWithGuardrails(
          togetherProvider('Qwen/Qwen2.5-72B-Instruct-Turbo')
        ),
        'together-deepseek-v3': wrapWithGuardrails(
          togetherProvider('deepseek-ai/DeepSeek-V3')
        ),
        'together-mixtral-8x22b': wrapWithGuardrails(
          togetherProvider('mistralai/Mixtral-8x22B-Instruct-v0.1')
        ),
        
        // Perplexity Models
        'perplexity-sonar-large': wrapWithGuardrails(
          perplexity('llama-3.1-sonar-large-128k-online')
        ),
        'perplexity-sonar-small': wrapWithGuardrails(
          perplexity('llama-3.1-sonar-small-128k-online')
        ),
        'perplexity-sonar-huge': wrapWithGuardrails(
          perplexity('llama-3.1-sonar-huge-128k-online')
        ),
        
        // Cohere Models
        'cohere-command-r': wrapWithGuardrails(cohere('command-r')),
        'cohere-command-r-plus': wrapWithGuardrails(cohere('command-r-plus')),
        'cohere-command-r-08-2024': wrapWithGuardrails(cohere('command-r-08-2024')),
        
        // Mistral Models
        'mistral-large': wrapWithGuardrails(mistral('mistral-large-latest')),
        'mistral-small': wrapWithGuardrails(mistral('mistral-small-latest')),
        'mistral-codestral': wrapWithGuardrails(mistral('codestral-latest')),
        'mistral-pixtral': wrapWithGuardrails(mistral('pixtral-12b-2409')),
        
        // Google Models
        'gemini-2.0-flash': wrapWithGuardrails(google('gemini-2.0-flash-exp')),
        'gemini-1.5-pro': wrapWithGuardrails(google('gemini-1.5-pro-latest')),
        'gemini-1.5-flash': wrapWithGuardrails(google('gemini-1.5-flash-latest')),
        
        // Fireworks Models
        'fireworks-llama-3.3-70b': wrapWithGuardrails(
          fireworks('accounts/fireworks/models/llama-v3p3-70b-instruct')
        ),
        'fireworks-qwen-2.5-72b': wrapWithGuardrails(
          fireworks('accounts/fireworks/models/qwen2p5-72b-instruct')
        ),
        
        // V0 Models (Vercel)
        'v0-1.5-md': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-md')),
        'v0-1.5-lg': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-lg')),
        'v0-1.0-md': wrapWithGuardrails(gateway.languageModel('v0/v0-1.0-md')),
        
        // Default models for specific tasks
        'title-model': wrapWithGuardrails(openai('gpt-4o-mini')),
        'artifact-model': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-md')),
      },
    });

// Export for backwards compatibility
export const aiProvider = myProvider;
