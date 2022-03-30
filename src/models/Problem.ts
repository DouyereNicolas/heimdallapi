import ProblemData from "./ProblemData";

export default class Problem {

    problem_id: number;
    problem_ref: string;
    created_at: Date;
    updated_at: Date|null;
    deleted_at: Date|null;
    data?: ProblemData[]|null;

    constructor(
        problem_id: number = -1,
        problem_ref: string = "",
        created_at: Date  = new Date(),
        updated_at: Date|null = null,
        deleted_at: Date|null = null
    )
{
        this.problem_id = problem_id;
        this.problem_ref = problem_ref;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}