import {FaTimes} from 'react-icons/fa'
const Subtask = ({taskID, subtask, highlightSubtask, deleteSubtask}) => {

    return (
        <div className={`subtask ${subtask.highlight ? 'highlight' : ''}`} onClick={()=>highlightSubtask(taskID, subtask.id)}>
            <h4>{subtask.content} <FaTimes className='X' onClick={(e) => deleteSubtask(e, taskID, subtask.id)} /> </h4>
        </div>
    );
} 

export default Subtask;