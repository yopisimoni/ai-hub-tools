
"use client"; // Required for useState, useEffect, onClick handlers, useParams

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation'; // Import useParams
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Rating } from '@/components/dashboard/rating'; // Import Rating
import { SocialShareButtons } from '@/components/dashboard/social-share-buttons'; // Import SocialShareButtons
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import { getCategoryDetailsBySlug, getAIToolsByCategory, type AiTool } from '@/lib/tool-data.tsx'; // Import centralized data functions

// Component to handle favorite toggle logic
const FavoriteButton = ({ toolId }: { toolId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  // Function to get favorites from localStorage
  const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem('favoriteToolIds');
    return favorites ? JSON.parse(favorites) : [];
  };

  // Check favorite status on mount
  useEffect(() => {
    setIsFavorite(getFavorites().includes(toolId));
  }, [toolId]);

  const handleFavorite = () => {
    const currentFavorites = getFavorites();
    let updatedFavorites: string[];
    let toastMessage: string;

    if (currentFavorites.includes(toolId)) {
      // Remove from favorites
      updatedFavorites = currentFavorites.filter(id => id !== toolId);
      toastMessage = "Removed from Favorites";
    } else {
      // Add to favorites
      updatedFavorites = [...currentFavorites, toolId];
      toastMessage = "Added to Favorites";
    }

    localStorage.setItem('favoriteToolIds', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); // Toggle local state immediately

    toast({
      title: toastMessage,
      description: `Tool ${toolId} ${toastMessage.toLowerCase()}.`,
    });
    console.log(`Favorite status toggled for tool ${toolId}: ${!isFavorite}`);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleFavorite}
      className={cn(
        "h-8 w-8 p-0 text-muted-foreground hover:text-amber-500",
        isFavorite && "text-amber-500" // Highlight if favorite
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={cn("h-5 w-5", isFavorite && "fill-current")} />
    </Button>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const [categoryInfo, setCategoryInfo] = useState<ReturnType<typeof getCategoryDetailsBySlug>>(undefined);
  const [aiTools, setAiTools] = useState<AiTool[]>([]);

  useEffect(() => {
    if (categorySlug) {
      const details = getCategoryDetailsBySlug(categorySlug);
      setCategoryInfo(details);
      if (details) {
        setAiTools(getAIToolsByCategory(categorySlug));
      } else {
        // If category details not found by slug, trigger notFound
        notFound();
      }
    }
  }, [categorySlug]);


  // If category is not found in our details map, show 404 (handled by useEffect now)
  // This check runs before useEffect finishes, might need adjustment if loading state is added
  if (!categoryInfo && typeof window !== 'undefined') {
     // Initial render might not have info yet, avoid premature 404 on client
     // A loading state could be better here
     // console.log("Category info not yet available for slug:", categorySlug);
  }


  // Render loading or placeholder if categoryInfo is not yet set
  if (!categoryInfo) {
     return (
        <DashboardLayout>
            <p>Loading category...</p>
             {/* Or a proper skeleton loader */}
        </DashboardLayout>
     );
  }


  return (
    <DashboardLayout>
      <div>
        <Card className="shadow-lg rounded-lg mb-8 bg-card">
          <CardHeader>
            <div className="flex items-center gap-4">
              {/* Ensure categoryInfo.icon exists before rendering */}
              {categoryInfo?.icon ? <div className="text-primary">{categoryInfo.icon}</div> : null}
              <div>
                <CardTitle className="text-2xl">{categoryInfo?.name || 'Category'}</CardTitle>
                <CardDescription className="mt-1">
                  {categoryInfo?.description || 'Explore tools in this category.'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.length > 0 ? (
            aiTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow rounded-lg bg-card">
                <CardHeader>
                   <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <FavoriteButton toolId={tool.id} />
                   </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{tool.description}</p>
                  <Rating toolId={tool.id} />
                  <SocialShareButtons toolName={tool.name} toolId={tool.id} />
                </CardContent>
                 <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
                    {/* Link to comment section on dashboard */}
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                        {/* Update link to point to the tool's anchor on the dashboard page */}
                        <Link href={`/dashboard#${tool.id}`}>
                            <MessageSquare className="mr-2 h-4 w-4" /> Comments
                        </Link>
                    </Button>
                   {tool.link ? (
                     <Button asChild variant="default" className="w-full sm:w-auto flex-1">
                       <Link href={tool.link} target="_blank" rel="noopener noreferrer">
                         Visit Tool <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                   ) : (
                     <Button variant="secondary" disabled className="w-full sm:w-auto flex-1">
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

// Removed getAIToolsByCategory and categoryDetails from here, now importing from tool-data.tsx

