import { format } from "date-fns";
import { MuiDeadlineDate } from "../MainStyles";


const DeadlineDate = ({
    deadline_date,
    task_status
}) => {

    return (
        <MuiDeadlineDate data-testid="deadline-date" is_completed={task_status === 'completed' ? 'true' : 'false'}>
            {deadline_date && format(new Date(deadline_date), "yyyy-MM-dd hh:mm aa")}
        </MuiDeadlineDate>
    )
}

export default DeadlineDate;