export default class ProblemData {

    problemData_id: number;
    problemData_problemId: number;
    problemData_key: string;
    problemData_column: string;

    constructor(
        problemData_id: number = -1,
        problemData_problemId: number = -1,
        problemData_key: string ="",
        problemData_column: string ="",
  
    )
{
        this.problemData_id = problemData_id;
        this.problemData_problemId = problemData_problemId;
        this.problemData_key = problemData_key;
        this.problemData_column = problemData_column;
     
    }
}