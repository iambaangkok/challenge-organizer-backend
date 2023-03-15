import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { faker } from '@faker-js/faker';
import axios from 'axios';

describe('ChallengesController E2E Test', () => {
    let app: INestApplication;
    let server;
    jest.setTimeout(5000);
    const BASE_PATH = '/api/challenges';
    const AXIOS_URL = 'http://localhost:3030/api';

    let users;
    let challenges;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        server = app.getHttpServer();

        await axios
            .get(AXIOS_URL + '/users')
            .then((resp) => {
                users = resp.data;
            })
            .catch((err) => {
                //
            });

        await axios
            .get(AXIOS_URL + '/challenges')
            .then((resp) => {
                challenges = resp.data;
            })
            .catch((err) => {
                //
            });
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
    describe('GET /by-user-display-name/:displayName', () => {
        describe('given user does not exist', () => {
            it('should fail, return a 404', () => {
                const displayName = 'notdisplaynamebecausethisistoolong';
                return request(server)
                    .get(BASE_PATH + '/by-user-display-name/' + displayName)
                    .expect(404);
            });
        });
        describe('given user does exist', () => {
            it('should return the challenges, and a 200', async () => {
                const displayName = users[0].displayName;
                return request(server)
                    .get(BASE_PATH + '/by-user-display-name/' + displayName)
                    .expect(200);
            });
        });
    });
    describe('PUT /addCollaborators', () => {
        describe('given missing attribute from request body', () => {
            it('should fail, return a 400', () => {
                return request(server)
                    .put(BASE_PATH + '/addCollaborators')
                    .send({
                        cmuAccount: 'allrandom@random.random',
                    })
                    .expect(400);
            });
        });
        describe('given challenge does not exist', () => {
            it('should fail, return a 404', async () => {
                return request(server)
                    .put(BASE_PATH + '/addCollaborators')
                    .send({
                        challengeTitle: 'whatever',
                        cmuAccount: users[0].cmuAccount,
                    })
                    .expect(404);
            });
        });
        describe('given user does not exist', () => {
            it('should fail, return a 404', async () => {
                return request(server)
                    .put(BASE_PATH + '/addCollaborators')
                    .send({
                        challengeTitle: challenges[0].challengeTitle,
                        cmuAccount: 'random_rando@random.random',
                    })
                    .expect(404);
            });
        });
        describe('given correct request body', () => {
            it('should add a collaborator, return a 200', async () => {
                return request(server)
                    .put(BASE_PATH + '/addCollaborators')
                    .send({
                        challengeTitle: challenges[0].challengeTitle,
                        cmuAccount: users[8].cmuAccount,
                    })
                    .expect(200);
            });
        });
    });
    describe('GET /:challengeTitle', () => {
        describe('given challenge does not exist', () => {
            it('should fail, return a 404', () => {
                const challengeTitle = 'notChallengeTitle';
                return request(server)
                    .get(BASE_PATH + '/' + challengeTitle)
                    .expect(404);
            });
        });
        describe('given challenge does exist', () => {
            it('should return the challenge, and a 200', async () => {
                const challengeTitle = challenges[0].displayName;
                return request(server)
                    .get(BASE_PATH + '/' + challengeTitle)
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
                        challengeTitle: 'Best Gaussian Blurrer',
                        description: 'yes',
                    })
                    .expect(400);
            });
        });
        describe('given correct request body', () => {
            it('should create a new challenge, return a 201', async () => {
                const insert = {
                    challengeTitle: 'Best Gaussian Blurrer',
                    description: 'see who blurs the best',
                    host: users[0].displayName,
                };
                return request(server)
                    .post(BASE_PATH + '/')
                    .send(insert)
                    .expect(201);
            });
        });
    });
});
