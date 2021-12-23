import { Test, TestingModule } from '@nestjs/testing';
import { AnswerParamsService } from './answer-params.service';

describe('AnswerParamsService', () => {
  let service: AnswerParamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerParamsService],
    }).compile();

    service = module.get<AnswerParamsService>(AnswerParamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
