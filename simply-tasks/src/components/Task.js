import { FaTimes } from 'react-icons/fa'

const Task = ({task, deleteTask, highlightTask}) => {
    return (
        // could also make it onDoubleClick() if planning to add drag functionality
        // I think it's good as is as simple and easy to use
        <div className={`task ${task.highlight ? 'highlight' : ''}`} onClick={()=>highlightTask(task.id)}>
            <h3>{task.content} <FaTimes className='X' onClick={(e) => deleteTask(e, task.id)} /> </h3>
            <h5>{task.date}</h5>
        </div>
    );
}

export default Task;