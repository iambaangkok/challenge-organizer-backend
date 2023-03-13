import axios from 'axios';

const URL = 'http://localhost:3030/api';
const PATH = '/challenges';

const main = async () => {
    const resp = await axios.get(URL + '/users');
    const users = resp.data;

    const challenges = [
        {
            challengeTitle: 'Codeathon Challenge',
            description: 'A coding challenge to develop a web app',
            host: users[0].displayName,
        },
        {
            challengeTitle: 'Data Analytics Challenge',
            description: 'An analytics challenge to identify key insights',
            host: users[0].displayName,
        },
        {
            challengeTitle: 'Artificial Intelligence Challenge',
            description: 'An AI challenge to build a chatbot',
            host: users[1].displayName,
        },
        {
            challengeTitle: 'Cybersecurity Challenge',
            description:
                'A cybersecurity challenge to identify vulnerabilities',
            host: users[2].displayName,
        },
        {
            challengeTitle: 'UI/UX Challenge',
            description: 'A design challenge to create a new user interface',
            host: users[2].displayName,
        },
        {
            challengeTitle: 'Marketing Challenge',
            description:
                'A marketing challenge to develop a social media campaign',
            host: users[2].displayName,
        },
        {
            challengeTitle: 'Blockchain Challenge',
            description:
                'A blockchain challenge to develop a decentralized app',
            host: users[3].displayName,
        },
        {
            challengeTitle: 'Mobile App Challenge',
            description:
                'A mobile app challenge to build an app for iOS or Android',
            host: users[3].displayName,
        },
        {
            challengeTitle: 'Cloud Computing Challenge',
            description:
                'A cloud computing challenge to optimize serverless architecture',
            host: users[3].displayName,
        },
        {
            challengeTitle: 'Product Management Challenge',
            description:
                'A product management challenge to launch a new product',
            host: users[3].displayName,
        },
    ];

    for (let i = 0; i < challenges.length; ++i) {
        setTimeout(async () => {
            await axios.post(URL + PATH, challenges[i]);
        }, 100 * (i + 1));
    }
};

main();
