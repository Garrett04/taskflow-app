import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


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
        value={sort || sortBy}
        onChange={handleChange}
        name="sort-by"
      >
          <MenuItem value="date_created">Date Created</MenuItem>
          <MenuItem value="deadline_date">Deadline Date</MenuItem>
          {/* <MenuItem value="Priority">Priority</MenuItem> */}
      </Select>
    </FormControl>
  )
}

export default SortByDropdown;