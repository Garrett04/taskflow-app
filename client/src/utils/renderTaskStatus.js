import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskIcon from '@mui/icons-material/Task';
import HourglassDisabled from "@mui/icons-material/HourglassDisabled";

// Renders task status icon based on the task's current status
export const renderTaskStatus = (taskStatus) => {
    if (taskStatus === 'pending') {
        return <PendingActionsIcon titleAccess="Pending" />;
    } else if (taskStatus === 'completed') {
        return <TaskIcon titleAccess="Completed" />;
    } else if (taskStatus === 'overdue') {
        return <HourglassDisabled titleAccess="Overdue" />;
    }
}