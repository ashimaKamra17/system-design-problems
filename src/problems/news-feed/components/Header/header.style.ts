import { styled, css } from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: #151a28;
  border-bottom: 1px solid #232b3b;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.25);
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  max-width: 112rem;
  margin: 0 auto;
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex-shrink: 0;
`;

export const LogoCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: linear-gradient(to right, #3b82f6, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1.125rem;
`;

export const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: bold;
  color: #e0e6ed;
  @media (max-width: 640px) {
    display: none;
  }
`;

export const SearchSection = styled.div`
  flex: 1;
  max-width: 32rem;
  margin: 0 1rem;
`;

export const SearchBoxWrapper = styled.div<{ focus: boolean }>`
  position: relative;
  transition: transform 0.2s;
  ${({ focus }) => focus && css`
    transform: scale(1.05);
  `}
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchInput = styled.input<{ focus: boolean }>`
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background: #232b3b;
  border: none;
  border-radius: 9999px;
  outline: none;
  color: #e0e6ed;
  transition: box-shadow 0.2s, background 0.2s;
  ${({ focus }) => focus && css`
    box-shadow: 0 4px 24px 0 rgba(59,130,246,0.15);
    background: #232b3b;
  `}
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const NavIcons = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

export const NavButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: #b0b8c9;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  &:hover {
    background: #232b3b;
    color: #7ab8ff;
  }
`;

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const NotificationButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  background: none;
  border: none;
  color: #b0b8c9;
  transition: background 0.2s, color 0.2s;
  cursor: pointer;
  &:hover {
    background: #232b3b;
    color: #7ab8ff;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  background: #ef4444;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 9999px;
  height: 1.25rem;
  width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  animation: pulse 1s infinite alternate;

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 #ef444480; }
    100% { box-shadow: 0 0 0 4px #ef444400; }
  }
`;

export const ProfileMenuWrapper = styled.div`
  position: relative;
  &:hover > div {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  border-radius: 9999px;
  background: none;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #232b3b;
  }
`;

export const ProfileCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: linear-gradient(to right, #a21caf, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  span {
    color: #fff;
    font-weight: 600;
    font-size: 0.875rem;
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background: #232b3b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.25);
  border: 1px solid #232b3b;
  opacity: 0;
  visibility: hidden;
  transform: translateY(0.5rem);
  transition: all 0.2s;
  z-index: 10;
`;

export const ProfileDropdownItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #e0e6ed;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: #151a28;
  }
`;

export const ProfileDropdownDivider = styled.hr`
  margin: 0.25rem 0;
  border: none;
  border-top: 1px solid #232b3b;
`;