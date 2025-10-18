<h1 align="center">Enhanced AI Chat Platform</h1>
</a>

<a href="https://chat.vercel.ai/">
  
  <img alt="Next.js 15 and App Router-ready AI chatbot with multi-provider support." src="app/(chat)/opengraph-image.png">
  <p align="center">

  A superior alternative to v0 and Vercel Chat - an enterprise-grade, open-source AI chat platform built with Next.js 15 and the AI SDK. Features multi-provider support, advanced guardrails, and supreme coding capabilities with an OCD-level attention to completeness and correctness.
</p>

<p align="center">
  <a href="https://chat-sdk.dev"><strong>Read Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#integrations"><strong>Integrations</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## 🚀 Why This Platform?

Unlike v0.dev's slow, loop-prone chatbot that wastes credits and time, this platform features:

- **Supreme Coding Capabilities**: World-class development assistant with OCD-level attention to thoroughness, completion, and consistency
- **Advanced Guardrails**: Universal safety checks applied to EVERY model - no bypasses, no exceptions
- **Multi-Provider Support**: 40+ models from 15+ providers including OpenAI, Anthropic, Google, xAI, Groq, and more
- **Zero Tolerance for Errors**: Built-in syntax checking, variable resolution, and failure prevention
- **Complete Solutions Only**: Never returns partial code or placeholders - everything is production-ready

## ✨ Features

