import React, { useState, useRef, useEffect } from "react";
import SuggestionsList from "../SuggestionsList/SuggestionsList";
import {
    SearchContainer,
    SearchInputWrapper,
    SearchInput,
    SearchIcon,
    MicIcon,
    ClearButton,
    SearchButtons,
    SearchButton
} from "./searchBox.style";

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    // Mock suggestions data - will be replaced with API call later
    const mockSuggestions = [
        "react js tutorial",
        "react hooks",
        "react redux",
        "react native",
        "react router",
        "react testing library",
        "react context api",
        "react performance optimization",
        "react best practices",
        "react state management"
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setSelectedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            setIsLoading(true);
            // Simulate API delay
            setTimeout(() => {
                const filtered = mockSuggestions.filter(suggestion =>
                    suggestion.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(filtered);
                setShowSuggestions(true);
                setIsLoading(false);
            }, 200);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
        setSelectedIndex(-1);
    };

    const handleInputFocus = () => {
        if (query.trim() && suggestions.length > 0) {
            setShowSuggestions(true);
        }
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionSelect(suggestions[selectedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setSelectedIndex(-1);
                inputRef.current?.blur();
                break;
            default:
                break;
        }
    };

    const handleSuggestionSelect = (suggestion) => {
        setQuery(suggestion);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const handleSearch = () => {
        if (query.trim()) {
            console.log("Searching for:", query);
            // Here you would implement the actual search logic
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    const handleClear = () => {
        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.focus();
    };

    const handleGoogleSearch = () => {
        if (query.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        }
    };

    const handleFeelingLucky = () => {
        if (query.trim()) {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`, '_blank');
        } else {
            // Random search for demo
            const randomQueries = ["react js", "javascript", "web development", "system design"];
            const randomQuery = randomQueries[Math.floor(Math.random() * randomQueries.length)];
            window.open(`https://www.google.com/search?q=${encodeURIComponent(randomQuery)}&btnI=1`, '_blank');
        }
    };

    return (
        <SearchContainer ref={containerRef}>
            <SearchInputWrapper focused={showSuggestions}>
                <SearchIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                </SearchIcon>

                <SearchInput
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Google or type a URL"
                    autoComplete="off"
                    spellCheck="false"
                />

                {query && (
                    <ClearButton onClick={handleClear} title="Clear">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </ClearButton>
                )}

                <MicIcon title="Search by voice">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                    </svg>
                </MicIcon>
            </SearchInputWrapper>

            <SuggestionsList
                suggestions={suggestions}
                query={query}
                show={showSuggestions}
                selectedIndex={selectedIndex}
                onSuggestionSelect={handleSuggestionSelect}
                isLoading={isLoading}
            />

            <SearchButtons>
                <SearchButton onClick={handleGoogleSearch} disabled={!query.trim()}>
                    Google Search
                </SearchButton>
                <SearchButton onClick={handleFeelingLucky}>
                    I'm Feeling Lucky
                </SearchButton>
            </SearchButtons>
        </SearchContainer>
    );
};

export default SearchBox; 