// src/components/user-profile-form.tsx
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
import { doc, getDoc } from "firebase/firestore";

interface UserProfileData {
  fullName?: string;
  bio?: string;
  // Add other profile fields here
}

export function UserProfileForm() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  // Add state for other profile fields
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfileData(null);
        return;
      }

      setIsLoading(true);
      try {
        const profileRef = doc(db, "users", user.id);
        const profileDoc = await getDoc(profileRef);

        if (profileDoc.exists()) {
          const data = profileDoc.data() as UserProfileData;
          setProfileData(data);
          setFullName(data.fullName || "");
          setBio(data.bio || "");
          // Set state for other profile fields
        } else {
          // Initialize with Clerk data if no profile exists
          setProfileData({});
          setFullName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
          setBio("");
           // Initialize other fields
        }
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
        toast({
          title: "Error!",
          description: "Failed to fetch user profile.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user) {
      toast({
        title: "Not authenticated.",
        description: "You must be signed in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const functions = getFunctions(getApp());
      const updateUserProfileFn = httpsCallable(functions, 'updateUserProfile');
      await updateUserProfileFn({ userId: user.id, fullName, bio }); // Add other fields here

      toast({
        title: "Success!",
        description: "User profile updated successfully.",
      });
    } catch (error: any) {
      console.error("Error updating user profile:", error);
      toast({
        title: "Error!",
        description: error.message || "Failed to update user profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className="container mx-auto py-10 text-center">Please sign in to manage your profile.</div>;
  }

  if (isLoading && !profileData) {
      return <div className="container mx-auto py-10 text-center">Loading profile...</div>;
  }


  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5">Your Profile</h1>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          {user.imageUrl ? (
            <AvatarImage src={user.imageUrl} alt={user.fullName || "User Avatar"} />
          ) : (
            <AvatarFallback>{user.fullName ? user.fullName[0] : "U"}</AvatarFallback>
          )}
        </Avatar>
        <div>
           <p className="text-xl font-medium">{user.fullName}</p>
           <p className="text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </div>
        {/* Add input fields for other profile fields */}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </div>
  );
}