import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profile } from '../../typeorm/entities/Profile';
import { User } from '../../typeorm/entities/User';
import { UsersService } from './users.service';

describe(UsersService, () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
                { provide: getRepositoryToken(Profile), useValue: jest.fn() },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
