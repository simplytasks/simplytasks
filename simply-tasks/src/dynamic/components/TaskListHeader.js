import Button from './Button'
import SortSelect from './SortSelect'

const TaskListHeader = ({setAdder, changeSort}) => {

    return (
        <header className='header'>
            <div className="logo">Simply<span>Tasks</span></div>
            <SortSelect changeSort={changeSort} />
            <Button contents='Add Task' handleClick={setAdder} />
        </header>
    );
}

export default TaskListHeader;