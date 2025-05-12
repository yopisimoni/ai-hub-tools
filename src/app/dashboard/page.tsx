
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ToolCard } from '@/components/dashboard/tool-card';
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
  Rocket
} from 'lucide-react';

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
    imageUrl: "https://picsum.photos/400/200?random=3", // Reusing from previous
    imageHint: "data charts",
    actionLink: "/categories/data-analysis",
  },
   {
    title: "AI Chatbots",
    description: "Intelligent assistants for customer support, information retrieval, and tasks.",
    icon: <BotMessageSquare className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=1", // Reusing from previous
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
    imageUrl: "https://picsum.photos/400/200?random=6", // Reusing from previous
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
            actionLink={category.actionLink} // Link to the specific category page (needs implementation)
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
    </DashboardLayout>
  );
}
