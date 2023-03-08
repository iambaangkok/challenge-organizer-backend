/* eslint-disable @typescript-eslint/no-var-requires */
// require the necessary libraries
require('dotenv').config();
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

async function seedStaticData(collection) {
    const realUser = {
        firstName: 'NONTHAWAT',
        lastName: 'KONGSICHAI',
        cmuAccount: 'nonthawat_k@cmu.ac.th',
        studentId: '610610547',
        displayName: 'Tadashi400',
        timeStamp: '2023-01-03T00:00:00.000Z',
        // challenges: ['การออกกำลังกายเป็นการรักตัวเองอีกอย่างหนึ่งนะ'],
    };
    console.log(realUser);
    await collection.insertOne(realUser);
}

async function seedRandomizedData(collection) {
    // make a bunch of time series data
    const timeSeriesData = [];
    // fake.seed(0)

    for (let i = 0; i < 10; i++) {
        const users = {
            firstName: faker.name.firstName,
            lastName: faker.name.lastName(),
            cmuAccount: faker.internet.email(),
            studentId: await faker.datatype.number().toString(),
            displayName: faker.name.firstName(),
            timeStamp: new Date(),
            // challenges: faker.name.jobTitle(),
        };
        timeSeriesData.push(users);
        console.log(users);
    }
    await collection.insertMany(timeSeriesData);
}

async function seedDB() {
    // const uri = process.env.DB_HOST + '/' + process.env.ENVIRONMENT;
    const uri =
        'mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/dev';
    // const uri = 'mongodb://localhost:27107/';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log('Connected to server');

        const collection = client.db('dev').collection('users');

        // await collection.drop();
        await collection.deleteMany({});
        await seedStaticData(collection);
        await seedRandomizedData(collection);

        console.log('Database seeded! :)');
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();
