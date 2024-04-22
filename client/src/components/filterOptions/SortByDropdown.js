import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const SortByDropdown = () => {
    const handleChange = () => {

    }

    return (
        <FormControl fullWidth>
          <InputLabel id="sort-by">Sort By</InputLabel>
          <Select
            onChange={handleChange}
            label="sort-by"
          >
              <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
    )
}

export default SortByDropdown;