/* eslint-disable @typescript-eslint/no-var-requires */
// require the necessary libraries
require('dotenv').config();
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

async function seedDB() {
    const uri = process.env.DB_HOST + '/' + process.env.ENVIRONMENT;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log('Connected to server');

        const collection = client
            .db(process.env.ENVIRONMENT)
            .collection('users');

        collection.drop();

        // make a bunch of time series data
        const timeSeriesData = [];

        for (let i = 0; i < 100; i++) {
            const users = {
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
