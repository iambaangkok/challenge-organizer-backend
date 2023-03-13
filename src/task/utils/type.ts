import exp from "constants";
import { Challenge } from "src/typeorm/entities/Challenge"




export type CreateTaskParams = {

    description: string;
    score : number;
};


export type EditTaskParams = {

    description: string;
    score: number;
    doned : boolean;
}

export type TaskUserParams ={
    displayName:string
}