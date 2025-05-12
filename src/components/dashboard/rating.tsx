// src/components/dashboard/rating.tsx

"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";
import { db } from "@/lib/firebase"; // Import the Firestore instance
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Label } from "@/components/ui/label";

interface RatingProps {
    toolId: string;
}

export function Rating({ toolId }: RatingProps) {
    const [rating, setRating] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useUser();

    useEffect(() => {
        const fetchRating = async () => {
            if (!user) {
                return;
            }

            setIsLoading(true);
            try {
                const ratingRef = doc(db, "ratings", `${toolId}_${user.id}`);
                const ratingDoc = await getDoc(ratingRef);

                if (ratingDoc.exists()) {
                    setRating(ratingDoc.data().rating);
                } else {
                    setRating(null);
                }
            } catch (error: any) {
                console.error("Error fetching rating:", error);
                toast({
                    title: "Error!",
                    description: "Failed to fetch rating.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRating();
    }, [toolId, user, toast]);

    const handleRating = async (newRating: number) => {
        if (!user) {
            toast({
                title: "Not authenticated.",
                description: "You must be signed in to add a rating.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            const functions = getFunctions(getApp());
            const addRating = httpsCallable(functions, 'addRating');
            await addRating({ toolId: toolId, rating: newRating });

            toast({
                title: "Success!",
                description: "Your rating has been added.",
            });
            setRating(newRating);
        } catch (error: any) {
            console.error("Error adding rating:", error);
            toast({
                title: "Error!",
                description: error.message || "Failed to add rating.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <div>
            <Label>Rate this tool:</Label>
            <div>
                {stars.map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRating(star)}
                        disabled={isLoading}
                    >
                        <span
                            style={{
                                color: star <= (rating || 0) ? "#ffc107" : "#e4e5e9",
                                fontSize: "24px",
                                cursor: "pointer",
                            }}
                        >
                            ★
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}