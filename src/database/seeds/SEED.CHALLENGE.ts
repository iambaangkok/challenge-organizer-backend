const faker = require('faker');
const Seeder = require("mysql-db-seed").Seeder;


const seed = new Seeder(
    3306,
     'localhost',
     'root',
     'YES',
     'dev',
);


(async () => {
    await seed.seed(
      30,
      "users", 
      {
        userId : faker.datatype.number(),
        displayName: faker.name.firstName(),
        firstName: faker.name.firstName,
        lastName: faker.name.lastName(),
        cmuAccount: faker.internet.email(),
        studentId: await faker.datatype.number().toString(),
        createdDate: new Date(),
        coin : '10',

      }
    )
    seed.exit();
    process.exit();
  })();

