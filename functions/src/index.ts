/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize the Firebase Admin SDK
admin.initializeApp();
const db = admin.firestore();

// Function to add a comment to a tool
export const addComment = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("addComment: Unauthenticated user attempted to add a comment.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can add comments."
    );
  }

  const userId = context.auth.uid;
  const { toolId, text } = data;

  // Validate the input
  if (!toolId || !text) {
    console.error(`addComment: Invalid arguments from user ${userId}. toolId: ${toolId}, text: ${text}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'toolId' and 'text'."
    );
  }

  try {
    const newCommentRef = await db.collection("comments").add({
      toolId: toolId,
      userId: userId,
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
    });

    console.log(`addComment: Comment added successfully by user ${userId} for tool ${toolId}. Comment ID: ${newCommentRef.id}`);
    return { id: newCommentRef.id, message: "Comment added successfully." };
  } catch (error: any) {
    console.error(`addComment: Error adding comment for user ${userId} and tool ${toolId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal", // Use 'internal' for unexpected server-side errors
      "Failed to add comment.",
      error.message // Include the original error message for debugging on the client (be cautious with sensitive info)
    );
  }
});

// Function to add or update a rating for a tool
export const addRating = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("addRating: Unauthenticated user attempted to add a rating.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can add ratings."
    );
  }

  const userId = context.auth.uid;
  const { toolId, rating } = data;

  // Validate the input
  if (!toolId || rating === undefined || rating === null) {
    console.error(`addRating: Invalid arguments from user ${userId}. toolId: ${toolId}, rating: ${rating}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'toolId' and 'rating'."
    );
  }

  // Validate rating value (e.g., between 1 and 5)
  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      console.error(`addRating: Invalid rating value from user ${userId} for tool ${toolId}. Rating: ${rating}`);
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Rating must be a number between 1 and 5."
      );
  }

  try {
    // Use a compound key or a subcollection if a user can rate a tool only once
    const ratingRef = db.collection("ratings").doc(`${toolId}_${userId}`);

    await ratingRef.set({
      toolId: toolId,
      userId: userId,
      rating: rating,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true }); // Use merge: true to update if a rating for this tool and user already exists

    console.log(`addRating: Rating added successfully by user ${userId} for tool ${toolId} with rating ${rating}.`);
    return { message: "Rating added successfully." };
  } catch (error) {
    console.error(`addRating: Error adding rating for user ${userId} and tool ${toolId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to add rating.",
      error.message
    );
  }
});

// Function to upvote a comment
export const upvoteComment = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("upvoteComment: Unauthenticated user attempted to upvote a comment.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can upvote comments."
    );
  }

  const userId = context.auth.uid;
  const { commentId } = data;

  // Validate the input
  if (!commentId) {
    console.error(`upvoteComment: Invalid arguments from user ${userId}. commentId: ${commentId}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'commentId'."
    );
  }

  try {
    const commentRef = db.collection("comments").doc(commentId);

    await db.runTransaction(async (transaction) => {
      const commentDoc = await transaction.get(commentRef);

      if (!commentDoc.exists) {
        console.error(`upvoteComment: Comment not found for commentId ${commentId} by user ${userId}.`);
        throw new functions.https.HttpsError(
          "not-found",
          "Comment not found."
        );
      }

      const currentUpvotes = commentDoc.data()?.upvotes || 0;
      transaction.update(commentRef, { upvotes: currentUpvotes + 1 });
    });

    console.log(`upvoteComment: Comment ${commentId} upvoted successfully by user ${userId}.`);
    return { message: "Comment upvoted successfully." };
  } catch (error: any) {
    console.error(`upvoteComment: Error upvoting comment ${commentId} for user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to upvote comment.",
      error.message
    );
  }
});

// Function to downvote a comment
export const downvoteComment = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("downvoteComment: Unauthenticated user attempted to downvote a comment.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can downvote comments."
    );
  }

  const userId = context.auth.uid;
  const { commentId } = data;

  // Validate the input
  if (!commentId) {
    console.error(`downvoteComment: Invalid arguments from user ${userId}. commentId: ${commentId}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'commentId'."
    );
  }

  try {
    const commentRef = db.collection("comments").doc(commentId);

    await db.runTransaction(async (transaction) => {
      const commentDoc = await transaction.get(commentRef);

      if (!commentDoc.exists) {
        console.error(`downvoteComment: Comment not found for commentId ${commentId} by user ${userId}.`);
        throw new functions.https.HttpsError(
          "not-found",
          "Comment not found."
        );
      }

      const currentDownvotes = commentDoc.data()?.downvotes || 0;
      transaction.update(commentRef, { downvotes: currentDownvotes + 1 });
    });

    console.log(`downvoteComment: Comment ${commentId} downvoted successfully by user ${userId}.`);
    return { message: "Comment downvoted successfully." };
  } catch (error: any) {
    console.error(`downvoteComment: Error downvoting comment ${commentId} for user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to downvote comment.",
      error.message
    );
  }
});

