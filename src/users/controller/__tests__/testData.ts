import { ObjectID } from 'typeorm';
import { User } from '../../../typeorm/entities/User';

export const userStub = () => {
    return {
        userId: new ObjectID('63ec915478df664320467e00'),
        firstName: 'Martina',
        lastName: 'Koch',
        cmuAccount: 'Keeley_Johnston@yahoo.com',
        studentId: '16085',
        displayName: 'Georgiana',
        timeStamp: new Date('2023-02-15T08:01:23.905+00:00'),
        challenges: [],
    };
};
