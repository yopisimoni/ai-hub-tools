
"use client"; // Needed for useState, useEffect, localStorage

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Star, MessageSquare, ArrowRight } from 'lucide-react';
import { getToolById, type AiTool } from '@/lib/tool-data.tsx'; // Import function to get tool details
import { Rating } from '@/components/dashboard/rating';
import { SocialShareButtons } from '@/components/dashboard/social-share-buttons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// Reusable FavoriteButton, similar to the one on category page, but updates state here
const FavoriteButton = ({ toolId, onRemove }: { toolId: string; onRemove: (id: string) => void }) => {
  const [isFavorite, setIsFavorite] = useState(true); // Assume true initially on this page
  const { toast } = useToast();

  const getFavorites = (): string[] => {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem('favoriteToolIds');
    return favorites ? JSON.parse(favorites) : [];
  };

  const handleFavorite = () => {
    const currentFavorites = getFavorites();
    let updatedFavorites: string[];
    let toastMessage: string;

    if (currentFavorites.includes(toolId)) {
      // Remove from favorites
      updatedFavorites = currentFavorites.filter(id => id !== toolId);
      toastMessage = "Removed from Favorites";
      onRemove(toolId); // Notify parent to update the list
      setIsFavorite(false); // Update local state
    } else {
      // Add back to favorites (less likely use case on this page, but possible)
      updatedFavorites = [...currentFavorites, toolId];
      toastMessage = "Added to Favorites";
       setIsFavorite(true); // Update local state
    }

    localStorage.setItem('favoriteToolIds', JSON.stringify(updatedFavorites));

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
        isFavorite && "text-amber-500"
      )}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Star className={cn("h-5 w-5", isFavorite && "fill-current")} />
    </Button>
  );
};


export default function FavoritesPage() {
  const [favoriteTools, setFavoriteTools] = useState<AiTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = () => {
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      const favoriteIds = JSON.parse(localStorage.getItem('favoriteToolIds') || '[]') as string[];
      const tools = favoriteIds.map(id => getToolById(id)).filter((tool): tool is AiTool => tool !== undefined);
      setFavoriteTools(tools);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemoveFavorite = (toolId: string) => {
      // Refilter the list displayed on the page after removal
      setFavoriteTools(prevTools => prevTools.filter(tool => tool.id !== toolId));
  };


  return (
    <DashboardLayout>
      <Card className="mb-8 shadow-lg rounded-lg bg-card">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Star className="h-10 w-10 text-primary fill-current" /> {/* Fill star */}
            <div>
                 <CardTitle className="text-2xl">Favorite Tools</CardTitle>
                 <CardDescription className="mt-1">Your saved AI tools for quick access.</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="text-muted-foreground col-span-full text-center py-8">Loading favorites...</p>
          ) : favoriteTools.length > 0 ? (
            favoriteTools.map((tool) => (
              <Card key={tool.id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow rounded-lg bg-card">
                <CardHeader>
                   <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      {/* Pass the handleRemoveFavorite function */}
                      <FavoriteButton toolId={tool.id} onRemove={handleRemoveFavorite} />
                   </div>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{tool.description}</p>
                  <Rating toolId={tool.id} />
                  <SocialShareButtons toolName={tool.name} toolId={tool.id} />
                </CardContent>
                 <CardFooter className="flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4">
                    <Button asChild variant="outline" className="w-full sm:w-auto">
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
            <p className="text-muted-foreground col-span-full text-center py-8">You haven't added any favorite tools yet.</p>
          )}
        </div>
    </DashboardLayout>
  );
}
