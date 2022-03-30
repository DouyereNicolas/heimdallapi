export default class TaskData {
    // 1. Typage des propiétés d'un pokémon.
    taskData_id: number;
    taskData_taskId: number ;
    taskData_key: String;
    taskData_column: String;
     
    // 2. Définition des valeurs par défaut des propriétés d'une task.
    constructor(
    taskData_id: number = 0,
    taskData_taskId: number = 0 ,
    taskData_key: String =  "" , 
    taskData_column: String = '',
    ) {
     // 3. Initialisation des propiétés d'une task.
     this.taskData_id = taskData_id;
     this.taskData_taskId = taskData_taskId;
     this.taskData_key = taskData_key;
     this.taskData_column = taskData_column;
    }
   }