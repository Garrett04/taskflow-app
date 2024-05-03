import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { parseISO, isAfter } from 'date-fns';
import { updateTask } from "../../../services/tasksService";
import { useState } from "react";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { dispatchFetchTasksByUserId } from "../../../utils/dispatchFetchTasksByUserId";
import { useLocation } from "react-router-dom";

const DeadlineDatePicker = ({
    deadline_date,
    id
}) => {
    const [deadlineDate, setDeadlineDate] = useState(deadline_date);
    const currentDate = new Date();
    const { pathname } = useLocation();

    const handleDeadlineDateChange = async (newDate) => {
        try {
            // If the selected date is after the currentDate only then will you update the deadline
            if (isAfter(newDate, currentDate)) {
                const data = { id, deadline_date: newDate };
            
                await updateTask(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const removeDeadlineDate = async () => {
        try {
            const data = { id, deadline_date: "null" };

            await updateTask(data);

            setDeadlineDate(null);

            dispatchFetchTasksByUserId(pathname);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
                label="Deadline Date"
                value={deadlineDate && parseISO(deadlineDate)}
                onChange={(newDate) => handleDeadlineDateChange(newDate)}
                disablePast
                sx={{
                    marginLeft: 'auto'
                }}
            />
            <IconButton title="Remove Deadline Date" onClick={removeDeadlineDate}>
                <RemoveCircleIcon />
            </IconButton>
        </LocalizationProvider>
    )
}

export default DeadlineDatePicker;