import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 584px;
  height: 44px;
  background: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0 8px 0 16px;
  box-shadow: ${(props) =>
    props.focused
      ? "0 2px 5px 1px rgba(64,60,67,.16)"
      : "0 2px 5px 1px rgba(64,60,67,.08)"};
  transition: all 0.2s ease;
  margin: 0 auto;

  &:hover {
    box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.16);
  }

  &:focus-within {
    box-shadow: 0 2px 8px 1px rgba(64, 60, 67, 0.24);
    border-color: rgba(223, 225, 229, 0);
  }
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;

  svg {
    fill: #9aa0a6;
    width: 20px;
    height: 20px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #202124;
  font-family: inherit;

  &::placeholder {
    color: #9aa0a6;
  }

  &:focus {
    outline: none;
  }
`;

export const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  margin-right: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  svg {
    fill: #9aa0a6;
    width: 20px;
    height: 20px;
  }
`;

export const MicIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  svg {
    fill: #4285f4;
    width: 24px;
    height: 24px;
  }
`;

export const SearchButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
`;

export const SearchButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  cursor: pointer;
  font-size: 14px;
  line-height: 27px;
  min-width: 54px;
  padding: 8px 16px;
  text-align: center;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    background-color: #f1f3f4;
    border: 1px solid #dadce0;
    color: #202124;
  }

  &:focus {
    border: 1px solid #4285f4;
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    &:hover {
      background: #f8f9fa;
      border: 1px solid #f8f9fa;
      box-shadow: none;
    }
  }

  @media (max-width: 768px) {
    width: 200px;
  }
`;
