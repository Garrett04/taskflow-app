import SortByDropdown from "./SortByDropdown";
import OrderByDropdown from "./OrderByDropdown";
import { Box } from "./FilterDropdownsStyles";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilterDropdowns = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const sort = searchParams.get('sort') || location.state?.sort;
  const order = searchParams.get('order') || location.state?.order;

  const [sortBy, setSortBy] = useState(sort || "");
  const [orderBy, setOrderBy] = useState(order || "");

  const navigate = useNavigate();

  useEffect(() => {
      // if accessed directly by url
      // then navigate user to ?sort={SORT}&order=ascending 
      if (sort && !order) {
          navigate(`?sort=${sort}&order=ascending`);
      } else {
      // Reset sortBy and orderBy when navigating between pages
      // so if like the url is /?sort={SORT}&order={ORDER}
      // and when navigating to a different page like trash
      // to avoid having both the filter dropdowns and instead just the sortBy dropdown
          setSortBy("");
          setOrderBy("");
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