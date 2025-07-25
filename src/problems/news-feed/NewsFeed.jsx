import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import CreatePost from "./components/CreatePost/CreatePost";
import NewsFeedPosts from "./components/Posts/NewsFeedPosts";
import Toast from "../../components/Toast/Toast";
import { useAppDispatch } from "../../hooks/redux";
import { usePosts } from "../../hooks/redux";
import { fetchPosts, loadMorePosts, loadPreviousPosts, refreshPosts, createPost, clearErrors } from "../../store/slices/postsSlice";
import { showToast } from "../../store/slices/uiSlice";

function NewsFeed() {
  const dispatch = useAppDispatch();
  const { posts, pagination, loading, error } = usePosts();

  // Load initial posts on component mount
  useEffect(() => {
    dispatch(fetchPosts({ limit: 10, direction: 'next', reset: true }));
  }, [dispatch]);

  // Handle new post creation
  const handleNewPost = async (newPostData) => {
    try {
      const resultAction = await dispatch(createPost({
        userName: newPostData.userName || 'You',
        content: newPostData.content,
        hasImage: newPostData.hasImage || false,
        imageUrl: newPostData.imageUrl || null
      }));

      // Check if the action was fulfilled
      if (createPost.fulfilled.match(resultAction)) {
        dispatch(showToast({
          message: 'Post created successfully!',
          type: 'success'
        }));
      }
    } catch (err) {
      dispatch(showToast({
        message: 'Failed to create post. Please try again.',
        type: 'error'
      }));
    }
  };

  // Handle loading more posts (infinite scroll or next page)
  const handleLoadMore = () => {
    if (pagination.hasNextPage && pagination.nextCursor && !loading.loadMore) {
      dispatch(loadMorePosts({
        cursor: pagination.nextCursor,
        limit: pagination.limit
      }));
    }
  };

  // Handle loading previous posts
  const handleLoadPrevious = () => {
    if (pagination.hasPrevPage && pagination.prevCursor && !loading.loadPrevious) {
      dispatch(loadPreviousPosts({
        cursor: pagination.prevCursor,
        limit: pagination.limit
      }));
    }
  };

  // Handle navigating to newer posts
  const handleNavigateNewer = () => {
    if (pagination.prevCursor) {
      dispatch(fetchPosts({
        cursor: pagination.prevCursor,
        limit: pagination.limit,
        direction: 'prev'
      }));
    }
  };

  // Handle navigating to older posts
  const handleNavigateOlder = () => {
    if (pagination.nextCursor) {
      dispatch(fetchPosts({
        cursor: pagination.nextCursor,
        limit: pagination.limit,
        direction: 'next'
      }));
    }
  };

  // Handle refresh (back to top)
  const handleRefresh = () => {
    dispatch(refreshPosts({ limit: pagination.limit }));
  };

  // Retry function for error state
  const handleRetry = () => {
    dispatch(clearErrors());
    dispatch(fetchPosts({
      limit: pagination.limit,
      direction: 'next',
      reset: true
    }));
  };

  return (
    <div style={{
      paddingTop: '80px',
      background: '#101624',
      minHeight: '100vh',
      paddingBottom: '2rem'
    }}>
      <Header />

      <CreatePost
        onSubmitPost={handleNewPost}
        isLoading={loading.createPost}
      />

      {error.fetchPosts && (
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 20px',
          padding: '16px',
          background: '#232b3b',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          color: '#ef4444',
          textAlign: 'center'
        }}>
          <p>{error.fetchPosts}</p>
          <button
            onClick={handleRetry}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {error.createPost && (
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 20px',
          padding: '16px',
          background: '#232b3b',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          color: '#ef4444',
          textAlign: 'center'
        }}>
          <p>{error.createPost}</p>
          <button
            onClick={() => dispatch(clearErrors())}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      {error.loadMore && (
        <div style={{
          maxWidth: '680px',
          margin: '0 auto 20px',
          padding: '16px',
          background: '#232b3b',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          color: '#f59e0b',
          textAlign: 'center'
        }}>
          <p>Failed to load more posts: {error.loadMore}</p>
          <button
            onClick={() => dispatch(clearErrors())}
            style={{
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '8px'
            }}
          >
            Dismiss
          </button>
        </div>
      )}

      <NewsFeedPosts
        posts={posts}
        loading={loading}
        pagination={pagination}
        onLoadMore={handleLoadMore}
        onLoadPrevious={handleLoadPrevious}
        onNavigateNewer={handleNavigateNewer}
        onNavigateOlder={handleNavigateOlder}
        onRefresh={handleRefresh}
      />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
}

export default NewsFeed;
