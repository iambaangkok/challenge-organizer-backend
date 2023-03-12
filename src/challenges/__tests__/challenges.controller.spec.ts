import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { User } from '../../typeorm/entities/User';
import { ChallengesService } from '../service/challenges.service';
import { ChallengesController } from '../controller/challenges.controller';
import { challengesListTestData1 } from './challenges.testdata';

describe.skip(ChallengesController, () => {
    let controller: ChallengesController;
    let service: ChallengesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChallengesController],
            providers: [
                ChallengesService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
                { provide: getRepositoryToken(Challenge), useValue: jest.fn() },
            ],
        }).compile();

        service = module.get<ChallengesService>(ChallengesService);
        controller = module.get<ChallengesController>(ChallengesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('route GET /', () => {
        describe('given there is no data', () => {
            it('should return an empty list', async () => {
                const expectedResult = [];
                jest.spyOn(service, 'findAllChallenges').mockImplementation(
                    async () => expectedResult,
                );

                const result = await controller.getAllChallenges();

                expect(result).toBe(expectedResult);
                expect(result.length).toBe(0);
            });
        });
        describe('given there is data', () => {
            it('should return all data', async () => {
                const expectedResult = challengesListTestData1;

                jest.spyOn(service, 'findAllChallenges').mockImplementation(
                    async () => expectedResult,
                );

                const result = await controller.getAllChallenges();

                expect(result).toBe(expectedResult);
                expect(result.length).toBe(expectedResult.length);
            });
        });
    });

    describe('route GET /by-user-display-name/:displayName', () => {
        describe('given there user does not exist', () => {
            it('should return an empty list', async () => {
                const displayName = 'MartinaK';
                // controller.getAllChallengesByDisplayName("MartinaK");
            });
        });
    });
});
