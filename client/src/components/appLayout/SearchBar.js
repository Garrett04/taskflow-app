import { Divider, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { InputBase, SearchBarContainer, SearchButton } from "./AppLayoutStyles";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


const SearchBar = () => {
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search');
    // This is the term provided by user in the search box
    const [term, setTerm] = useState(search || "");
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleChange = (e) => {
        const { value } = e.target;

        setTerm(value);
    }

    // This handles empty search term.
    const handleSearch = () => {
        // If term is empty then navigate to home page
        if (!term) {
            navigate(location.pathname);
        // Else navigate to that search term
        } else {
            navigate(`?search=${term}`);
        }
        // Clear the term
        setTerm("");
    }

    // For when user hits the Enter key
    const handleKeyUp = (e) => {
        const { key } = e;

        if (key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <SearchBarContainer>
            <InputBase
                value={term}
                autoComplete="off"
                placeholder="Search Tasks"
                onChange={handleChange}
                onKeyUp={handleKeyUp}
            />
            {term
            &&
                // A cancel button to cancel the search
                (
                    <IconButton 
                        size="small" 
                        title="Clear" 
                        onClick={() => setTerm("")}
                    >
                        <ClearIcon />
                    </IconButton>
                )
            }
            <Divider sx={{ height: '2rem', margin: '0 .3em' }} orientation="vertical" />
            {/* The search button which simply calls handleSearch when clicked */}
            <SearchButton size='small' title="Search" onClick={handleSearch} >
                <SearchIcon/>
            </SearchButton>
        </SearchBarContainer>
    )
}

export default SearchBar;