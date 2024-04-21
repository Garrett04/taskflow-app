import { useSelector } from "react-redux";
import { selectTasks } from "../features/tasks/tasksSlice";
import Tasks from "../components/main/Tasks";



const CompletedTasks = () => {
    const tasks = useSelector(selectTasks);

    return (
        <Tasks page={"Completed Tasks"} />
    )
}

export default CompletedTasks;