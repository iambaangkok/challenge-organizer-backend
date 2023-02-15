import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { User } from '../../typeorm/entities/User';
import { ChallengesService } from '../service/challenges.service';
import { ChallengesController } from './challenges.controller';

describe(ChallengesController, () => {
    let controller: ChallengesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChallengesController],
            providers: [
                ChallengesService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
                { provide: getRepositoryToken(Challenge), useValue: jest.fn() },
            ],
        }).compile();

        controller = module.get<ChallengesController>(ChallengesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
