import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { ToolCard } from '@/components/dashboard/tool-card';
import { BotMessageSquare, Lightbulb, BarChart3, WandSparkles, Database, Workflow, Rocket } from 'lucide-react';

const aiTools = [
  {
    title: "AI Chatbot Assistant",
    description: "Engage with an intelligent assistant for queries, support, and automated tasks.",
    icon: <BotMessageSquare className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=1",
    imageHint: "chatbot interface",
  },
  {
    title: "Idea Generator",
    description: "Spark creativity with AI-powered suggestions for new projects, content, and solutions.",
    icon: <Lightbulb className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=2",
    imageHint: "bright ideas",
  },
  {
    title: "Data Analyzer",
    description: "Uncover insights and trends from complex datasets with advanced AI analysis.",
    icon: <BarChart3 className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=3",
    imageHint: "data charts",
  },
  {
    title: "Content Creator",
    description: "Generate high-quality articles, summaries, and marketing copy in minutes.",
    icon: <WandSparkles className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=4",
    imageHint: "creative writing",
  },
  {
    title: "Knowledge Base Builder",
    description: "Organize and access information efficiently with an AI-structured knowledge system.",
    icon: <Database className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=5",
    imageHint: "digital library",
  },
  {
    title: "Workflow Optimizer",
    description: "Streamline your processes and boost productivity with AI-driven workflow automation.",
    icon: <Workflow className="h-6 w-6" />,
    imageUrl: "https://picsum.photos/400/200?random=6",
    imageHint: "efficient process",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <DashboardHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Welcome to AI Tools Hub!
            </h1>
            <p className="text-muted-foreground">
              Explore our suite of intelligent tools designed to empower your work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {aiTools.map((tool) => (
              <ToolCard
                key={tool.title}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                imageUrl={tool.imageUrl}
                imageHint={tool.imageHint}
                actionLink="#"
              />
            ))}
          </div>

          <div className="mt-12 rounded-lg bg-card p-8 text-center shadow-lg">
            <Rocket className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-2 text-2xl font-semibold text-foreground">
              Ready to Explore More?
            </h2>
            <p className="mb-6 text-muted-foreground">
              We are constantly adding new tools and features. Stay tuned!
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t bg-card">
         &copy; {new Date().getFullYear()} AI Tools Hub. All rights reserved.
      </footer>
    </div>
  );
}
