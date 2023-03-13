import axios from 'axios';

const URL = 'http://localhost:3030/api/users';

const main = async () => {
    const users = [
        {
            firstName: 'Ava',
            lastName: 'Rodriguez',
            cmuAccount: 'ava.rodriguez@example.com',
            studentId: '987654321',
        },
        {
            firstName: 'Lucas',
            lastName: 'Nguyen',
            cmuAccount: 'lucas.nguyen@example.com',
            studentId: '123456789',
        },
        {
            firstName: 'Mia',
            lastName: 'Patel',
            cmuAccount: 'mia.patel@example.com',
            studentId: '246810121',
        },
        {
            firstName: 'Elijah',
            lastName: 'Lee',
            cmuAccount: 'elijah.lee@example.com',
            studentId: '369121518',
        },
        {
            firstName: 'Sofia',
            lastName: 'Garcia',
            cmuAccount: 'sofia.garcia@example.com',
            studentId: '481216202',
        },
        {
            firstName: 'Ethan',
            lastName: 'Kim',
            cmuAccount: 'ethan.kim@example.com',
            studentId: '753159265',
        },
        {
            firstName: 'Isabella',
            lastName: 'Brown',
            cmuAccount: 'isabella.brown@example.com',
            studentId: '864197532',
        },
        {
            firstName: 'Daniel',
            lastName: 'Khan',
            cmuAccount: 'daniel.khan@example.com',
            studentId: '951753086',
        },
        {
            firstName: 'Olivia',
            lastName: 'Davis',
            cmuAccount: 'olivia.davis@example.com',
            studentId: '222333444',
        },
        {
            firstName: 'Noah',
            lastName: 'Smith',
            cmuAccount: 'noah.smith@example.com',
            studentId: '555444333',
        },
    ];

    for (let i = 0; i < users.length; ++i) {
        setTimeout(async () => {
            await axios.post(URL, users[i]);
        }, 100 * (i + 1));
    }
};

main();
