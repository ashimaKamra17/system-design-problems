import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AutoCompleteContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial,
    sans-serif;
`;

export const GoogleLogo = styled.div`
  font-size: 90px;
  font-weight: 400;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  user-select: none;

  @media (max-width: 768px) {
    font-size: 60px;
    margin-bottom: 30px;
  }

  .letter-g1 {
    color: #4285f4;
  }

  .letter-o1 {
    color: #ea4335;
  }

  .letter-o2 {
    color: #fbbc05;
  }

  .letter-g2 {
    color: #4285f4;
  }

  .letter-l {
    color: #34a853;
  }

  .letter-e {
    color: #ea4335;
  }

  &:hover {
    transform: scale(1.02);
    transition: transform 0.2s ease;
  }
`;

export const SearchSection = styled.div`
  width: 100%;
  max-width: 584px;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const PoweredBySection = styled.div`
  margin-top: 60px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out 0.4s both;

  p {
    margin: 8px 0;
    color: #5f6368;
    font-size: 14px;
    line-height: 1.4;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }

  strong {
    color: #202124;
    font-weight: 600;
  }
`;
