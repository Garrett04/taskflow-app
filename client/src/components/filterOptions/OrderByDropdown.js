import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";



const OrderByDropdown = ({
    handleChange,
    orderBy,
    sort,
    order
}) => {
    if (sort) {
        return (
            <FormControl fullWidth>
                <InputLabel id="order-by">Order By</InputLabel>
                <Select
                    labelId="order-by"
                    label="order-by"
                    value={orderBy || order}
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