// createPost.style.js
import styled, { keyframes } from 'styled-components';

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

const successPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Main wrapper for the create post component
export const CreatePostWrapper = styled.div`
  background: #151a28;
  border-radius: 12px;
  padding: 16px;
  margin-top: 60px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border: 1px solid #232b3b;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  animation: ${slideIn} 0.3s ease-out;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
    transform: translateY(-1px);
  }

  &.loading {
    opacity: 0.7;
    pointer-events: none;
  }

  &.success {
    animation: ${successPulse} 0.6s ease-out;
  }

  @media (max-width: 768px) {
    margin: 0 10px 20px;
    border-radius: 8px;
    padding: 12px;
  }
`;

// Input section container
export const CreatePostInput = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;

  .profile-pic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    &:hover::after {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 12px;

    .profile-pic {
      width: 36px;
      height: 36px;
    }
  }
`;

// Text input styling
export const CreatePostInputText = styled.textarea`
  flex: 1;
  border: none;
  resize: none;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  padding: 12px 16px;
  background: #232b3b;
  border-radius: 24px;
  outline: none;
  transition: all 0.3s ease;
  min-height: 40px;
  line-height: 1.4;
  color: #e0e6ed;

  &::placeholder {
    color: #7a869a;
    font-weight: 400;
  }

  &:focus {
    background: #232b3b;
    box-shadow: 0 0 0 2px #7ab8ff;
    transform: scale(1.01);
  }

  &:hover {
    background: #232b3b;
  }

  &:focus:hover {
    background: #232b3b;
  }

  ${CreatePostWrapper}.loading & {
    background: #232b3b;
  }

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 14px;
    border-radius: 20px;
  }
`;

// Options container
export const CreatePostOptions = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 12px;
  border-top: 1px solid #232b3b;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
    padding-top: 10px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 8px;
  }
`;

// Individual option styling
export const CreatePostOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 15px;
  color: #b0b8c9;
  flex: 1;
  min-width: 0;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #232b3b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    color: #7ab8ff;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }

  &:focus {
    outline: 2px solid #7ab8ff;
    outline-offset: 2px;
  }

  span:first-child {
    font-size: 20px;
    filter: grayscale(0.3);
    transition: filter 0.2s ease, transform 0.2s ease;
  }

  &:hover span:first-child {
    filter: grayscale(0);
    transform: scale(1.1);
  }

  span:last-child {
    font-weight: 600;
    transition: color 0.2s ease;
  }

  /* Specific hover colors for different options */
  &:nth-child(1):hover {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.08), rgba(139, 195, 74, 0.08));
    color: #4caf50;
  }

  &:nth-child(2):hover {
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 152, 0, 0.08));
    color: #ff9800;
  }

  &:nth-child(3):hover {
    background: linear-gradient(135deg, rgba(244, 67, 54, 0.08), rgba(233, 30, 99, 0.08));
    color: #f44336;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 6px;

    span:first-child {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    justify-content: flex-start;
    padding: 12px 16px;
  }
`;