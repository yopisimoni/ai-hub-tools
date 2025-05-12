
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ToolCard } from '@/components/dashboard/tool-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@/components/dashboard/rating'; // Import Rating
import { CommentSection } from '@/components/dashboard/comment-section'; // Import CommentSection
import { SocialShareButtons } from '@/components/dashboard/social-share-buttons'; // Import SocialShareButtons
import Link from 'next/link'; // Import Link
import { ExternalLink } from 'lucide-react'; // Import ExternalLink icon
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

// Existing category overview data
const aiCategories = [
  {
    title: "Text Generation",
    description: "Tools for creating written content like articles, summaries, and creative text.",
    icon: <PenTool className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=7",
    imageHint: "writing text",
    actionLink: "/categories/text-generation",
  },
  {
    title: "Image Generation",
    description: "Generate unique images from text descriptions or modify existing ones.",
    icon: <ImageIcon className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=8",
    imageHint: "ai art",
    actionLink: "/categories/image-generation",
  },
  {
    title: "Code Assistance",
    description: "AI tools to help developers write, debug, and optimize code faster.",
    icon: <Code className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=9",
    imageHint: "programming code",
    actionLink: "/categories/code-assistance",
  },
  {
    title: "Data Analysis",
    description: "Analyze complex datasets to find insights, trends, and predictions.",
    icon: <BarChart3 className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=3",
    imageHint: "data charts",
    actionLink: "/categories/data-analysis",
  },
   {
    title: "AI Chatbots",
    description: "Intelligent assistants for customer support, information retrieval, and tasks.",
    icon: <BotMessageSquare className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=1",
    imageHint: "chatbot interface",
    actionLink: "/categories/chatbots",
  },
  {
    title: "Audio & Video Tools",
    description: "Create, edit, and enhance audio and video content using AI.",
    icon: <Music className="h-6 w-6" />, // Using Music, could also use Video
    imageUrl: "https://picsum.photos/400/200?random=10",
    imageHint: "sound waves",
    actionLink: "/categories/audio-video",
  },
  {
    title: "Productivity Boosters",
    description: "Streamline workflows, manage tasks, and automate repetitive actions.",
    icon: <Zap className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=11",
    imageHint: "fast process",
    actionLink: "/categories/productivity",
  },
   {
    title: "Workflow Automation",
    description: "Connect apps and automate multi-step processes without coding.",
    icon: <Workflow className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=6", 
    imageHint: "efficient process",
    actionLink: "/categories/automation",
  },
  {
    title: "Research & Insights",
    description: "Tools for gathering information, summarizing research, and market analysis.",
    icon: <Search className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=12",
    imageHint: "magnifying glass",
    actionLink: "/categories/research",
  },
  {
    title: "Marketing & Sales",
    description: "AI-powered tools for lead generation, content marketing, and sales optimization.",
    icon: <Store className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=13",
    imageHint: "shopping cart",
    actionLink: "/categories/marketing-sales",
  },
  {
    title: "Education & Learning",
    description: "Personalized learning experiences, tutoring, and educational content creation.",
    icon: <BookOpen className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=14",
    imageHint: "open book",
    actionLink: "/categories/education-learning",
  },
  {
    title: "Developer Tools",
    description: "Advanced tools for software development, testing, and deployment.",
    icon: <TerminalSquare className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=15",
    imageHint: "computer terminal",
    actionLink: "/categories/developer-tools",
  },
];

