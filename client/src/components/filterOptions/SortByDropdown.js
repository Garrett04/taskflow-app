import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSearchParams } from "react-router-dom";


const SortByDropdown = ({
  handleChange,
  sortBy,
  sort
}) => {

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-by">Sort By</InputLabel>
      <Select
        label="sort-by"
        labelId="sort-by"
        value={sortBy || sort}
        onChange={handleChange}
        name="sort-by"
      >
          <MenuItem value="deadline_date">Deadline Date</MenuItem>
          {/* <MenuItem value="Priority">Priority</MenuItem> */}
      </Select>
    </FormControl>
  )
}

export default SortByDropdown;