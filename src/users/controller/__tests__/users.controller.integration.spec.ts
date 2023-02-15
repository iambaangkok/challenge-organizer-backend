import { Test } from '@nestjs/testing';
import {
    closeClientConnection,
    createClientConnection,
    getDb,
} from '../../../utils/database.utils';
import * as request from 'supertest';
import { Db, MongoClient } from 'mongodb';

import { AppModule } from '../../../app.module';
import { userStub } from './testData';
import { ConfigModule } from '@nestjs/config';

describe('UsersController', () => {
    const BASE_PATH = '/api/users';
    const COLLECTION = 'users';

    let client: MongoClient;
    let db: Db;
    let api: any;
    let app: any;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
                AppModule,
            ],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
        api = app.getHttpServer();

        const uri = process.env.DB_HOST + '/' + process.env.ENVIRONMENT;
        client = await createClientConnection(uri);
        db = getDb(client);
        // db = new Db(
        //     COLLECTION,
        //     new Server(
        //         process.env.DB_HOST + '/' + process.env.ENVIRONMENT,
        //         27017,
        //         {auto_reconnect: false, poolSize: 4},

        //     ),
        // );
    });

    afterAll(async () => {
        await closeClientConnection(client);
        await app.close();
    });

    beforeEach(async () => {
        await db.collection(COLLECTION).drop();
        await db.createCollection(COLLECTION);
    });

    describe('/', () => {
        it('should return an array of users', async () => {
            await db.collection(COLLECTION).insertOne(userStub);
            const res = await request(api).get(`${BASE_PATH}/`);

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject([userStub]);
        });
    });

    // describe('createUser', () => {
    //     it('should create a user', async () => {
    //         const createUserRequest: CreateUserRequest = {
    //             email: userStub().email,
    //             age: userStub().age,
    //         };
    //         const response = await request(api)
    //             .post('/users')
    //             .send(createUserRequest);

    //         expect(response.status).toBe(201);
    //         expect(response.body).toMatchObject(createUserRequest);

    //         const user = await db
    //             .collection('users')
    //             .findOne({ email: createUserRequest.email });
    //         expect(user).toMatchObject(createUserRequest);
    //     });
    // });
});
