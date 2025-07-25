import { useDispatch, useSelector } from "react-redux";

// Custom hook for dispatch
export const useAppDispatch = () => useDispatch();

// Custom hook for selector
export const useAppSelector = useSelector;

// Posts-specific hooks
export const usePosts = () => {
  return useAppSelector((state) => ({
    posts: state.posts.posts,
    pagination: state.posts.pagination,
    loading: state.posts.loading,
    error: state.posts.error,
  }));
};

// Specialized hooks for different loading states
export const usePostsLoading = () => {
  return useAppSelector((state) => ({
    fetchPosts: state.posts.loading.fetchPosts,
    loadMore: state.posts.loading.loadMore,
    loadPrevious: state.posts.loading.loadPrevious,
    refresh: state.posts.loading.refresh,
    createPost: state.posts.loading.createPost,
  }));
};

export const usePostsErrors = () => {
  return useAppSelector((state) => ({
    fetchPosts: state.posts.error.fetchPosts,
    loadMore: state.posts.error.loadMore,
    loadPrevious: state.posts.error.loadPrevious,
    refresh: state.posts.error.refresh,
    createPost: state.posts.error.createPost,
  }));
};

// UI-specific hooks
export const useUI = () => {
  return useAppSelector((state) => ({
    theme: state.ui.theme,
    notifications: state.ui.notifications,
    modals: state.ui.modals,
    toast: state.ui.toast,
    sidebar: state.ui.sidebar,
  }));
};
