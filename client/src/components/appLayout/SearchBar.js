import { Divider, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { SearchBarContainer } from "./AppLayoutStyles";
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

        // to just fetch in tasks first by the location 
        // before the dispatch of filtering tasks by search term or not
        // this also prevents from removing tasks when searching multiple times.

        // dispatchFetchTasksByUserId(location.pathname);
    }

    const handleKeyUp = (e) => {
        const { key } = e;

        if (key === 'Enter') {
            handleSearch();
        }
    }

    // useEffect(() => {
    //     console.log(location);
    //     if (!term) {
    //         dispatchFetchTasksByUserId(location.pathname);
    //     }
    // }, [term, location.pathname, location.search]);

    return (
        <SearchBarContainer>
            <InputBase
                value={term}
                autoComplete="off"
                placeholder="Search Tasks"
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                sx={{
                    flex: 1,
                }}
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
            <IconButton size="small" title="Search" onClick={handleSearch} >
                <SearchIcon/>
            </IconButton>
        </SearchBarContainer>
    )
}

export default SearchBar;