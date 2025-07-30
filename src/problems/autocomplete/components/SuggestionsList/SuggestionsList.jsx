import React from "react";
import {
    SuggestionsContainer,
    SuggestionItem,
    SuggestionText,
    SuggestionIcon,
    LoadingItem,
    NoResults
} from "./suggestionsList.style";

const SuggestionsList = ({
    suggestions,
    query,
    show,
    selectedIndex,
    onSuggestionSelect,
    isLoading
}) => {
    if (!show) return null;

    const highlightMatch = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => {
            if (part.toLowerCase() === query.toLowerCase()) {
                return <strong key={index}>{part}</strong>;
            }
            return part;
        });
    };

    return (
        <SuggestionsContainer>
            {isLoading ? (
                <LoadingItem>
                    <SuggestionIcon>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="3" fill="currentColor">
                                <animate
                                    attributeName="r"
                                    values="3;5;3"
                                    dur="1s"
                                    repeatCount="indefinite"
                                />
                                <animate
                                    attributeName="opacity"
                                    values="1;0.5;1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                />
                            </circle>
                        </svg>
                    </SuggestionIcon>
                    <SuggestionText>Loading suggestions...</SuggestionText>
                </LoadingItem>
            ) : suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    <SuggestionItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={() => onSuggestionSelect(suggestion)}
                        onMouseEnter={() => {
                            // Optional: Update selected index on hover
                            // setSelectedIndex(index);
                        }}
                    >
                        <SuggestionIcon>
                            <svg width="16" height="16" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                            </svg>
                        </SuggestionIcon>
                        <SuggestionText>
                            {highlightMatch(suggestion, query)}
                        </SuggestionText>
                    </SuggestionItem>
                ))
            ) : query && (
                <NoResults>
                    <SuggestionIcon>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                        </svg>
                    </SuggestionIcon>
                    <SuggestionText>No suggestions found for "{query}"</SuggestionText>
                </NoResults>
            )}
        </SuggestionsContainer>
    );
};

export default SuggestionsList; 