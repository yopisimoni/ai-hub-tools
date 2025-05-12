
"use client";

import { useState, type FormEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface CommentSectionProps {
  toolId: string;
  // In a real app, comments would be fetched based on toolId
  initialComments?: { id: string; user: string; avatar: string; text: string; timestamp: string }[]; 
}

// Mock comments for demonstration
const mockComments = [
    { id: 'c1', user: 'Alice', avatar: 'https://picsum.photos/seed/alice/40/40', text: 'This tool is amazing!', timestamp: '2 hours ago' },
    { id: 'c2', user: 'Bob', avatar: 'https://picsum.photos/seed/bob/40/40', text: 'Helped me a lot with my project.', timestamp: '1 day ago' },
];

export function CommentSection({ toolId, initialComments = mockComments }: CommentSectionProps) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment.trim()) {
      toast({ title: "Error", description: "Comment cannot be empty.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call to save the comment
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // TODO: Replace simulation with actual API call
    // In a real app:
    // 1. Send comment, toolId, and user info to your backend.
    // 2. Backend saves the comment to the database.
    // 3. Optionally, refresh comments list or add the new comment optimistically.

    const newComment = {
        id: `c${comments.length + 1}`, // Temporary ID generation
        user: 'CurrentUser', // Replace with actual logged-in user name
        avatar: 'https://picsum.photos/seed/currentuser/40/40', // Replace with actual user avatar
        text: comment,
        timestamp: 'Just now'
    };

    setComments([newComment, ...comments]); // Add new comment to the top
    setComment(''); // Clear the textarea

    toast({
      title: "Comment Added",
      description: "Your comment has been posted.",
    });

    setIsSubmitting(false);
    console.log(`Comment submitted for tool ${toolId}: ${comment}`);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-foreground">Comments</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          placeholder="Leave your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          className="bg-background"
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Post Comment
        </Button>
      </form>

      <div className="space-y-4 pt-4">
        {comments.length > 0 ? (
          comments.map((c) => (
            <Card key={c.id} className="bg-muted/50 border-border/50 shadow-none">
              <CardContent className="p-4 flex gap-3">
                 <Avatar className="h-8 w-8 border">
                    <AvatarImage src={c.avatar} alt={c.user} data-ai-hint="user avatar" />
                    <AvatarFallback>{c.user.charAt(0).toUpperCase()}</AvatarFallback>
                 </Avatar>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium text-foreground">{c.user}</p>
                        <p className="text-xs text-muted-foreground">{c.timestamp}</p>
                    </div>
                    <p className="text-sm text-foreground/90">{c.text}</p>
                 </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
