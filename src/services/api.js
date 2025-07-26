import axios from "axios";

// Base URL for the API
const API_BASE_URL = "http://localhost:3002/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (for future authentication tokens)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error:", error.message);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// API Functions
export const apiService = {
  // Health check
  health: async () => {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      throw new Error("Failed to check server health");
    }
  },

  // Posts API
  posts: {
    // Get posts with cursor-based pagination
    getAll: async ({ cursor = null, limit = 10, direction = "next" } = {}) => {
      try {
        const params = { limit, direction };

        // Only add cursor if it's not null
        if (cursor) {
          params.cursor = cursor;
        }

        const response = await api.get("/posts", { params });
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch posts");
      }
    },

    // Convenience method for first page
    getFirstPage: async (limit = 10) => {
      return apiService.posts.getAll({ limit, direction: "next" });
    },

    // Convenience method for next page
    getNextPage: async (cursor, limit = 10) => {
      return apiService.posts.getAll({ cursor, limit, direction: "next" });
    },

    // Convenience method for previous page
    getPrevPage: async (cursor, limit = 10) => {
      return apiService.posts.getAll({ cursor, limit, direction: "prev" });
    },

    // Get single post
    getById: async (id) => {
      try {
        const response = await api.get(`/posts/${id}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch post");
      }
    },

    // Create new post
    create: async (postData) => {
      try {
        const response = await api.post("/posts", postData);
        return response.data;
      } catch (error) {
        if (error.response?.status === 400) {
          throw new Error(error.response.data.message || "Invalid post data");
        }
        throw new Error("Failed to create post");
      }
    },

    // Like/Unlike a post
    toggleLike: async (postId, isLiked) => {
      try {
        const response = await api.post(`/posts/${postId}/like`, { isLiked });
        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          throw new Error("Post not found");
        } else if (error.response?.status === 500) {
          throw new Error(
            error.response.data.message || "Like operation failed"
          );
        }
        throw new Error("Failed to update like status");
      }
    },

    // Add comment to a post
    addComment: async (postId, commentData) => {
      try {
        const response = await api.post(
          `/posts/${postId}/comment`,
          commentData
        );
        return response.data;
      } catch (error) {
        if (error.response?.status === 404) {
          throw new Error("Post not found");
        } else if (error.response?.status === 400) {
          throw new Error(
            error.response.data.message || "Invalid comment data"
          );
        } else if (error.response?.status === 500) {
          throw new Error(
            error.response.data.message || "Comment operation failed"
          );
        }
        throw new Error("Failed to add comment");
      }
    },
  },
};

export default apiService;
