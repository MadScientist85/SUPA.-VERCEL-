import { type LanguageModelV1Middleware } from '@ai-sdk/provider';
import { z } from 'zod';

// Enhanced safety configuration
const SAFETY_CONFIG = {
  maxTokens: 128000,
  maxPromptLength: 100000,
  forbiddenPatterns: [
    /\b(hack|exploit|jailbreak|bypass security)\b/gi,
    /\b(illegal|illicit|unlawful|criminal)\b/gi,
    /\b(harm|violence|abuse|assault)\b/gi,
    /\b(kill|murder|suicide|self-harm)\b/gi,
    /\b(child|minor).*\b(sexual|abuse|exploit)\b/gi,
  ],
  sensitiveDataPatterns: [
    /\b\d{3}-\d{2}-\d{4}\b/, // SSN
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i, // Email
    /\b(?:\d{4}[-\s]?){3}\d{4}\b/, // Credit Card
    /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/, // Card numbers
    /\b[A-Z]{2}\d{2}\s?[A-Z]{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}\b/, // IBAN
  ],
  maxRetries: 3,
  retryDelay: 1000,
};

// Content validation schema
const contentSchema = z.object({
  prompt: z.string().max(SAFETY_CONFIG.maxPromptLength),
  safe: z.boolean(),
  flags: z.array(z.string()),
});

// Enhanced OCD system prompt
const SYSTEM_ENHANCEMENT = `
CRITICAL DIRECTIVES - YOU MUST FOLLOW THESE WITH ABSOLUTE PRECISION:

1. COMPLETENESS MANDATE:
   - Every response MUST be 100% complete and functional
   - NO placeholders, TODOs, or "..." in code
   - ALL imports, types, and dependencies explicitly defined
   - FULL implementation of every feature mentioned

2. CORRECTNESS IMPERATIVE:
   - Zero tolerance for syntax errors
   - All TypeScript types properly defined
   - Proper error handling for EVERY async operation
   - Guard against null/undefined at every access point

3. CONSISTENCY REQUIREMENT:
   - Maintain identical patterns throughout the codebase
   - Use consistent naming conventions (camelCase for functions, PascalCase for components)
   - Apply the same error handling strategy everywhere
   - Keep the same code structure across similar files

4. STABILITY ENFORCEMENT:
   - Anticipate and handle ALL edge cases
   - Implement retry logic for network operations
   - Add proper cleanup in useEffect hooks
   - Include loading and error states for all async operations

5. EFFICIENCY OPTIMIZATION:
   - Use proper memoization (useMemo, useCallback) where needed
   - Implement proper caching strategies
   - Optimize re-renders with React.memo when appropriate
   - Use proper database indexing suggestions

6. SECURITY REQUIREMENTS:
   - Never expose sensitive data in responses
   - Always validate and sanitize inputs
   - Use proper authentication checks
   - Implement rate limiting suggestions
   - Apply CORS and CSP best practices

VERIFICATION CHECKLIST (Apply to EVERY response):
□ All imports present and correct
□ All types/interfaces defined
□ All functions have error handling
□ All async operations have try-catch
□ All user inputs validated
□ All edge cases handled
□ No placeholder code
□ No syntax errors
□ Consistent patterns used
□ Security best practices applied

If you cannot provide a COMPLETE solution, explain what additional information is needed. 
NEVER provide partial or broken code.`;

