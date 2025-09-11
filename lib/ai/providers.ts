import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  LanguageModel,
} from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createCohere } from '@ai-sdk/cohere';
import { createMistral } from '@ai-sdk/mistral';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { gateway } from '@ai-sdk/gateway';
import { isTestEnvironment } from '../constants';
import { guardrailMiddleware } from './guardrails';

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
const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

// Together AI Provider
const together = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://api.together.xyz/v1',
});

// Perplexity Provider
const perplexity = createOpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
});

// Cohere Provider
const cohere = createCohere({
  apiKey: process.env.COHERE_API_KEY,
});

// Mistral Provider
const mistral = createMistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

// Fireworks Provider
const fireworks = createOpenAI({
  apiKey: process.env.FIREWORKS_API_KEY,
  baseURL: 'https://api.fireworks.ai/inference/v1',
});

// Apply guardrails to all models
const wrapWithGuardrails = (model: LanguageModel) => {
  return wrapLanguageModel({
    model,
    middleware: [guardrailMiddleware],
  });
};

// Main provider configuration
export const aiProvider = isTestEnvironment
  ? (() => {
      const mockModels = require('./models.mock');
      return customProvider({
        languageModels: mockModels,
      });
    })()
  : customProvider({
      languageModels: {
        // OpenAI Models
        'gpt-4-turbo': wrapWithGuardrails(openai('gpt-4-turbo-preview')),
        'gpt-4o': wrapWithGuardrails(openai('gpt-4o')),
        'gpt-4o-mini': wrapWithGuardrails(openai('gpt-4o-mini')),
        'gpt-3.5-turbo': wrapWithGuardrails(openai('gpt-3.5-turbo')),
        
        // Anthropic Models
        'claude-3-opus': wrapWithGuardrails(anthropic('claude-3-opus-20240229')),
        'claude-3-sonnet': wrapWithGuardrails(anthropic('claude-3-sonnet-20240229')),
        'claude-3-haiku': wrapWithGuardrails(anthropic('claude-3-haiku-20240307')),
        'claude-2.1': wrapWithGuardrails(anthropic('claude-2.1')),
        
        // OpenRouter Models
        'openrouter-gpt-oss-20b': wrapWithGuardrails(
          openrouter('openai/gpt-oss-20b')
        ),
        'openrouter-gpt-oss-120b': wrapWithGuardrails(
          openrouter('openai/gpt-oss-120b')
        ),
        
        // Groq Models
        'groq-llama-3.1-70b': wrapWithGuardrails(groq('llama-3.1-70b-versatile')),
        'groq-llama-3.1-8b': wrapWithGuardrails(groq('llama-3.1-8b-instant')),
        'groq-mixtral-8x7b': wrapWithGuardrails(groq('mixtral-8x7b-32768')),
        'deepseek-r1-distill': wrapWithGuardrails(groq('deepseek-r1-distill-llama-70b')),
        
        // xAI Models (via Gateway)
        'grok-2-vision': wrapWithGuardrails(
          gateway.languageModel('xai/grok-2-vision-1212')
        ),
        'grok-3-mini': wrapLanguageModel({
          model: gateway.languageModel('xai/grok-3-mini'),
          middleware: [guardrailMiddleware, extractReasoningMiddleware({ tagName: 'think' })],
        }),
        
        // Together AI Models
        'together-llama-3-70b': wrapWithGuardrails(
          together('meta-llama/Llama-3-70b-chat-hf')
        ),
        'together-mixtral-8x22b': wrapWithGuardrails(
          together('mistralai/Mixtral-8x22B-Instruct-v0.1')
        ),
        
        // Perplexity Models
        'perplexity-sonar-large': wrapWithGuardrails(
          perplexity('llama-3.1-sonar-large-128k-online')
        ),
        'perplexity-sonar-small': wrapWithGuardrails(
          perplexity('llama-3.1-sonar-small-128k-online')
        ),
        
        // Cohere Models
        'cohere-command-r': wrapWithGuardrails(cohere('command-r')),
        'cohere-command-r-plus': wrapWithGuardrails(cohere('command-r-plus')),
        
        // Mistral Models
        'mistral-large': wrapWithGuardrails(mistral('mistral-large-latest')),
        'mistral-medium': wrapWithGuardrails(mistral('mistral-medium-latest')),
        
        // Fireworks Models
        'fireworks-llama-3-70b': wrapWithGuardrails(
          fireworks('accounts/fireworks/models/llama-v3-70b-instruct')
        ),
        
        // Specialized Models
        'v0-1.5-md': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-md')),
        'v0-1.5-lg': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-lg')),
        
        // Default models for specific tasks
        'chat-model': wrapWithGuardrails(gateway.languageModel('xai/grok-2-vision-1212')),
        'chat-model-reasoning': wrapLanguageModel({
          model: gateway.languageModel('xai/grok-3-mini'),
          middleware: [guardrailMiddleware, extractReasoningMiddleware({ tagName: 'think' })],
        }),
        'title-model': wrapWithGuardrails(openai('gpt-4o-mini')),
        'artifact-model': wrapWithGuardrails(gateway.languageModel('v0/v0-1.5-md')),
      },
    });