// Detailed tool listing data with unique IDs, descriptions, and links
const toolCategories = [
  {
    category: "AI Assistants (Chatbots)",
    icon: <BotMessageSquare className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "chatgpt", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/" },
      { id: "claude", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude" },
      { id: "gemini", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/" },
      { id: "microsoft-copilot", name: "Microsoft Copilot", description: "Integrated with Microsoft 365, assists with drafting emails, summarizing meetings, and more.", link: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
      { id: "grok", name: "Grok 3 (xAI)", description: "Elon Musk's AI assistant, notable for social media analysis and engaging interactions.", link: "https://x.ai/" },
      { id: "perplexity-chatbot", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/" },
      { id: "lechat-mistral", name: "Le Chat (Mistral AI)", description: "Enterprise-focused chatbot integrated with platforms like SharePoint and Google Drive.", link: "https://mistral.ai/" },
      { id: "personal-ai", name: "Personal AI", description: "Customizable personal assistant designed for individualized tasks and preferences.", link: "https://www.personal.ai/" },
      { id: "pi-inflection", name: "Pi (Inflection AI)", description: "Friendly AI companion focused on emotional support and casual conversation.", link: "https://pi.ai/" },
      { id: "jasper-ai", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/" },
    ]
  },
  {
    category: "Video Generation and Editing",
    icon: <Film className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "synthesia", name: "Synthesia" },
      { id: "runway", name: "Runway" },
      { id: "filmora", name: "Filmora" },
      { id: "opusclip", name: "OpusClip" },
    ]
  },
  {
    category: "Image Generation",
    icon: <ImageIcon className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "gpt4o", name: "GPT-4o" },
      { id: "midjourney", name: "Midjourney" },
    ]
  },
  {
    category: "Notetakers and Meeting Assistants",
    icon: <ClipboardList className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "fathom", name: "Fathom" },
      { id: "nyota", name: "Nyota" },
    ]
  },
  {
    category: "Automation",
    icon: <Workflow className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "n8n", name: "n8n" },
    ]
  },
  {
    category: "Research/Education",
    icon: <GraduationCap className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "deep-research", name: "Deep Research" },
      { id: "notebooklm", name: "NotebookLM" },
    ]
  },
  {
    category: "Writing",
    icon: <PenTool className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "rytr", name: "Rytr" },
      { id: "sudowrite", name: "Sudowrite" },
    ]
  },
  {
    category: "Grammar and Writing Improvement",
    icon: <Type className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "grammarly", name: "Grammarly" },
      { id: "wordtune", name: "Wordtune" },
    ]
  },
  {
    category: "Search Engines",
    icon: <Search className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "perplexity", name: "Perplexity" }, // Note: ID conflict resolved for chatbot version
      { id: "chatgpt-search", name: "ChatGPT search" },
    ]
  },
  {
    category: "Social Media Management",
    icon: <Users className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "vista-social", name: "Vista Social" },
      { id: "feedhive", name: "FeedHive" },
    ]
  },
  {
    category: "Graphic Design",
    icon: <Palette className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "canva-magic-studio", name: "Canva Magic Studio" },
      { id: "looka", name: "Looka" },
    ]
  },
  {
    category: "App Builders & Coding",
    icon: <Code className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "bubble", name: "Bubble" },
      { id: "bolt", name: "Bolt" },
      { id: "lovable", name: "Lovable" },
      { id: "cursor", name: "Cursor" },
      { id: "v0", name: "v0" },
    ]
  },
  {
    category: "Project Management",
    icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "asana", name: "Asana" },
      { id: "clickup", name: "ClickUp" },
    ]
  },
  {
    category: "Scheduling",
    icon: <CalendarDays className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "reclaim", name: "Reclaim" },
      { id: "clockwise", name: "Clockwise" },
    ]
  },
  {
    category: "Customer Service",
    icon: <Headset className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "tidio-ai", name: "Tidio AI" },
      { id: "hiver", name: "Hiver" },
    ]
  },
  {
    category: "Recruitment",
    icon: <UserCheck className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "textio", name: "Textio" },
      { id: "cvviz", name: "CVViZ" },
    ]
  },
  {
    category: "Knowledge Management",
    icon: <Database className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "notion-ai-qa", name: "Notion AI Q&A" },
      { id: "guru", name: "Guru" },
    ]
  },
  {
    category: "Email",
    icon: <Mail className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "hubspot-email-writer", name: "Hubspot Email Writer" },
      { id: "sanebox", name: "SaneBox" },
      { id: "shortwave", name: "Shortwave" },
    ]
  },
  {
    category: "Presentations",
    icon: <Presentation className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "gamma", name: "Gamma" },
      { id: "presentations-ai", name: "Presentations.ai" },
    ]
  },
  {
    category: "Resume Builders",
    icon: <FileText className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "teal", name: "Teal" },
      { id: "kickresume", name: "Kickresume" },
    ]
  },
  {
    category: "Voice Generation",
    icon: <Mic className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "elevenlabs", name: "ElevenLabs" },
      { id: "murf", name: "Murf" },
    ]
  },
  {
    category: "Music Generation",
    icon: <Music className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "suno", name: "Suno" },
      { id: "udio", name: "Udio" },
    ]
  },
  {
    category: "Marketing",
    icon: <Store className="h-5 w-5 mr-3 text-primary" />,
    tools: [
      { id: "adcreative", name: "AdCreative" },
    ]
  },
  {
    category: "Sales",
    icon: <Sparkles className="h-5 w-5 mr-3 text-primary" />, // Using Sparkles as a generic icon
    tools: [
      { id: "clay", name: "Clay" },
    ]
  },
  {
    category: "Legal",
    icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />, // Reusing Briefcase
    tools: [
      { id: "harvey", name: "Harvey" },
    ]
  }
];


export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Explore AI Tool Categories
        </h1>
        <p className="text-muted-foreground">
          Discover the best AI tools organized by category. Click on a category to see the tools.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {aiCategories.map((category) => (
          <ToolCard
            key={category.title}
            title={category.title}
            description={category.description}
            icon={category.icon}
            imageUrl={category.imageUrl}
            imageHint={category.imageHint}
            actionLink={category.actionLink} 
          />
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-card p-8 text-center shadow-lg">
        <Rocket className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          Constantly Evolving!
        </h2>
        <p className="mb-6 text-muted-foreground">
          We&apos;re always adding new tools and refining categories. Stay tuned for the latest in AI!
        </p>
      </div>

      {/* Detailed tool listing section with Rating and Comments */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">
          The Best AI Tools by Category
        </h2>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardContent className="p-0"> {/* Remove default padding */}
            <Accordion type="single" collapsible className="w-full">
              {toolCategories.map((cat, index) => (
                <AccordionItem 
                  value={cat.category} 
                  key={cat.category} 
                  className={index === toolCategories.length - 1 ? "border-b-0" : ""} /* Remove border from last item */
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 flex items-center bg-card hover:bg-muted/50 transition-colors">
                     {cat.icon} {cat.category}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-2 bg-background space-y-6">
                    {cat.tools.map((tool) => (
                      <div key={tool.id} id={tool.id} className="p-4 border rounded-md bg-card shadow-sm scroll-mt-20"> {/* Add id and scroll-mt */}
                        <div className="flex items-center justify-between mb-2">
                           {tool.link ? (
                              <Link href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-lg font-medium text-primary hover:underline group">
                                {tool.name}
                                <ExternalLink className="ml-1.5 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </Link>
                            ) : (
                              <h3 className="text-lg font-medium text-foreground">{tool.name}</h3>
                            )}
                        </div>
                        {tool.description && (
                           <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                         )}
                        <div className="mb-4">
                           <Rating toolId={tool.id} />
                        </div>
                        <SocialShareButtons toolName={tool.name} toolId={tool.id} /> {/* Add SocialShareButtons */}
                        <div className="mt-6"> {/* Add margin top for spacing */}
                           <CommentSection toolId={tool.id} />
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

    </DashboardLayout>
  );
}

