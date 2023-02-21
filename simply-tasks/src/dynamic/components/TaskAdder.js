import { FaTimes, FaCheck } from 'react-icons/fa'

import {useState} from 'react';

const TaskAdder = ({addTask, unsetAdder}) => {
    const today = new Date().toISOString().slice(0,10);

    const [content, setContent] = useState('');
    const [inputDate, setInputDate] = useState(today);

    const submitTask = (e) => {
        const contentPlaceholder = document.querySelector('input[type=text]');

        if (content === '') {
            contentPlaceholder.style.setProperty('--c', 'rgb(207, 93, 93)');
            setTimeout(() => contentPlaceholder.style.setProperty('--c', 'gray'), 1500);
        }
        else {
            let yyyy = inputDate.slice(0, 4);
            let mm = inputDate.slice(5, 7);
            let dd = inputDate.slice(8,10);
            let date = mm + '/' + dd + '/' + yyyy;
            addTask({content, date});
            setContent('');
            setInputDate(today);
        }
    }

    return (
        <form className='task-adder'>
            <div className='left-side'>
                <input type='text' placeholder='Type your new task'
                 value={content} onChange={(e) => setContent(e.target.value)} />
                <input type='date' min={today}
                value={inputDate} onChange={(e) => setInputDate(e.target.value) } />
            </div>
            <div className='right-side'>
                <FaCheck className="✔" onClick={submitTask} />
                <FaTimes className="X" onClick={unsetAdder} />
            </div>
        </form>
    );
}

export default TaskAdder;