import { Challenge } from "src/typeorm/entities/Challenge"




export type CreateTaskParams = {

    description: string;
    score : number;
};