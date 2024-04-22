import { FormControl } from "@mui/material";
import SortByDropdown from "./SortByDropdown";
import OrderByDropdown from "./OrderByDropdown";
import { Box } from "./FilterDropdownsStyles";

const FilterDropdowns = () => {
  return (
    <Box>
      <SortByDropdown />
      <OrderByDropdown />
    </Box>
);
};

export default FilterDropdowns;