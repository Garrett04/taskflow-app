export const renderPageTitle = (status) => {
    if (status === 'completed') {
        return "Completed Tasks";
    } else if (status === 'overdue') {
        return "Overdue Tasks";
    } else if (status === 'deleted') {
        return "Trash";
    } else {
        return "All Tasks";
    }
}