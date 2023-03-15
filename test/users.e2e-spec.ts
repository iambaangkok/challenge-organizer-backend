import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { faker } from '@faker-js/faker';
import axios from 'axios';

console.log('e2e test user');

describe('UsersController E2E Test', () => {
    let app: INestApplication;
    let server;
    jest.setTimeout(5000);
    const BASE_PATH = '/api/users';
    const AXIOS_URL = 'http://localhost:3030/api';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();
    });

    afterAll(async () => {
        server.close();
        await app.close();
    });

    describe('GET /', () => {
        it('should return a 200', () => {
            return request(server)
                .get(BASE_PATH + '/')
                .expect(200);
        });
    });
    describe('GET /:displayName', () => {
        describe('given user does not exist', () => {
            it('should fail, return a 404', () => {
                const displayName = 'notdisplayname';
                return request(server)
                    .get(BASE_PATH + '/' + displayName)
                    .expect(404);
            });
        });
        describe('given user does exist', () => {
            it('should return the user, and a 200', async () => {
                const resp = await axios.get(AXIOS_URL + '/users');

                const data = resp.data;

                const displayName = data[0].displayName;

                return request(server)
                    .get(BASE_PATH + '/' + displayName)
                    .expect(200);
            });
        });
    });
    describe('GET /studentId/:studentId', () => {
        describe('given user does not exist', () => {
            it('should fail, return a 404', () => {
                const studentId = 1;
                return request(server)
                    .get(BASE_PATH + '/studentId/' + studentId)
                    .expect(404);
            });
        });
        describe('given user does exist', () => {
            it('should return the user, and a 200', async () => {
                const resp = await axios.get(AXIOS_URL + '/users');
                const data = resp.data;

                const studentId = data[0].studentId;

                return request(server)
                    .get(BASE_PATH + '/studentId/' + studentId)
                    .expect(200);
            });
        });
    });
    describe('POST /', () => {
        describe('given missing attribute from request body', () => {
            it('should fail, return a 400', () => {
                return request(server)
                    .post(BASE_PATH + '/')
                    .send({
                        firstName: 'Mark',
                        studentId: 27,
                    })
                    .expect(400);
            });
        });
        describe('given correct request body', () => {
            const insert = {
                firstName: faker.name.firstName,
                lastName: faker.name.lastName,
                cmuAccount: faker.internet.email(),
                studentId: new Date().getTime(),
            };

            it('should create a new user, return a 201', () => {
                return request(server)
                    .post(BASE_PATH + '/')
                    .send(insert)
                    .expect(201);
            });
        });
    });
    // describe('PUT /:displayName', () => {
    //     describe('given user does not exist', () => {
    //         const edit = {
    //             userName: "27",
    //             cmuAccount: "mark_gra@cmu.ac.th",
    //             studentId: 630610746,
    //             displayName: string;
    //         }
    //         it('should fail, return a 404', () => {
    //             const displayName = 'notdisplayname';
    //             return request(server)
    //                 .put(BASE_PATH + '/' + displayName).send()
    //                 .expect(404);
    //         });
    //     });
    //     describe('given user does exist', () => {
    //         it('should return the user, and a 200', () => {
    //             const displayName = 'id1678635835651';
    //             return request(server)
    //                 .get(BASE_PATH + '/' + displayName)
    //                 .expect(200);
    //         });
    //     });
    //     describe('given missing attribute from request body', () => {
    //         it('should fail, return a 400', () => {
    //             return request(server)
    //                 .post(BASE_PATH + '/')
    //                 .send({
    //                     firstName: 'Mark',
    //                     studentId: 27,
    //                 })
    //                 .expect(400);
    //         });
    //     });
    //     describe('given correct request body', () => {
    //         const insert = {
    //             firstName: faker.name.firstName,
    //             lastName: faker.name.lastName,
    //             cmuAccount: faker.internet.email(),
    //             studentId: new Date().getTime(),
    //         };

    //         it('should create a new user, return a 201', () => {
    //             return request(server)
    //                 .post(BASE_PATH + '/')
    //                 .send(insert)
    //                 .expect(201);
    //         });
    //     });
    // });
});
