const mongoose = require('mongoose');
const { async } = require('rxjs');
const User = require('src/typeorm/entities/User');

import { CreateUserParams } from 'src/users/utils/type';
import {faker} from '@faker-js/faker';



mongoose.connect("mongodb+srv://Geba001:areyougeba@challengeorganizer.kndy1kv.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGODB CONNECTION OPEN")
    })
    .catch((error) => {
        console.log(error)
    })

const seedUesr = []


function createRandomUser(){
    const firstName = faker.name.firstName(sex);
    const lastName = faker.name.lastName();
    const cmuAccount = faker.internet.email(firstName, lastName);
    const studentId = faker.address.buildingNumber()
    return {
        _id: faker.datatype.uuid(),
        email,
        firstName,
        lastName,
        cmuAccount,
        studentId
    };
}



const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(seedUser)
}


seedDB().then(() => {
    mongoose.connection.close();
})
