import Button from './Button'

const TaskListHeader = () => {
    return (
        <header className='header'>
        <div className="logo">Simply<span>Tasks</span></div>
        <Button contents='Add Task' />
        </header>
    );
}

export default TaskListHeader;