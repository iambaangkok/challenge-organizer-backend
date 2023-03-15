import axios from 'axios';

const URL = 'http://localhost:3030/api';
const PATH = '/challenges';

export const seedChallenges = async () => {
    const resp = await axios.get(URL + '/users');
    const users: Record<string, any>[] = resp.data;

    let delay = 200;
    let delaySum = 0;

    const challenges = [
        {
            challengeTitle: 'Codeathon Challenge',
            description: 'A coding challenge to develop a web app',
            host: users[0].displayName,
            startDate: new Date('2023-04-01'),
            endDate: new Date('2023-04-05'),
            maxParticipants: 16,
            type: 'team',
            format: 'elimination',
        },
        {
            challengeTitle: 'Data Analytics Challenge',
            description: 'An analytics challenge to identify key insights',
            host: users[0].displayName,
            startDate: new Date('2023-05-01'),
            endDate: new Date('2023-05-07'),
            maxParticipants: 12,
            type: 'single',
            format: 'point-based',
        },
        {
            challengeTitle: 'Artificial Intelligence Challenge',
            description: 'An AI challenge to build a chatbot',
            host: users[1].displayName,
            startDate: new Date('2023-06-01'),
            endDate: new Date('2023-06-10'),
            maxParticipants: 20,
            type: 'team',
            format: 'round-robin',
        },
        {
            challengeTitle: 'Cybersecurity Challenge',
            description:
                'A cybersecurity challenge to identify vulnerabilities',
            host: users[2].displayName,
            startDate: new Date('2023-07-01'),
            endDate: new Date('2023-07-14'),
            maxParticipants: 40,
            type: 'single',
            format: 'elimination',
        },
        {
            challengeTitle: 'UI/UX Challenge',
            description: 'A design challenge to create a new user interface',
            host: users[3].displayName,
            startDate: new Date('2023-08-01'),
            endDate: new Date('2023-08-21'),
            maxParticipants: 25,
            type: 'team',
            format: 'point-based',
        },
        {
            challengeTitle: 'Marketing Challenge',
            description:
                'A marketing challenge to develop a social media campaign',
            host: users[4].displayName,
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-30'),
            maxParticipants: 35,
            type: 'single',
            format: 'round-robin',
        },
        {
            challengeTitle: 'Blockchain Challenge',
            description:
                'A blockchain challenge to develop a decentralized app',
            host: users[0].displayName,
            startDate: new Date('2023-10-01'),
            endDate: new Date('2023-10-20'),
            maxParticipants: 15,
            type: 'team',
            format: 'elimination',
        },
        {
            challengeTitle: 'Mobile App Challenge',
            description:
                'A mobile app challenge to build an app for iOS or Android',
            host: users[0].displayName,
            startDate: new Date('2023-11-01'),
            endDate: new Date('2023-11-15'),
            maxParticipants: 30,
            type: 'single',
            format: 'point-based',
        },
        {
            challengeTitle: 'Cloud Computing Challenge',
            description:
                'A cloud computing challenge to optimize serverless architecture',
            host: users[0].displayName,
            startDate: new Date('2023-12-01'),
            endDate: new Date('2023-12-10'),
            maxParticipants: 20,
            type: 'team',
            format: 'round-robin',
        },
        {
            challengeTitle: 'UI Design Challenge',
            description: 'A design challenge to create a new website',
            host: users[0].displayName,
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-31'),
            maxParticipants: 25,
            type: 'single',
            format: 'elimination',
        },
    ];

    // create challenges
    for (let i = 0; i < challenges.length; ++i) {
        setTimeout(async () => {
            console.log('create challenge ' + challenges[i].challengeTitle);
            await axios.post(URL + PATH, challenges[i]).catch((err) => {
                //
            });
        }, delaySum);
        delaySum += delay;
    }

    const addCollaborators = [
        {
            challengeTitle: challenges[0].challengeTitle,
            cmuAccount: users[1].cmuAccount,
        },
        {
            challengeTitle: challenges[0].challengeTitle,
            cmuAccount: users[2].cmuAccount,
        },
        {
            challengeTitle: challenges[1].challengeTitle,
            cmuAccount: users[1].cmuAccount,
        },
        {
            challengeTitle: challenges[1].challengeTitle,
            cmuAccount: users[3].cmuAccount,
        },
    ];

    delay = 300;
    // add collaborators
    for (let i = 0; i < addCollaborators.length; ++i) {
        setTimeout(async () => {
            console.log(
                'add collaborator ' +
                    addCollaborators[i].challengeTitle +
                    ' ' +
                    addCollaborators[i].cmuAccount,
            );
            await axios
                .put(URL + PATH + '/addCollaborators', addCollaborators[i])
                .catch((err) => {
                    //
                });
        }, delaySum);
        delaySum += delay;
    }

    const joinChallenges = [
        {
            challengeTitle: challenges[0].challengeTitle,
            users: [3, 4, 5, 6, 7, 8, 9],
        },
        {
            challengeTitle: challenges[1].challengeTitle,
            users: [2, 4, 5, 6],
        },
        {
            challengeTitle: challenges[2].challengeTitle,
            users: [0, 2, 3, 4, 5, 6, 7, 8, 9],
        },
    ];

    delay = 1000;
    // join challenges
    for (let i = 0; i < joinChallenges.length; ++i) {
        for (let j = 0; j < joinChallenges[i].users.length; ++j) {
            setTimeout(async () => {
                console.log(
                    'join ' +
                        joinChallenges[i].challengeTitle +
                        ' ' +
                        users[joinChallenges[i].users[j]].firstName,
                );
                await axios
                    .put(
                        URL +
                            PATH +
                            '/' +
                            joinChallenges[i].challengeTitle +
                            '/join',
                        {
                            displayName:
                                users[joinChallenges[i].users[j]].displayName,
                        },
                    )
                    .catch((err) => {
                        //
                    });
            }, delaySum);
            delaySum += delay;
        }
    }
};

// seedChallenges();
