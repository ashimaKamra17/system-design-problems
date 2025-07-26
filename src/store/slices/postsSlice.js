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

// Optimistic update thunks
export const togglePostLike = createAsyncThunk(
  "posts/togglePostLike",
  async (
    { postId, isCurrentlyLiked },
    { dispatch, rejectWithValue, getState }
  ) => {
    const newLikedState = !isCurrentlyLiked;

    // Optimistically update the UI immediately
    dispatch(
      updatePostLikes({
        postId,
        liked: newLikedState,
        newCount: newLikedState
          ? (getState().posts.posts.find((p) => p.id === postId)?.likes || 0) +
            1
          : Math.max(
              0,
              (getState().posts.posts.find((p) => p.id === postId)?.likes ||
                0) - 1
            ),
      })
    );

    try {
      // Make the actual API call
      const response = await apiService.posts.toggleLike(postId, newLikedState);

      // Update with server response (in case counts differ)
      return {
        postId,
        likes: response.likes,
        isLiked: response.isLiked,
        optimistic: false,
      };
    } catch (error) {
      // Rollback the optimistic update on failure
      dispatch(
        updatePostLikes({
          postId,
          liked: isCurrentlyLiked, // Revert to original state
          newCount:
            getState().posts.posts.find((p) => p.id === postId)?.likes || 0,
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

export const addPostComment = createAsyncThunk(
  "posts/addPostComment",
  async (
    { postId, content, userName },
    { dispatch, rejectWithValue, getState }
  ) => {
    // Generate optimistic comment
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      content,
      userName,
      createdAt: new Date().toISOString(),
      time: "Just now",
      isOptimistic: true,
    };

    // Optimistically update the UI immediately
    dispatch(
      updatePostComments({
        postId,
        newCount:
          (getState().posts.posts.find((p) => p.id === postId)?.comments || 0) +
          1,
        optimisticComment,
      })
    );

    try {
      // Make the actual API call
      const response = await apiService.posts.addComment(postId, {
        content,
        userName,
      });

      // Replace optimistic comment with real one
      return {
        postId,
        realComment: response.comment,
        totalComments: response.totalComments,
        optimisticCommentId: optimisticComment.id,
      };
    } catch (error) {
      // Rollback the optimistic update on failure
      dispatch(
        removeOptimisticComment({
          postId,
          optimisticCommentId: optimisticComment.id,
        })
      );

      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  currentPost: null,
  optimisticUpdates: {}, // Track ongoing optimistic updates
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
    like: {}, // Track loading states per post: { [postId]: boolean }
    comment: {}, // Track loading states per post: { [postId]: boolean }
  },
  error: {
    fetchPosts: null,
    loadMore: null,
    loadPrevious: null,
    refresh: null,
    createPost: null,
    fetchPost: null,
    like: {}, // Track errors per post: { [postId]: string }
    comment: {}, // Track errors per post: { [postId]: string }
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
        like: {},
        comment: {},
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
    updatePostComments: (state, action) => {
      const { postId, newCount, optimisticComment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments = newCount;
        // Store optimistic comment for potential rollback
        if (optimisticComment) {
          state.optimisticUpdates[postId] =
            state.optimisticUpdates[postId] || {};
          state.optimisticUpdates[postId].comments =
            state.optimisticUpdates[postId].comments || [];
          state.optimisticUpdates[postId].comments.push(optimisticComment);
        }
      }
    },
    removeOptimisticComment: (state, action) => {
      const { postId, optimisticCommentId } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments = Math.max(0, post.comments - 1);
        // Remove optimistic comment from tracking
        if (state.optimisticUpdates[postId]?.comments) {
          state.optimisticUpdates[postId].comments = state.optimisticUpdates[
            postId
          ].comments.filter((c) => c.id !== optimisticCommentId);
        }
      }
    },
    clearPostError: (state, action) => {
      const { postId, type } = action.payload; // type: 'like' or 'comment'
      if (state.error[type] && state.error[type][postId]) {
        delete state.error[type][postId];
      }
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
      state.optimisticUpdates = {};
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

    // Optimistic like toggle
    builder
      .addCase(togglePostLike.pending, (state, action) => {
        const { postId } = action.meta.arg;
        state.loading.like[postId] = true;
        state.error.like[postId] = null;
      })
      .addCase(togglePostLike.fulfilled, (state, action) => {
        const { postId, likes, isLiked } = action.payload;
        state.loading.like[postId] = false;

        // Update with server response (reconcile any differences)
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.likes = likes;
          post.isLiked = isLiked;
        }

        state.error.like[postId] = null;
      })
      .addCase(togglePostLike.rejected, (state, action) => {
        const { postId } = action.meta.arg;
        state.loading.like[postId] = false;
        state.error.like[postId] = action.payload;
      });

    // Optimistic comment add
    builder
      .addCase(addPostComment.pending, (state, action) => {
        const { postId } = action.meta.arg;
        state.loading.comment[postId] = true;
        state.error.comment[postId] = null;
      })
      .addCase(addPostComment.fulfilled, (state, action) => {
        const { postId, totalComments, optimisticCommentId } = action.payload;
        state.loading.comment[postId] = false;

        // Update comment count with server response
        const post = state.posts.find((p) => p.id === postId);
        if (post) {
          post.comments = totalComments;
        }

        // Remove optimistic comment from tracking (it's now real)
        if (state.optimisticUpdates[postId]?.comments) {
          state.optimisticUpdates[postId].comments = state.optimisticUpdates[
            postId
          ].comments.filter((c) => c.id !== optimisticCommentId);
        }

        state.error.comment[postId] = null;
      })
      .addCase(addPostComment.rejected, (state, action) => {
        const { postId } = action.meta.arg;
        state.loading.comment[postId] = false;
        state.error.comment[postId] = action.payload;
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
export const {
  clearErrors,
  clearCurrentPost,
  updatePostLikes,
  updatePostComments,
  removeOptimisticComment,
  clearPostError,
  resetPosts,
} = postsSlice.actions;

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

// Optimistic update selectors
export const selectPostLikeLoading = (state, postId) =>
  state.posts.loading.like[postId] || false;
export const selectPostCommentLoading = (state, postId) =>
  state.posts.loading.comment[postId] || false;
export const selectPostLikeError = (state, postId) =>
  state.posts.error.like[postId] || null;
export const selectPostCommentError = (state, postId) =>
  state.posts.error.comment[postId] || null;

export default postsSlice.reducer;