### Core Platform
- **[Next.js 15](https://nextjs.org) App Router**
  - React 19 RC with Server Components and Server Actions
  - Turbo-powered development for maximum performance
  - Advanced routing with parallel and intercepting routes
  
- **[AI SDK](https://ai-sdk.dev/docs/introduction)**
  - Unified API for 40+ language models
  - Real-time streaming with backpressure handling
  - Tool calling and function execution
  - Multimodal support (text, images, files)

### AI Capabilities
- **Supreme Development Persona**
  - Meticulous code generation with zero syntax errors
  - Complete implementations - no TODOs or placeholders
  - Consistent patterns and best practices enforcement
  - Proactive error prevention and edge case handling

- **Advanced Features**
  - **Reasoning Models**: Chain-of-thought reasoning with o1, DeepSeek R1, and Grok 3
  - **Vision Models**: Image understanding with GPT-4o, Claude 3.5, Gemini 2.0
  - **Code Specialists**: Dedicated models for code generation (Codestral, DeepSeek V3)
  - **Web-Enhanced**: Real-time web search integration with Perplexity Sonar

### UI/UX
- **[shadcn/ui](https://ui.shadcn.com)** components with [Tailwind CSS](https://tailwindcss.com)
- **Artifacts System**: Create and manage code artifacts with live preview
- **Model Selector**: Advanced UI showing capabilities, pricing, and guardrail strength
- **File Upload**: Support for images, documents, and code files
- **Suggestions Engine**: Context-aware prompt suggestions
- **Real-time Streaming**: Low-latency responses with progress indicators

### Data & Security
- **[Neon Serverless Postgres](https://neon.tech)**: Scalable database for chat history
- **[Vercel Blob](https://vercel.com/storage/blob)**: Efficient file storage
- **[Supabase](https://supabase.com)**: Additional storage and real-time features
- **[Auth.js](https://authjs.dev)**: Secure authentication with multiple providers
- **Redis**: Response caching and rate limiting

## 🤖 Model Providers

### Premium Tier
- **OpenAI**: GPT-4o, GPT-4 Turbo, o1-preview, o1-mini
- **Anthropic**: Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus
- **Google**: Gemini 2.0 Flash, Gemini 1.5 Pro (2M context)
- **xAI**: Grok 2, Grok 2 Vision, Grok 3 Mini (reasoning)

### Standard Tier
- **Groq**: Llama 3.3 70B, Llama 3.2 90B Vision, Mixtral 8x7B, DeepSeek R1
- **Together AI**: Llama 3.3 70B, DeepSeek V3, Qwen 2.5 72B
- **Perplexity**: Sonar Large/Huge (web-enhanced)
- **Mistral**: Mistral Large, Codestral, Pixtral
- **Cohere**: Command R+, Command R

### Free Tier
- **OpenRouter**: Auto-routing, GPT-OSS models
- **Fireworks**: Llama 3.3, Qwen 2.5
- **V0 Models**: v0-1.5-md, v0-1.5-lg (UI specialists)

### Model Selection Features
- **Capability Badges**: Vision 👁️, Reasoning 🧠, Functions 🔧
- **Guardrail Indicators**: High 🟢, Medium 🟡, Low 🔴
- **Pricing Display**: Cost per 1K tokens (input/output)
- **Context Windows**: From 8K to 2M tokens
- **Smart Filtering**: By provider, capability, or tier

## 🔌 Integrations

### AI Services
- **[FAL AI](https://fal.ai)**: Image generation with Flux, SDXL
- **[Replicate](https://replicate.com)**: Custom model inference
- **[Together AI](https://together.ai)**: Open model hosting
- **[OpenRouter](https://openrouter.ai)**: Model routing and fallbacks

### Productivity Tools
- **[Resend](https://resend.com)**: Email notifications and summaries
- **[SerpAPI](https://serpapi.com)**: Web search integration
- **[Supabase](https://supabase.com)**: Real-time features and storage
- **[Redis](https://redis.io)**: Caching and rate limiting

## 🛡️ Guardrails & Safety

### Universal Protection
Every model, regardless of provider, has these guardrails:

- **Input Validation**: Length limits, forbidden patterns, injection detection
- **Content Filtering**: Automatic redaction of sensitive data (SSN, credit cards)
- **Output Sanitization**: XSS prevention, harmful content blocking
- **Rate Limiting**: Per-user request limits with Redis
- **Audit Logging**: Complete request/response logging for compliance

### OCD-Level Code Quality
The system persona enforces:

- **Completeness Mandate**: 100% complete, functional code only
- **Correctness Imperative**: Zero syntax errors, proper typing
- **Consistency Requirement**: Uniform patterns throughout
- **Stability Enforcement**: All edge cases handled
- **Efficiency Optimization**: Performance best practices
- **Security Requirements**: Input validation, auth checks

## 🚀 Deploy Your Own

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fenhanced-ai-chat&env=AUTH_SECRET,OPENAI_API_KEY,ANTHROPIC_API_KEY,GROQ_API_KEY,DATABASE_URL&envDescription=Required%20API%20keys%20and%20configuration&envLink=https%3A%2F%2Fgithub.com%2Fyour-username%2Fenhanced-ai-chat%23environment-variables&project-name=enhanced-ai-chat&repository-name=enhanced-ai-chat&demo-title=Enhanced%20AI%20Chat&demo-description=Superior%20AI%20Chat%20Platform%20with%20Multi-Provider%20Support&demo-url=https%3A%2F%2Fenhanced-ai-chat.vercel.app)

### Manual Deployment

1. **Clone the repository**
```bash
git clone https://github.com/your-username/enhanced-ai-chat.git
cd enhanced-ai-chat
```

2. **Set up Neon Database**
   - Create account at [neon.tech](https://neon.tech)
   - Create new project and copy connection string
   - Run migrations: `pnpm db:migrate`

3. **Configure environment variables** (see below)

4. **Deploy to Vercel**
```bash
vercel --prod
```

'use client';
import { Button } from '@/components/ui/button';
export function V0Button() {
  return <Button onClick={() => window.open('https://v0.dev/chat?project=ai-chatbot', '_blank')} variant="outline">Edit in v0.dev</Button>;
}

## 💻 Running Locally

### Prerequisites
- Node.js 20+
- pnpm 9.12.3+
- PostgreSQL (via Neon)
- Redis (optional, for caching)

### Environment Variables

Create a `.env.local` file with all required variables:

```bash
# Core Authentication
AUTH_SECRET=generate-random-secret-at-generate-secret.vercel.app

# Database (Neon)
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/db?sslmode=require

# Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxx

# Primary AI Providers (at least one required)
OPENAI_API_KEY=sk-xxx
ANTHROPIC_API_KEY=sk-ant-xxx
XAI_API_KEY=xai-xxx

# Additional AI Providers (optional)
GROQ_API_KEY=gsk_xxx
OPENROUTER_API_KEY=sk-or-xxx
GOOGLE_AI_API_KEY=xxx
TOGETHER_API_KEY=xxx
PERPLEXITY_API_KEY=pplx-xxx
MISTRAL_API_KEY=xxx
COHERE_API_KEY=co-xxx
FIREWORKS_API_KEY=fw-xxx
REPLICATE_API_TOKEN=r8_xxx

# Vercel AI Gateway (for v0 models)
AI_GATEWAY_API_KEY=xxx

# Integrations (optional but recommended)
FAL_KEY=fal_xxx
RESEND_API_KEY=re_xxx
SERPAPI_API_KEY=xxx
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# Feature Flags
ENABLE_GUARDRAILS=true
ENABLE_WEB_SEARCH=true
ENABLE_IMAGE_GENERATION=true
ENABLE_EMAIL_SUMMARIES=true
```

### Installation & Development

```bash
# Install dependencies
pnpm install

# Set up database
pnpm db:generate
pnpm db:migrate

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Build & Production

```bash
# Type check and build
pnpm build

# Run production server
pnpm start

# Run tests
pnpm test
```

## 📊 Usage & Pricing

### Token Limits by Model Tier

| Tier | Context Window | Max Output | Rate Limit |
|------|---------------|------------|------------|
| Free | 8K-128K | 4K-16K | 100 req/min |
| Standard | 32K-200K | 8K-32K | 500 req/min |
| Premium | 128K-2M | 32K-128K | 1000 req/min |

### Cost Optimization
- **Auto-routing**: OpenRouter automatically selects cheapest capable model
- **Caching**: Redis caches frequent queries
- **Fallbacks**: Automatic failover to cheaper models on errors
- **Usage tracking**: Per-user token usage monitoring

## 🔧 Advanced Configuration

### Custom Model Weights
Edit `lib/ai/models.ts` to adjust model selection preferences:

```typescript
export const modelWeights = {
  speed: { 'gpt-4o-mini': 10, 'claude-3-haiku': 9 },
  quality: { 'gpt-4o': 10, 'claude-3-opus': 9 },
  cost: { 'groq-llama-3.1-8b': 10, 'together-deepseek-v3': 9 }
}
```

### Guardrail Customization
Modify `lib/ai/guardrails.ts` for domain-specific rules:

```typescript
const CUSTOM_SAFETY_CONFIG = {
  forbiddenTopics: ['medical_advice', 'legal_advice'],
  requiredDisclosures: ['ai_generated', 'not_professional_advice'],
  maxResponseLength: 50000
}
```
## Deploy Your Own

You can deploy your own version of the Next.js AI Chatbot to Vercel with one click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai-chatbot&env=AUTH_SECRET&envDescription=Generate%20a%20random%20secret%20to%20use%20for%20authentication&envLink=https%3A%2F%2Fgenerate-secret.vercel.app%2F32&project-name=my-awesome-chatbot&repository-name=my-awesome-chatbot&demo-title=AI%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel&demo-url=https%3A%2F%2Fchat.vercel.ai&products=%5B%7B%22type%22%3A%22integration%22%2C%22protocol%22%3A%22storage%22%2C%22productSlug%22%3A%22neon%22%2C%22integrationSlug%22%3A%22neon%22%7D%2C%7B%22type%22%3A%22blob%22%7D%5D)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Priorities
1. Additional model providers (AWS Bedrock, Azure OpenAI)
2. Enhanced artifact system with live collaboration
3. Plugin system for custom tools
4. Advanced analytics dashboard
5. Multi-language UI support

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

Built on top of amazing open-source projects:
- [Vercel AI SDK](https://sdk.vercel.ai)
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

## 🔗 Links

- [Documentation](https://chat-sdk.dev)
- [API Reference](https://chat-sdk.dev/api)
- [Discord Community](https://discord.gg/enhanced-ai-chat)
- [Blog](https://blog.enhanced-ai-chat.dev)

---

**Note**: This platform represents a significant enhancement over v0.dev with superior performance, reliability, and capabilities. No more loops, no more wasted credits, just pure productivity.
