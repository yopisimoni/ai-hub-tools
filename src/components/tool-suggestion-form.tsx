// src/components/tool-suggestion-form.tsx
"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toolCategories } from "@/lib/tool-data";
import { useUser } from "@clerk/nextjs";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

export function ToolSuggestionForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to submit a tool suggestion.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const functions = getFunctions(getApp());
      const submitToolSuggestion = httpsCallable(functions, 'submitToolSuggestion');
      await submitToolSuggestion({ name, description, link, categorySlug });

      toast({
        title: "Success!",
        description: "Your tool suggestion has been submitted.",
      });
      setName("");
      setDescription("");
      setLink("");
      setCategorySlug("");
    } catch (error: any) {
      console.error("Error submitting tool suggestion:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to submit tool suggestion.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Tool Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter tool name"
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter tool description"
          required
        />
      </div>
      <div>
        <Label htmlFor="link">Link</Label>
        <Input
          id="link"
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter tool link"
          required
        />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={setCategorySlug}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {toolCategories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit Tool Suggestion"}
      </Button>
    </form>
  );
}