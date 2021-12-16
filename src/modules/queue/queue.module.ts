import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PushModule } from '../push/push.module';
import { QueueService } from './queue.service';
import { SurveyProcessor } from './survey.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'survey',
    }),
    PushModule,
  ],
  providers: [QueueService, SurveyProcessor],
  exports: [QueueService],
})
export class QueueModule {}
