
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
  pricing?: 'free' | 'paid' | 'freemium'; // Added pricing property
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
      { id: "chatgpt", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "claude", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude", categorySlug: "chatbots", pricing: "freemium" },
      { id: "gemini", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "microsoft-copilot", name: "Microsoft Copilot", description: "Integrated with Microsoft 365, assists with drafting emails, summarizing meetings, and more.", link: "https://www.microsoft.com/en-us/microsoft-365/copilot", categorySlug: "chatbots", pricing: "paid" },
      { id: "grok", name: "Grok 3 (xAI)", description: "Elon Musk's AI assistant, notable for social media analysis and engaging interactions.", link: "https://x.ai/", categorySlug: "chatbots", pricing: "paid" },
      { id: "perplexity-chatbot", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "lechat-mistral", name: "Le Chat (Mistral AI)", description: "Enterprise-focused chatbot integrated with platforms like SharePoint and Google Drive.", link: "https://mistral.ai/", categorySlug: "chatbots", pricing: "paid" },
      { id: "personal-ai", name: "Personal AI", description: "Customizable personal assistant designed for individualized tasks and preferences.", link: "https://www.personal.ai/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "pi-inflection", name: "Pi (Inflection AI)", description: "Friendly AI companion focused on emotional support and casual conversation.", link: "https://pi.ai/", categorySlug: "chatbots", pricing: "free" },
      { id: "jasper-ai-chat", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "chatbots", pricing: "paid" },
      { id: "zapier-chatbots", name: "Zapier Chatbots", description: "Create custom AI chatbots and automate workflows without coding.", link: "https://zapier.com/blog/best-ai-productivity-tools/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "deepseek", name: "DeepSeek", description: "Open-source AI chatbot offering transparency and customization.", link: "https://deepseek.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "breeze-ai-chatbot", name: "Breeze", description: "Personalized customer support chatbot enhancing user engagement.", link: "https://www.breeze.ai/", categorySlug: "chatbots", pricing: "paid" },
      { id: "amazon-q", name: "Amazon Q", description: "AI-powered assistant integrated with AWS services for business applications.", link: "https://aws.amazon.com/q/", categorySlug: "chatbots", pricing: "paid" },
      { id: "braina", name: "Braina", description: "Windows-based AI assistant for voice commands and automation.", link: "https://www.brainasoft.com/braina/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "ernie-bot-baidu", name: "Ernie Bot (Baidu)", description: "Chinese-language AI chatbot for various applications.", link: "https://yiyan.baidu.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "simsimi", name: "SimSimi", description: "Conversational AI chatbot known for casual and humorous interactions.", link: "https://simsimi.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "ultra-hal", name: "Ultra Hal", description: "AI chatbot for Windows with customizable personalities.", link: "https://www.zabaware.com/ultrahal/", categorySlug: "chatbots", pricing: "paid" },
      { id: "watson-assistant-ibm", name: "Watson Assistant (IBM)", description: "Enterprise AI assistant for customer service and business processes.", link: "https://www.ibm.com/cloud/watson-assistant/", categorySlug: "chatbots", pricing: "paid" },
      { id: "open-assistant-laion", name: "Open Assistant (LAION)", description: "Open-source AI assistant focused on transparency and community development.", link: "https://open-assistant.io/", categorySlug: "chatbots", pricing: "free" },
      { id: "neuroflash-chatbot", name: "Neuroflash", description: "AI-powered content creation assistant for marketing and SEO.", link: "https://www.neuroflash.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "clova-naver", name: "Clova (Naver)", description: "AI assistant integrated into Naver's ecosystem for various services.", link: "https://clova.ai/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "aligenie-alibaba", name: "AliGenie (Alibaba)", description: "AI assistant powering Alibaba's smart devices and services.", link: "https://www.aligenie.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "celia-huawei", name: "Celia (Huawei)", description: "Huawei's AI assistant integrated into its devices and services.", link: "https://consumer.huawei.com/en/emui/celia/", categorySlug: "chatbots", pricing: "free" },
      { id: "bixby-samsung", name: "Bixby (Samsung)", description: "Samsung's AI assistant for device control and information retrieval.", link: "https://www.samsung.com/global/galaxy/apps/bixby/", categorySlug: "chatbots", pricing: "free" },
      { id: "google-assistant", name: "Google Assistant", description: "Google's AI assistant for voice commands and smart device integration.", link: "https://assistant.google.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "siri-apple", name: "Siri (Apple)", description: "Apple's voice-activated AI assistant for iOS devices.", link: "https://www.apple.com/siri/", categorySlug: "chatbots", pricing: "free" },
      { id: "alexa-amazon", name: "Alexa (Amazon)", description: "Amazon's AI assistant for voice commands and smart home control.", link: "https://www.amazon.com/alexa/", categorySlug: "chatbots", pricing: "free" },
      { id: "jabberwacky", name: "Jabberwacky", description: "AI chatbot known for engaging in humorous conversations.", link: "http://www.jabberwacky.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "cleverbot", name: "Cleverbot", description: "Conversational AI chatbot that learns from user interactions.", link: "https://www.cleverbot.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "mitsuku-pandorabots", name: "Mitsuku", description: "Award-winning AI chatbot known for its conversational abilities.", link: "https://www.pandorabots.com/mitsuku/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "replika", name: "Replika", description: "AI companion chatbot designed for emotional support and conversation.", link: "https://replika.ai/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "woebot", name: "Woebot", description: "Mental health chatbot providing cognitive behavioral therapy techniques.", link: "https://woebothealth.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "elsa-speak", name: "ELSA Speak", description: "AI-powered English language learning assistant.", link: "https://elsaspeak.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "andy-english-bot", name: "Andy English Bot", description: "AI chatbot for learning and practicing English.", link: "https://andychatbot.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "duolingo-chatbot", name: "Duolingo Chatbot", description: "Language learning chatbot integrated into the Duolingo platform.", link: "https://www.duolingo.com/", categorySlug: "chatbots", pricing: "free" },
      { id: "memrise-chatbot", name: "Memrise Chatbot", description: "Language learning assistant with interactive conversations.", link: "https://www.memrise.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "busuu-chatbot", name: "Busuu Chatbot", description: "AI-powered language practice chatbot within the Busuu app.", link: "https://www.busuu.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "hellotalk-ai", name: "HelloTalk AI", description: "Language exchange app with AI chatbot for practice.", link: "https://www.hellotalk.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "rosetta-stone-ai-tutor", name: "Rosetta Stone AI Tutor", description: "Language learning platform with AI-driven tutoring.", link: "https://www.rosettastone.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "babbel-live-chatbot", name: "Babbel Live Chatbot", description: "Language learning assistant offering live conversation practice.", link: "https://www.babbel.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "lingvist-ai", name: "Lingvist AI", description: "Personalized language learning chatbot with adaptive algorithms.", link: "https://lingvist.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "mondly-chatbot", name: "Mondly Chatbot", description: "AI-powered language learning assistant with speech recognition.", link: "https://www.mondly.com/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "rocket-languages-chatbot", name: "Rocket Languages Chatbot", description: "Interactive language learning chatbot for various languages.", link: "https://www.rocketlanguages.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "speakly-ai", name: "Speakly AI", description: "Language learning app with AI-driven practice sessions.", link: "https://www.speakly.me/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "busbot-ai", name: "Busbot", description: "AI chatbot for public transportation information and assistance.", link: "https://www.busbot.ai/", categorySlug: "chatbots", pricing: "freemium" },
      { id: "donotpay", name: "DoNotPay", description: "AI legal assistant chatbot for various legal services.", link: "https://donotpay.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "lawdroid", name: "LawDroid", description: "AI chatbot providing legal information and document automation.", link: "https://www.lawdroid.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "ross-intelligence", name: "Ross Intelligence", description: "AI-powered legal research assistant for professionals.", link: "https://www.rossintelligence.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "legal-robot", name: "Legal Robot", description: "AI assistant for analyzing legal documents and contracts.", link: "https://www.legalrobot.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "casetext-cocounsel", name: "CaseText CoCounsel", description: "AI legal assistant for case law research and analysis.", link: "https://casetext.com/", categorySlug: "chatbots", pricing: "paid" },
      { id: "smokeball-ai", name: "Smokeball AI", description: "AI assistant integrated into legal practice management software.", link: "https://www.smokeball.com/", categorySlug: "chatbots", pricing: "paid" }
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
      { id: "chatgpt-textgen", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "claude-textgen", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude", categorySlug: "text-generation", pricing: "freemium" },
      { id: "gemini-textgen", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "jasper-ai-textgen", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "text-generation", pricing: "paid" },
      { id: "copy-ai", name: "Copy.ai", description: "Simplicity and speed in content creation, ideal for startups and small businesses.", link: "https://www.copy.ai/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "rytr", name: "Rytr", description: "Affordable AI writing tool for personal projects and small business tasks.", link: "https://rytr.me/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "contentbot-ai", name: "ContentBot AI", description: "Automates content generation with workflows for various content creators, supporting over 110 languages.", link: "https://contentbot.ai/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "squibler", name: "Squibler", description: "Powerful for structured long-form content, making it perfect for authors and researchers.", link: "https://www.squibler.io/", categorySlug: "text-generation", pricing: "paid" },
      { id: "writesonic", name: "Writesonic", description: "Budget-friendly tool for SEO and marketing professionals, offering versatile content generation.", link: "https://writesonic.com/", categorySlug: "text-generation", pricing: "freemium" },
      { id: "notion-ai", name: "Notion AI", description: "Integrates AI text generation into Notion workspaces, enhancing productivity with features like summarization and idea brainstorming.", link: "https://www.notion.so/product/ai", categorySlug: "text-generation", pricing: "paid" }
    ]
  },
  {
    slug: "video-generation",
    name: "Video Generation and Editing",
    icon: <Film className="h-5 w-5 mr-3 text-primary" />,
    description: "Create, edit, and enhance video content using AI.",
    imageUrl: "https://picsum.photos/400/200?random=10", 
    imageHint: "video film",
    tools: [
      { id: "synthesia", name: "Synthesia", description: "AI video generation platform for creating professional videos with AI avatars.", link: "https://www.synthesia.io/", categorySlug: "video-generation", pricing: "paid" },
      { id: "runway", name: "Runway", description: "Advanced AI creative suite for video editing, generation, and collaboration.", link: "https://runwayml.com/", categorySlug: "video-generation", pricing: "freemium" },
      { id: "filmora", name: "Filmora", description: "User-friendly video editor with integrated AI features for enhancing creativity.", link: "https://filmora.wondershare.com/", categorySlug: "video-generation", pricing: "freemium" },
      { id: "opusclip", name: "OpusClip", description: "AI tool that repurposes long videos into short, viral clips.", link: "https://www.opus.pro/", categorySlug: "video-generation", pricing: "freemium" },
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
      { id: "gpt4o-image", name: "GPT-4o (via ChatGPT/API)", description: "OpenAI's model capable of generating images integrated within ChatGPT.", link: "https://openai.com/index/hello-gpt-4o/", categorySlug: "image-generation", pricing: "freemium" }, 
      { id: "midjourney", name: "Midjourney", description: "Highly popular AI image generator known for its artistic and detailed outputs.", link: "https://www.midjourney.com/", categorySlug: "image-generation", pricing: "paid" },
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
      { id: "fathom", name: "Fathom", description: "AI meeting assistant that records, transcribes, and summarizes meetings.", link: "https://fathom.video/", categorySlug: "meeting-assistants", pricing: "freemium"},
      { id: "nyota", name: "Nyota", description: "AI-powered meeting insights and productivity tool.", link: "https://nyota.ai/", categorySlug: "meeting-assistants", pricing: "paid"}, 
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
      { id: "n8n", name: "n8n", description: "Open-source workflow automation tool for developers and technical users.", link: "https://n8n.io/", categorySlug: "automation", pricing: "freemium"},
    ]
  },
  {
    slug: "research-education",
    name: "Research & Education",
    icon: <GraduationCap className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools for gathering information, summarizing research, and personalized learning.",
    imageUrl: "https://picsum.photos/400/200?random=14", 
    imageHint: "research analysis",
    tools: [
      { id: "notebooklm", name: "NotebookLM (Google)", description: "AI-powered research and writing assistant from Google.", link: "https://notebooklm.google.com/", categorySlug: "research-education", pricing: "free"},
      { id: "perplexity-research", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/", categorySlug: "research-education", pricing: "freemium"}, 
    ]
  },
   {
    slug: "writing-tools", 
    name: "Creative Writing Tools",
    icon: <PenTool className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools specifically designed to assist creative writers.",
     imageUrl: "https://picsum.photos/400/200?random=17",
     imageHint: "creative writing",
    tools: [
      { id: "rytr-writing", name: "Rytr", description: "Affordable AI writing tool providing excellent value for personal projects and small business tasks.", link: "https://rytr.me/", categorySlug: "writing-tools", pricing: "freemium" },
      { id: "sudowrite", name: "Sudowrite", description: "AI writing partner for fiction authors, helping brainstorm and enhance stories.", link: "https://www.sudowrite.com/", categorySlug: "writing-tools", pricing: "paid"},
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
      { id: "grammarly", name: "Grammarly", description: "Popular AI writing assistant for grammar checking, style improvement, and plagiarism detection.", link: "https://www.grammarly.com/", categorySlug: "grammar-improvement", pricing: "freemium"},
      { id: "wordtune", name: "Wordtune", description: "AI tool that helps rephrase sentences and improve writing clarity.", link: "https://www.wordtune.com/", categorySlug: "grammar-improvement", pricing: "freemium"},
    ]
  },
  {
    slug: "search-engines",
    name: "AI Search Engines",
    icon: <Search className="h-5 w-5 mr-3 text-primary" />,
    description: "Search engines powered by AI for more conversational and contextual results.",
     imageUrl: "https://picsum.photos/400/200?random=12", 
     imageHint: "search interface",
    tools: [
      { id: "perplexity-search", name: "Perplexity AI", description: "Conversational search engine providing cited answers.", link: "https://www.perplexity.ai/", categorySlug: "search-engines", pricing: "freemium"}, 
      { id: "chatgpt-search", name: "ChatGPT (with Search)", description: "ChatGPT's capability to browse the web for current information.", link: "https://chat.openai.com/", categorySlug: "search-engines", pricing: "freemium"},
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
      { id: "vista-social", name: "Vista Social", description: "Social media management platform with AI features.", link: "https://vistasocial.com/", categorySlug: "social-media", pricing: "freemium"},
      { id: "feedhive", name: "FeedHive", description: "AI-powered social media scheduling and content creation tool.", link: "https://feedhive.com/", categorySlug: "social-media", pricing: "paid"},
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
      { id: "canva-magic-studio", name: "Canva Magic Studio", description: "Canva's suite of AI features for design creation and enhancement.", link: "https://www.canva.com/magic-studio/", categorySlug: "graphic-design", pricing: "freemium"},
      { id: "looka", name: "Looka", description: "AI-powered platform for logo design and branding.", link: "https://looka.com/", categorySlug: "graphic-design", pricing: "freemium"},
    ]
  },
   {
    slug: "developer-tools",
    name: "App Builders & Coding",
    icon: <Code className="h-5 w-5 mr-3 text-primary" />,
    description: "Tools for low-code/no-code development and AI-assisted coding.",
    imageUrl: "https://picsum.photos/400/200?random=15", 
    imageHint: "coding screen",
    tools: [{
  id: "github-copilot",
  name: "GitHub Copilot",
  description: "AI pair programmer powered by OpenAI's Codex, offering real-time code suggestions within IDEs.",
  link: "https://github.com/features/copilot",
  categorySlug: "developer-tools", pricing: "paid"
},
{
  id: "amazon-codewhisperer",
  name: "Amazon CodeWhisperer",
  description: "AI coding companion integrated with AWS services, providing code recommendations and security scans.",
  link: "https://aws.amazon.com/codewhisperer/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "tabnine",
  name: "Tabnine",
  description: "AI code completion tool supporting multiple languages and IDEs, with options for local and cloud-based models.",
  link: "https://www.tabnine.com/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "cursor",
  name: "Cursor",
  description: "AI-powered code editor that integrates with OpenAI models, enhancing code generation and debugging.",
  link: "https://www.cursor.so/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "claude-code",
  name: "Claude 3.7 (Anthropic)",
  description: "Advanced AI assistant known for thoughtful, human-like conversations and code generation capabilities.",
  link: "https://www.anthropic.com/index/claude",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "gpt41-code",
  name: "GPT-4.1 (OpenAI)",
  description: "Latest OpenAI model excelling in coding tasks, offering faster and more accurate code generation.",
  link: "https://openai.com/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "codeium",
  name: "Codeium",
  description: "Free AI code completion tool supporting over 70 languages, designed for speed and efficiency.",
  link: "https://codeium.com/",
  categorySlug: "developer-tools", pricing: "free"
},
{
  id: "replit-ai",
  name: "Replit AI",
  description: "Integrated AI assistant within Replit's online IDE, aiding in code generation and debugging.",
  link: "https://replit.com/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "codiumai",
  name: "CodiumAI",
  description: "AI tool focused on generating meaningful test cases and improving code integrity.",
  link: "https://www.codium.ai/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "askcodi",
  name: "AskCodi",
  description: "AI assistant designed for developers, offering code generation, explanations, and documentation.",
  link: "https://www.askcodi.com/",
  categorySlug: "developer-tools", pricing: "freemium"
},
{
  id: "continue",
  name: "Continue",
  description: "AI coding assistant that integrates with VS Code, providing in-line code suggestions and completions.",
  link: "https://continue.dev/",
  categorySlug: "developer-tools", pricing: "free"
},
{
  id: "microsoft-intellicode",
  name: "Microsoft IntelliCode",
  description: "AI-assisted development tool within Visual Studio, offering intelligent code suggestions based on best practices.",
  link: "https://visualstudio.microsoft.com/services/intellicode/",
  categorySlug: "developer-tools", pricing: "free"
}
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
      { id: "asana-ai", name: "Asana Intelligence", description: "Asana's AI features for summarizing tasks and generating insights.", link: "https://asana.com/product/intelligence", categorySlug: "project-management", pricing: "paid"}, 
      { id: "clickup-ai", name: "ClickUp AI", description: "AI assistant integrated into ClickUp for various productivity tasks.", link: "https://clickup.com/ai", categorySlug: "project-management", pricing: "paid"}, 
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
      { id: "reclaim", name: "Reclaim.ai", description: "AI calendar assistant for smart scheduling and time blocking.", link: "https://reclaim.ai/", categorySlug: "scheduling", pricing: "freemium"},
      { id: "clockwise", name: "Clockwise", description: "Intelligent calendar tool that optimizes team schedules.", link: "https://www.getclockwise.com/", categorySlug: "scheduling", pricing: "freemium"},
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
      { id: "tidio-ai", name: "Tidio AI (Lyro)", description: "AI chatbot for customer service automation within the Tidio platform.", link: "https://www.tidio.com/lyro/", categorySlug: "customer-service", pricing: "paid"}, 
      { id: "hiver", name: "Hiver", description: "Customer service platform with AI features for Gmail.", link: "https://hiverhq.com/", categorySlug: "customer-service", pricing: "paid"},
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
      { id: "textio", name: "Textio", description: "AI platform for improving job descriptions and recruitment communication.", link: "https://textio.com/", categorySlug: "recruitment", pricing: "paid"},
      { id: "cvviz", name: "CVViZ", description: "AI recruitment software for candidate sourcing and screening.", link: "https://cvviz.com/", categorySlug: "recruitment", pricing: "paid"},
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
      { id: "notion-ai-qa", name: "Notion AI Q&A", description: "Ask questions and get answers based on your Notion workspace content.", link: "https://www.notion.so/product/ai", categorySlug: "knowledge-management", pricing: "paid"}, 
      { id: "guru", name: "Guru", description: "Knowledge management solution with AI features for suggesting relevant information.", link: "https://www.getguru.com/", categorySlug: "knowledge-management", pricing: "paid"},
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
      { id: "hubspot-email-writer", name: "Hubspot AI Email Writer", description: "AI tool within Hubspot for generating email copy.", link: "https://www.hubspot.com/artificial_intelligence/ai-email-writer", categorySlug: "email", pricing: "freemium"}, 
      { id: "sanebox", name: "SaneBox", description: "AI tool for filtering and organizing emails.", link: "https://www.sanebox.com/", categorySlug: "email", pricing: "paid"},
      { id: "shortwave", name: "Shortwave", description: "AI-powered email client focused on productivity and summarization.", link: "https://www.shortwave.com/", categorySlug: "email", pricing: "freemium"},
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
      { id: "gamma", name: "Gamma", description: "AI tool for creating presentations, documents, and webpages from prompts.", link: "https://gamma.app/", categorySlug: "presentations", pricing: "freemium"},
      { id: "presentations-ai", name: "Presentations.ai", description: "AI-powered presentation maker.", link: "https://presentations.ai/", categorySlug: "presentations", pricing: "freemium"},
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
      { id: "teal", name: "Teal", description: "Platform with AI features for resume building and job tracking.", link: "https://www.tealhq.com/", categorySlug: "resume-builders", pricing: "freemium"},
      { id: "kickresume", name: "Kickresume", description: "Resume and cover letter builder with AI assistance.", link: "https://www.kickresume.com/", categorySlug: "resume-builders", pricing: "freemium"},
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
      { id: "elevenlabs", name: "ElevenLabs", description: "Popular AI voice generator for realistic text-to-speech and voice cloning.", link: "https://elevenlabs.io/", categorySlug: "voice-generation", pricing: "freemium"},
      { id: "murf", name: "Murf.ai", description: "AI voice generator with a large library of voices for various use cases.", link: "https://murf.ai/", categorySlug: "voice-generation", pricing: "freemium"},
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
      { id: "suno", name: "Suno AI", description: "AI music generator that creates songs with vocals from text prompts.", link: "https://suno.com/", categorySlug: "music-generation", pricing: "freemium"},
      { id: "udio", name: "Udio", description: "AI tool for generating high-quality music tracks.", link: "https://www.udio.com/", categorySlug: "music-generation", pricing: "free"},
    ]
  },
  {
    slug: "marketing",
    name: "Marketing",
    icon: <Store className="h-5 w-5 mr-3 text-primary" />,
    description: "AI tools specifically for marketing tasks like ad creation and copywriting.",
     imageUrl: "https://picsum.photos/400/200?random=13", 
     imageHint: "marketing campaign",
    tools: [
      { id: "adcreative", name: "AdCreative.ai", description: "AI platform for generating ad creatives and social media posts.", link: "https://www.adcreative.ai/", categorySlug: "marketing", pricing: "paid"},
      { id: "jasper-marketing", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/", categorySlug: "marketing", pricing: "paid" }, 
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
      { id: "clay", name: "Clay", description: "Sales automation platform using AI for data enrichment and prospecting.", link: "https://clay.com/", categorySlug: "sales", pricing: "paid"},
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
      { id: "harvey", name: "Harvey", description: "AI platform built for legal professionals for research and drafting.", link: "https://www.harvey.ai/", categorySlug: "legal", pricing: "paid"},
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
