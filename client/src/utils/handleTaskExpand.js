// prevents the task from expanding when user clicks on aby of the tasks buttons.
export const handleTaskExpand = (e) => {
    e.stopPropagation();
}