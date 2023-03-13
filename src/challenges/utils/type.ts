export type CreateChallengeParams = {
    challengeTitle: string;
    description: string;
    type: string;
    format: string;
    host: string;
    startDate: Date;
    endDate: Date;
    maxParticipants: number;
    numParticipants: number;
};

export type EditChallengeParams = {
    challengeTitle: string;
    description: string;
    type: string;
    format: string;
    startDate: Date;
    endDate: Date;
    bannerImg: string;
    publishedStatus: boolean;
    maxParticipants: number;
    maxTeams: number;
};

export type JoinLeaveChallengeParams = {
    displayName: string;
};


export type AddCollaborator = {
    challengeTitle: string
    cmuAccount: string
}


export type DeleteCollaborator ={
    challengeId: number
    userId: number
}