// Main guardrail middleware
export const guardrailMiddleware: LanguageModelV1Middleware = {
  transformParams: async ({ params }) => {
    // Validate prompt length
    const prompt = typeof params.prompt === 'string' 
      ? params.prompt 
      : JSON.stringify(params.prompt);
      
    if (prompt.length > SAFETY_CONFIG.maxPromptLength) {
      throw new Error(`Prompt exceeds maximum length of ${SAFETY_CONFIG.maxPromptLength} characters`);
    }

    // Check for forbidden patterns
    const violations: string[] = [];
    for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
      if (pattern.test(prompt)) {
        violations.push(`Content violates safety guidelines: ${pattern.source}`);
      }
    }

    if (violations.length > 0) {
      console.warn('[Guardrail] Safety violations detected:', violations);
      throw new Error('Content violates safety guidelines. Please modify your request.');
    }

    // Redact sensitive data
    let cleanedPrompt = prompt;
    for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
      if (pattern.test(cleanedPrompt)) {
        cleanedPrompt = cleanedPrompt.replace(pattern, '[REDACTED]');
        console.log('[Guardrail] Sensitive data redacted from prompt');
      }
    }

    // Restore cleaned prompt
    if (typeof params.prompt === 'string') {
      params.prompt = cleanedPrompt;
    } else {
      params.prompt = JSON.parse(cleanedPrompt);
    }

    // Enhance system prompt with OCD directives
    const existingSystem = params.system || '';
    params.system = `${existingSystem}\n\n${SYSTEM_ENHANCEMENT}`.trim();

    // Enforce token limits
    if (!params.maxTokens || params.maxTokens > SAFETY_CONFIG.maxTokens) {
      params.maxTokens = Math.min(params.maxTokens || 8192, SAFETY_CONFIG.maxTokens);
    }

    // Add safety parameters
    params.temperature = Math.min(params.temperature || 0.7, 0.9);
    params.topP = params.topP || 0.95;

    return params;
  },

  wrapGenerate: async ({ doGenerate, params }) => {
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < SAFETY_CONFIG.maxRetries) {
      try {
        // Log the request for audit
        console.log('[Guardrail] Processing generation:', {
          timestamp: new Date().toISOString(),
          attempt: retries + 1,
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
              result.text = 'I cannot provide that information as it violates safety guidelines. Please rephrase your request.';
              break;
            }
          }

          // Redact any sensitive data in response
          for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
            if (pattern.test(result.text)) {
              result.text = result.text.replace(pattern, '[REDACTED]');
              console.log('[Guardrail] Sensitive data redacted from response');
            }
          }

          // Verify completeness for code responses
          if (result.text.includes('```') && result.text.includes('...')) {
            console.warn('[Guardrail] Incomplete code detected, requesting completion');
            // You could trigger a follow-up here if needed
          }
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        retries++;
        
        if (retries < SAFETY_CONFIG.maxRetries) {
          console.log(`[Guardrail] Retry ${retries}/${SAFETY_CONFIG.maxRetries} after error:`, error);
          await new Promise(resolve => setTimeout(resolve, SAFETY_CONFIG.retryDelay * retries));
        }
      }
    }

    console.error('[Guardrail] All retries exhausted:', lastError);
    throw new Error('Generation failed after multiple attempts. Please try again.');
  },

  wrapStream: async ({ doStream, params }) => {
    try {
      const stream = await doStream();
      
      // Create a transform stream for real-time filtering
      const transformStream = new TransformStream({
        transform(chunk, controller) {
          // Apply safety filters to streaming chunks
          if (chunk.type === 'text-delta' && chunk.textDelta) {
            // Check for sensitive data
            let filteredText = chunk.textDelta;
            for (const pattern of SAFETY_CONFIG.sensitiveDataPatterns) {
              filteredText = filteredText.replace(pattern, '[REDACTED]');
            }
            
            // Check for forbidden content
            for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
              if (pattern.test(filteredText)) {
                console.warn('[Guardrail] Forbidden content in stream');
                filteredText = '[Content filtered]';
                break;
              }
            }
            
            chunk.textDelta = filteredText;
          }
          
          controller.enqueue(chunk);
        },
      });

      return {
        ...stream,
        pipeThrough: (destination: any) => {
          return stream.pipeThrough(transformStream).pipeThrough(destination);
        },
      };
    } catch (error) {
      console.error('[Guardrail] Stream error:', error);
      throw new Error('Streaming failed. Please try again.');
    }
  },
};

// Additional validation functions
export const validateUserInput = (input: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!input || input.trim().length === 0) {
    errors.push('Input cannot be empty');
  }

  if (input.length > SAFETY_CONFIG.maxPromptLength) {
    errors.push(`Input exceeds maximum length of ${SAFETY_CONFIG.maxPromptLength} characters`);
  }

  for (const pattern of SAFETY_CONFIG.forbiddenPatterns) {
    if (pattern.test(input)) {
      errors.push('Input contains forbidden content');
      break;
    }
  }

  // Check for potential prompt injection
  const injectionPatterns = [
    /ignore (previous|above|all)/gi,
    /disregard instructions/gi,
    /new instructions:/gi,
    /system:/gi,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      errors.push('Input appears to contain prompt injection attempts');
      break;
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
  sanitized = sanitized
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');

  // Remove any HTML if not expected
  if (!output.includes('```html') && !output.includes('```jsx')) {
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  }
  
  return sanitized;
};

// Rate limiting helper
export const checkRateLimit = async (userId: string, redis: any): Promise<boolean> => {
  const key = `rate_limit:${userId}`;
  const limit = 100; // requests per minute
  const window = 60; // seconds

  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, window);
  }

  return current <= limit;
};
 
