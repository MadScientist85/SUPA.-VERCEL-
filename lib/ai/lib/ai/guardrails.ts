import { LanguageModelV1Middleware } from 'ai';
import { z } from 'zod';

// Safety configuration
const SAFETY_CONFIG = {
  maxTokens: 128000,
  maxPromptLength: 50000,
  forbiddenPatterns: [
    /\b(hack|exploit|jailbreak|bypass)\b/gi,
    /\b(illegal|illicit|unlawful)\b/gi,
    /\b(harm|violence|abuse)\b/gi,
  ],
  sensitiveDataPatterns: [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // Email
    /\b(?:\d{4}[-\s]?){3}\d{4}\b/, // Credit Card
  ],
};

// Content validation schema
const contentSchema = z.object({
  prompt: z.string().max(SAFETY_CONFIG.maxPromptLength),
  safe: z.boolean(),
  flags: z.array(z.string()),
});

// Main guardrail middleware
export const guardrailMiddleware: LanguageModelV1Middleware = {
  transformParams: async ({ params }) => {
    // Validate prompt length
    const prompt = JSON.stringify(params.prompt);
    if (prompt.length > SAFETY_CONFIG.maxPromptLength) {
      throw new Error('Prompt exceeds maximum length');
    }

    // Check for forbidden patterns
    const flags: string[] = [];
    for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
      if (pattern.test(prompt)) {
        flags.push(`Forbidden pattern detected: ${pattern}`);
      }
    }

    // Check for sensitive data
    for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
      if (pattern.test(prompt)) {
        // Redact sensitive data
        params.prompt = JSON.parse(
          prompt.replace(pattern, '[REDACTED]')
        );
        flags.push('Sensitive data redacted');
      }
    }

    // Add safety instructions to system prompt
    if (params.system) {
      params.system = `${params.system}\n\nIMPORTANT SAFETY GUIDELINES:
1. Never generate harmful, illegal, or unethical content
2. Protect user privacy and sensitive information
3. Provide accurate, helpful, and constructive responses
4. Flag any concerning requests for review
5. Maintain professional and respectful communication`;
    }

    // Enforce token limits
    if (params.maxTokens && params.maxTokens > SAFETY_CONFIG.maxTokens) {
      params.maxTokens = SAFETY_CONFIG.maxTokens;
    }

    return params;
  },

  wrapGenerate: async ({ doGenerate, params }) => {
    try {
      // Log the request for audit
      console.log('[Guardrail] Processing request:', {
        timestamp: new Date().toISOString(),
        model: params.model,
        promptLength: JSON.stringify(params.prompt).length,
      });

      // Execute the generation
      const result = await doGenerate();

      // Post-process the response
      if (result.text) {
        // Check response for violations
        for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
          if (pattern.test(result.text)) {
            console.warn('[Guardrail] Response contains forbidden content');
            result.text = 'I cannot provide that information as it may violate safety guidelines.';
            break;
          }
        }

        // Redact any sensitive data in response
        for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
          if (pattern.test(result.text)) {
            result.text = result.text.replace(pattern, '[REDACTED]');
          }
        }
      }

      return result;
    } catch (error) {
      console.error('[Guardrail] Generation error:', error);
      throw new Error('Generation failed safety checks');
    }
  },

  wrapStream: async ({ doStream, params }) => {
    const stream = await doStream();
    
    // Create a transform stream for real-time filtering
    return {
      ...stream,
      pipeThrough: (transformer: any) => {
        const filteredTransformer = new TransformStream({
          transform(chunk, controller) {
            // Apply safety filters to streaming chunks
            if (chunk.type === 'text-delta' && chunk.textDelta) {
              for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
                chunk.textDelta = chunk.textDelta.replace(pattern, '[REDACTED]');
              }
            }
            controller.enqueue(chunk);
          },
        });
        return stream.pipeThrough(filteredTransformer).pipeThrough(transformer);
      },
    };
  },
};

// Additional validation functions
export const validateUserInput = (input: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (input.length > SAFETY_CONFIG.maxPromptLength) {
    errors.push('Input exceeds maximum length');
  }

  for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
    if (pattern.test(input)) {
      errors.push('Input contains forbidden content');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const sanitizeOutput = (output: string): string => {
  let sanitized = output;

  // Remove sensitive data
  for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  }

  // Remove any potential XSS attempts
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  return sanitized;
};
