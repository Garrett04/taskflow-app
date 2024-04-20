import { DateCalendar, DatePicker, DatePickerToolbar, DateTimePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { parseISO } from 'date-fns';
import { updateSubtask } from "../../services/subtasksService";
import { updateTask } from "../../services/tasksService";
import { useDispatch } from "react-redux";

const DeadlineDatePicker = ({
    deadline_date,
    id
}) => {
    const dispatch = useDispatch();

    const handleDeadlineDateChange = async (newDate) => {
        try {
            const data = { id, deadline_date: newDate };
            await updateTask(data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker 
                label="Deadline Date"
                defaultValue={deadline_date ? parseISO(deadline_date) : null} 
                onAccept={handleDeadlineDateChange}
            />
        </LocalizationProvider>
    )
}

export default DeadlineDatePicker;