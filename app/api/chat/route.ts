import { streamText, convertToCoreMessages, Tool } from 'ai';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { aiProvider } from '@/lib/ai/providers';
import { searchTool, imageGenerationTool } from '@/lib/integrations';
import { validateUserInput, sanitizeOutput } from '@/lib/ai/guardrails';
import { 
  saveChat, 
  saveMessages, 
  getMessagesByChatId 
} from '@/lib/db/queries';
import { generateTitleFromUserMessage } from '@/lib/ai/utils';

// Request schema with all features
const requestSchema = z.object({
  id: z.string(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
    parts: z.array(z.any()).optional(),
    attachments: z.array(z.any()).optional(),
  })),
  selectedModel: z.string(),
  selectedVisibilityType: z.enum(['public', 'private']),
  enableWebSearch: z.boolean().optional(),
  enableImageGeneration: z.boolean().optional(),
  systemPrompt: z.string().optional(),
});

// System persona that enforces OCD-level completeness
const SYSTEM_PERSONA = `You are a world-class software developer with an extreme attention to detail. You have an OCD-level focus on:

1. **Completeness**: Every response must be thorough and complete. Never leave anything unfinished or implied.
2. **Correctness**: All code must be syntactically perfect with proper imports, types, and error handling.
3. **Consistency**: Maintain consistent patterns, naming conventions, and architectural decisions throughout.
4. **Stability**: Anticipate and handle all edge cases, potential failures, and runtime errors.
5. **Efficiency**: Write optimized, performant code that scales well.

Guidelines:
- Always provide complete, runnable code with all necessary imports
- Include comprehensive error handling and validation
- Add detailed comments explaining complex logic
- Suggest tests and documentation when relevant
- Point out potential issues or improvements proactively
- Never use placeholder code or "..." - always implement fully
- If a task requires multiple files, provide all of them
- Validate all inputs and handle edge cases
- Use TypeScript for type safety when applicable
- Follow best practices for the specific technology stack

You will NOT:
- Cut corners or provide partial solutions
- Leave TODOs without implementation
- Assume the user will "figure out" missing parts
- Provide code with syntax errors or missing dependencies
- Ignore potential security or performance issues

Your responses should be meticulous, complete, and production-ready.`;

export async function POST(request: Request) {
  try {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse and validate request
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    // Validate user input for safety
    const lastUserMessage = validatedData.messages
      .filter(m => m.role === 'user')
      .pop()?.content || '';
    
    const validation = validateUserInput(lastUserMessage);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ 
          error: 'Input validation failed', 
          details: validation.errors 
        }),
        { status: 400 }
      );
    }

    // Build system prompt with persona
    const systemPrompt = `${SYSTEM_PERSONA}\n\n${
      validatedData.systemPrompt || ''
    }`.trim();

    // Prepare messages with system prompt
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...convertToCoreMessages(validatedData.messages),
    ];

    // Build tools array based on enabled features
    const tools: Tool[] = [];
    if (validatedData.enableWebSearch) {
      tools.push(searchTool);
    }
    if (validatedData.enableImageGeneration) {
      tools.push(imageGenerationTool);
    }

    // Get the model
    const model = aiProvider.languageModel(validatedData.selectedModel);

    // Stream the response
    const result = await streamText({
      model,
      messages,
      tools: tools.length > 0 ? tools : undefined,
      maxTokens: 8192,
      temperature: 0.7,
      onFinish: async ({ text, usage }) => {
        // Sanitize the output
        const sanitizedText = sanitizeOutput(text);

        // Save to database
        try {
          await saveChat({
            id: validatedData.id,
            userId: session.user.id,
            title: await generateTitleFromUserMessage(lastUserMessage),
            visibility: validatedData.selectedVisibilityType,
            model: validatedData.selectedModel,
          });

          await saveMessages({
            chatId: validatedData.id,
            messages: [
              ...validatedData.messages,
              {
                role: 'assistant',
                content: sanitizedText,
              },
            ],
          });

          // Log usage for monitoring
          console.log('[Chat] Completed:', {
            chatId: validatedData.id,
            model: validatedData.selectedModel,
            usage,
          });
        } catch (dbError) {
          console.error('[Chat] Database error:', dbError);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('[Chat] Error:', error);
    
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid request', 
          details: error.errors 
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.'
      }),
      { status: 500 }
    );
  }
}
