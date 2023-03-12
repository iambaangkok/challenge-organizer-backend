import { Test, TestingModule } from '@nestjs/testing';
import { ShopsController } from './shops.controller';

describe.skip('ShopsController', () => {
    let controller: ShopsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShopsController],
        }).compile();

        controller = module.get<ShopsController>(ShopsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
