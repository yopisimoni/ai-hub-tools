
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ToolCard } from '@/components/dashboard/tool-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
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

// Detailed tool listing data
const toolCategories = [
  {
    category: "AI Assistants (Chatbots)",
    icon: <BotMessageSquare className="h-5 w-5 mr-3 text-primary" />,
    tools: ["ChatGPT", "Claude", "Gemini", "DeepSeek", "Grok"]
  },
  {
    category: "Video Generation and Editing",
     icon: <Film className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Synthesia", "Runway", "Filmora", "OpusClip"]
  },
  {
    category: "Image Generation",
    icon: <ImageIcon className="h-5 w-5 mr-3 text-primary" />,
    tools: ["GPT-4o", "Midjourney"]
  },
  {
    category: "Notetakers and Meeting Assistants",
    icon: <ClipboardList className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Fathom", "Nyota"]
  },
  {
    category: "Automation",
    icon: <Workflow className="h-5 w-5 mr-3 text-primary" />,
    tools: ["n8n"]
  },
  {
    category: "Research/Education",
     icon: <GraduationCap className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Deep Research", "NotebookLM"]
  },
  {
    category: "Writing",
     icon: <PenTool className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Rytr", "Sudowrite"]
  },
  {
    category: "Grammar and Writing Improvement",
    icon: <Type className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Grammarly", "Wordtune"]
  },
  {
    category: "Search Engines",
    icon: <Search className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Perplexity", "ChatGPT search"]
  },
  {
    category: "Social Media Management",
     icon: <Users className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Vista Social", "FeedHive"]
  },
  {
    category: "Graphic Design",
    icon: <Palette className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Canva Magic Studio", "Looka"]
  },
  {
    category: "App Builders & Coding",
    icon: <Code className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Bubble", "Bolt", "Lovable", "Cursor", "v0"]
  },
  {
    category: "Project Management",
    icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Asana", "ClickUp"]
  },
  {
    category: "Scheduling",
    icon: <CalendarDays className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Reclaim", "Clockwise"]
  },
  {
    category: "Customer Service",
    icon: <Headset className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Tidio AI", "Hiver"]
  },
  {
    category: "Recruitment",
    icon: <UserCheck className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Textio", "CVViZ"]
  },
  {
    category: "Knowledge Management",
    icon: <Database className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Notion AI Q&A", "Guru"]
  },
  {
    category: "Email",
    icon: <Mail className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Hubspot Email Writer", "SaneBox", "Shortwave"]
  },
  {
    category: "Presentations",
    icon: <Presentation className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Gamma", "Presentations.ai"]
  },
  {
    category: "Resume Builders",
    icon: <FileText className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Teal", "Kickresume"]
  },
  {
    category: "Voice Generation",
    icon: <Mic className="h-5 w-5 mr-3 text-primary" />,
    tools: ["ElevenLabs", "Murf"]
  },
  {
    category: "Music Generation",
    icon: <Music className="h-5 w-5 mr-3 text-primary" />,
    tools: ["Suno", "Udio"]
  },
  {
    category: "Marketing",
    icon: <Store className="h-5 w-5 mr-3 text-primary" />,
    tools: ["AdCreative"]
  },
  {
    category: "Sales",
    icon: <Sparkles className="h-5 w-5 mr-3 text-primary" />, // Using Sparkles as a generic icon
    tools: ["Clay"]
  },
  {
    category: "Legal",
     icon: <Briefcase className="h-5 w-5 mr-3 text-primary" />, // Reusing Briefcase
    tools: ["Harvey"]
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

      {/* New detailed tool listing section */}
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
                  <AccordionContent className="px-6 pb-4 pt-2 bg-background">
                    <ul className="list-disc pl-8 space-y-2 text-muted-foreground marker:text-primary">
                      {cat.tools.map((tool) => (
                        <li key={tool} className="text-base">{tool}</li>
                      ))}
                    </ul>
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
