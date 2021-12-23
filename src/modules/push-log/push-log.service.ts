import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/common/service/answer.service';
import { mergePaging } from 'src/utils';
import { FindManyOptions, Repository } from 'typeorm';
import { QueueService } from '../queue/queue.service';
import { User } from '../user/entities/user.entity';
import { CreatePushLogDto } from './dto/create-push-log.dto';
import { FindAllPushLogDto } from './dto/find-all-push-log.dto';
import { SaveFirstSurveyDto } from './dto/save-first-survey.dto';
import { UpdatePushLogDto } from './dto/update-push-log.dto';
import { PushLog } from './entities/push-log.entity';
@Injectable()
export class PushLogService {
  constructor(
    @InjectRepository(PushLog)
    private readonly pushLogRepository: Repository<PushLog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly answerService: AnswerService,
    private readonly queueService: QueueService,
  ) {}
  create(createPushLogDto: CreatePushLogDto) {
    return this.pushLogRepository.save(createPushLogDto);
  }

  findAll(findAllPushLogDto: FindAllPushLogDto) {
    let findOpts: FindManyOptions<PushLog> = null;
    findOpts = mergePaging(findOpts, findAllPushLogDto);
    return this.pushLogRepository.findAndCount(findOpts);
  }

  findOne(id: number) {
    return this.pushLogRepository.findOne(id);
  }

  update(id: number, updatePushLogDto: UpdatePushLogDto) {
    return this.pushLogRepository.update({ id }, updatePushLogDto);
  }

  remove(id: number) {
    return this.pushLogRepository.delete(id);
  }

  async pushLogic(data: SaveFirstSurveyDto) {
    const { eatTime, mobile } = await this.answerService.dispose(data);
    const eatDate = new Date(eatTime).getTime();
    const now = new Date().getTime();
    // 推送间隔1小时
    const interval = 1000 * 60 * 60;
    let next = now - (eatDate + interval);
    if (next < 0) {
      await this.queueService.push(
        { mobile, template_name: 'first' },
        { delay: -next },
      );
      await this.queueService.push(
        { mobile, template_name: 'second' },
        { delay: -next + 1 * interval },
      );
      await this.queueService.push(
        { mobile, template_name: 'third' },
        { delay: -next + 2 * interval },
      );
      return;
    }

    next = now - (eatDate + interval * 2);
    if (next < 0) {
      await this.queueService.push(
        { mobile, template_name: 'second' },
        { delay: -next },
      );
      await this.queueService.push(
        { mobile, template_name: 'third' },
        { delay: -next + interval },
      );
      return;
    }
    next = now - (eatDate + interval * 3);
    if (next < 0) {
      await this.queueService.push(
        { mobile, template_name: 'third' },
        { delay: -next },
      );
      return;
    }
  }

  async saveFirstSurvey(data: SaveFirstSurveyDto) {
    await this.save(data);
    await this.pushLogic(data);
  }

  async save(data: SaveFirstSurveyDto) {
    const { result, resultId, surveyId, answer } = data;
    const { mobile } = await this.answerService.dispose(data);
    const user = await this.userRepository.findOne({ mobile });
    if (!user) {
      throw new HttpException(
        `the user of ${mobile} is not found`,
        HttpStatus.FORBIDDEN,
      );
    }
    const newLog: PushLog = {
      surveyId,
      result,
      resultId,
      user,
      answer,
    };

    await this.pushLogRepository.save(newLog);
  }
}
