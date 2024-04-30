export const renderPageTitle = (pathname) => {
    if (pathname.includes('/completed-tasks')) {
        return "Completed Tasks";
    } else if (pathname.includes('/overdue-tasks')) {
        return "Overdue Tasks";
    } else if (pathname.includes('/trash')) {
        return "Trash";
    } else {
        return "All Tasks";
    }
}