import {FaTimes} from 'react-icons/fa'
const Subtask = ({subtask, highlightSubtask, deleteSubtask}) => {

    return (
        <div className={`subtask ${subtask.highlight ? 'highlight' : ''}`} onClick={()=>highlightSubtask(subtask.id)}>
            <h4>{subtask.content} <FaTimes className='X' onClick={(e) => deleteSubtask(e, subtask.id)} /> </h4>
        </div>
    );
} 

export default Subtask;