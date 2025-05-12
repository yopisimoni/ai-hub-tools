
"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Copy } from "lucide-react"; // Using Linkedin as a placeholder, Pinterest web share is complex
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';

interface SocialShareButtonsProps {
  toolName: string;
  toolId: string;
}

// Placeholder SVG for Pinterest as lucide-react doesn't have it
const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1c-5.52 0-10 4.48-10 10 0 4.08 2.44 7.58 5.91 9.09.06-.27.09-.66.04-1.03-.05-.3-.32-1.34-.32-1.34s-.1-.4-.1-.98c0-.92.53-1.61 1.19-1.61.56 0 .83.42.83.93 0 .56-.36 1.4-.54 2.18-.15.64.31 1.17.94 1.17 1.13 0 1.99-1.19 1.99-2.91 0-1.54-.87-2.66-2.13-2.66-1.42 0-2.27 1.07-2.27 2.33 0 .43.16.89.36 1.17.07.1.08.19.06.28-.06.26-.19.76-.22.88-.04.16-.17.21-.34.13-1.15-.53-1.87-1.99-1.87-3.34 0-2.59 1.89-4.8 5.31-4.8 2.79 0 4.94 1.99 4.94 4.55 0 2.79-1.76 4.99-4.19 4.99- .82 0-1.59-.42-1.85-.91 0 0-.4 1.58-.49 1.93-.17.62-.72 1.39-1.06 1.84.18.04.37.06.56.06 5.52 0 10-4.48 10-10S17.52 1 12 1z"></path>
  </svg>
);


export function SocialShareButtons({ toolName, toolId }: SocialShareButtonsProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Ensure this runs only on the client side after hydration
    setCurrentUrl(window.location.href.split('#')[0] + `#${toolId}`); // Get base URL + tool fragment
  }, [toolId]);


  const shareText = `Check out this AI tool: ${toolName}!`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    // Pinterest share requires an image URL, which we don't have readily available per tool here.
    // Providing a basic link share, though not ideal for Pinterest.
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(shareText)}`
  };

  const copyToClipboard = () => {
    if (!currentUrl) return; // Don't copy if URL isn't set yet
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast({ title: "Copied!", description: "Tool link copied to clipboard." });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
      });
  };


  if (!currentUrl) {
     // Optionally render a loading state or null while waiting for the URL
    return <div className="h-9"></div>; // Placeholder with same height as button row
  }

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
          <Twitter className="h-4 w-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" />
        </a>
      </Button>
       <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" />
        </a>
      </Button>
       <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        asChild
      >
        <a href={shareUrls.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest">
          <PinterestIcon />
        </a>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={copyToClipboard}
        aria-label="Copy link"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
