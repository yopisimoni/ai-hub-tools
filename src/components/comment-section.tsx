// src/components/comment-section.tsx
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { db } from "@/lib/firebase"; // Import the Firestore instance
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Comment } from "./comment";
import { Rating } from "@/components/dashboard/rating";

interface CommentData {
  id: string;
  userId: string;
  text: string;
  timestamp: any;
  upvotes: number;
  downvotes: number;
  userAvatar?: string;
  userFullName?: string;
}

export function CommentSection({ toolId }: { toolId: string }) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const [pageSize, setPageSize] = useState(5);
  const [lastVisible, setLastVisible] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const functions = getFunctions(getApp());
        const getCommentsFn = httpsCallable(functions, 'getComments');
        const result = await getCommentsFn({ toolId: toolId, pageSize: pageSize, startAfter: lastVisible });

        const newComments = result.data.comments;
        setComments((prevComments) => [...prevComments, ...newComments]);

        setLastVisible(result.data.lastVisible);
        setHasMore(result.data.lastVisible !== null);
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        toast({
          title: "Error!",
          description: "Failed to fetch comments.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch initial comments
    const clearComments = () => {
      setComments([]); // Clear existing comments
      setLastVisible(null);
      setHasMore(true);
    };

    clearComments();
    fetchComments();
  }, [toolId, user?.id, toast, pageSize]);

  const handleAddComment = async () => {
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to add a comment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const addCommentFn = httpsCallable(functions, 'addComment');
      await addCommentFn({ toolId: toolId, text: newCommentText });

      toast({
        title: "Success!",
        description: "Your comment has been added.",
      });
      setNewCommentText("");

      // Refresh comments after adding a new comment
      const clearComments = () => {
        setComments([]); // Clear existing comments
        setLastVisible(null);
        setHasMore(true);
      };

      clearComments();
      const functions2 = getFunctions(getApp());
        const getComments2Fn = httpsCallable(functions2, 'getComments');\
        const result = await getComments2Fn({ toolId: toolId, pageSize: pageSize, startAfter: null });

        const newComments = result.data.comments;
        setComments((prevComments) => [...newComments]);

        setLastVisible(result.data.lastVisible);
        setHasMore(result.data.lastVisible !== null);

    } catch (error: any) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to add comment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
      setIsLoading(true);
      try {
        const functions = getFunctions(getApp());
        const getCommentsFn = httpsCallable(functions, 'getComments');\
        const result = await getCommentsFn({ toolId: toolId, pageSize: pageSize, startAfter: lastVisible });

        const newComments = result.data.comments;
        setComments((prevComments) => [...prevComments, ...newComments]);

        setLastVisible(result.data.lastVisible);
        setHasMore(result.data.lastVisible !== null);
      } catch (error: any) {
        console.error("Error fetching comments:", error);
        toast({
          title: "Error!",
          description: "Failed to fetch comments.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Comments and Ratings</h2>
      <Rating toolId={toolId} />
      {isLoading && comments.length === 0 ? (
        <p>Loading comments...</p>
      ) : (
        <div className="space-y-2">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              userId={comment.userId}
              text={comment.text}
              timestamp={comment.timestamp}
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
              userAvatar={comment.userAvatar}
              userFullName={comment.userFullName}
            />
          ))}
        </div>
      )}
      {hasMore && (
        <Button onClick={handleLoadMore} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load More"}
        </Button>
      )}
      <div>
        <Label htmlFor="comment">Add a comment</Label>
        <Textarea
          id="comment"
          placeholder="Enter your comment"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <Button onClick={handleAddComment} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Comment"}
        </Button>
      </div>
    </div>
  );
}