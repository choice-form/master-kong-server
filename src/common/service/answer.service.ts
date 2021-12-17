import { Injectable } from '@nestjs/common';

@Injectable()
export class AnswerService {
  // TODO: 需要实现,返回一个吃面时间
  analyze(result: any): { eatTime: Date } {
    const eatTime = new Date();
    return {
      eatTime,
    };
  }
}
