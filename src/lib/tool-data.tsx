
// src/lib/tool-data.tsx
import {
  PenTool,
  ImageIcon,
  Code,
  BarChart3,
  Music,
  Video,
  Zap,
  Search,
  Store,
  BookOpen,
  TerminalSquare,
  BotMessageSquare,
  Workflow,
  Rocket,
  List,
  Briefcase,
  Users,
  GraduationCap,
  FileText,
  Mic,
  Palette,
  Film,
  Type,
  Sparkles,
  BrainCircuit,
  Network,
  ClipboardList,
  CalendarDays,
  Headset,
  UserCheck,
  Database,
  Mail,
  Presentation
} from 'lucide-react';
import type React from 'react';

export interface AiTool {
  id: string;
  name: string;
  description?: string;
  link?: string;
  categorySlug: string; // Added category slug for filtering/lookup
}

export interface AiToolCategory {
  slug: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  tools: AiTool[];
  imageUrl?: string; // Keep image URL for dashboard display if needed
  imageHint?: string; // Keep image hint for dashboard display if needed
}

export const toolCategories: AiToolCategory[] = [
  {
    slug: "chatbots",
    name: "AI Assistants (Chatbots)",
    icon: <BotMessageSquare className="h-5 w-5 mr-3 text-primary" />,
    description: "Intelligent assistants for customer support, information retrieval, and tasks.",
    imageUrl: "https://picsum.photos/400/200?random=1",
    imageHint: "chatbot interface",
    tools: [
      { id: "chatgpt", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/", categorySlug: "chatbots" },
      { id: "claude", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude", categorySlug: "chatbots" },
      { id: "gemini", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/", categorySlug: "chatbots" },
      { id: "microsoft-copilot", name: "Microsoft Copilot", description: "Integrated with Microsoft 365, assists with drafting emails, summarizing meetings, and more.", link: "https://www.microsoft.com/en-us/microsoft-365/copilot", categorySlug: "chatbots" },
      { id: "grok", name: "Grok 3 (xAI)", description: "Elon Musk's AI assistant, notable for social media analysis and engaging interactions.", link: "https://x.ai/", categorySlug: "chatbots" },
      { id: "perplexity-chatbot", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/", categorySlug: "chatbots" },
      { id: "lechat-mistral", name: "Le Chat (Mistral AI)", description: "Enterprise-focused chatbot integrated with platforms like SharePoint and Google Drive.", link: "https://mistral.ai/", categorySlug: "chatbots" },
      { id: "personal-ai", name: "Personal AI", description: "Customizable personal assistant designed for individualized tasks and preferences.", link: "https://www.personal.ai/", categorySlug: "chatbots" },
      { id: "pi-inflection", name: "Pi (Inflection AI)", description: "Friendly AI companion focused on emotional support and casual conversation.", link: "https://pi.ai/", categorySlug: "chatbots" },
      { id: "jasper-ai-chat", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "chatbots" }, // Added -chat suffix to ID
    ]
  },
  {
    slug: "text-generation",
    name: "Text Generation Tools",
    icon: <PenTool className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools for creating written content like articles, summaries, and creative text.",
    imageUrl: "https://picsum.photos/400/200?random=7",
    imageHint: "writing text",
    tools: [
      { id: "chatgpt-textgen", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/", categorySlug: "text-generation" },
      { id: "claude-textgen", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude", categorySlug: "text-generation" },
      { id: "gemini-textgen", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/", categorySlug: "text-generation" },
      { id: "jasper-ai-textgen", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "text-generation" },
      { id: "copy-ai", name: "Copy.ai", description: "Simplicity and speed in content creation, ideal for startups and small businesses.", link: "https://www.copy.ai/", categorySlug: "text-generation" },
      { id: "rytr", name: "Rytr", description: "Affordable AI writing tool for personal projects and small business tasks.", link: "https://rytr.me/", categorySlug: "text-generation" },
      { id: "contentbot-ai", name: "ContentBot AI", description: "Automates content generation with workflows for various content creators, supporting over 110 languages.", link: "https://contentbot.ai/", categorySlug: "text-generation" },
      { id: "squibler", name: "Squibler", description: "Powerful for structured long-form content, making it perfect for authors and researchers.", link: "https://www.squibler.io/", categorySlug: "text-generation" },
      { id: "writesonic", name: "Writesonic", description: "Budget-friendly tool for SEO and marketing professionals, offering versatile content generation.", link: "https://writesonic.com/", categorySlug: "text-generation" },
      { id: "notion-ai", name: "Notion AI", description: "Integrates AI text generation into Notion workspaces, enhancing productivity with features like summarization and idea brainstorming.", link: "https://www.notion.so/product/ai", categorySlug: "text-generation" }
    ]
  },
  {
    slug: "video-generation",
    name: "Video Generation and Editing",
    icon: <Film className="h-5 w-5 mr-3 text-primary" />,
    description: "Create, edit, and enhance video content using AI.",
    imageUrl: "https://picsum.photos/400/200?random=10", // Reused from audio-video
    imageHint: "video film",
    tools: [
      { id: "synthesia", name: "Synthesia", description: "AI video generation platform for creating professional videos with AI avatars.", link: "https://www.synthesia.io/", categorySlug: "video-generation" },
      { id: "runway", name: "Runway", description: "Advanced AI creative suite for video editing, generation, and collaboration.", link: "https://runwayml.com/", categorySlug: "video-generation" },
      { id: "filmora", name: "Filmora", description: "User-friendly video editor with integrated AI features for enhancing creativity.", link: "https://filmora.wondershare.com/", categorySlug: "video-generation" },
      { id: "opusclip", name: "OpusClip", description: "AI tool that repurposes long videos into short, viral clips.", link: "https://www.opus.pro/", categorySlug: "video-generation" },
    ]
  },
  {
    slug: "image-generation",
    name: "Image Generation",
    icon: <ImageIcon className="h-5 w-5 mr-3 text-primary" />,
    description: "Generate unique images from text descriptions or modify existing ones.",
    imageUrl: "https://picsum.photos/400/200?random=8",
    imageHint: "ai art",
    tools: [
      { id: "gpt4o-image", name: "GPT-4o (via ChatGPT/API)", description: "OpenAI's model capable of generating images integrated within ChatGPT.", link: "https://openai.com/index/hello-gpt-4o/", categorySlug: "image-generation" }, // Updated ID and link
      { id: "midjourney", name: "Midjourney", description: "Highly popular AI image generator known for its artistic and detailed outputs.", link: "https://www.midjourney.com/", categorySlug: "image-generation" },
      // Add more image generation tools if needed
    ]
  },
   {
    slug: "meeting-assistants",
    name: "Notetakers and Meeting Assistants",
    icon: <ClipboardList className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools to automatically transcribe, summarize, and analyze meetings.",
     imageUrl: "https://picsum.photos/400/200?random=16",
     imageHint: "meeting notes",
    tools: [
      { id: "fathom", name: "Fathom", description: "AI meeting assistant that records, transcribes, and summarizes meetings.", link: "https://fathom.video/", categorySlug: "meeting-assistants"},
      { id: "nyota", name: "Nyota", description: "AI-powered meeting insights and productivity tool.", link: "https://nyota.ai/", categorySlug: "meeting-assistants"}, // Note: Website link might need verification
    ]
  },
  {
    slug: "automation",
    name: "Workflow Automation",
    icon: <Workflow className="h-5 w-5 mr-3 text-primary" />,
    description: "Connect apps and automate multi-step processes without coding.",
    imageUrl: "https://picsum.photos/400/200?random=6",
    imageHint: "efficient process",
    tools: [
      { id: "n8n", name: "n8n", description: "Open-source workflow automation tool for developers and technical users.", link: "https://n8n.io/", categorySlug: "automation"},
      // Add more automation tools like Zapier, Make if needed
    ]
  },
  {
    slug: "research-education",
    name: "Research &amp; Education",
    icon: <GraduationCap className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools for gathering information, summarizing research, and personalized learning.",
    imageUrl: "https://picsum.photos/400/200?random=14", // Reused from education
    imageHint: "research analysis",
    tools: [
      // { id: "deep-research", name: "Deep Research", description: "AI tool focused on in-depth research analysis (Specific tool may vary).", link: "#", categorySlug: "research-education" }, // Placeholder link
      { id: "notebooklm", name: "NotebookLM (Google)", description: "AI-powered research and writing assistant from Google.", link: "https://notebooklm.google.com/", categorySlug: "research-education"},
      { id: "perplexity-research", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/", categorySlug: "research-education"}, // Reused
    ]
  },
   {
    slug: "writing-tools", // Changed slug to avoid conflict
    name: "Creative Writing Tools",
    icon: <PenTool className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools specifically designed to assist creative writers.",
     imageUrl: "https://picsum.photos/400/200?random=17",
     imageHint: "creative writing",
    tools: [
      { id: "rytr-writing", name: "Rytr", description: "Affordable AI writing tool providing excellent value for personal projects and small business tasks.", link: "https://rytr.me/", categorySlug: "writing-tools" },
      { id: "sudowrite", name: "Sudowrite", description: "AI writing partner for fiction authors, helping brainstorm and enhance stories.", link: "https://www.sudowrite.com/", categorySlug: "writing-tools"},
    ]
  },
  {
    slug: "grammar-improvement",
    name: "Grammar and Writing Improvement",
    icon: <Type className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools to refine grammar, style, and clarity in writing.",
    imageUrl: "https://picsum.photos/400/200?random=18",
    imageHint: "text editing",
    tools: [
      { id: "grammarly", name: "Grammarly", description: "Popular AI writing assistant for grammar checking, style improvement, and plagiarism detection.", link: "https://www.grammarly.com/", categorySlug: "grammar-improvement"},
      { id: "wordtune", name: "Wordtune", description: "AI tool that helps rephrase sentences and improve writing clarity.", link: "https://www.wordtune.com/", categorySlug: "grammar-improvement"},
    ]
  },
  {
    slug: "search-engines",
    name: "AI Search Engines",
    icon: <Search className="h-5 w-5 mr-3 text-primary" />,
    description: "Search engines powered by AI for more conversational and contextual results.",
     imageUrl: "https://picsum.photos/400/200?random=12", // Reused
     imageHint: "search interface",
    tools: [
      { id: "perplexity-search", name: "Perplexity AI", description: "Conversational search engine providing cited answers.", link: "https://www.perplexity.ai/", categorySlug: "search-engines"}, // Reused ID
      { id: "chatgpt-search", name: "ChatGPT (with Search)", description: "ChatGPT's capability to browse the web for current information.", link: "https://chat.openai.com/", categorySlug: "search-engines"},
      // Add more like You.com if needed
    ]
  },
  {
    slug: "social-media",
    name: "Social Media Management",
    icon: <Users className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for scheduling posts, analyzing performance, and content creation.",
     imageUrl: "https://picsum.photos/400/200?random=19",
     imageHint: "social network",
    tools: [
      { id: "vista-social", name: "Vista Social", description: "Social media management platform with AI features.", link: "https://vistasocial.com/", categorySlug: "social-media"},
      { id: "feedhive", name: "FeedHive", description: "AI-powered social media scheduling and content creation tool.", link: "https://feedhive.com/", categorySlug: "social-media"},
    ]
  },
   {
    slug: "graphic-design",
    name: "Graphic Design",
    icon: <Palette className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for creating logos, designs, and visual content.",
     imageUrl: "https://picsum.photos/400/200?random=20",
     imageHint: "design palette",
    tools: [
      { id: "canva-magic-studio", name: "Canva Magic Studio", description: "Canva's suite of AI features for design creation and enhancement.", link: "https://www.canva.com/magic-studio/", categorySlug: "graphic-design"},
      { id: "looka", name: "Looka", description: "AI-powered platform for logo design and branding.", link: "https://looka.com/", categorySlug: "graphic-design"},
      // Add others like Microsoft Designer, Adobe Firefly if needed
    ]
  },
   {
    slug: "developer-tools",
    name: "App Builders &amp; Coding",
    icon: <Code className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools for low-code/no-code development and AI-assisted coding.",
    imageUrl: "https://picsum.photos/400/200?random=15", // Reused
    imageHint: "coding screen",
    tools: [
      { id: "bubble", name: "Bubble", description: "No-code platform for building web applications.", link: "https://bubble.io/", categorySlug: "developer-tools"},
      // { id: "bolt", name: "Bolt", description: "(Need more context - multiple 'Bolt' tools exist)", link: "#", categorySlug: "developer-tools" }, // Placeholder
      // { id: "lovable", name: "Lovable", description: "(Need more context - specify which Lovable)", link: "#", categorySlug: "developer-tools"}, // Placeholder
      { id: "cursor", name: "Cursor", description: "AI-first code editor designed for pair-programming with AI.", link: "https://cursor.sh/", categorySlug: "developer-tools"},
      { id: "v0", name: "v0 (Vercel)", description: "Vercel's generative UI tool for creating frontend code.", link: "https://v0.dev/", categorySlug: "developer-tools"},
      { id: "github-copilot", name: "GitHub Copilot", description: "AI pair programmer that suggests code and entire functions.", link: "https://github.com/features/copilot", categorySlug: "developer-tools"},
    ]
  },
  {
    slug: "project-management",
    name: "Project Management",
    icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />,
    description: "AI features integrated into project management tools.",
     imageUrl: "https://picsum.photos/400/200?random=21",
     imageHint: "gantt chart",
    tools: [
      { id: "asana-ai", name: "Asana Intelligence", description: "Asana's AI features for summarizing tasks and generating insights.", link: "https://asana.com/product/intelligence", categorySlug: "project-management"}, // Updated name/link
      { id: "clickup-ai", name: "ClickUp AI", description: "AI assistant integrated into ClickUp for various productivity tasks.", link: "https://clickup.com/ai", categorySlug: "project-management"}, // Updated name/link
    ]
  },
   {
    slug: "scheduling",
    name: "Scheduling",
    icon: <CalendarDays className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for optimizing calendars and scheduling meetings.",
     imageUrl: "https://picsum.photos/400/200?random=22",
     imageHint: "calendar schedule",
    tools: [
      { id: "reclaim", name: "Reclaim.ai", description: "AI calendar assistant for smart scheduling and time blocking.", link: "https://reclaim.ai/", categorySlug: "scheduling"},
      { id: "clockwise", name: "Clockwise", description: "Intelligent calendar tool that optimizes team schedules.", link: "https://www.getclockwise.com/", categorySlug: "scheduling"},
      // Add Calendly if relevant
    ]
  },
  {
    slug: "customer-service",
    name: "Customer Service",
    icon: <Headset className="h-5 w-5 mr-3 text-primary" />,
    description: "AI-powered tools for chatbots, support automation, and analytics.",
     imageUrl: "https://picsum.photos/400/200?random=23",
     imageHint: "support headset",
    tools: [
      { id: "tidio-ai", name: "Tidio AI (Lyro)", description: "AI chatbot for customer service automation within the Tidio platform.", link: "https://www.tidio.com/lyro/", categorySlug: "customer-service"}, // Updated link
      { id: "hiver", name: "Hiver", description: "Customer service platform with AI features for Gmail.", link: "https://hiverhq.com/", categorySlug: "customer-service"},
      // Add Intercom, Zendesk AI if needed
    ]
  },
  {
    slug: "recruitment",
    name: "Recruitment",
    icon: <UserCheck className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for resume screening, job description writing, and candidate matching.",
     imageUrl: "https://picsum.photos/400/200?random=24",
     imageHint: "hiring process",
    tools: [
      { id: "textio", name: "Textio", description: "AI platform for improving job descriptions and recruitment communication.", link: "https://textio.com/", categorySlug: "recruitment"},
      { id: "cvviz", name: "CVViZ", description: "AI recruitment software for candidate sourcing and screening.", link: "https://cvviz.com/", categorySlug: "recruitment"},
    ]
  },
  {
    slug: "knowledge-management",
    name: "Knowledge Management",
    icon: <Database className="h-5 w-5 mr-3 text-primary" />,
    description: "AI for organizing, searching, and retrieving information from knowledge bases.",
     imageUrl: "https://picsum.photos/400/200?random=25",
     imageHint: "data network",
    tools: [
      { id: "notion-ai-qa", name: "Notion AI Q&amp;A", description: "Ask questions and get answers based on your Notion workspace content.", link: "https://www.notion.so/product/ai", categorySlug: "knowledge-management"}, // Reused link
      { id: "guru", name: "Guru", description: "Knowledge management solution with AI features for suggesting relevant information.", link: "https://www.getguru.com/", categorySlug: "knowledge-management"},
    ]
  },
  {
    slug: "email",
    name: "Email Productivity",
    icon: <Mail className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for writing emails, managing inbox, and summarizing threads.",
     imageUrl: "https://picsum.photos/400/200?random=26",
     imageHint: "email inbox",
    tools: [
      { id: "hubspot-email-writer", name: "Hubspot AI Email Writer", description: "AI tool within Hubspot for generating email copy.", link: "https://www.hubspot.com/artificial_intelligence/ai-email-writer", categorySlug: "email"}, // Updated link
      { id: "sanebox", name: "SaneBox", description: "AI tool for filtering and organizing emails.", link: "https://www.sanebox.com/", categorySlug: "email"},
      { id: "shortwave", name: "Shortwave", description: "AI-powered email client focused on productivity and summarization.", link: "https://www.shortwave.com/", categorySlug: "email"},
    ]
  },
   {
    slug: "presentations",
    name: "Presentations",
    icon: <Presentation className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for generating presentation slides and content.",
     imageUrl: "https://picsum.photos/400/200?random=27",
     imageHint: "presentation slide",
    tools: [
      { id: "gamma", name: "Gamma", description: "AI tool for creating presentations, documents, and webpages from prompts.", link: "https://gamma.app/", categorySlug: "presentations"},
      { id: "presentations-ai", name: "Presentations.ai", description: "AI-powered presentation maker.", link: "https://presentations.ai/", categorySlug: "presentations"},
      // Add Tome if needed
    ]
  },
   {
    slug: "resume-builders",
    name: "Resume Builders",
    icon: <FileText className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools to help craft and optimize resumes.",
     imageUrl: "https://picsum.photos/400/200?random=28",
     imageHint: "resume document",
    tools: [
      { id: "teal", name: "Teal", description: "Platform with AI features for resume building and job tracking.", link: "https://www.tealhq.com/", categorySlug: "resume-builders"},
      { id: "kickresume", name: "Kickresume", description: "Resume and cover letter builder with AI assistance.", link: "https://www.kickresume.com/", categorySlug: "resume-builders"},
    ]
  },
   {
    slug: "voice-generation",
    name: "Voice Generation",
    icon: <Mic className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for text-to-speech and voice cloning.",
     imageUrl: "https://picsum.photos/400/200?random=29",
     imageHint: "sound waveform",
    tools: [
      { id: "elevenlabs", name: "ElevenLabs", description: "Popular AI voice generator for realistic text-to-speech and voice cloning.", link: "https://elevenlabs.io/", categorySlug: "voice-generation"},
      { id: "murf", name: "Murf.ai", description: "AI voice generator with a large library of voices for various use cases.", link: "https://murf.ai/", categorySlug: "voice-generation"},
    ]
  },
  {
    slug: "music-generation",
    name: "Music Generation",
    icon: <Music className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for creating original music tracks.",
    imageUrl: "https://picsum.photos/400/200?random=30",
    imageHint: "music notes",
    tools: [
      { id: "suno", name: "Suno AI", description: "AI music generator that creates songs with vocals from text prompts.", link: "https://suno.com/", categorySlug: "music-generation"},
      { id: "udio", name: "Udio", description: "AI tool for generating high-quality music tracks.", link: "https://www.udio.com/", categorySlug: "music-generation"},
    ]
  },
  {
    slug: "marketing",
    name: "Marketing",
    icon: <Store className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools specifically for marketing tasks like ad creation and copywriting.",
     imageUrl: "https://picsum.photos/400/200?random=13", // Reused
     imageHint: "marketing campaign",
    tools: [
      { id: "adcreative", name: "AdCreative.ai", description: "AI platform for generating ad creatives and social media posts.", link: "https://www.adcreative.ai/", categorySlug: "marketing"},
      { id: "jasper-marketing", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "marketing" }, // Reused
    ]
  },
  {
    slug: "sales",
    name: "Sales",
    icon: <Sparkles className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools for sales prospecting, lead enrichment, and outreach.",
    imageUrl: "https://picsum.photos/400/200?random=31",
    imageHint: "sales chart",
    tools: [
      { id: "clay", name: "Clay", description: "Sales automation platform using AI for data enrichment and prospecting.", link: "https://clay.com/", categorySlug: "sales"},
      // Add Apollo.io, ZoomInfo if needed
    ]
  },
  {
    slug: "legal",
    name: "Legal Tech",
    icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools designed for legal research, document review, and analysis.",
     imageUrl: "https://picsum.photos/400/200?random=32",
     imageHint: "legal documents",
    tools: [
      { id: "harvey", name: "Harvey", description: "AI platform built for legal professionals for research and drafting.", link: "https://www.harvey.ai/", categorySlug: "legal"},
      // Add Casetext/CoCounsel if needed
    ]
  }
];


// Function to get all tools, potentially flattened
export function getAllTools(): AiTool[] {
  return toolCategories.flatMap(category => category.tools);
}

// Function to get a specific tool by its ID
export function getToolById(id: string): AiTool | undefined {
  return getAllTools().find(tool => tool.id === id);
}

// Function to get tools by category slug
export function getAIToolsByCategory(categorySlug: string): AiTool[] {
  const category = toolCategories.find(cat => cat.slug === categorySlug);
  return category ? category.tools : [];
}

// Function to get category details by slug
export function getCategoryDetailsBySlug(slug: string): AiToolCategory | undefined {
    return toolCategories.find(cat => cat.slug === slug);
}
