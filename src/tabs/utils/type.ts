export type CreateTabParams = {
    tabId: number;
    tabName: string;
    permission: boolean;
    challengeTitle: string;
}

export type EditTabParams = {
    tabId: number;
    tabName: string;
    permission: boolean;
    challengeTitle: string;
}

export type DeleteTabParams = {
    tabName: string;
    challengeTitle: string;
}