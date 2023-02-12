import { FaTimes, FaCheck } from 'react-icons/fa'

import {useState} from 'react';

const TaskAdder = ({addTask, unsetAdder}) => {
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');

    const submitTask = (e) => {
        const placeholder = document.querySelector('input[type=text]');
        if (content === '') {
            placeholder.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => placeholder.style.setProperty('--c', 'gray'), 1500);
        } else {
            addTask({content, date});
            // can also get rid of add form upon every add
            setContent('');
            setDate('');
        }
    }

    return (
        <form className='task-adder'>
            <div className='left-side'>
                <input type='text' placeholder='Type your new task'
                value={content} onChange={(e) => setContent(e.target.value)} />
                <input type='date' 
                value={date} onChange={(e) => setDate(e.target.value) } />
            </div>
            <div className='right-side'>
                <FaCheck className="✔" onClick={submitTask} />
                <FaTimes className="X" onClick={unsetAdder} />
            </div>
        </form>
    );
}

export default TaskAdder;