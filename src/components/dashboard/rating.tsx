
"use client";

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface RatingProps {
  toolId: string;
  initialRating?: number; // Optional initial rating (e.g., fetched from db)
  maxRating?: number;
}

export function Rating({ toolId, initialRating = 0, maxRating = 5 }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleRating = (rate: number) => {
    setRating(rate);
    // TODO: Add logic here to save the rating to a database
    // associated with the toolId and the current user.
    console.log(`Rated tool ${toolId} with ${rate} stars`);
    toast({
      title: "Rating Submitted",
      description: `You rated this tool ${rate} out of ${maxRating} stars.`,
    });
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium text-muted-foreground mr-2">Rate this tool:</span>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Button
            key={starValue}
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 p-0 text-muted-foreground hover:text-primary transition-colors",
              (hoverRating >= starValue || rating >= starValue) && "text-primary"
            )}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${starValue} out of ${maxRating} stars`}
          >
            <Star 
              className={cn(
                "h-5 w-5",
                (hoverRating >= starValue || rating >= starValue) ? "fill-current" : ""
              )} 
            />
          </Button>
        );
      })}
    </div>
  );
}
