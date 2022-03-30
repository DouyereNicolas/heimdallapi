import React, {FunctionComponent} from "react";
import Task from '../../models/tasks'
type Props = {
    task: Task
  };

  
const TaskCard: FunctionComponent<Props> = ({task}) => {
    return (
      <div style={{border:'1px solid blue', margin:'20px'}}>
        <h1 className="center">task numero {task.task_id}</h1>
        <p className='center'>Titre : {task.task_title}</p>
        <p className='center'>Date de début : {task.task_dateStart}</p>
        <p className='center'>date de fin : {task.task_dateEnd}</p>
      </div> 
    );
  }
  export default TaskCard;