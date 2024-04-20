import { DateCalendar, DatePicker, DatePickerToolbar, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { parseISO, isBefore, isAfter } from 'date-fns';
import { updateSubtask } from "../../services/subtasksService";
import { updateTask } from "../../services/tasksService";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";

const DeadlineDatePicker = ({
    deadline_date,
    id
}) => {
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

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
                label="Deadline Date"
                value={deadline_date && parseISO(deadline_date)}
                onChange={(newDate) => handleDeadlineDateChange(newDate)}
                minDateTime={currentDate}
            />
        </LocalizationProvider>
    )
}

export default DeadlineDatePicker;