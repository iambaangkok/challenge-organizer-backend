import { Challenge } from '../../typeorm/entities/Challenge';
import { userTestData1 } from '../../users/controller/__tests__/users.testdata';

export const challengesTestData1: Challenge = {
    challengeId: 1,
    challengeTitle: 'Test Insert',
    description: 'test manual insert via phpmyadmin',
    type: 'single',
    format: 'point-based',
    numParticipants: 0,
    // host: USer,
    bannerImg: '',
    maxParticipants: 1,
    publishedStatus: true,
    createdAtDate: new Date('2023-03-10T20:39:11.000Z'),
    upDateAt: new Date('2023-03-10T13:37:29.000Z'),
    startDate: new Date('2023-03-10T13:37:29.000Z'),
    endDate: new Date('2023-03-10T13:37:29.000Z'),
    closed: false,
    maxTeams: 1,
    rating: 5,
    join: false,
    participants: [userTestData1],
    // hosts: [],
    collaborators: [],
    tabs: [],
    posts: [],
    tasks: [],
    ratings: [],
};

export const challengesListTestData1: Challenge[] = [challengesTestData1];
