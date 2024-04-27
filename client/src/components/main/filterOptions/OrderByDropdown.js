import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const OrderByDropdown = ({
    handleChange,
    orderBy,
    sortBy,
    order,
    sort
}) => {
    // if sortBy has a value that means the SortByDropdown option has been selected
    // or if the url query param has sort value
    // then display the OrderByDropdown
    if (sortBy || sort) {
        return (
            <FormControl fullWidth>
                <InputLabel id="order-by">Order By</InputLabel>
                <Select
                    labelId="order-by"
                    label="order-by"
                    value={order || orderBy}
                    onChange={handleChange}
                    name="order-by"
                >
                    <MenuItem value="ascending">
                        Oldest
                    </MenuItem>
                    <MenuItem value="descending">
                        Newest
                    </MenuItem>
                </Select>
            </FormControl>
        )
    }
}

export default OrderByDropdown;