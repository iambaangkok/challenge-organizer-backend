



export class CreateTaskDto{

    description: string;
    score: number;
    challengeTitle : string;
    start : Date;
    end : Date;

}


export class EditTaskDto{
    description: string;
    score: number;
    doned : boolean;
}

export class FindTaskInUser{
    displayName: string;
    // challengeTitle: string;
}

