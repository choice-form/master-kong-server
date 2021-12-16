import { Test, TestingModule } from '@nestjs/testing';
import { MobileTemplateService } from './mobile-template.service';

describe('MobileTemplateService', () => {
  let service: MobileTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MobileTemplateService],
    }).compile();

    service = module.get<MobileTemplateService>(MobileTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
