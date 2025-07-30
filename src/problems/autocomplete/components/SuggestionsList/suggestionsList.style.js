import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #dfe1e5;
  border-top: none;
  border-radius: 0 0 24px 24px;
  box-shadow: 0 4px 6px rgba(32, 33, 36, 0.28);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  animation: ${slideDown} 0.2s ease-out;
  margin-top: -1px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #dadce0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bdc1c6;
  }
`;

export const SuggestionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.1s ease;
  border-bottom: 1px solid #f1f3f4;

  background-color: ${(props) => (props.selected ? "#f8f9fa" : "transparent")};

  &:hover {
    background-color: #f8f9fa;
  }

  &:first-child {
    padding-top: 12px;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 12px;
    border-radius: 0 0 24px 24px;
  }
`;

export const SuggestionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  min-width: 20px;

  svg {
    fill: #9aa0a6;
    width: 16px;
    height: 16px;
  }
`;

export const SuggestionText = styled.div`
  flex: 1;
  font-size: 16px;
  color: #202124;

  strong {
    font-weight: 600;
    color: #1a73e8;
  }
`;

export const LoadingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #5f6368;
  font-size: 14px;

  svg {
    color: #1a73e8;
    margin-right: 12px;
  }
`;

export const NoResults = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #5f6368;
  font-size: 14px;
  font-style: italic;

  svg {
    fill: #9aa0a6;
    margin-right: 12px;
  }
`;
