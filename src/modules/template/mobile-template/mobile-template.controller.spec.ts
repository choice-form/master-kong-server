import { Test, TestingModule } from '@nestjs/testing';
import { MobileTemplateController } from './mobile-template.controller';
import { MobileTemplateService } from './mobile-template.service';

describe('MobileTemplateController', () => {
  let controller: MobileTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MobileTemplateController],
      providers: [MobileTemplateService],
    }).compile();

    controller = module.get<MobileTemplateController>(MobileTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
