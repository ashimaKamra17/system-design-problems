import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// In-memory storage (in production, this would be a database)
let posts = [
  {
    id: "post-1",
    userName: "John Doe",
    userAvatar: "linear-gradient(45deg, #667eea, #764ba2)",
    time: "2 hours ago",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    content:
      "Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. Can't wait for the next adventure! 🏔️✨",
    hasImage: true,
    imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    imageUrl: null,
    likes: 124,
    comments: 18,
    shares: 5,
  },
  {
    id: "post-2",
    userName: "Tech News Daily",
    userAvatar: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
    time: "4 hours ago",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    content:
      "🚀 Breaking: New AI breakthrough promises to revolutionize how we interact with technology. Researchers have developed a system that can understand context better than ever before. What are your thoughts on the future of AI?",
    hasImage: false,
    imageGradient: null,
    imageUrl: null,
    likes: 89,
    comments: 42,
    shares: 12,
  },
  {
    id: "post-3",
    userName: "Food & Travel",
    userAvatar: "linear-gradient(45deg, #4ecdc4, #44a08d)",
    time: "6 hours ago",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    content:
      "Discovered this hidden gem of a restaurant today! The pasta was incredible and the atmosphere was so cozy. Sometimes the best places are the ones you stumble upon by accident. 🍝❤️",
    hasImage: true,
    imageGradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)",
    imageUrl: null,
    likes: 67,
    comments: 23,
    shares: 8,
  },
  {
    id: "post-4",
    userName: "Sarah Chen",
    userAvatar: "linear-gradient(45deg, #a8edea, #fed6e3)",
    time: "8 hours ago",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    content:
      "Working on some exciting new projects! The creative process is so rewarding when everything starts coming together. Collaboration makes everything better 💡✨ #creativity #teamwork",
    hasImage: true,
    imageGradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    imageUrl: null,
    likes: 156,
    comments: 31,
    shares: 15,
  },
  {
    id: "post-5",
    userName: "Daily Inspiration",
    userAvatar: "linear-gradient(45deg, #fdbb2d, #22c1c3)",
    time: "10 hours ago",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    content:
      '"The only way to do great work is to love what you do." - Steve Jobs\n\nStarting this Monday with motivation and positive energy. What\'s inspiring you this week? 🌟',
    hasImage: false,
    imageGradient: null,
    imageUrl: null,
    likes: 203,
    comments: 87,
    shares: 25,
  },
];

// Helper function to calculate time ago
const getTimeAgo = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffInMinutes = Math.floor((now - created) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return created.toLocaleDateString();
};

// GET /api/posts - Fetch posts with cursor-based pagination
router.get("/", (req, res) => {
  try {
    // Extract cursor-based pagination parameters
    const limit = parseInt(req.query.limit) || 10;
    const cursor = req.query.cursor; // ISO timestamp or null for first page
    const direction = req.query.direction || "next"; // 'next' or 'prev'

    // Validate parameters
    if (limit < 1 || limit > 50) {
      return res.status(400).json({
        error: "Invalid pagination parameters",
        message: "Limit must be between 1 and 50",
      });
    }

    // Sort posts by creation time (newest first)
    const sortedPosts = [...posts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    let filteredPosts = sortedPosts;

    // Apply cursor filtering
    if (cursor) {
      const cursorDate = new Date(cursor);

      if (direction === "next") {
        // Get posts older than cursor
        filteredPosts = sortedPosts.filter(
          (post) => new Date(post.createdAt) < cursorDate
        );
      } else if (direction === "prev") {
        // Get posts newer than cursor
        filteredPosts = sortedPosts.filter(
          (post) => new Date(post.createdAt) > cursorDate
        );
        // For previous page, we need to reverse and limit, then reverse again
        filteredPosts = filteredPosts.slice(-limit).reverse();
      }
    }

    // Apply limit
    const paginatedPosts =
      direction === "prev" ? filteredPosts : filteredPosts.slice(0, limit);

    // Update time ago for each post
    const postsWithUpdatedTime = paginatedPosts.map((post) => ({
      ...post,
      time: getTimeAgo(post.createdAt),
      avatarGradient: post.userAvatar, // Map to frontend expected field name
    }));

    // Calculate cursor metadata
    const hasNextPage = direction === "next" && filteredPosts.length > limit;
    const hasPrevPage = cursor !== null && cursor !== undefined;

    // Set cursors for next/prev pages
    const nextCursor =
      hasNextPage && paginatedPosts.length > 0
        ? paginatedPosts[paginatedPosts.length - 1].createdAt
        : null;

    const prevCursor =
      paginatedPosts.length > 0 ? paginatedPosts[0].createdAt : null;

    const response = {
      posts: postsWithUpdatedTime,
      pagination: {
        limit,
        hasNextPage,
        hasPrevPage,
        nextCursor,
        prevCursor,
        totalPosts: posts.length, // This could be expensive in real DB, consider removing
        direction,
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST /api/posts - Create a new post
router.post("/", (req, res) => {
  try {
    const { userName, content, hasImage, imageUrl } = req.body;

    // Validation
    if (!userName || !content) {
      return res.status(400).json({
        error: "Missing required fields",
        message: "userName and content are required",
      });
    }

    if (content.length > 5000) {
      return res.status(400).json({
        error: "Content too long",
        message: "Content must be less than 5000 characters",
      });
    }

    // Create new post
    const newPost = {
      id: uuidv4(),
      userName: userName.trim(),
      userAvatar: "linear-gradient(45deg, #667eea, #764ba2)", // Default avatar
      time: "Just now",
      createdAt: new Date().toISOString(),
      content: content.trim(),
      hasImage: Boolean(hasImage),
      imageGradient: hasImage
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : null,
      imageUrl: imageUrl || null,
      likes: 0,
      comments: 0,
      shares: 0,
    };

    // Add to beginning of posts array (newest first)
    posts.unshift(newPost);

    // Return the created post with frontend expected field names
    const responsePost = {
      ...newPost,
      avatarGradient: newPost.userAvatar,
    };

    res.status(201).json({
      success: true,
      post: responsePost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// GET /api/posts/:id - Fetch a specific post
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const responsePost = {
      ...post,
      time: getTimeAgo(post.createdAt),
      avatarGradient: post.userAvatar,
    };

    res.json({ post: responsePost });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

export default router;
