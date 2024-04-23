import { FormControl } from "@mui/material";
import SortByDropdown from "./SortByDropdown";
import OrderByDropdown from "./OrderByDropdown";
import { Box } from "./FilterDropdownsStyles";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilterDropdowns = () => {
  const [sortBy, setSortBy] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const navigate = useNavigate();

  useEffect(() => {
      // if accessed directly by url
      // then navigate user to ?sort={SORT}&order=ascending 
      if (sort && !order) {
          navigate(`?sort=${sort}&order=ascending`);
      }
  }, [navigate, sort, order]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    // if sort query has a value in url 
    // or sort by option is selected 
    // navigate to ?sort={SORT}&order={ORDER}
    if (sort || name === 'sort-by') {
      // default order option will be ascending
      navigate(`?sort=${value}&order=ascending`);
      setSortBy(value);
    }

    // if sortBy or sort is present and order by option is selected then navigate to
    // ?sort={SORT}&order={ORDER}
    if ((sortBy || sort) && name === 'order-by') {
      setOrderBy(value);

      const queryParams = {
        sort: sort || sortBy,
        order: value,
      }
  
      const query = createSearchParams(queryParams);
  
      // console.log(query);
  
      navigate({
        search: `?${query}` 
      });
    }
  }

  return (
    <Box>
      <SortByDropdown 
        handleChange={handleChange} 
        sort={sort} 
        sortBy={sortBy} 
      />
      <OrderByDropdown 
        handleChange={handleChange} 
        sortBy={sortBy} 
        sort={sort} 
        order={order} 
        orderBy={orderBy} 
      />
    </Box>
);
};

export default FilterDropdowns;