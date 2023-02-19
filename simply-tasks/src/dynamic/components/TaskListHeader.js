import Button from './Button'

const TaskListHeader = ({setAdder, changeSort}) => {

    return (
        <header className='header'>
        <div className="logo">Simply<span>Tasks</span></div>
        <Button contents='Sort By Message' handleClick={changeSort} />
        <Button contents='Add Task' handleClick={setAdder} />
        </header>
    );
}

export default TaskListHeader;