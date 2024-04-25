import { format } from "date-fns";
import { MuiDeadlineDate } from "../MainStyles";


const DeadlineDate = ({
    deadline_date
}) => {
    return (
        <MuiDeadlineDate>
            {deadline_date && format(new Date(deadline_date), "yyyy-MM-dd hh:mm aa")}
        </MuiDeadlineDate>
    )
}

export default DeadlineDate;