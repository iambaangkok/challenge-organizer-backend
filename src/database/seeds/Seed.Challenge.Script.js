/* eslint-disable @typescript-eslint/no-var-requires */
// require the necessary libraries
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
            .collection('challenges');

        collection.drop();

        // make a bunch of time series data
        const timeSeriesData = [];
        const type = ['Single', 'Duo', 'Team'];
        const format = ['Point_based', 'Elimination', 'Double_Elimination'];
        for (let i = 0; i < 10; i++) {
            const challenges = {
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
