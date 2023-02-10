/* mySeedScript.js */

// require the necessary libraries
const faker = require("faker");
const MongoClient = require("mongodb").MongoClient;


async function seedDB() {
    const uri = "mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/test";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const collection = client.db("test").collection("users");

        // collection.drop();

        // make a bunch of time series data
        let timeSeriesData = [];

        for (let i = 0; i < 2000; i++) {
            let users = {
                 "firstName" : faker.name.firstName(),
                 "lastName" : faker.name.lastName(),
                 "cmuAccount" : faker.internet.email(),
                 "studentId" : faker.datatype.number()
            }
            timeSeriesData.push(users);
        }
        collection.insertMany(timeSeriesData);

        console.log("Database seeded! :)");
        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();