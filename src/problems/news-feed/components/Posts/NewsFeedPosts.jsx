// NewsFeedPosts.jsx
import React, { useState } from 'react';
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
    ActionButton
} from './newsFeedPosts.style';

const NewsFeedPosts = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [likeCounts, setLikeCounts] = useState({
        1: 124,
        2: 89,
        3: 67,
        4: 156,
        5: 203
    });

    const handleLike = (postId) => {
        const newLikedPosts = new Set(likedPosts);
        const newLikeCounts = { ...likeCounts };

        if (likedPosts.has(postId)) {
            newLikedPosts.delete(postId);
            newLikeCounts[postId] = newLikeCounts[postId] - 1;
        } else {
            newLikedPosts.add(postId);
            newLikeCounts[postId] = newLikeCounts[postId] + 1;
        }

        setLikedPosts(newLikedPosts);
        setLikeCounts(newLikeCounts);
    };

    const posts = [
        {
            id: 1,
            userName: 'John Doe',
            time: '2 hours ago',
            content: 'Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. Can\'t wait for the next adventure! 🏔️✨',
            hasImage: true,
            imageGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            comments: 18
        },
        {
            id: 2,
            userName: 'Tech News Daily',
            time: '4 hours ago',
            content: '🚀 Breaking: New AI breakthrough promises to revolutionize how we interact with technology. Researchers have developed a system that can understand context better than ever before. What are your thoughts on the future of AI?',
            hasImage: false,
            comments: 42,
            avatarGradient: 'linear-gradient(45deg, #ff6b6b, #ee5a24)'
        },
        {
            id: 3,
            userName: 'Food & Travel',
            time: '6 hours ago',
            content: 'Discovered this hidden gem of a restaurant today! The pasta was incredible and the atmosphere was so cozy. Sometimes the best places are the ones you stumble upon by accident. 🍝❤️',
            hasImage: true,
            imageGradient: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
            avatarGradient: 'linear-gradient(45deg, #4ecdc4, #44a08d)',
            comments: 23
        },
        {
            id: 4,
            userName: 'Sarah Chen',
            time: '8 hours ago',
            content: 'Working on some exciting new projects! The creative process is so rewarding when everything starts coming together. Collaboration makes everything better 💡✨ #creativity #teamwork',
            hasImage: true,
            imageGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            avatarGradient: 'linear-gradient(45deg, #a8edea, #fed6e3)',
            comments: 31
        },
        {
            id: 5,
            userName: 'Daily Inspiration',
            time: '10 hours ago',
            content: '"The only way to do great work is to love what you do." - Steve Jobs\n\nStarting this Monday with motivation and positive energy. What\'s inspiring you this week? 🌟',
            hasImage: false,
            avatarGradient: 'linear-gradient(45deg, #fdbb2d, #22c1c3)',
            comments: 87
        }
    ];

    return (
        <PostsContainer>
            {posts.map((post) => (
                <Post key={post.id}>
                    <PostHeader>
                        <PostAvatar gradient={post.avatarGradient || 'linear-gradient(45deg, #667eea, #764ba2)'} />
                        <PostInfo>
                            <PostUserName>{post.userName}</PostUserName>
                            <PostTime>{post.time}</PostTime>
                        </PostInfo>
                    </PostHeader>

                    <PostContent>{post.content}</PostContent>

                    {post.hasImage && (
                        <PostImage gradient={post.imageGradient} />
                    )}

                    <PostActions>
                        <ActionButton
                            liked={likedPosts.has(post.id)}
                            onClick={() => handleLike(post.id)}
                        >
                            <span>👍</span>
                            <span>{likeCounts[post.id]} Like</span>
                        </ActionButton>

                        <ActionButton>
                            <span>💬</span>
                            <span>{post.comments} Comment</span>
                        </ActionButton>

                        <ActionButton>
                            <span>📤</span>
                            <span>Share</span>
                        </ActionButton>
                    </PostActions>
                </Post>
            ))}
        </PostsContainer>
    );
};

export default NewsFeedPosts;