import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../../typeorm/entities/User';
import { UsersService } from '../../services/users.service';
import { UsersController } from '../users.controller';

describe.skip(UsersController, () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                { provide: getRepositoryToken(User), useValue: jest.fn() },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    // describe('GET :displayName', () => {
    //     describe('given displayName does not exist', () => {
    //         it('should return 404', async () => {
    //             const displayName = 'definitelyAUserNameThatDoesNotExist';
    //             const result = {
    //                 statusCode: 404,
    //                 errorMessage: 'User does not exist',
    //             };

    //             jest.spyOn(service, 'findBydisplayName');
    //             expect(await controller.viewUserByUsername(displayName)).toBe(
    //                 result,
    //             );
    //         });
    //     });
    // });
});
