import Task from './Task'

const Tasks = ({tasks, deleteTask, highlightTask, deleteSubtask, highlightSubtask, showSubtasks}) =>
{
    return (
        <div className="tasks">
            {
            tasks.map((task) =>(
            // replace keys with database info in long run
            <Task key={task.id} task={task} deleteTask={deleteTask} highlightTask={highlightTask}
             deleteSubtask={deleteSubtask} highlightSubtask={highlightSubtask} showSubtasks={showSubtasks} />
            ))
            }
        </div>
    );
}

export default Tasks;