import { FormControl, InputLabel, Select } from "@mui/material";



const OrderByDropdown = () => {
    

    return (
        <FormControl fullWidth>
            <InputLabel id="order-by">Order By</InputLabel>
            <Select
                label="order-by"
            >
            </Select>
        </FormControl>
    )
}

export default OrderByDropdown;