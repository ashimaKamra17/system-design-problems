import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";

// Async thunks for API calls
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (
    { cursor = null, limit = 10, direction = "next", reset = false } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService.posts.getAll({
        cursor,
        limit,
        direction,
      });
      return { ...response, reset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadMorePosts = createAsyncThunk(
  "posts/loadMorePosts",
  async ({ cursor, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.getNextPage(cursor, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loadPreviousPosts = createAsyncThunk(
  "posts/loadPreviousPosts",
  async ({ cursor, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.getPrevPage(cursor, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshPosts = createAsyncThunk(
  "posts/refreshPosts",
  async ({ limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.getFirstPage(limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.create(postData);
      return response.post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.getById(postId);
      return response.post;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  currentPost: null,
  pagination: {
    hasNextPage: false,
    hasPrevPage: false,
    nextCursor: null,
    prevCursor: null,
    limit: 10,
    totalPosts: 0,
    direction: "next",
  },
  loading: {
    fetchPosts: false,
    loadMore: false,
    loadPrevious: false,
    refresh: false,
    createPost: false,
    fetchPost: false,
  },
  error: {
    fetchPosts: null,
    loadMore: null,
    loadPrevious: null,
    refresh: null,
    createPost: null,
    fetchPost: null,
  },
};

// Posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Synchronous actions
    clearErrors: (state) => {
      state.error = {
        fetchPosts: null,
        loadMore: null,
        loadPrevious: null,
        refresh: null,
        createPost: null,
        fetchPost: null,
      };
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    updatePostLikes: (state, action) => {
      const { postId, liked, newCount } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes = newCount;
        post.isLiked = liked;
      }
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },
  },
  extraReducers: (builder) => {
    // Fetch posts (initial load or navigation)
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading.fetchPosts = true;
        state.error.fetchPosts = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading.fetchPosts = false;
        const { posts, pagination, reset } = action.payload;

        if (reset) {
          state.posts = posts;
        } else {
          // Handle direction-based updates
          if (pagination.direction === "next") {
            state.posts = posts;
          } else if (pagination.direction === "prev") {
            state.posts = posts;
          }
        }

        state.pagination = pagination;
        state.error.fetchPosts = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading.fetchPosts = false;
        state.error.fetchPosts = action.payload;
      });

    // Load more posts (infinite scroll)
    builder
      .addCase(loadMorePosts.pending, (state) => {
        state.loading.loadMore = true;
        state.error.loadMore = null;
      })
      .addCase(loadMorePosts.fulfilled, (state, action) => {
        state.loading.loadMore = false;
        // Append new posts to existing ones
        state.posts.push(...action.payload.posts);
        state.pagination = action.payload.pagination;
        state.error.loadMore = null;
      })
      .addCase(loadMorePosts.rejected, (state, action) => {
        state.loading.loadMore = false;
        state.error.loadMore = action.payload;
      });

    // Load previous posts
    builder
      .addCase(loadPreviousPosts.pending, (state) => {
        state.loading.loadPrevious = true;
        state.error.loadPrevious = null;
      })
      .addCase(loadPreviousPosts.fulfilled, (state, action) => {
        state.loading.loadPrevious = false;
        // Prepend new posts to existing ones
        state.posts.unshift(...action.payload.posts);
        state.pagination = action.payload.pagination;
        state.error.loadPrevious = null;
      })
      .addCase(loadPreviousPosts.rejected, (state, action) => {
        state.loading.loadPrevious = false;
        state.error.loadPrevious = action.payload;
      });

    // Refresh posts
    builder
      .addCase(refreshPosts.pending, (state) => {
        state.loading.refresh = true;
        state.error.refresh = null;
      })
      .addCase(refreshPosts.fulfilled, (state, action) => {
        state.loading.refresh = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
        state.error.refresh = null;
      })
      .addCase(refreshPosts.rejected, (state, action) => {
        state.loading.refresh = false;
        state.error.refresh = action.payload;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading.createPost = true;
        state.error.createPost = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading.createPost = false;
        // Add new post to the beginning of the array
        state.posts.unshift(action.payload);
        // Update pagination
        state.pagination.totalPosts += 1;
        state.error.createPost = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading.createPost = false;
        state.error.createPost = action.payload;
      });

    // Fetch single post
    builder
      .addCase(fetchPostById.pending, (state) => {
        state.loading.fetchPost = true;
        state.error.fetchPost = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading.fetchPost = false;
        state.currentPost = action.payload;
        state.error.fetchPost = null;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading.fetchPost = false;
        state.error.fetchPost = action.payload;
      });
  },
});

// Export actions
export const { clearErrors, clearCurrentPost, updatePostLikes, resetPosts } =
  postsSlice.actions;

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectPagination = (state) => state.posts.pagination;
export const selectPostsLoading = (state) => state.posts.loading.fetchPosts;
export const selectLoadMoreLoading = (state) => state.posts.loading.loadMore;
export const selectLoadPreviousLoading = (state) =>
  state.posts.loading.loadPrevious;
export const selectRefreshLoading = (state) => state.posts.loading.refresh;
export const selectCreatePostLoading = (state) =>
  state.posts.loading.createPost;
export const selectFetchPostLoading = (state) => state.posts.loading.fetchPost;
export const selectPostsError = (state) => state.posts.error.fetchPosts;
export const selectLoadMoreError = (state) => state.posts.error.loadMore;
export const selectCreatePostError = (state) => state.posts.error.createPost;
export const selectFetchPostError = (state) => state.posts.error.fetchPost;

export default postsSlice.reducer;
