// newsFeedPosts.style.js
import styled, { keyframes } from 'styled-components';

// Add prop types for custom props
interface GradientProps {
  gradient: string;
}
interface LikedProps {
  liked?: boolean;
}

// Animation keyframes
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const likeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const hoverLift = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-2px); }
`;

// Container for all posts
export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 16px;
    padding: 0 10px;
  }
`;

// Individual post container
export const Post = styled.div`
  background: #151a28;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border: 1px solid #232b3b;
  overflow: hidden;
  animation: ${slideIn} 0.3s ease-out;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    animation: ${hoverLift} 0.3s ease forwards;
  }

  @media (max-width: 768px) {
    border-radius: 8px;
    margin: 0 5px;
  }
`;

// Post header containing avatar and user info
export const PostHeader = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #232b3b;

  @media (max-width: 768px) {
    padding: 12px;
    gap: 10px;
  }
`;

// User avatar
export const PostAvatar = styled.div<GradientProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.gradient};
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

// Container for user name and time
export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

// User name
export const PostUserName = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #e0e6ed;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #7ab8ff;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Post timestamp
export const PostTime = styled.div`
  font-size: 13px;
  color: #7a869a;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #7ab8ff;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

// Post content text
export const PostContent = styled.div`
  padding: 0 16px 16px;
  line-height: 1.5;
  font-size: 15px;
  color: #e0e6ed;
  white-space: pre-wrap;
  word-wrap: break-word;

  @media (max-width: 768px) {
    padding: 0 12px 12px;
    font-size: 14px;
  }
`;

// Post image
export const PostImage = styled.div<GradientProps>`
  width: 100%;
  height: 300px;
  background: ${props => props.gradient};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.12);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;

// Post actions container
export const PostActions = styled.div`
  padding: 8px 16px;
  border-top: 1px solid #232b3b;
  display: flex;
  justify-content: space-around;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 6px 12px;
    gap: 4px;
  }
`;

// Individual action button
export const ActionButton = styled.button<LikedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.liked ? '#7ab8ff' : '#b0b8c9'};
  font-weight: 600;
  font-size: 15px;
  flex: 1;
  font-family: inherit;
  min-width: 0;

  &:hover {
    background: #232b3b;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    color: #7ab8ff;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 2px solid #7ab8ff;
    outline-offset: 2px;
  }

  span:first-child {
    font-size: 18px;
    transition: transform 0.2s ease;
    ${props => props.liked && `animation: ${likeAnimation} 0.3s ease;`}
  }

  &:hover span:first-child {
    transform: scale(1.1);
  }

  span:last-child {
    transition: color 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Specific hover colors for different actions */
  &:nth-child(1):hover {
    background: linear-gradient(135deg, rgba(24, 119, 242, 0.08), rgba(66, 165, 245, 0.08));
    color: #7ab8ff;
  }

  &:nth-child(2):hover {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(139, 195, 74, 0.08));
    color: #4caf50;
  }

  &:nth-child(3):hover {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 152, 0, 0.08));
    color: #ff9800;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 14px;
    border-radius: 6px;

    span:first-child {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 8px 4px;
    gap: 4px;

    span:last-child {
      font-size: 12px;
    }
  }
`;

// Loading state for posts
export const LoadingPost = styled(Post)`
  opacity: 0.6;
  pointer-events: none;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent);
    animation: shimmer 1.5s infinite;
  }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Pagination Controls
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    gap: 15px;
    padding: 15px 10px;
  }
`;

export const PaginationButton = styled.button`
  padding: 12px 20px;
  border: 1px solid #232b3b;
  border-radius: 8px;
  background: #151a28;
  color: #e0e6ed;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover:not(:disabled) {
    background: #232b3b;
    border-color: #7ab8ff;
    color: #7ab8ff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(122, 184, 255, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(122, 184, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #151a28;
    border-color: #232b3b;
    color: #7a869a;
  }

  &:focus {
    outline: 2px solid #7ab8ff;
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
    min-width: 80px;
  }
`;

export const PaginationInfo = styled.div`
  text-align: center;
  color: #e0e6ed;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;

  small {
    font-size: 12px;
    color: #7a869a;
    font-weight: normal;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    
    small {
      font-size: 11px;
    }
  }
`;