import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { faker } from '@faker-js/faker';

describe('ChallengesController E2E Test', () => {
    let app: INestApplication;
    let server;
    jest.setTimeout(5000);
    const BASE_PATH = '/api/challenges';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();
    });

    afterAll(async () => {
        await app.close();
        server.close();
    });

    describe('GET /', () => {
        it('should return a 200', () => {
            return request(server)
                .get(BASE_PATH + '/')
                .expect(200);
        });
    });
    describe('GET /by-user-display-name/:displayName', () => {
        describe('given user does not exist', () => {
            it('should fail, return a 404', () => {
                const displayName = 'notdisplayname';
                return request(server)
                    .get(BASE_PATH + '/' + displayName)
                    .expect(404);
            });
        });
        describe('given user does exist', () => {
            it('should return the challenges, and a 200', () => {
                const displayName = 'id1678635835651';
                return request(server)
                    .get(BASE_PATH + '/' + displayName)
                    .expect(200);
            });
        });
    });
    describe.skip('GET /:challengeTitle', () => {
        describe('given challenge does not exist', () => {
            it('should fail, return a 404', () => {
                const challengeTitle = '';
                return request(server)
                    .get(BASE_PATH + '/' + challengeTitle)
                    .expect(404);
            });
        });
        describe('given user does exist', () => {
            it('should return the user, and a 200', () => {
                const studentId = 630610746;
                return request(server)
                    .get(BASE_PATH + '/studentId/' + studentId)
                    .expect(200);
            });
        });
    });
    describe.skip('POST /', () => {
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
});
