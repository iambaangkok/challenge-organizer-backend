export type createSubmissionDto ={
    displayName: string;
    taskId : number ; 
}


export type updateGradeDto ={
    submissionId : number ;
    score : number ;
}


export type submitAgain = {
    submissionId : number ;
}


export type deleteSubmissionParam={
    submissionId : number ;
}

export type TaskIdParam = {
    taskId : number ;
}