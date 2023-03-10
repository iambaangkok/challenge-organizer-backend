/* eslint-disable @typescript-eslint/no-var-requires */
// require the necessary libraries
require('dotenv').config();
const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

async function seedStaticData(collection) {
    const realDataChallenges = [
        {
            challengeTitle: 'การออกกำลังกายเป็นการรักตัวเองอีกอย่างหนึ่งนะ',
            type: 'Single',
            format: 'Point_based',
            description: 'ฉันอยากไปว่ายนํ้าในวันที่แดดออกจังอร๊าาาาาาาา',
            startDate: '2023-01-01T00:00:00.000Z',
            endDate: '2023-01-09T00:00:00.000Z',
            numParticipants: 1,
            maxParticipants: 10,
            rating: 5,
            closed: false,
            bannerImg:
                './img/331279976_1270933697137395_3302765797827222123_n.jpg',
            participants: [''],
            join: false,
            host: ['Tadashi400'],
        },
        {
            challengeTitle: 'CMU Marathon 2023',
            type: 'Single',
            format: 'Point_based',
            description: faker.lorem.paragraphs(5),
            startDate: '2023-01-01T00:00:00.000Z',
            endDate: '2023-01-09T00:00:00.000Z',
            numParticipants: 1,
            maxParticipants: 400,
            rating: 4.5,
            closed: false,
            bannerImg:
                './img/331279976_1270933697137395_3302765797827222123_n.jpg',
            participants: [''],
            join: false,
            host: ['Tadashi400'],
        },
    ];
    console.log(realDataChallenges);
    await collection.insertMany(realDataChallenges);
}

async function seedRandomizedData(collection) {
    // make a bunch of time series data
    const timeSeriesData = [];
    // fake.seed(0)
    const type = ['Single', 'Duo', 'Team'];
    const format = ['Point_based', 'Elimination', 'Double_Elimination'];
    // const host  = []
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
            host: [],
        };
        timeSeriesData.push(challenges);
    }
    await collection.insertMany(timeSeriesData);
}

async function seedDB() {
    // const uri = process.env.DB_URL + '/' + process.env.ENVIRONMENT;
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

        const collection = client.db('dev').collection('challenges');
        
        const connection = mysql.createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            database: 'dev',
            username: 'root',
            multipleStatements: true,
        })

        // collection.drop();
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
