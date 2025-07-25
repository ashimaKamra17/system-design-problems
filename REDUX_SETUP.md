# Redux State Management Setup

## 🎯 Overview

The News Feed application now uses **Redux Toolkit** for centralized state management, providing predictable data flow and better debugging capabilities.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Redux Store                          │
├─────────────────────────────────────────────────────────┤
│  Posts Slice          │  UI Slice                       │
│  • posts[]            │  • theme                        │
│  • pagination         │  • notifications[]              │
│  • loading states     │  • modals                       │
│  • error states       │  • toast                        │
│                       │  • sidebar                      │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │
┌─────────────────────────────────────────────────────────┐
│                   React Components                      │
├─────────────────────────────────────────────────────────┤
│  NewsFeed ──────────────── usePosts(), useUI()         │
│  CreatePost ────────────── useAppDispatch()            │
│  NewsFeedPosts ─────────── useAppDispatch()            │
│  Header ────────────────── useUI()                     │
│  Toast ─────────────────── useUI(), useAppDispatch()   │
└─────────────────────────────────────────────────────────┘
```

## 📁 File Structure

```
src/
├── store/
│   ├── index.js           # Store configuration
│   └── slices/
│       ├── postsSlice.js  # Posts state management
│       └── uiSlice.js     # UI state management
├── hooks/
│   └── redux.js           # Custom Redux hooks
└── components/
    └── Toast/
        ├── Toast.jsx      # Toast notification component
        └── toast.style.js # Toast styles
```

## 🔄 State Structure

### Posts Slice

```javascript
{
  posts: [],              // Array of post objects
  currentPost: null,      // Currently selected post
  pagination: {
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0,
    postsPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false
  },
  loading: {
    fetchPosts: false,    // Loading state for fetching posts
    createPost: false,    // Loading state for creating posts
    fetchPost: false      // Loading state for single post
  },
  error: {
    fetchPosts: null,     // Error message for fetch operations
    createPost: null,     // Error message for create operations
    fetchPost: null       // Error message for single post fetch
  }
}
```

### UI Slice

```javascript
{
  theme: 'midnight',       // Current theme
  notifications: [],       // User notifications
  modals: {
    isCreatePostExpanded: false,
    isImagePreviewOpen: false,
    currentImageUrl: null
  },
  toast: {
    isVisible: false,
    message: '',
    type: 'info'          // info, success, error, warning
  },
  sidebar: {
    isOpen: false,
    activeTab: 'home'     // home, profile, settings
  }
}
```

## 🔧 Redux Toolkit Features Used

### 1. **createSlice**

Automatically generates action creators and action types:

```javascript
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostLikes: (state, action) => {
      // Immer allows direct state mutation
      const post = state.posts.find((p) => p.id === action.payload.postId);
      if (post) {
        post.likes = action.payload.newCount;
      }
    },
  },
});
```

### 2. **createAsyncThunk**

Handles async operations with automatic pending/fulfilled/rejected actions:

```javascript
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await apiService.posts.getAll(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### 3. **configureStore**

Sets up the store with good defaults:

```javascript
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
```

## 🎣 Custom Hooks

### useAppDispatch

```javascript
const dispatch = useAppDispatch();
dispatch(fetchPosts({ page: 1, limit: 10 }));
```

### usePosts

```javascript
const { posts, pagination, loading, error } = usePosts();
```

### useUI

```javascript
const { theme, notifications, toast } = useUI();
```

## 📡 Data Flow Examples

### 1. **Fetching Posts**

```javascript
// Component
useEffect(() => {
  dispatch(fetchPosts({ page: 1, limit: 10 }));
}, [dispatch]);

// Flow:
// 1. Component dispatches fetchPosts
// 2. Async thunk calls API
// 3. On success: updates posts and pagination
// 4. On error: updates error state
// 5. Component re-renders with new data
```

### 2. **Creating a Post**

```javascript
// Component
const handleNewPost = async (postData) => {
  const result = await dispatch(createPost(postData));
  if (createPost.fulfilled.match(result)) {
    dispatch(showToast({ message: "Success!", type: "success" }));
  }
};

// Flow:
// 1. Component dispatches createPost
// 2. Async thunk calls API
// 3. On success: adds post to beginning of posts array
// 4. Shows success toast
// 5. Component re-renders with new post
```

### 3. **Liking a Post**

```javascript
// Component
const handleLike = (post) => {
  dispatch(
    updatePostLikes({
      postId: post.id,
      liked: !post.isLiked,
      newCount: post.isLiked ? post.likes - 1 : post.likes + 1,
    })
  );
};

// Flow:
// 1. Component dispatches updatePostLikes
// 2. Reducer finds post and updates likes
// 3. Component re-renders with updated like count
```

## 🚀 Benefits of Redux Implementation

### 1. **Centralized State**

- All application state in one place
- Easy to debug with Redux DevTools
- Predictable state updates

### 2. **Better Error Handling**

- Consistent error states across the app
- Easy to show user-friendly error messages
- Centralized retry logic

### 3. **Optimized Re-renders**

- Components only re-render when relevant state changes
- useSelector optimizes subscriptions automatically

### 4. **Scalability**

- Easy to add new features and state
- Clean separation of concerns
- Testable business logic

### 5. **Developer Experience**

- Redux DevTools integration
- Time-travel debugging
- Hot reloading support

## 🧪 Testing Redux

### Testing Actions

```javascript
import { fetchPosts } from "../store/slices/postsSlice";

test("fetchPosts creates correct action", () => {
  const expectedAction = {
    type: "posts/fetchPosts/pending",
  };
  // Test async thunk
});
```

### Testing Reducers

```javascript
import postsReducer, { updatePostLikes } from "../store/slices/postsSlice";

test("updatePostLikes updates post correctly", () => {
  const initialState = {
    posts: [{ id: "1", likes: 5, isLiked: false }],
  };

  const action = updatePostLikes({
    postId: "1",
    liked: true,
    newCount: 6,
  });

  const newState = postsReducer(initialState, action);
  expect(newState.posts[0].likes).toBe(6);
});
```

## 🔮 Future Enhancements

### 1. **Persistence**

```javascript
// Add redux-persist for offline support
import { persistStore, persistReducer } from "redux-persist";
```

### 2. **Middleware**

```javascript
// Add custom middleware for analytics
const analyticsMiddleware = (store) => (next) => (action) => {
  // Log actions for analytics
  return next(action);
};
```

### 3. **Optimistic Updates**

```javascript
// Update UI immediately, rollback on error
const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ postId, liked }, { dispatch, rejectWithValue }) => {
    // Optimistically update UI
    dispatch(updatePostLikes({ postId, liked }));

    try {
      await apiService.posts.like(postId, liked);
    } catch (error) {
      // Rollback on error
      dispatch(updatePostLikes({ postId, liked: !liked }));
      return rejectWithValue(error.message);
    }
  }
);
```

## 📊 Performance Considerations

1. **Selective Subscriptions**: Use specific selectors to avoid unnecessary re-renders
2. **Memoized Selectors**: Use `createSelector` for computed state
3. **Normalized State**: Consider normalizing posts for large datasets
4. **Lazy Loading**: Load slices only when needed

Your News Feed now has **enterprise-grade state management** with Redux Toolkit! 🎉