// Function to add a reply to a comment
export const addReplyToComment = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("addReplyToComment: Unauthenticated user attempted to add a reply.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can add replies."
    );
  }

  const userId = context.auth.uid;
  const { commentId, text } = data;

  // Validate the input
  if (!commentId || !text) {
    console.error(`addReplyToComment: Invalid arguments from user ${userId}. commentId: ${commentId}, text: ${text}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'commentId' and 'text'."
    );
  }

  try {
    const commentRef = db.collection("comments").doc(commentId);
    const repliesCollectionRef = commentRef.collection("replies");

    const newReplyRef = await repliesCollectionRef.add({
      userId: userId,
      text: text,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
    });

    console.log(`addReplyToComment: Reply added successfully by user ${userId} to comment ${commentId}. Reply ID: ${newReplyRef.id}`);
    return { id: newReplyRef.id, message: "Reply added successfully." };
  } catch (error: any) {
    console.error(`addReplyToComment: Error adding reply for user ${userId} to comment ${commentId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to add reply.",
      error.message
    );
  }
});

// Function to handle user-submitted tool suggestions
export const submitToolSuggestion = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("submitToolSuggestion: Unauthenticated user attempted to submit a tool suggestion.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can submit tool suggestions."
    );
  }

  const userId = context.auth.uid;
  const { name, description, link, categorySlug } = data;

  // Validate the input
  if (!name || !description || !link || !categorySlug) {
    console.error(`submitToolSuggestion: Invalid arguments from user ${userId}. name: ${name}, categorySlug: ${categorySlug}`); // Avoid logging potentially long description/link
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'name', 'description', 'link', and 'categorySlug'."
    );
  }

  try {
    const newSuggestionRef = await db.collection("suggestedTools").add({
      name: name,
      description: description,
      link: link,
      categorySlug: categorySlug,
      suggestedBy: userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      status: "pending", // Status can be 'pending', 'approved', 'rejected'
    });

    console.log(`submitToolSuggestion: Tool suggestion submitted successfully by user ${userId}. Suggestion ID: ${newSuggestionRef.id}`);
    return { id: newSuggestionRef.id, message: "Tool suggestion submitted successfully." };
  } catch (error: any) {
    console.error(`submitToolSuggestion: Error submitting tool suggestion for user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to submit tool suggestion.",
      error.message
    );
  }
});

// Function to approve a tool suggestion
export const approveToolSuggestion = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated and is an admin
  if (!context.auth) {
    console.error("approveToolSuggestion: Unauthenticated user attempted to approve a suggestion.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can approve tool suggestions."
    );
  }

  // Check if the user has the 'admin' claim
  if (!context.auth.token.admin) {
    console.error(`approveToolSuggestion: User ${context.auth.uid} attempted to approve a suggestion without admin privileges.`);
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can approve tool suggestions."
    );
  }

  const { suggestionId } = data;
  const userId = context.auth.uid; // Get user ID for logging

  // Validate the input
  if (!suggestionId) {
    console.error(`approveToolSuggestion: Invalid arguments from admin user ${userId}. suggestionId: ${suggestionId}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'suggestionId'."
    );
  }

  try {
    const suggestionRef = db.collection("suggestedTools").doc(suggestionId);

    await suggestionRef.update({
      status: "approved",
    });

    console.log(`approveToolSuggestion: Tool suggestion ${suggestionId} approved successfully by admin user ${userId}.`);
    return { message: "Tool suggestion approved successfully." };
  } catch (error: any) {
    console.error(`approveToolSuggestion: Error approving tool suggestion ${suggestionId} for admin user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to approve tool suggestion.",
      error.message
    );
  }
});

// Function to reject a tool suggestion
export const rejectToolSuggestion = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated and is an admin
  if (!context.auth) {
    console.error("rejectToolSuggestion: Unauthenticated user attempted to reject a suggestion.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can reject tool suggestions."
    );
  }

  // Check if the user has the 'admin' claim
  if (!context.auth.token.admin) {
    console.error(`rejectToolSuggestion: User ${context.auth.uid} attempted to reject a suggestion without admin privileges.`);
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can reject tool suggestions."
    );
  }

  const { suggestionId } = data;
  const userId = context.auth.uid; // Get user ID for logging

  // Validate the input
  if (!suggestionId) {
    console.error(`rejectToolSuggestion: Invalid arguments from admin user ${userId}. suggestionId: ${suggestionId}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'suggestionId'."
    );
  }

  try {
    const suggestionRef = db.collection("suggestedTools").doc(suggestionId);

    await suggestionRef.update({
      status: "rejected",
    });

    console.log(`rejectToolSuggestion: Tool suggestion ${suggestionId} rejected successfully by admin user ${userId}.`);
    return { message: "Tool suggestion rejected successfully." };
  } catch (error: any) {
    console.error(`rejectToolSuggestion: Error rejecting tool suggestion ${suggestionId} for admin user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to reject tool suggestion.",
      error.message
    );
  }
});

// Function to get comments with pagination
export const getComments = functions.https.onCall(async (data, context) => {
  const { toolId, pageSize, startAfter } = data;

  // Validate the input
  if (!toolId || !pageSize) {
    console.error(`getComments: Invalid arguments. toolId: ${toolId}, pageSize: ${pageSize}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'toolId' and 'pageSize'."
    );
  }

  try {
    let commentsQuery = db.collection("comments")
      .where("toolId", "==", toolId)
      .orderBy("timestamp", "desc")
      .limit(pageSize);

    if (startAfter) {
      const startAfterDoc = await db.collection("comments").doc(startAfter).get();
      if (!startAfterDoc.exists) {
           console.warn(`getComments: startAfter document ${startAfter} not found.`);
           // Optionally throw an error or handle this case differently
      }
       commentsQuery = commentsQuery.startAfter(startAfterDoc);
    }

    const snapshot = await commentsQuery.get();

    const comments: any[] = [];
    snapshot.forEach(doc => {
      comments.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    let lastVisible = null;
    if (!snapshot.empty) {
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
    }

    console.log(`getComments: Successfully fetched ${comments.length} comments for tool ${toolId}. Last visible: ${lastVisible?.id || 'none'}`);

    return {
      comments: comments,
      lastVisible: lastVisible?.id || null,
    };
  } catch (error: any) {
    console.error(`getComments: Error fetching comments for tool ${toolId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to fetch comments.",
      error.message
    );
  }
});

// Function to update a user's profile
export const updateUserProfile = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("updateUserProfile: Unauthenticated user attempted to update profile.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can update their profile."
    );
  }

  const userId = context.auth.uid;
  const { fullName, bio, customField } = data; // Example fields

  // Basic validation (you can add more validation as needed)
  if (fullName === undefined && bio === undefined && customField === undefined) {
      console.error(`updateUserProfile: No profile fields provided for user ${userId}.`);
      throw new functions.https.HttpsError(
          "invalid-argument",
          "At least one profile field must be provided."
      );
  }

  try {
    const userProfileRef = db.collection("users").doc(userId);

    const updateData: { [key: string]: any } = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (bio !== undefined) updateData.bio = bio;
    if (customField !== undefined) updateData.customField = customField; // Example custom field

    await userProfileRef.set(updateData, { merge: true }); // Use merge: true to avoid overwriting other fields

    console.log(`updateUserProfile: Profile updated successfully for user ${userId}.`);
    return { message: "User profile updated successfully." };
  } catch (error: any) {
    console.error(`updateUserProfile: Error updating profile for user ${userId}. Error: ${error.message}`, error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to update user profile.",
      error.message
    );
  }
});

// Function to create a new forum (Admin only)
export const createForum = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("createForum: Unauthenticated user attempted to create a forum.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can create forums."
    );
  }

  // Check if the user has the 'admin' claim
  if (!context.auth.token.admin) {
    console.error(`createForum: User ${context.auth.uid} attempted to create a forum without admin privileges.`);
    throw new functions.https.HttpsError(
      "permission-denied",
      "Only admins can create forums."
    );
  }

  const userId = context.auth.uid;
  const { name, description, slug } = data;

  // Validate the input
  if (!name || !description || !slug) {
    console.error(`createForum: Invalid arguments from admin user ${userId}. name: ${name}, slug: ${slug}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'name', 'description', and 'slug'."
    );
  }

  // Basic slug validation (can be enhanced)
  if (!/^[a-z0-9-]+$/.test(slug)) {
       console.error(`createForum: Invalid slug format from admin user ${userId}. slug: ${slug}`);
       throw new functions.https.HttpsError(
           "invalid-argument",
           "Slug must be lowercase, alphanumeric, and can contain hyphens."
       );
   }

  try {
    const forumRef = db.collection("forums").doc(slug);

    // Check if a forum with this slug already exists
    const forumDoc = await forumRef.get();
    if (forumDoc.exists) {
        console.error(`createForum: Forum with slug '${slug}' already exists. Admin user ${userId}.`);
        throw new functions.https.HttpsError(
            "already-exists",
            `Forum with slug '${slug}' already exists.`
        );
    }

    const newForumData = {
      name: name,
      description: description,
      topicCount: 0,
      postCount: 0,
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: userId,
    };

    await forumRef.set(newForumData);

    console.log(`createForum: Forum '${name}' (slug: ${slug}) created successfully by admin user ${userId}.`);
    return { id: slug, message: "Forum created successfully." };
  } catch (error: any) {
    console.error(`createForum: Error creating forum for admin user ${userId}. Error: ${error.message}`, error);
     // Re-throw if it's already an HttpsError, otherwise wrap in internal
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "Failed to create forum.",
      error.message
    );
  }
});

