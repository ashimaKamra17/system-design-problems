import React from 'react';
import { NoteSection, Code, Concepts, Complexity } from '../../components/NotebookLayout/NotebookLayout';

function AutoCompleteNotes() {
    return (
        <>
            <NoteSection title="🔍 Requirements Exploration">
                <Concepts items={[
                    "What type of search? (products, users, general web search)",
                    "How many suggestions to show? (5-10 typically)",
                    "Real-time suggestions or on-demand?",
                    "Keyboard navigation required? (arrow keys, enter, escape)",
                    "Mobile responsive? Touch interactions?",
                    "Highlight matching text in suggestions?",
                    "Search history/recent searches?",
                    "Category-based suggestions?",
                    "Minimum characters before showing suggestions?"
                ]} />
                <Code>{`// Scope Decisions:
// ✅ Real-time search suggestions (debounced)
// ✅ Keyboard navigation (arrows, enter, escape)
// ✅ 10 suggestions max
// ✅ Highlighted matching text
// ✅ Mobile responsive with touch support
// ✅ 2 character minimum for suggestions
// ❌ Search history (future enhancement)
// ❌ Category filtering (current scope)`}</Code>
            </NoteSection>

            <NoteSection title="🏗️ Component Architecture">
                <Code>{`// Component Hierarchy
AutoCompletePage
├── NotebookLayout (wrapper)
└── AutoComplete (main container)
    ├── SearchBox (input container)
    │   ├── SearchInput (text input)
    │   ├── SearchIcon
    │   └── ClearButton
    ├── SuggestionsList (dropdown)
    │   ├── SuggestionItem[] (individual suggestions)
    │   │   ├── HighlightedText
    │   │   └── CategoryBadge
    │   ├── LoadingSpinner
    │   ├── NoResults
    │   └── ShowMoreButton
    └── SearchResults (optional results view)

// Component State Flow
SearchInput → debounce → API call → SuggestionsList
Keyboard events → navigation state → selected suggestion
Click/Enter → selection → callback to parent

// State Management Strategy
- Local State: Input value, suggestions, selected index
- Custom Hooks: useDebounce, useKeyboardNavigation
- Context: Search configuration (if multiple search components)`}</Code>
            </NoteSection>

            <NoteSection title="📊 Frontend Data Model">
                <Code>{`// Component State Structure
interface AutoCompleteState {
  query: string;
  suggestions: Suggestion[];
  selectedIndex: number;
  isLoading: boolean;
  isOpen: boolean;
  error: string | null;
  cache: Map<string, Suggestion[]>;  // Simple cache
}

// Suggestion Data Model
interface Suggestion {
  id: string;
  text: string;
  category?: string;
  metadata?: {
    description?: string;
    imageUrl?: string;
    type: 'recent' | 'popular' | 'exact';
  };
  score: number;  // Relevance score for ranking
}

// Component Props Interface
interface AutoCompleteProps {
  placeholder?: string;
  minChars?: number;
  maxSuggestions?: number;
  debounceMs?: number;
  onSearch: (query: string) => Promise<Suggestion[]>;
  onSelect: (suggestion: Suggestion) => void;
  onInputChange?: (value: string) => void;
  renderSuggestion?: (suggestion: Suggestion) => React.ReactNode;
  className?: string;
}

// Hook Return Type
interface UseAutoCompleteReturn {
  query: string;
  suggestions: Suggestion[];
  selectedIndex: number;
  isLoading: boolean;
  isOpen: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setQuery: (value: string) => void;
  selectSuggestion: (index: number) => void;
  clearSuggestions: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}`}</Code>
            </NoteSection>

            <NoteSection title="⚡ Basic SearchBox Implementation">
                <Code>{`// Minimal AutoComplete Component for Interview
import React, { useState, useEffect, useRef } from 'react';

const BasicAutoComplete = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Mock data for demo
  const mockSuggestions = [
    'JavaScript', 'Java', 'Python', 'React', 'Node.js',
    'TypeScript', 'Vue.js', 'Angular', 'Express', 'MongoDB'
  ];

  // Simple search function
  const searchSuggestions = (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      return [];
    }
    
    return mockSuggestions
      .filter(item => 
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Handle input change with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        setIsLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
          const results = searchSuggestions(query);
          setSuggestions(results);
          setIsOpen(results.length > 0);
          setIsLoading(false);
        }, 300);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          Math.min(prev + 1, suggestions.length - 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  return (
    <div style={{ position: 'relative', width: '300px' }}>
      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search technologies..."
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          border: '2px solid #ddd',
          borderRadius: '8px',
          outline: 'none'
        }}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          ⏳
        </div>
      )}

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              onClick={() => selectSuggestion(suggestion)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                backgroundColor: selectedIndex === index ? '#f0f0f0' : 'white',
                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none'
              }}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              {/* Highlight matching text */}
              {suggestion.split(new RegExp(\`(\${query})\`, 'gi')).map((part, i) => 
                part.toLowerCase() === query.toLowerCase() ? 
                  <strong key={i} style={{ color: '#007bff' }}>{part}</strong> : 
                  part
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && suggestions.length === 0 && query.length >= 2 && !isLoading && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'white',
          border: '1px solid #ddd',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '12px',
          color: '#666',
          textAlign: 'center'
        }}>
          No results found for "{query}"
        </div>
      )}
    </div>
  );
};

export default BasicAutoComplete;`}</Code>
            </NoteSection>

            <NoteSection title="🔌 API Interface Definition">
                <Code>{`// API Contracts

// GET /api/search/suggestions - Get search suggestions
interface GetSuggestionsRequest {
  q: string;                    // Query string
  limit?: number;              // Max results (default: 10)
  category?: string;           // Filter by category
  include_metadata?: boolean;   // Include additional data
}

interface GetSuggestionsResponse {
  suggestions: Suggestion[];
  total: number;
  took: number;               // Response time in ms
  cached: boolean;            // Was result cached
}

// Frontend API Service
class SearchAPI {
  static async getSuggestions(
    query: string, 
    options: Partial<GetSuggestionsRequest> = {}
  ): Promise<GetSuggestionsResponse> {
    
    const params = new URLSearchParams({
      q: query,
      limit: String(options.limit || 10),
      ...options.category && { category: options.category },
      ...options.include_metadata && { include_metadata: 'true' }
    });
    
    const response = await fetch(\`/api/search/suggestions?\${params}\`);
    
    if (!response.ok) {
      throw new Error(\`Search failed: \${response.statusText}\`);
    }
    
    return response.json();
  }

  // Request cancellation support
  static createCancellableRequest(query: string) {
    const controller = new AbortController();
    
    const request = fetch(\`/api/search/suggestions?q=\${encodeURIComponent(query)}\`, {
      signal: controller.signal
    });
    
    return { request, cancel: () => controller.abort() };
  }
}`}</Code>
            </NoteSection>

            <NoteSection title="⚡ Frontend Optimizations">
                <Code>{`// Performance Optimizations

// 1. Debouncing Hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// 2. Request Cancellation
const useAutoComplete = (onSearch: SearchFunction) => {
  const [state, setState] = useState<AutoCompleteState>(initialState);
  const requestRef = useRef<{ cancel: () => void } | null>(null);
  
  const debouncedQuery = useDebounce(state.query, 300);
  
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      // Cancel previous request
      requestRef.current?.cancel();
      
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { request, cancel } = SearchAPI.createCancellableRequest(debouncedQuery);
      requestRef.current = { cancel };
      
      request
        .then(response => response.json())
        .then(data => {
          setState(prev => ({
            ...prev,
            suggestions: data.suggestions,
            isLoading: false,
            isOpen: true
          }));
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setState(prev => ({ 
              ...prev, 
              error: 'Search failed', 
              isLoading: false 
            }));
          }
        });
    }
  }, [debouncedQuery]);
};

// 3. Memoized Suggestions List
const SuggestionsList = React.memo(({ 
  suggestions, 
  selectedIndex, 
  onSelect, 
  query 
}) => {
  return (
    <div className="suggestions-container">
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          isSelected={index === selectedIndex}
          query={query}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
});

// 4. Virtual Scrolling for Large Lists
import { FixedSizeList as List } from 'react-window';

const VirtualSuggestionsList = ({ suggestions, selectedIndex, itemHeight = 40 }) => (
  <List
    height={Math.min(suggestions.length * itemHeight, 300)}
    itemCount={suggestions.length}
    itemSize={itemHeight}
    itemData={{ suggestions, selectedIndex }}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <SuggestionItem
          suggestion={data.suggestions[index]}
          isSelected={index === data.selectedIndex}
        />
      </div>
    )}
  </List>
);`}</Code>
            </NoteSection>

            <NoteSection title="⌨️ Keyboard Navigation Implementation">
                <Code>{`// Keyboard Navigation Hook
const useKeyboardNavigation = (
  suggestions: Suggestion[],
  onSelect: (suggestion: Suggestion) => void,
  onClose: () => void
) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          Math.min(prev + 1, suggestions.length - 1)
        );
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          onSelect(suggestions[selectedIndex]);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        onClose();
        setSelectedIndex(-1);
        break;
        
      case 'Tab':
        // Auto-complete first suggestion on tab
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault();
          onSelect(suggestions[selectedIndex]);
        }
        break;
    }
  }, [suggestions, selectedIndex, onSelect, onClose]);
  
  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);
  
  return { selectedIndex, handleKeyDown };
};

// Accessibility enhancements
const SearchInput = ({ onKeyDown, ...props }) => (
  <input
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-autocomplete="list"
    aria-activedescendant={
      selectedIndex >= 0 ? \`suggestion-\${selectedIndex}\` : undefined
    }
    onKeyDown={onKeyDown}
    {...props}
  />
);

const SuggestionItem = ({ suggestion, isSelected, index }) => (
  <div
    id={\`suggestion-\${index}\`}
    role="option"
    aria-selected={isSelected}
    className={\`suggestion-item \${isSelected ? 'selected' : ''}\`}
  >
    {suggestion.text}
  </div>
);`}</Code>
            </NoteSection>

            <NoteSection title="💾 Caching Strategy">
                <Code>{`// Multi-level Caching Implementation

// 1. In-Memory Cache
class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;
  
  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }
  
  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)!;
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }
  
  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// 2. Session Storage Cache
class SessionCache {
  private prefix = 'autocomplete_';
  private ttl = 5 * 60 * 1000; // 5 minutes
  
  set(key: string, data: any): void {
    const item = {
      data,
      timestamp: Date.now(),
      ttl: this.ttl
    };
    sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
  }
  
  get(key: string): any | null {
    const item = sessionStorage.getItem(this.prefix + key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    const isExpired = Date.now() - parsed.timestamp > parsed.ttl;
    
    if (isExpired) {
      sessionStorage.removeItem(this.prefix + key);
      return null;
    }
    
    return parsed.data;
  }
}

// 3. Cache-enabled Search Hook
const useCachedSearch = () => {
  const memoryCache = useRef(new LRUCache<string, Suggestion[]>(50));
  const sessionCache = useRef(new SessionCache());
  
  const search = useCallback(async (query: string) => {
    // Check memory cache first
    const memoryCached = memoryCache.current.get(query);
    if (memoryCached) return memoryCached;
    
    // Check session cache
    const sessionCached = sessionCache.current.get(query);
    if (sessionCached) {
      memoryCache.current.set(query, sessionCached);
      return sessionCached;
    }
    
    // Fetch from API
    const response = await SearchAPI.getSuggestions(query);
    const suggestions = response.suggestions;
    
    // Cache the results
    memoryCache.current.set(query, suggestions);
    sessionCache.current.set(query, suggestions);
    
    return suggestions;
  }, []);
  
  return { search };
};`}</Code>
            </NoteSection>

            <NoteSection title="📱 Mobile & Touch Optimization">
                <Code>{`// Mobile-specific Optimizations

// 1. Touch Events for Mobile
const useTouchEvents = (onSelect: (index: number) => void) => {
  const handleTouchStart = useCallback((e: React.TouchEvent, index: number) => {
    // Prevent scrolling when touching suggestion
    e.preventDefault();
  }, []);
  
  const handleTouchEnd = useCallback((e: React.TouchEvent, index: number) => {
    e.preventDefault();
    onSelect(index);
  }, [onSelect]);
  
  return { handleTouchStart, handleTouchEnd };
};

// 2. Responsive Design
const SearchContainer = styled.div\`
  position: relative;
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 0 16px;
  }
\`;

const SuggestionsDropdown = styled.div\`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  
  @media (max-width: 768px) {
    max-height: 250px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
\`;

// 3. Viewport Detection
const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);
  
  return { isMobile };
};

// 4. Mobile Input Handling
const MobileSearchInput = ({ onFocus, onBlur, ...props }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  return (
    <input
      onFocus={(e) => {
        setIsInputFocused(true);
        // Prevent zoom on iOS
        e.target.setAttribute('readonly', true);
        setTimeout(() => e.target.removeAttribute('readonly'), 100);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setIsInputFocused(false);
        onBlur?.(e);
      }}
      style={{
        fontSize: isInputFocused ? '16px' : '14px', // Prevent zoom
      }}
      {...props}
    />
  );
};`}</Code>
            </NoteSection>

            <NoteSection title="🎯 Frontend Interview Key Points">
                <Concepts items={[
                    "Explain debouncing vs throttling for search input",
                    "Discuss request cancellation to prevent race conditions",
                    "Component composition and reusability patterns",
                    "Accessibility: ARIA roles, keyboard navigation, screen readers",
                    "Mobile optimization: touch events, viewport handling",
                    "Caching strategies: memory vs session vs local storage",
                    "Performance: virtualization for large lists, memoization",
                    "Error handling: network failures, empty states, loading states",
                    "Testing: unit tests for hooks, integration tests for interactions"
                ]} />
            </NoteSection>

            <NoteSection title="📈 Performance Metrics">
                <Complexity operations={[
                    { operation: "Search Input", complexity: "< 50ms" },
                    { operation: "Suggestion Render", complexity: "< 100ms" },
                    { operation: "Cache Lookup", complexity: "O(1)" },
                    { operation: "Keyboard Navigation", complexity: "< 16ms" },
                    { operation: "Bundle Size", complexity: "< 50KB" }
                ]} />
            </NoteSection>

            <NoteSection title="🧪 Testing Strategy">
                <Code>{`// Testing Approach

// 1. Unit Tests for Hooks
describe('useDebounce', () => {
  it('should debounce value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: '', delay: 300 } }
    );
    
    expect(result.current).toBe('');
    
    rerender({ value: 'test', delay: 300 });
    expect(result.current).toBe(''); // Still old value
    
    await waitFor(() => {
      expect(result.current).toBe('test');
    }, { timeout: 500 });
  });
});

// 2. Integration Tests
describe('AutoComplete Component', () => {
  it('should show suggestions when typing', async () => {
    const mockSearch = jest.fn().mockResolvedValue([
      { id: '1', text: 'JavaScript' },
      { id: '2', text: 'Java' }
    ]);
    
    render(<AutoComplete onSearch={mockSearch} />);
    
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'ja' } });
    
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('ja');
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });
  });
  
  it('should handle keyboard navigation', async () => {
    // Test arrow keys, enter, escape
  });
});

// 3. Performance Tests
it('should not re-render unnecessarily', () => {
  const renderSpy = jest.fn();
  const MemoizedComponent = React.memo(() => {
    renderSpy();
    return <div>Component</div>;
  });
  
  // Test memoization effectiveness
});`}</Code>
            </NoteSection>
        </>
    );
}

export default AutoCompleteNotes; 