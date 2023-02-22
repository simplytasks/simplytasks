import Button from './Button'
import SortSelect from './SortSelect'

const TaskListHeader = ({setAdder, changeSort, sortMethod}) => {

    return (
        <header className='header'>
            <div className="logo">Simply<span>Tasks</span></div>
            <div className="sort"><Button contents={sortMethod} handleClick={changeSort}/></div>
            <div className="add"><Button contents={'Add Task'} handleClick={setAdder}/></div>
        </header>
    );
}

export default TaskListHeader;