import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from 'src/common/service/answer.service';
import { Repository } from 'typeorm';
import { AnswerParamsService } from '../answer-params/answer-params.service';
import { QueueService } from '../queue/queue.service';
import { User } from '../user/entities/user.entity';
import { PushLog } from './entities/push-log.entity';
import { PushLogService } from './push-log.service';

describe('PushLogService', () => {
  let service: PushLogService;
  let userRepository: Repository<User>;
  let pushLogRepository: Repository<PushLog>;

  const QueueProvider: Provider = {
    provide: QueueService,
    useFactory: () => ({}),
  };
  const AnswerProvider: Provider = {
    provide: AnswerService,
    useFactory: () => ({}),
  };
  const AnswerParamProvider: Provider = {
    provide: AnswerParamsService,
    useFactory: () => ({
      dispose: jest.fn(() => {
        return {
          eatDate: '',
          mobile: '',
        };
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PushLogService,
        AnswerProvider,
        QueueProvider,
        AnswerParamProvider,
      ],
    }).compile();

    service = module.get<PushLogService>(PushLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
