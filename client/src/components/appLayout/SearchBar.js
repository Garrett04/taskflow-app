import { Divider, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { InputBase, SearchBarContainer, SearchButton } from "./AppLayoutStyles";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";


const SearchBar = () => {
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search');
    const [term, setTerm] = useState(search || "");
    const navigate = useNavigate();
    const location = useLocation();
    

    const handleChange = (e) => {
        const { value } = e.target;

        setTerm(value);
    }

    const handleSearch = () => {
        if (!term) {
            navigate(location.pathname);
        } else {
            navigate(`?search=${term}`);
        }
        setTerm("");
    }

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
            <SearchButton size='small' title="Search" onClick={handleSearch} >
                <SearchIcon/>
            </SearchButton>
        </SearchBarContainer>
    )
}

export default SearchBar;