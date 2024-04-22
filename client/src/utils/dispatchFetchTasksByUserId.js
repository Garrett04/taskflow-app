import { store } from '../app/store';
import { fetchTasksByUserId } from '../services/tasksService';

export const dispatchFetchTasksByUserId = (currentPath) => {
    if (currentPath.includes('/overdue-tasks')) {
        store.dispatch(fetchTasksByUserId({ status: 'overdue' }));
    } else if (currentPath.includes('/trash')) {
        store.dispatch(fetchTasksByUserId({ archived: true }));
    } else if (currentPath.includes('/')) {
        store.dispatch(fetchTasksByUserId({}));
    }
}