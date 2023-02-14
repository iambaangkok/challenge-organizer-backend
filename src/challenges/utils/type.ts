export type CreateChallengeParams = {
    challengeTitle: string;
    description: string;
    type: string;
    format: string;
    startDate: Date;
    endDate: Date;
    maxParticipants : number
    numParticipants : number
}

export type EditChallengeParams = {
    challengeTitle: string;
    description: string;
    type: string;
    format: string;
    startDate: Date;
    endDate: Date;
    bannerImg:string;
    publishedStatus: boolean;
    maxParticipants: number;
    maxTeams: number;
}

export type JoinLeaveChallengeParams = {
    userId: string;
}