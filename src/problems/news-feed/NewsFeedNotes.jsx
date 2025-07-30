import React from 'react';
import { NoteSection, Code, Concepts, Complexity } from '../../components/NotebookLayout/NotebookLayout';

function NewsFeedNotes() {
    return (
        <>
            <NoteSection title="🔍 Requirements Exploration">
                <Concepts items={[
                    "What type of posts? (text, images, videos, links)",
                    "Real-time updates or manual refresh?",
                    "How many posts to show initially? Pagination strategy?",
                    "What interactions? (like, comment, share, save)",
                    "User can create posts? What fields required?",
                    "Mobile responsive? Accessibility requirements?",
                    "Offline support needed?",
                    "Performance requirements? (time to interactive)"
                ]} />
                <Code>{`// Scope Decisions:
// ✅ Text posts with optional images
// ✅ Like and comment functionality
// ✅ Cursor-based pagination (10 posts/page)
// ✅ Optimistic updates for better UX
// ✅ Responsive design
// ❌ Real-time WebSocket updates (future enhancement)
// ❌ Video posts (current scope)`}</Code>
            </NoteSection>

            <NoteSection title="🏗️ Component Architecture">
                <Code>{`// Component Hierarchy
NewsFeedPage
├── NotebookLayout (wrapper)
└── NewsFeed (main container)
    ├── Header (navigation, title)
    ├── CreatePost (form component)
    │   ├── TextInput
    │   ├── ImageUpload
    │   └── SubmitButton
    ├── NewsFeedPosts (posts container)
    │   ├── PostCard[] (individual posts)
    │   │   ├── PostHeader (user, timestamp)
    │   │   ├── PostContent (text, image)
    │   │   ├── PostActions (like, comment buttons)
    │   │   └── CommentsSection
    │   ├── LoadMoreButton
    │   └── PaginationControls
    └── Toast (notifications)

// State Management Layers
- Global State: Redux (posts, pagination, loading states)
- Component State: Local UI state (form inputs, modals)
- Server State: API responses, cached data`}</Code>
            </NoteSection>

            <NoteSection title="📊 Frontend Data Model">
                <Code>{`// Redux State Structure
{
  posts: {
    items: Post[],           // Array of post objects
    pagination: {
      hasNextPage: boolean,
      hasPrevPage: boolean,
      nextCursor: string,
      prevCursor: string,
      limit: number
    },
    loading: {
      fetchPosts: boolean,
      loadMore: boolean,
      createPost: boolean,
      optimisticUpdates: Set<string>  // Track pending updates
    },
    error: {
      fetchPosts: string | null,
      createPost: string | null,
      loadMore: string | null
    }
  },
  ui: {
    toasts: Toast[],
    modals: {
      createPost: boolean,
      imageViewer: boolean
    }
  }
}

// Post Data Model
interface Post {
  id: string;
  userName: string;
  content: string;
  hasImage: boolean;
  imageUrl?: string;
  likes: number;
  isLiked: boolean;        // User's like status
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

// Component Props Interface
interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  isOptimistic?: boolean;  // Show loading state
}`}</Code>
            </NoteSection>

            <NoteSection title="⚡ Basic News Feed Implementation">
                <Code>{`// Minimal News Feed Component for Interview
import React, { useState, useEffect } from 'react';

const BasicNewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demo
  const mockPosts = [
    {
      id: '1',
      userName: 'John Doe',
      content: 'Just finished building an awesome React component!',
      likes: 12,
      isLiked: false,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2', 
      userName: 'Jane Smith',
      content: 'Learning system design principles. So interesting!',
      likes: 8,
      isLiked: true,
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      userName: 'Mike Johnson', 
      content: 'Anyone else excited about the new React features?',
      likes: 15,
      isLiked: false,
      createdAt: '2024-01-15T08:45:00Z'
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle creating new post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now().toString(),
      userName: 'You',
      content: newPost,
      likes: 0,
      isLiked: false,
      createdAt: new Date().toISOString()
    };

    // Optimistic update - add post immediately
    setPosts(prev => [post, ...prev]);
    setNewPost('');

    // Simulate API call (in real app, handle error and rollback if needed)
    console.log('Post created:', post);
  };

  // Handle like toggle
  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));

    // In real app, make API call here
    console.log('Like toggled for post:', postId);
  };

  // Format relative time
  const formatTime = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInHours = Math.floor((now - postTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return \`\${diffInHours}h ago\`;
    return \`\${Math.floor(diffInHours / 24)}d ago\`;
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Loading posts...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Create Post Form */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              resize: 'vertical',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={!newPost.trim()}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              background: newPost.trim() ? '#007bff' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: newPost.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Post
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div>
        {posts.map(post => (
          <div
            key={post.id}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            {/* Post Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <strong style={{ fontSize: '16px' }}>{post.userName}</strong>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  {formatTime(post.createdAt)}
                </div>
              </div>
            </div>

            {/* Post Content */}
            <div style={{
              marginBottom: '16px',
              fontSize: '16px',
              lineHeight: '1.5'
            }}>
              {post.content}
            </div>

            {/* Post Actions */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #eee'
            }}>
              <button
                onClick={() => handleLike(post.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: post.isLiked ? '#e74c3c' : '#666',
                  fontSize: '14px'
                }}
              >
                <span>{post.isLiked ? '❤️' : '🤍'}</span>
                <span>{post.likes} {post.likes === 1 ? 'like' : 'likes'}</span>
              </button>
              
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '14px'
              }}>
                💬 Comment
              </button>
              
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#666',
                fontSize: '14px'
              }}>
                🔄 Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button style={{
          padding: '10px 20px',
          background: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default BasicNewsFeed;`}</Code>
            </NoteSection>

            <NoteSection title="🔌 API Interface Definition">
                <Code>{`// API Contracts

// GET /api/posts - Fetch posts with pagination
interface GetPostsRequest {
  cursor?: string;
  limit?: number;
  direction?: 'next' | 'prev';
}

interface GetPostsResponse {
  posts: Post[];
  pagination: {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextCursor: string | null;
    prevCursor: string | null;
  };
  total: number;
}

// POST /api/posts - Create new post
interface CreatePostRequest {
  userName: string;
  content: string;
  hasImage?: boolean;
  imageUrl?: string;
}

interface CreatePostResponse {
  post: Post;
  message: string;
}

// POST /api/posts/:id/like - Toggle like
interface LikePostResponse {
  postId: string;
  isLiked: boolean;
  totalLikes: number;
}

// Frontend API Service
class PostsAPI {
  static async getPosts(params: GetPostsRequest): Promise<GetPostsResponse> {
    const url = new URL('/api/posts', window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  }

  static async createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create post');
    return response.json();
  }
}`}</Code>
            </NoteSection>

            <NoteSection title="⚡ Frontend Optimizations">
                <Code>{`// Performance Optimizations

// 1. Component Memoization
const PostCard = React.memo(({ post, onLike, onComment }) => {
  // Prevent re-renders when post data hasn't changed
});

// 2. Optimistic Updates Pattern
const useOptimisticLike = () => {
  const dispatch = useDispatch();
  
  return useCallback((postId: string) => {
    // Immediate UI update
    dispatch(toggleLikeOptimistic(postId));
    
    // API call with rollback on error
    api.toggleLike(postId).catch(() => {
      dispatch(toggleLikeOptimistic(postId)); // Rollback
      dispatch(showToast({ type: 'error', message: 'Failed to update like' }));
    });
  }, [dispatch]);
};

// 3. Virtual Scrolling (for large lists)
import { FixedSizeList as List } from 'react-window';

const VirtualPostList = ({ posts, height = 600 }) => (
  <List
    height={height}
    itemCount={posts.length}
    itemSize={200}
    itemData={posts}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <PostCard post={data[index]} />
      </div>
    )}
  </List>
);

// 4. Image Optimization
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useIntersectionObserver(imgRef, setIsInView, { threshold: 0.1 });

  return (
    <div ref={imgRef}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
};`}</Code>
            </NoteSection>

            <NoteSection title="🔄 State Management Patterns">
                <Code>{`// Redux Toolkit Implementation

// Async Thunk with Error Handling
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (params: GetPostsRequest, { rejectWithValue }) => {
    try {
      const response = await PostsAPI.getPosts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice with Optimistic Updates
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLikeOptimistic: (state, action) => {
      const post = state.items.find(p => p.id === action.payload);
      if (post) {
        post.isLiked = !post.isLiked;
        post.likes += post.isLiked ? 1 : -1;
        state.loading.optimisticUpdates.add(post.id);
      }
    },
    clearOptimisticUpdate: (state, action) => {
      state.loading.optimisticUpdates.delete(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading.fetchPosts = true;
        state.error.fetchPosts = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading.fetchPosts = false;
        state.items = action.payload.posts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading.fetchPosts = false;
        state.error.fetchPosts = action.payload;
      });
  }
});`}</Code>
            </NoteSection>

            <NoteSection title="📱 Responsive & Accessibility">
                <Code>{`// Responsive Design Considerations
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

// Mobile-first styling
const PostCard = styled.div\`
  padding: 16px;
  margin-bottom: 16px;
  
  @media (min-width: \${breakpoints.tablet}) {
    padding: 24px;
    margin-bottom: 24px;
  }
  
  @media (min-width: \${breakpoints.desktop}) {
    max-width: 680px;
    margin: 0 auto 24px;
  }
\`;

// Accessibility Best Practices
const LikeButton = ({ isLiked, count, onClick, postId }) => (
  <button
    onClick={onClick}
    aria-label={\`\${isLiked ? 'Unlike' : 'Like'} post. \${count} likes\`}
    aria-pressed={isLiked}
    data-testid={\`like-button-\${postId}\`}
  >
    <Icon name={isLiked ? 'heart-filled' : 'heart-outline'} />
    <span aria-live="polite">{count}</span>
  </button>
);

// Keyboard Navigation
const useKeyboardNavigation = (posts) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'j') navigateToNext();
      if (e.key === 'k') navigateToPrevious();
      if (e.key === 'l') toggleLike();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [posts]);
};`}</Code>
            </NoteSection>

            <NoteSection title="🎯 Frontend Interview Key Points">
                <Concepts items={[
                    "Explain cursor vs offset pagination for infinite scroll",
                    "Discuss optimistic updates vs pessimistic updates trade-offs",
                    "Component composition and prop drilling solutions",
                    "State management: when to use Redux vs Context vs local state",
                    "Performance: React.memo, useMemo, useCallback usage",
                    "Error boundaries and graceful error handling",
                    "Accessibility considerations (ARIA labels, keyboard navigation)",
                    "Mobile-first responsive design approach",
                    "Testing strategies for interactive components"
                ]} />
            </NoteSection>

            <NoteSection title="📈 Performance Metrics">
                <Complexity operations={[
                    { operation: "Initial Load", complexity: "< 3s" },
                    { operation: "Post Render", complexity: "< 100ms" },
                    { operation: "Optimistic Update", complexity: "< 50ms" },
                    { operation: "Scroll Performance", complexity: "60 FPS" },
                    { operation: "Bundle Size", complexity: "< 500KB" }
                ]} />
            </NoteSection>
        </>
    );
}

export default NewsFeedNotes; 