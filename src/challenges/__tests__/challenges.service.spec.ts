import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Challenge } from '../../typeorm/entities/Challenge';
import { User } from '../../typeorm/entities/User';
import { ChallengesService } from '../service/challenges.service';

describe.skip(ChallengesService, () => {
    let service: ChallengesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChallengesService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
                { provide: getRepositoryToken(Challenge), useValue: jest.fn() },
            ],
        }).compile();

        service = module.get<ChallengesService>(ChallengesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
