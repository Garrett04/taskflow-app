import { store } from '../app/store';
import { fetchTasksByUserId } from '../services/tasksService';

export const dispatchFetchTasksByUserId = (currentPath, filterOptions) => {
    // If filterOptions object isnt present then default it to an empty object.
    // to prevent throwing an error when destructuring.
    const { sort, order } = filterOptions ?? {};

    if (currentPath.includes('/completed-tasks')) {
        
        store.dispatch(fetchTasksByUserId({ status: 'completed', sort, order }));
    
    } else if (currentPath.includes('/overdue-tasks')) {

        store.dispatch(fetchTasksByUserId({ status: 'overdue', sort, order }));
    
    } else if (currentPath.includes('/trash')) {
        
        store.dispatch(fetchTasksByUserId({ archived: true, sort, order }));
    
    } else if (currentPath.includes('/')) {
     
        store.dispatch(fetchTasksByUserId({ sort, order }));
    
    }
}