import { useDispatch, useSelector } from "react-redux";
import { fetchSampleTasks, getTasksError, getTasksStatus, selectTasks } from "../../features/tasks/tasksSlice";
import { useEffect } from "react";
import { fetchTasksByUserId } from "../../services/tasksService";
import { selectIsAuthenticated } from "../../features/auth/authSlice";


const Tasks = () => {
    const tasks = useSelector(selectTasks);
    const tasksStatus = useSelector(getTasksStatus);
    const tasksError = useSelector(getTasksError);
    
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchTasksByUserId());
        } else {
            // dispatch fetchPremadeTasks
            dispatch(fetchSampleTasks());
        }
    }, [dispatch]);

    const renderAllTasks = () => {
        return tasks.map(task => (
            <div key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.status}</p>
                <p>{task.deadline_date}</p>
            </div>
        ))
    }

    let content;
    if (tasksStatus === 'pending') {
        content = 'Loading...'
    } else if (tasksStatus === 'fulfilled') {
        content = renderAllTasks();
    } else if (tasksStatus === 'rejected') {
        content = tasksError;
    }

    return (
        // Show all tasks here
        <div className="tasks">
            {content}
        </div>
    )
}

export default Tasks;