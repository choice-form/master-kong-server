import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import Bull, { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('survey')
    private readonly surveyQueue: Queue,
  ) {}

  async push(data: { mobile: string }, opts?: Bull.JobOptions) {
    await this.surveyQueue.add('push', data, opts);
  }
}
