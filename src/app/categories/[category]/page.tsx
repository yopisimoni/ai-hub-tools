"use client";

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, ImageIcon, Code, BarChart3, Music, Video, Zap, Search, Store, BookOpen, TerminalSquare, BotMessageSquare, Workflow, Rocket, List, Briefcase, Users, GraduationCap, FileText, Mic, Palette, Film, Type, Sparkles, BrainCircuit, Network, ClipboardList, CalendarDays, Headset, UserCheck, Database, Mail, Presentation, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Map category slugs to display names and icons
const categoryDetails: { [key: string]: { name: string; icon: React.ReactNode; description: string } } = {
  "text-generation": { name: "Text Generation", icon: <PenTool className="h-10 w-10 text-primary" />, description: "Tools for creating written content like articles, summaries, and creative text." },
  "image-generation": { name: "Image Generation", icon: <ImageIcon className="h-10 w-10 text-primary" />, description: "Generate unique images from text descriptions or modify existing ones." },
  "code-assistance": { name: "Code Assistance", icon: <Code className="h-10 w-10 text-primary" />, description: "AI tools to help developers write, debug, and optimize code faster." },
  "data-analysis": { name: "Data Analysis", icon: <BarChart3 className="h-10 w-10 text-primary" />, description: "Analyze complex datasets to find insights, trends, and predictions." },
  "chatbots": { name: "AI Chatbots", icon: <BotMessageSquare className="h-10 w-10 text-primary" />, description: "Intelligent assistants for customer support, information retrieval, and tasks." },
  "audio-video": { name: "Audio & Video Tools", icon: <Music className="h-10 w-10 text-primary" />, description: "Create, edit, and enhance audio and video content using AI." },
  "productivity": { name: "Productivity Boosters", icon: <Zap className="h-10 w-10 text-primary" />, description: "Streamline workflows, manage tasks, and automate repetitive actions." },
  "automation": { name: "Workflow Automation", icon: <Workflow className="h-10 w-10 text-primary" />, description: "Connect apps and automate multi-step processes without coding." },
  "research": { name: "Research & Insights", icon: <Search className="h-10 w-10 text-primary" />, description: "Tools for gathering information, summarizing research, and market analysis." },
  "marketing-sales": { name: "Marketing & Sales", icon: <Store className="h-10 w-10 text-primary" />, description: "AI-powered tools for lead generation, content marketing, and sales optimization." },
  "education-learning": { name: "Education & Learning", icon: <BookOpen className="h-10 w-10 text-primary" />, description: "Personalized learning experiences, tutoring, and educational content creation." },
  "developer-tools": { name: "Developer Tools", icon: <TerminalSquare className="h-10 w-10 text-primary" />, description: "Advanced tools for software development, testing, and deployment." },
  // Add other categories here as needed
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Generate dynamic metadata (optional but good practice)
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category;
  const categoryInfo = categoryDetails[categorySlug];
  const title = categoryInfo ? `${categoryInfo.name} - AI Tools Hub` : 'Category Not Found';

  return {
    title: title,
    description: categoryInfo ? categoryInfo.description : 'Explore AI tools in this category.',
  };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category;
  const categoryInfo = categoryDetails[categorySlug];

  // If category is not found in our details map, show 404
  if (!categoryInfo) {
    notFound();
  }

  // Fetch AI tools based on the category slug
  const aiTools = getAIToolsByCategory(categorySlug);

  return (
    <DashboardLayout>
      <div>
        <Card className="shadow-lg rounded-lg mb-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              {categoryInfo.icon}
              <div>
                <CardTitle className="text-2xl">{categoryInfo.name}</CardTitle>
                <CardDescription className="mt-1">
                  {categoryInfo.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.length > 0 ? (
            aiTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow rounded-lg">
                <CardHeader>
                   <CardTitle className="text-xl">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3">{tool.description}</p>
                </CardContent>
                <CardFooter>
                   {tool.link ? (
                     <Button asChild variant="default" className="w-full mt-auto">
                       <Link href={tool.link} target="_blank" rel="noopener noreferrer">
                         Visit Tool <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                   ) : (
                     <Button variant="secondary" disabled className="w-full mt-auto">
                       Link Unavailable
                     </Button>
                   )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full text-center py-8">No tools found in this category yet.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// Dummy function to simulate fetching AI tools based on category slug
function getAIToolsByCategory(categorySlug: string): { id: string; name: string; description: string; link?: string }[] {
  // In a real app, this would fetch data from your backend/database
  // based on the categorySlug.

  switch (categorySlug) {
    case "text-generation":
      return [
        { id: "chatgpt-textgen", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/" },
        { id: "claude-textgen", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude" },
        { id: "gemini-textgen", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/" },
        { id: "jasper-ai-textgen", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/" },
        { id: "copy-ai", name: "Copy.ai", description: "Designed for users who need simplicity and speed in content creation, ideal for startups and small businesses.", link: "https://www.copy.ai/" },
        { id: "rytr", name: "Rytr", description: "Affordable AI writing tool providing excellent value for personal projects and small business tasks.", link: "https://rytr.me/" },
        { id: "contentbot-ai", name: "ContentBot AI", description: "Automates content generation with workflows for various content creators, supporting over 110 languages.", link: "https://contentbot.ai/" },
        { id: "squibler", name: "Squibler", description: "Powerful for structured long-form content, making it perfect for authors and researchers.", link: "https://www.squibler.io/" },
        { id: "writesonic", name: "Writesonic", description: "Budget-friendly tool for SEO and marketing professionals, offering versatile content generation.", link: "https://writesonic.com/" },
        { id: "notion-ai", name: "Notion AI", description: "Integrates AI text generation into Notion workspaces, enhancing productivity with features like summarization and idea brainstorming.", link: "https://www.notion.so/product/ai" }
      ];
    case "chatbots":
       return [
        { id: "chatgpt", name: "ChatGPT (OpenAI)", description: "Versatile AI assistant excelling in creative writing, coding, and image generation.", link: "https://chat.openai.com/" },
        { id: "claude", name: "Claude 3.7 (Anthropic)", description: "Known for thoughtful, human-like conversations and advanced reasoning.", link: "https://www.anthropic.com/index/claude" },
        { id: "gemini", name: "Google Gemini 2.5 Pro", description: "Excels in creative tasks and document summarization with a free tier available.", link: "https://gemini.google.com/" },
        { id: "microsoft-copilot", name: "Microsoft Copilot", description: "Integrated with Microsoft 365, assists with drafting emails, summarizing meetings, and more.", link: "https://www.microsoft.com/en-us/microsoft-365/copilot" },
        { id: "grok", name: "Grok 3 (xAI)", description: "Elon Musk's AI assistant, notable for social media analysis and engaging interactions.", link: "https://x.ai/" },
        { id: "perplexity-chatbot", name: "Perplexity AI", description: "Specializes in detailed research and summarization of current events.", link: "https://www.perplexity.ai/" },
        { id: "lechat-mistral", name: "Le Chat (Mistral AI)", description: "Enterprise-focused chatbot integrated with platforms like SharePoint and Google Drive.", link: "https://mistral.ai/" },
        { id: "personal-ai", name: "Personal AI", description: "Customizable personal assistant designed for individualized tasks and preferences.", link: "https://www.personal.ai/" },
        { id: "pi-inflection", name: "Pi (Inflection AI)", description: "Friendly AI companion focused on emotional support and casual conversation.", link: "https://pi.ai/" },
        { id: "jasper-ai-chat", name: "Jasper AI", description: "AI writing assistant tailored for marketers, bloggers, and content creators.", link: "https://www.jasper.ai/" }, // Note: Reused name, different ID
      ];
    // Add cases for other category slugs here...
    // e.g., case "image-generation": return [...]
    default:
      // Return empty array or handle as needed if category slug doesn't match
      return [];
  }
}