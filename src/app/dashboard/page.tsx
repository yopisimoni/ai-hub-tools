
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ToolCard } from '@/components/dashboard/tool-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from '@/components/ui/card';
import { Rating } from '@/components/dashboard/rating'; // Import Rating
import { CommentSection } from '@/components/dashboard/comment-section'; // Import CommentSection
import { SocialShareButtons } from '@/components/dashboard/social-share-buttons'; // Import SocialShareButtons
import Link from 'next/link'; // Import Link
import { ExternalLink } from 'lucide-react'; // Import ExternalLink icon
import { Rocket } from 'lucide-react';
import { toolCategories } from '@/lib/tool-data'; // Import centralized data

// Use the imported toolCategories directly for the category overview section
const aiCategoriesOverview = toolCategories.map(cat => ({
  title: cat.name,
  description: cat.description,
  icon: cat.icon, // Assuming the icon in toolCategories is suitable for the overview card
  imageUrl: cat.imageUrl,
  imageHint: cat.imageHint,
  actionLink: `/categories/${cat.slug}`, // Use the slug for the link
}));


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
        {aiCategoriesOverview.map((category) => (
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
                  value={cat.slug} // Use slug as value
                  key={cat.slug}
                  className={index === toolCategories.length - 1 ? "border-b-0" : ""} /* Remove border from last item */
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline px-6 py-4 flex items-center bg-card hover:bg-muted/50 transition-colors">
                     {cat.icon} {cat.name} {/* Display category name */}
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
                     {cat.tools.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No tools listed in this category yet.</p>
                    )}
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
