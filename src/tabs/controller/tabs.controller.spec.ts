import { Test, TestingModule } from '@nestjs/testing';
import { TabsController } from './tabs.controller';

describe('TabsController', () => {
  let controller: TabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TabsController],
    }).compile();

    controller = module.get<TabsController>(TabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
