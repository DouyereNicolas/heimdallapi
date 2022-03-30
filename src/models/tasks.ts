export default class Task {
    // 1. Typage des propiétés d'un pokémon.
    task_id: number;
    task_dateStart: Date ;
    task_dateEnd: Date;
    task_title: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
     
    // 2. Définition des valeurs par défaut des propriétés d'une task.
    constructor(
    task_id: number = 0,
    task_dateStart: Date = new Date("Y-m-d H:i:s") ,
    task_dateEnd:  Date = new Date("Y-m-d H:i:s") , 
    task_title:string = 'new task',
    created_at: Date = new Date("Y-m-d H:i:s"),
    updated_at: Date = new Date("Y-m-d H:i:s"),
    deleted_at: Date = new Date("Y-m-d H:i:s")
    ) {
     // 3. Initialisation des propiétés d'une task.
     this.task_id = task_id;
     this.task_dateStart = task_dateStart;
     this.task_dateEnd = task_dateEnd;
     this.task_title = task_title;
     this.created_at = created_at;
     this.updated_at = updated_at;
     this.deleted_at = deleted_at;
    }
   }