// src/components/comment.tsx
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
import { collection, query, where, getDocs, orderBy, addDoc } from "firebase/firestore";

interface ReplyData {
  id: string;
  userId: string;
  text: string;
  timestamp: any;
  upvotes: number;
  downvotes: number;
  userAvatar?: string;
  userFullName?: string;
}

interface CommentProps {
  commentId: string;
  userId: string;
  text: string;
  timestamp: any;
  upvotes: number;
  downvotes: number;
  userAvatar?: string;
  userFullName?: string;
}

export function Comment({
  commentId,
  userId,
  text,
  timestamp,
  upvotes,
  downvotes,
  userAvatar,
  userFullName,
}: CommentProps) {
  const [replies, setReplies] = useState<ReplyData[]>([]);
  const [newReplyText, setNewReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    const fetchReplies = async () => {
      setIsLoading(true);
      try {
        const repliesQuery = query(
          collection(db, "comments", commentId, "replies"),
          orderBy("timestamp", "desc")
        );
        const repliesSnapshot = await getDocs(repliesQuery);
        const repliesData: ReplyData[] = [];
        for (const doc of repliesSnapshot.docs) {
          const replyData = doc.data();
          const userId = replyData.userId;
          let userAvatar: string | undefined;
          let userFullName: string | undefined;

          if (user) {
            userAvatar = user.imageUrl;
            userFullName = `${user.firstName} ${user.lastName}`;
          }

          repliesData.push({
            id: doc.id,
            userId: userId,
            text: replyData.text,
            timestamp: replyData.timestamp,
            upvotes: replyData.upvotes,
            downvotes: replyData.downvotes,
            userAvatar: userAvatar,
            userFullName: userFullName,
          });
        }
        setReplies(repliesData);
      } catch (error: any) {
        console.error("Error fetching replies:", error);
        toast({
          title: "Error!",
          description: "Failed to fetch replies.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReplies();
  }, [commentId, user?.id, toast]);

  const handleAddReply = async () => {
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to add a reply.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const addReplyToComment = httpsCallable(functions, 'addReplyToComment');
      await addReplyToComment({ commentId: commentId, text: newReplyText });

      toast({
        title: "Success!",
        description: "Your reply has been added.",
      });
      setNewReplyText("");
      // Refresh replies after adding a new reply
      const fetchReplies = async () => {
        setIsLoading(true);
        try {
          const repliesQuery = query(
            collection(db, "comments", commentId, "replies"),
            orderBy("timestamp", "desc")
          );
          const repliesSnapshot = await getDocs(repliesQuery);
          const repliesData: ReplyData[] = [];
          for (const doc of repliesSnapshot.docs) {
            const replyData = doc.data();
            const userId = replyData.userId;
            let userAvatar: string | undefined;
            let userFullName: string | undefined;

            if (user) {
              userAvatar = user.imageUrl;
              userFullName = `${user.firstName} ${user.lastName}`;
            }

            repliesData.push({
              id: doc.id,
              userId: userId,
              text: replyData.text,
              timestamp: replyData.timestamp,
              upvotes: replyData.upvotes,
              downvotes: replyData.downvotes,
              userAvatar: userAvatar,
              userFullName: userFullName,
            });
          }
          setReplies(repliesData);
        } catch (error: any) {
          console.error("Error fetching replies:", error);
          toast({
            title: "Error!",
            description: "Failed to fetch replies.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchReplies();
    } catch (error: any) {
      console.error("Error adding reply:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to add reply.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpvote = async () => {
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to upvote a comment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const upvoteComment = httpsCallable(functions, 'upvoteComment');
      await upvoteComment({ commentId: commentId });

      toast({
        title: "Success!",
        description: "Comment upvoted.",
      });
    } catch (error: any) {
      console.error("Error upvoting comment:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to upvote comment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

    const handleDownvote = async () => {
    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to downvote a comment.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const downvoteComment = httpsCallable(functions, 'downvoteComment');
      await downvoteComment({ commentId: commentId });

      toast({
        title: "Success!",
        description: "Comment downvoted.",
      });
    } catch (error: any) {
      console.error("Error downvoting comment:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to downvote comment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2 border p-4 rounded-md">
      <div className="flex items-center space-x-2">
        <Avatar>
          {userAvatar ? (
            <AvatarImage src={userAvatar} alt={userFullName || "User Avatar"} />
          ) : (
            <AvatarFallback>{userFullName ? userFullName[0] : "U"}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="text-sm font-medium">{userFullName || "Anonymous"}</p>
          <p className="text-xs text-gray-500">{timestamp?.toDate().toLocaleDateString()}</p>
        </div>
      </div>
      <p>{text}</p>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={handleUpvote} disabled={isLoading}>
          Upvote ({upvotes})
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDownvote} disabled={isLoading}>
          Downvote ({downvotes})
        </Button>
      </div>
      <div className="space-y-2">
        {replies.map((reply) => (
          <div key={reply.id} className="border-l-2 pl-4">
            <div className="flex items-center space-x-2">
              <Avatar>
                {reply.userAvatar ? (
                  <AvatarImage src={reply.userAvatar} alt={reply.userFullName || "User Avatar"} />
                ) : (
                  <AvatarFallback>{reply.userFullName ? reply.userFullName[0] : "U"}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <p className="text-sm font-medium">{reply.userFullName || "Anonymous"}</p>
                <p className="text-xs text-gray-500">{reply.timestamp?.toDate().toLocaleDateString()}</p>
              </div>
            </div>
            <p>{reply.text}</p>
          </div>
        ))}
      </div>
      <div>
        <Label htmlFor="reply">Add a reply</Label>
        <Textarea
          id="reply"
          placeholder="Enter your reply"
          value={newReplyText}
          onChange={(e) => setNewReplyText(e.target.value)}
        />
        <Button onClick={handleAddReply} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Reply"}
        </Button>
      </div>
    </div>
  );
}