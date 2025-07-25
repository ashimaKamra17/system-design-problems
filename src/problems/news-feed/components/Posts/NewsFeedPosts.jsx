// NewsFeedPosts.jsx
import React from 'react';
import { useAppDispatch } from '../../../../hooks/redux';
import { updatePostLikes } from '../../../../store/slices/postsSlice';
import {
    PostsContainer,
    Post,
    PostHeader,
    PostAvatar,
    PostInfo,
    PostUserName,
    PostTime,
    PostContent,
    PostImage,
    PostActions,
    ActionButton,
    LoadingPost,
    PaginationWrapper,
    PaginationControls,
    PaginationButton,
    LoadMoreButton,
    RefreshButton,
    PaginationInfo,
    LoadingIndicator
} from './newsFeedPosts.style';

const NewsFeedPosts = ({
    posts = [],
    loading = {},
    pagination = {},
    onLoadMore,
    onLoadPrevious,
    onNavigateNewer,
    onNavigateOlder,
    onRefresh
}) => {
    const dispatch = useAppDispatch();

    const handleLike = (post) => {
        const isCurrentlyLiked = post.isLiked || false;
        const newLikedState = !isCurrentlyLiked;
        const newCount = newLikedState ?
            (post.likes + 1) :
            Math.max(0, post.likes - 1);

        // Update Redux state
        dispatch(updatePostLikes({
            postId: post.id,
            liked: newLikedState,
            newCount: newCount
        }));

        // Here you could also make an API call to persist the like state
        // apiService.posts.updateLike(post.id, newLikedState);
    };

    // Loading skeleton for initial load
    if (loading.fetchPosts && posts.length === 0) {
        return (
            <PostsContainer>
                {[1, 2, 3].map((i) => (
                    <LoadingPost key={i}>
                        <PostHeader>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#232b3b'
                            }} />
                            <PostInfo>
                                <div style={{
                                    width: '120px',
                                    height: '16px',
                                    background: '#232b3b',
                                    borderRadius: '4px'
                                }} />
                                <div style={{
                                    width: '80px',
                                    height: '12px',
                                    background: '#232b3b',
                                    borderRadius: '4px',
                                    marginTop: '4px'
                                }} />
                            </PostInfo>
                        </PostHeader>
                        <div style={{
                            padding: '0 16px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '16px',
                                background: '#232b3b',
                                borderRadius: '4px'
                            }} />
                            <div style={{
                                width: '80%',
                                height: '16px',
                                background: '#232b3b',
                                borderRadius: '4px'
                            }} />
                            <div style={{
                                width: '60%',
                                height: '16px',
                                background: '#232b3b',
                                borderRadius: '4px'
                            }} />
                        </div>
                    </LoadingPost>
                ))}
            </PostsContainer>
        );
    }

    return (
        <>
            {/* Refresh Button - Show when there might be newer posts */}
            {pagination.hasPrevPage && (
                <PaginationWrapper>
                    <RefreshButton onClick={onRefresh}>
                        🔄 Refresh for newest posts
                    </RefreshButton>
                </PaginationWrapper>
            )}

            <PostsContainer>
                {/* Loading indicator for previous posts */}
                {loading.loadPrevious && (
                    <LoadingIndicator>
                        Loading newer posts...
                    </LoadingIndicator>
                )}

                {posts.map((post) => (
                    <Post key={post.id}>
                        <PostHeader>
                            <PostAvatar gradient={post.avatarGradient || 'linear-gradient(45deg, #667eea, #764ba2)'} />
                            <PostInfo>
                                <PostUserName>{post.userName}</PostUserName>
                                <PostTime>{post.time}</PostTime>
                            </PostInfo>
                        </PostHeader>

                        <PostContent
                            dangerouslySetInnerHTML={{
                                __html: post.content
                            }}
                        />

                        {post.hasImage && post.imageGradient && (
                            <PostImage gradient={post.imageGradient} />
                        )}

                        <PostActions>
                            <ActionButton
                                liked={post.isLiked || false}
                                onClick={() => handleLike(post)}
                            >
                                <span>{post.isLiked ? '👍' : '👍'}</span>
                                <span>{post.likes || 0} Like{post.likes !== 1 ? 's' : ''}</span>
                            </ActionButton>

                            <ActionButton>
                                <span>💬</span>
                                <span>{post.comments || 0} Comment{post.comments !== 1 ? 's' : ''}</span>
                            </ActionButton>

                            <ActionButton>
                                <span>📤</span>
                                <span>Share</span>
                            </ActionButton>
                        </PostActions>
                    </Post>
                ))}

                {/* Loading indicator for load more */}
                {loading.loadMore && (
                    <LoadingIndicator>
                        Loading more posts...
                    </LoadingIndicator>
                )}
            </PostsContainer>

            {/* Cursor-based Pagination Controls */}
            <PaginationWrapper>
                {/* Load More Button (Infinite Scroll Style) */}
                {pagination.hasNextPage && (
                    <LoadMoreButton
                        onClick={onLoadMore}
                        disabled={loading.loadMore || loading.fetchPosts}
                        loading={loading.loadMore}
                    >
                        {loading.loadMore ? (
                            <>🔄 Loading...</>
                        ) : (
                            <>📄 Load More Posts</>
                        )}
                    </LoadMoreButton>
                )}

                {/* Navigation Controls */}
                <PaginationControls>
                    <PaginationButton
                        onClick={onNavigateNewer}
                        disabled={!pagination.prevCursor || loading.fetchPosts}
                    >
                        ⬆️ Newer Posts
                    </PaginationButton>

                    <PaginationInfo>
                        {pagination.totalPosts > 0 && (
                            <>
                                Showing {posts.length} posts
                                <br />
                                <small>{pagination.totalPosts} total posts</small>
                            </>
                        )}
                    </PaginationInfo>

                    <PaginationButton
                        onClick={onNavigateOlder}
                        disabled={!pagination.nextCursor || loading.fetchPosts}
                    >
                        ⬇️ Older Posts
                    </PaginationButton>
                </PaginationControls>

                {/* Debug Info (Remove in production) */}
                {process.env.NODE_ENV === 'development' && (
                    <div style={{
                        padding: '12px',
                        background: '#1a2332',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#7a869a',
                        fontFamily: 'monospace'
                    }}>
                        <strong>Debug Info:</strong><br />
                        Next Cursor: {pagination.nextCursor || 'null'}<br />
                        Prev Cursor: {pagination.prevCursor || 'null'}<br />
                        Has Next: {pagination.hasNextPage ? 'yes' : 'no'}<br />
                        Has Prev: {pagination.hasPrevPage ? 'yes' : 'no'}<br />
                        Direction: {pagination.direction || 'next'}
                    </div>
                )}
            </PaginationWrapper>
        </>
    );
};

export default NewsFeedPosts;