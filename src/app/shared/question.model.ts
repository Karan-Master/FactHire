import { mcq } from './mcq.model';

export class question{
    Question_Id : number;
    max_marks : number;
    type_id : number;
    Instructions : string;
    Case_id: number;
    mcqs : mcq[];
}