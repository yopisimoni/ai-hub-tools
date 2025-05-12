// src/app/dashboard/admin/tool-suggestions/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { db } from "@/lib/firebase"; // Import the Firestore instance
import { collection, query, where, getDocs, orderBy, addDoc, updateDoc, doc } from "firebase/firestore";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

interface ToolSuggestion {
  id: string;
  name: string;
  description: string;
  link: string;
  categorySlug: string;
  suggestedBy: string;
  timestamp: any;
  status: "pending" | "approved" | "rejected";
}

export default function ToolSuggestionsPage() {
  const [suggestions, setSuggestions] = useState<ToolSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const suggestionsQuery = query(
          collection(db, "suggestedTools"),
          where("status", "==", "pending"),
          orderBy("timestamp", "desc")
        );
        const suggestionsSnapshot = await getDocs(suggestionsQuery);
        const suggestionsData: ToolSuggestion[] = [];
        for (const doc of suggestionsSnapshot.docs) {
          suggestionsData.push({
            id: doc.id,
            ...(doc.data() as Omit<ToolSuggestion, "id">),
          });
        }
        setSuggestions(suggestionsData);
      } catch (error: any) {
        console.error("Error fetching suggestions:", error);
        toast({
          title: "Error!",
          description: "Failed to fetch tool suggestions.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [user?.id, toast]);

  const handleApprove = async (suggestionId: string) => {
    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const approveToolSuggestion = httpsCallable(functions, 'approveToolSuggestion');
      await approveToolSuggestion({ suggestionId: suggestionId });

      toast({
        title: "Success!",
        description: "Tool suggestion approved.",
      });

      // Update the local state to reflect the change
      setSuggestions((prevSuggestions) =>
        prevSuggestions.map((suggestion) =>
          suggestion.id === suggestionId ? { ...suggestion, status: "approved" } : suggestion
        )
      );
    } catch (error: any) {
      console.error("Error approving tool suggestion:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to approve tool suggestion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (suggestionId: string) => {
    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const rejectToolSuggestion = httpsCallable(functions, 'rejectToolSuggestion');
      await rejectToolSuggestion({ suggestionId: suggestionId });

      toast({
        title: "Success!",
        description: "Tool suggestion rejected.",
      });

      // Update the local state to reflect the change
      setSuggestions((prevSuggestions) =>
        prevSuggestions.map((suggestion) =>
          suggestion.id === suggestionId ? { ...suggestion, status: "rejected" } : suggestion
        )
      );
    } catch (error: any) {
      console.error("Error rejecting tool suggestion:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to reject tool suggestion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-5">Tool Suggestions</h1>
        {isLoading ? (
          <p>Loading tool suggestions...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Description</th>
                  <th className="py-2 px-4 border-b">Link</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suggestions.map((suggestion) => (
                  <tr key={suggestion.id}>
                    <td className="py-2 px-4 border-b">{suggestion.name}</td>
                    <td className="py-2 px-4 border-b">{suggestion.description}</td>
                    <td className="py-2 px-4 border-b">
                      <a href={suggestion.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Visit
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">{suggestion.categorySlug}</td>
                    <td className="py-2 px-4 border-b">
                      <Button variant="ghost" size="sm" onClick={() => handleApprove(suggestion.id)} disabled={isLoading}>
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleReject(suggestion.id)} disabled={isLoading}>
                        Reject
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}