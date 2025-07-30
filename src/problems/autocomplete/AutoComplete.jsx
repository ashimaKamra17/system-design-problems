import React from "react";
import SearchBox from "./components/SearchBox/SearchBox";
import {
    AutoCompleteContainer,
    GoogleLogo,
    SearchSection,
    PoweredBySection
} from "./autocomplete.style";

function AutoComplete() {
    return (
        <AutoCompleteContainer>
            {/* Google-like Logo */}
            <GoogleLogo>
                <span className="letter-g1">G</span>
                <span className="letter-o1">o</span>
                <span className="letter-o2">o</span>
                <span className="letter-g2">g</span>
                <span className="letter-l">l</span>
                <span className="letter-e">e</span>
            </GoogleLogo>

            {/* Main Search Section */}
            <SearchSection>
                <SearchBox />
            </SearchSection>

            {/* Footer Info */}
            <PoweredBySection>
                <p>
                    System Design Problem: <strong>AutoComplete</strong>
                </p>
                <p>
                    Features: Real-time search, debouncing, caching, keyboard navigation
                </p>
            </PoweredBySection>
        </AutoCompleteContainer>
    );
}

export default AutoComplete; 