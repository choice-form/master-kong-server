import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerService } from 'src/common/service/answer.service';
import { mergePaging } from 'src/utils';
import { FindManyOptions, Repository } from 'typeorm';
import { AnswerParamsService } from '../answer-params/answer-params.service';
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
    private readonly answerParamService: AnswerParamsService,
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
    return this.pushLogRepository.findOne({
      where: {
        id: id,
      },
    });
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
    const { delay_time } = await this.answerParamService.getOne();
    const interval = 1000 * 60 * delay_time;
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

  async saveFirstSurvey(data: SaveFirstSurveyDto, first: boolean) {
    console.log(data);
    await this.save(data, first);
    await this.pushLogic(data);
  }

  async save(data: SaveFirstSurveyDto, first = false) {
    const { result, resultId, surveyId, answer } = data;
    const { mobile, eatTime } = await this.answerService.dispose(data, first);
    const user = await this.userRepository.findOne({
      where: {
        mobile: mobile,
      },
    });
    if (!user) {
      throw new HttpException(
        `the user of ${mobile} is not found`,
        HttpStatus.FORBIDDEN,
      );
    }
    const log = await this.pushLogRepository.findOne({
      where: {
        user,
        surveyId,
      },
    });
    if (log) {
      throw new HttpException(
        `the answer of ${surveyId} is exist`,
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

    if (first) {
      newLog.eat_time = eatTime;
    }

    await this.pushLogRepository.save(newLog);
  }

  async findList() {
    const [array, total] = await this.userRepository.findAndCount({
      relations: ['pushLogList'],
    });

    const tmpArr = array.filter((log) => {
      return log.pushLogList.length > 0;
    });

    const list = tmpArr.sort((a, b) => {
      const aLogList = a.pushLogList;
      const bLogList = b.pushLogList;
      const aEat = aLogList.find((log) => {
        return !!log.eat_time;
      });
      const bEat = bLogList.find((log) => {
        return !!log.eat_time;
      });

      if (aEat && bEat) {
        return (
          new Date(aEat.eat_time).getTime() - new Date(bEat.eat_time).getTime()
        );
      }

      if (aEat && !bEat) {
        return -1;
      }
      if (bEat && !aEat) {
        return 1;
      }
    });
    return [list, list.length];
  }
}
