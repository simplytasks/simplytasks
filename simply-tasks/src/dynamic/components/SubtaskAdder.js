import { FaCheck } from 'react-icons/fa';
import {useState} from 'react'

const SubtaskAdder = ({taskID, addSubtask}) => {
    const [content, setContent] = useState('');

    const submitSubtask = (e) => {
        const contentPlaceholder = document.querySelector('.subtask-input');
        if (content === ''){
            contentPlaceholder.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => contentPlaceholder.style.setProperty('--c', 'gray'), 1500);
        } else {
            addSubtask(content, taskID);
            setContent('');
        }
    }
    const keyPressed = (e) => {
        if (e.key === 'Enter'){
             e.preventDefault()
             submitSubtask()
        }
    }
    return ( 
        <>
        <form className='subtask-adder'>
            <input className='subtask-input' type='text' placeholder='Type your new subtask'
             value={content} onKeyDown={keyPressed} onChange={(e) => setContent(e.target.value)} />
            <FaCheck className="✔" onClick={submitSubtask} />
        </form>
        </>
    );
}

export default SubtaskAdder;