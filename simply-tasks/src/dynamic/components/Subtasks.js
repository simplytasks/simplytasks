import Subtask from './Subtask'

const Subtasks = ({subtasks, deleteSubtask, highlightSubtask}) => {

    return (
        <>
        <div className="subtasks">
            {
            subtasks.map((subtask) =>(
            // replace keys with database info in long run
            <Subtask key={subtask.id} subtask={subtask} deleteSubtask={deleteSubtask} highlightSubtask={highlightSubtask} />
            ))
            }
        </div>
        </>
    );
}

export default Subtasks;