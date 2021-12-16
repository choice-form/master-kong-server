import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PushService } from '../push/push.service';
@Processor('survey')
export class SurveyProcessor {
  constructor(private readonly pushService: PushService) {}

  @Process('push')
  async pushSurvey(job: Job<{ mobile: string }>) {
    const payload = job.data;
    await this.pushService.push(payload);
  }
}
