// NewsFeedPosts.jsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { togglePostLike, addPostComment, clearPostError } from '../../../../store/slices/postsSlice';
import { selectPostLikeLoading, selectPostCommentLoading, selectPostLikeError, selectPostCommentError } from '../../../../store/slices/postsSlice';
import { showToast } from '../../../../store/slices/uiSlice';
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

const CommentInput = ({ postId, onSubmit, loading }) => {
    const [comment, setComment] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim() && !loading) {
            onSubmit(comment.trim());
            setComment('');
            setIsExpanded(false);
        }
    };

    return (
        <div style={{
            borderTop: '1px solid #374151',
            padding: isExpanded ? '12px 16px' : '8px 16px',
            background: isExpanded ? '#232b3b' : 'transparent',
            transition: 'all 0.2s ease'
        }}>
            {!isExpanded ? (
                <button
                    onClick={() => setIsExpanded(true)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: 'transparent',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#7a869a',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.borderColor = '#4f46e5';
                        e.target.style.color = '#e0e6ed';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.borderColor = '#374151';
                        e.target.style.color = '#7a869a';
                    }}
                >
                    Write a comment...
                </button>
            ) : (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#1a2332',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#e0e6ed',
                            fontSize: '14px',
                            resize: 'vertical',
                            minHeight: '80px',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                        onBlur={(e) => e.target.style.borderColor = '#374151'}
                        autoFocus
                    />
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={() => {
                                setIsExpanded(false);
                                setComment('');
                            }}
                            style={{
                                padding: '8px 16px',
                                background: 'transparent',
                                border: '1px solid #374151',
                                borderRadius: '6px',
                                color: '#7a869a',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!comment.trim() || loading}
                            style={{
                                padding: '8px 16px',
                                background: (!comment.trim() || loading) ? '#374151' : '#4f46e5',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                cursor: (!comment.trim() || loading) ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                opacity: (!comment.trim() || loading) ? 0.5 : 1
                            }}
                        >
                            {loading ? '🔄 Posting...' : 'Post Comment'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

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

    const handleLike = async (post) => {
        const isCurrentlyLiked = post.isLiked || false;

        try {
            // Use optimistic update thunk
            const resultAction = await dispatch(togglePostLike({
                postId: post.id,
                isCurrentlyLiked
            }));

            // Show error toast if the operation failed
            if (togglePostLike.rejected.match(resultAction)) {
                dispatch(showToast({
                    message: 'Failed to update like. Please try again.',
                    type: 'error'
                }));
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleComment = async (postId, commentText) => {
        try {
            // Use optimistic update thunk
            const resultAction = await dispatch(addPostComment({
                postId,
                content: commentText,
                userName: 'You' // In real app, get from auth context
            }));

            // Show success/error toast
            if (addPostComment.fulfilled.match(resultAction)) {
                dispatch(showToast({
                    message: 'Comment posted!',
                    type: 'success'
                }));
            } else if (addPostComment.rejected.match(resultAction)) {
                dispatch(showToast({
                    message: 'Failed to post comment. Please try again.',
                    type: 'error'
                }));
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
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

                {posts.map((post) => {
                    const likeLoading = useAppSelector(state => selectPostLikeLoading(state, post.id));
                    const commentLoading = useAppSelector(state => selectPostCommentLoading(state, post.id));
                    const likeError = useAppSelector(state => selectPostLikeError(state, post.id));
                    const commentError = useAppSelector(state => selectPostCommentError(state, post.id));

                    return (
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
                                    disabled={likeLoading}
                                    style={{
                                        opacity: likeLoading ? 0.7 : 1,
                                        cursor: likeLoading ? 'wait' : 'pointer'
                                    }}
                                >
                                    <span>{likeLoading ? '🔄' : (post.isLiked ? '👍' : '👍')}</span>
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

                            {/* Error Messages */}
                            {likeError && (
                                <div style={{
                                    padding: '8px 16px',
                                    background: '#fef2f2',
                                    borderTop: '1px solid #fecaca',
                                    color: '#dc2626',
                                    fontSize: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span>❌ {likeError}</span>
                                    <button
                                        onClick={() => dispatch(clearPostError({ postId: post.id, type: 'like' }))}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#dc2626',
                                            cursor: 'pointer',
                                            padding: '2px 4px'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {commentError && (
                                <div style={{
                                    padding: '8px 16px',
                                    background: '#fef2f2',
                                    borderTop: '1px solid #fecaca',
                                    color: '#dc2626',
                                    fontSize: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span>❌ {commentError}</span>
                                    <button
                                        onClick={() => dispatch(clearPostError({ postId: post.id, type: 'comment' }))}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#dc2626',
                                            cursor: 'pointer',
                                            padding: '2px 4px'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            )}

                            {/* Comment Input */}
                            <CommentInput
                                postId={post.id}
                                onSubmit={(comment) => handleComment(post.id, comment)}
                                loading={commentLoading}
                            />
                        </Post>
                    );
                })}

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