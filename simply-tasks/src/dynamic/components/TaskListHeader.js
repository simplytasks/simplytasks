import Button from './Button'
import SortSelect from './SortSelect'

const TaskListHeader = ({setAdder, changeSort}) => {

    return (
        <header className='header'>
            <div className="logo">Simply<span>Tasks</span></div>
            <div>
                <Button contents='Add Task' handleClick={setAdder} />
                <SortSelect changeSort={changeSort} />
            </div>
        </header>
    );
}

export default TaskListHeader;