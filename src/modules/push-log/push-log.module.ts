import { Module } from '@nestjs/common';
import { PushLogService } from './push-log.service';
import { PushLogController } from './push-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushLog } from './entities/push-log.entity';
import { User } from '../user/entities/user.entity';
import { AnswerService } from 'src/common/service/answer.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([PushLog, User]), QueueModule],
  controllers: [PushLogController],
  providers: [PushLogService, AnswerService],
})
export class PushLogModule {}
