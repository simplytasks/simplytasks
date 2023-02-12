import Button from './Button'

const TaskListHeader = ({setAdder}) => {

    return (
        <header className='header'>
        <div className="logo">Simply<span>Tasks</span></div>
        <Button contents='Add Task' 
        handleClick={setAdder} />
        </header>
    );
}

export default TaskListHeader;