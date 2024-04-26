import { DateCalendar, DatePicker, DatePickerToolbar, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { parseISO, isBefore, isAfter } from 'date-fns';
import { updateSubtask } from "../../../services/subtasksService";
import { fetchTaskById, updateTask } from "../../../services/tasksService";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const DeadlineDatePicker = ({
    deadline_date,
    id
}) => {
    const [deadlineDate, setDeadlineDate] = useState(deadline_date);
    const dispatch = useDispatch();
    const currentDate = new Date();

    const handleDeadlineDateChange = async (newDate) => {
        try {
            // If the selected date is after the currentDate only then will you update the deadline
            if (isAfter(newDate, currentDate)) {
                const data = { id, deadline_date: newDate };
            
                await updateTask(data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeDeadlineDate = async () => {
        try {
            const data = { id, deadline_date: "null" };

            await updateTask(data);

            setDeadlineDate(null);

            dispatch(fetchTaskById(id));
        } catch (err) {
            throw err;
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