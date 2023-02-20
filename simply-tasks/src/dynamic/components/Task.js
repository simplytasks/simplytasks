import { FaTimes } from 'react-icons/fa'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import Subtasks from './Subtasks'

const Task = ({task, deleteTask, highlightTask, deleteSubtask, highlightSubtask, showSubtasks}) => {

    // onDoubleClick conflict with Click so add separate mechanism for show subtasks
    return (
        <>

        <div className={`task ${task.highlight ? 'highlight' : ''}`} onClick={()=>highlightTask(task.id)}>
            <h3>{task.content} <FaTimes className='X' onClick={(e) => deleteTask(e, task.id)} /></h3>
            <h5>{task.date} 
            {task.showSubtasks ? 
            <FaRegArrowAltCircleUp className="arrow up" onClick={(e) => showSubtasks(e, task.id)} /> : 
            <FaRegArrowAltCircleDown className="arrow down" onClick={(e) => showSubtasks(e, task.id)} /> }
            </h5>
        </div>
        { task.showSubtasks ? 
        <Subtasks subtasks={task.subtasks} deleteSubtask={deleteSubtask} highlightSubtask={highlightSubtask} /> :
        <></>
        }
        </>
    );
}

export default Task;