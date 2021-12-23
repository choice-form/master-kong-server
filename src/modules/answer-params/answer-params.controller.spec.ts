import { Test, TestingModule } from '@nestjs/testing';
import { AnswerParamsController } from './answer-params.controller';
import { AnswerParamsService } from './answer-params.service';

describe('AnswerParamsController', () => {
  let controller: AnswerParamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerParamsController],
      providers: [AnswerParamsService],
    }).compile();

    controller = module.get<AnswerParamsController>(AnswerParamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
