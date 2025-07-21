import React, { useState } from 'react';
import {
    HeaderWrapper,
    HeaderInner,
    LogoSection,
    LogoCircle,
    LogoText,
    Title,
    SearchSection,
    SearchBoxWrapper,
    SearchIconWrapper,
    SearchInput,
    RightSection,
    NavIcons,
    NavButton,
    NotificationWrapper,
    NotificationButton,
    NotificationBadge,
    ProfileMenuWrapper,
    ProfileButton,
    ProfileCircle,
    ProfileDropdown,
    ProfileDropdownItem,
    ProfileDropdownDivider
} from './header.style';

const Header = () => {
    const [searchFocus, setSearchFocus] = useState(false);
    const [notifications, setNotifications] = useState(3);

    return (
        <HeaderWrapper>
            <HeaderInner>
                {/* Left Section - Logo */}
                <LogoSection>
                    <LogoCircle>
                        <LogoText>S</LogoText>
                    </LogoCircle>
                    <Title>SocialFeed</Title>
                </LogoSection>

                {/* Center Section - Search */}
                <SearchSection>
                    <SearchBoxWrapper focus={searchFocus}>
                        <SearchIconWrapper>
                            <svg height="20" width="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </SearchIconWrapper>
                        <SearchInput
                            type="text"
                            placeholder="Search for posts, people, or topics..."
                            focus={searchFocus}
                            onFocus={() => setSearchFocus(true)}
                            onBlur={() => setSearchFocus(false)}
                        />
                    </SearchBoxWrapper>
                </SearchSection>

                {/* Right Section - Navigation & Profile */}
                <RightSection>
                    {/* Navigation Icons */}
                    <NavIcons>
                        <NavButton>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m7 7 5 5 5-5" />
                            </svg>
                        </NavButton>
                        <NavButton>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-2-2V10a2 2 0 012-2h8z" />
                            </svg>
                        </NavButton>
                    </NavIcons>

                    {/* Notifications */}
                    <NotificationWrapper>
                        <NotificationButton onClick={() => setNotifications(0)}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM19.5 12A7.5 7.5 0 1 1 12 4.5a7.5 7.5 0 0 1 7.5 7.5z" />
                            </svg>
                        </NotificationButton>
                        {notifications > 0 && (
                            <NotificationBadge>
                                {notifications}
                            </NotificationBadge>
                        )}
                    </NotificationWrapper>

                    {/* Profile Menu */}
                    <ProfileMenuWrapper>
                        <ProfileButton>
                            <ProfileCircle>
                                <span>JD</span>
                            </ProfileCircle>
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </ProfileButton>
                        <ProfileDropdown>
                            <ProfileDropdownItem href="#">Your Profile</ProfileDropdownItem>
                            <ProfileDropdownItem href="#">Settings</ProfileDropdownItem>
                            <ProfileDropdownItem href="#">Privacy</ProfileDropdownItem>
                            <ProfileDropdownDivider />
                            <ProfileDropdownItem href="#">Sign Out</ProfileDropdownItem>
                        </ProfileDropdown>
                    </ProfileMenuWrapper>
                </RightSection>
            </HeaderInner>
        </HeaderWrapper>
    );
};

export default Header;