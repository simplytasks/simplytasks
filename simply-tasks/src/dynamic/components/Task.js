import { FaTimes } from 'react-icons/fa'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp,
         FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight, FaListUl} from 'react-icons/fa';
import Subtasks from './Subtasks'
import SubtaskAdder from './SubtaskAdder'

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const Task = ({task, deleteTask, highlightTask, deleteSubtask, 
    highlightSubtask, showSubtasks, addSubtask, toggleSubtaskAdder}) => {


        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
    
        } = useSortable(
            {id: task.id});
    
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

     

    // onDoubleClick conflict with Click so add separate mechanism for show subtasks
    // which honestly looks amazing
    return (
        <>

        <div ref={setNodeRef} style={style} className={`task ${task.highlight ? 'highlight' : ''}`} onClick={()=>highlightTask(task.id)}>
            
            <h3>{task.content} <div>
                <FaListUl {...attributes} {...listeners}/> 
                <FaTimes className='X' onClick={(e) => deleteTask(e, task.id)} />
                </div>
                </h3>
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