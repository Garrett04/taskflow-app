export const renderPageTitle = (status) => {
    if (status === 'completed') {
        return "Completed Tasks";
    } else if (status === 'overdue') {
        return "Overdue Tasks";
    } else if (status === 'archived') {
        return "Trash";
    } else {
        return "All Tasks";
    }
}