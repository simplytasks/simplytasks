import Subtask from './Subtask'

const Subtasks = ({taskID, subtasks, deleteSubtask, highlightSubtask}) => {

    return (
        <>
            {
            subtasks.map((subtask) =>(
            <Subtask taskID={taskID} key={subtask.id} subtask={subtask} deleteSubtask={deleteSubtask} highlightSubtask={highlightSubtask} />
            ))
            }
        </>
    );
}

export default Subtasks;