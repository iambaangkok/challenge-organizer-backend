/* mySeedScript.js */

// require the necessary libraries
import faker from 'faker';
import {MongoClient} from 'mongodb';

async function seedDB() {
    const uri =
        'mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/test';
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log('Connected correctly to server');

        const collection = client.db('test').collection('challenges');

        collection.drop();
        // make a bunch of time series data
        let timeSeriesData = [];
        let type = ['Single', 'Duo', 'Team'];
        let format = ['Point_based', 'Elimination', 'Double_Elimination'];
        for (let i = 0; i < 10; i++) {
            let challenges = {
                challengeTitle: faker.name.jobTitle(),
                type: type[i % 3],
                format: format[i % 3],
                description: faker.lorem.paragraphs(5),
                startDate: faker.date.between(
                    '2023-01-01T00:00:00.000Z',
                    '2023-01-02T00:00:00.000Z',
                ),
                endDate: faker.date.between(
                    '2023-01-07T00:00:00.000Z',
                    '2023-01-09T00:00:00.000Z',
                ),
                numParticipants: faker.datatype.number(10),
                maxParticipants: faker.datatype.number(100),
                rating: faker.datatype.number(5),
                closed: faker.datatype.boolean(),
                bannerImg: faker.system.filePath(),
                participants: [],
                join: false,
            };
            timeSeriesData.push(challenges);
        }
        collection.insertMany(timeSeriesData);

        console.log('Database seeded! :)');
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();