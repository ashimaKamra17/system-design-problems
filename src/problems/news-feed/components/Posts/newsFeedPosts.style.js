import styled from "styled-components";

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Post = styled.article`
  background: #1a2332;
  border: 1px solid #374151;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
  }
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #374151;
`;

export const PostAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.gradient || "linear-gradient(45deg, #667eea, #764ba2)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 14px;
`;

export const PostInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PostUserName = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #e0e6ed;
`;

export const PostTime = styled.span`
  font-size: 12px;
  color: #7a869a;
`;

export const PostContent = styled.div`
  padding: 16px;
  color: #e0e6ed;
  font-size: 14px;
  line-height: 1.6;

  p {
    margin: 0 0 12px 0;
  }

  p:last-child {
    margin-bottom: 0;
  }

  strong {
    font-weight: 600;
    color: #ffffff;
  }

  em {
    font-style: italic;
    color: #a8b3cf;
  }
`;

export const PostImage = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 16px 16px 16px;
  border-radius: 12px;
  background: ${(props) =>
    props.gradient || "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  background-size: cover;
  background-position: center;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #374151;
  gap: 8px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: ${(props) => (props.liked ? "#4f46e5" : "transparent")};
  border: 1px solid ${(props) => (props.liked ? "#4f46e5" : "#374151")};
  border-radius: 8px;
  color: ${(props) => (props.liked ? "white" : "#7a869a")};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  font-weight: 500;
  flex: 1;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.liked ? "#6366f1" : "#374151")};
    color: ${(props) => (props.liked ? "white" : "#e0e6ed")};
    border-color: ${(props) => (props.liked ? "#6366f1" : "#4f46e5")};
  }

  &:active {
    transform: translateY(1px);
  }

  span:first-child {
    font-size: 16px;
  }
`;

export const LoadingPost = styled.div`
  background: #1a2332;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 16px;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

// Cursor-based pagination controls
export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 680px;
  margin: 32px auto 0;
  padding: 0 16px;
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #1a2332;
  border: 1px solid #374151;
  border-radius: 12px;
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${(props) => (props.disabled ? "#374151" : "#4f46e5")};
  color: ${(props) => (props.disabled ? "#7a869a" : "white")};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  min-width: 120px;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #6366f1;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${(props) => (props.loading ? "#374151" : "#4f46e5")};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) =>
    props.loading || props.disabled ? "not-allowed" : "pointer"};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #6366f1;
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
  }
`;

export const RefreshButton = styled.button`
  padding: 12px 24px;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;

  &:hover {
    background: #16a34a;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PaginationInfo = styled.div`
  text-align: center;
  color: #7a869a;
  font-size: 14px;
  line-height: 1.4;

  small {
    font-size: 12px;
    color: #9ca3af;
  }
`;

export const LoadingIndicator = styled.div`
  text-align: center;
  padding: 20px;
  color: #7a869a;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &::before {
    content: "";
    width: 16px;
    height: 16px;
    border: 2px solid #374151;
    border-top: 2px solid #4f46e5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