// Function to create a new topic in a forum
export const createTopic = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    console.error("createTopic: Unauthenticated user attempted to create a topic.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated users can create topics."+
    );
  }

  const userId = context.auth.uid;
  const { forumId, title, content } = data;

  // Validate the input
  if (!forumId || !title || !content) {
    console.error(`createTopic: Invalid arguments from user ${userId}. forumId: ${forumId}, title: ${title}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with 'forumId', 'title', and 'content'."
    );
  }

  const forumRef = db.collection("forums").doc(forumId);

  try {
    // Use a transaction to ensure atomicity when updating counts
    const newTopicRef = await db.runTransaction(async (transaction) => {
      const forumDoc = await transaction.get(forumRef);

      // Check if the forum exists
      if (!forumDoc.exists) {
        console.error(`createTopic: Forum not found for forumId ${forumId} by user ${userId}.`);
        throw new functions.https.HttpsError(
          "not-found",
          "Forum not found."
        );
      }

      // Create the new topic document
      const topicCollectionRef = db.collection("topics");
      const newTopicRef = topicCollectionRef.doc(); // Let Firestore auto-generate ID
      const newTopicData = {
        forumId: forumId,
        title: title,
        userId: userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        postCount: 1, // The initial post is the topic starter
        viewCount: 0,
        lastReplyAt: admin.firestore.FieldValue.serverTimestamp(),
        lastReplyBy: userId,
        isPinned: false,
        isLocked: false,
      };
      transaction.set(newTopicRef, newTopicData);

      // Create the initial post for the topic
      const postsCollectionRef = db.collection("posts");
      const newPostRef = postsCollectionRef.doc(); // Let Firestore auto-generate ID
      const newPostData = {
        topicId: newTopicRef.id,
        forumId: forumId, // Denormalized
        userId: userId,
        content: content,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        upvotes: 0,
        downvotes: 0,
        isTopicStarter: true,
      };
       transaction.set(newPostRef, newPostData);


      // Update the topic count and last activity in the forum document
      const currentTopicCount = forumDoc.data()?.topicCount || 0;
      const currentPostCount = forumDoc.data()?.postCount || 0;

      transaction.update(forumRef, {
          topicCount: currentTopicCount + 1,
          postCount: currentPostCount + 1, // Count the initial post
          lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
      });


      return newTopicRef; // Return the reference to the new topic
    });

    console.log(`createTopic: Topic '${title}' created successfully by user ${userId} in forum ${forumId}. Topic ID: ${newTopicRef.id}`);
    return { id: newTopicRef.id, message: "Topic created successfully." };
  } catch (error: any) {
    console.error(`createTopic: Error creating topic for user ${userId} in forum ${forumId}. Error: ${error.message}`, error);
    if (error instanceof functions.https.HttpsError) {
        throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      "Failed to create topic.",
      error.message
    );
  }
});