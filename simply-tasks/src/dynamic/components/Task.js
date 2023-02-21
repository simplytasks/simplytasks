import { FaTimes } from 'react-icons/fa'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
         FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight} from 'react-icons/fa';
import Subtasks from './Subtasks'
import SubtaskAdder from './SubtaskAdder'

const Task = ({task, deleteTask, highlightTask, deleteSubtask, 
    highlightSubtask, showSubtasks, addSubtask, toggleSubtaskAdder}) => {

    // onDoubleClick conflict with Click so add separate mechanism for show subtasks
    // which honestly looks amazing
    return (
        <>

        <div className={`task ${task.highlight ? 'highlight' : ''}`} onClick={()=>highlightTask(task.id)}>
            <h3>{task.content} <FaTimes className='X' onClick={(e) => deleteTask(e, task.id)} /></h3>
            <h5>{task.date} 
            {task.showSubtasks ? 
            <FaRegArrowAltCircleUp className="arrow" onClick={(e) => showSubtasks(e, task.id)} /> : 
            <FaRegArrowAltCircleDown className="arrow" onClick={(e) => showSubtasks(e, task.id)} /> }
            </h5>
        </div>
        <div className={`subtask-area ${task.showSubtasks ? 'shown' : ''}`}>
        { task.showSubtasks ? <>
        <Subtasks taskID={task.id} subtasks={task.subtasks} deleteSubtask={deleteSubtask} highlightSubtask={highlightSubtask} />
        <div className='subtask-adder-area'>
        { task.showSubtaskAdder ? 
        <><SubtaskAdder taskID={task.id} addSubtask={addSubtask} />
          <FaRegArrowAltCircleLeft className="arrow left" onClick={() => toggleSubtaskAdder(task.id)}/></>
        : <FaRegArrowAltCircleRight className="arrow right" onClick={() => toggleSubtaskAdder(task.id) }/> }
        </div>
        </>: <></>
        }
        </div>
        </>
    );
}

export default Task;