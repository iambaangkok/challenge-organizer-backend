// require the necessary libraries
import faker from 'faker';
import { MongoClient } from 'mongodb';

async function seedDB() {
    const uri =
        'mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/test';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log('Connected correctly to server');

        const collection = client.db('test').collection('users');

        // collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 100; i++) {
            let users = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                cmuAccount: faker.internet.email(),
                studentId: faker.datatype.number(),
                displayName: faker.name.firstName(),
                timeStamp: new Date(),
                'challenges:': [],
            };
            timeSeriesData.push(users);
            console.log(users);
        }
        await collection.insertMany(timeSeriesData);

        console.log('Database seeded! :)');
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
