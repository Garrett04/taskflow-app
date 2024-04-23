import { FormControl } from "@mui/material";
import SortByDropdown from "./SortByDropdown";
import OrderByDropdown from "./OrderByDropdown";
import { Box } from "./FilterDropdownsStyles";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const FilterDropdowns = () => {
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value } = e.target;
    // if sort by option is selected then navigate to ?sort={SORT}
    if (name === 'sort-by') {
      navigate(`?sort=${value}`)
      setSortBy(value);
    }

    // if sort by is present in query params and order by option is selected then navigate to
    // ?sort={SORT}&order={ORDER}
    if (sort && name === 'order-by') {
      setOrderBy(value);

      const queryParams = {
        sort: sort,
        order: value,
      }
  
      const query = createSearchParams(queryParams);
  
      // console.log(query);
  
      navigate({
        pathname: `/`, 
        search: `?${query}` 
      });
    }
  }

  return (
    <Box>
      <SortByDropdown handleChange={handleChange} sort={sort} sortBy={sortBy} />
      <OrderByDropdown handleChange={handleChange} sort={sort} order={order} orderBy={orderBy} />
    </Box>
);
};

export default FilterDropdowns;