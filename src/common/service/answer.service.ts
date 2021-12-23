import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { AnswerParamsService } from 'src/modules/answer-params/answer-params.service';
import { SaveFirstSurveyDto } from 'src/modules/push-log/dto/save-first-survey.dto';

export interface IOption {
  text: string;
  value: string;
}
export interface INode {
  title: string;
  description: string;
  value?: string;
  options?: IOption[];
}

@Injectable()
export class AnswerService {
  constructor(private readonly answerParamService: AnswerParamsService) {}

  getParams() {
    return this.answerParamService.getOne();
  }

  async dispose(data: SaveFirstSurveyDto) {
    const nodeList = this.preAnalyze(data);
    return this.analyze(nodeList);
  }

  preAnalyze(data: SaveFirstSurveyDto): INode[] {
    const { answer } = data;
    const nodeList = JSON.parse(answer);
    return nodeList;
  }

  // TODO: 需要实现,返回一个吃面时间
  async analyze(result: INode[]): Promise<{ eatTime: Date; mobile: string }> {
    const { eat_time_node_title, mobile_node_title } =
      await this.answerParamService.getOne();
    let eatTime: Date = null;
    let mobile: string = null;
    const eatNode = result.find((n) => {
      return n.title === eat_time_node_title;
    });

    const mobileNode = result.find((n) => {
      return n.title === mobile_node_title;
    });

    if (mobileNode.options) {
      const [opts] = mobileNode.options;
      mobile = opts.value;
    } else {
      throw new HttpException('not found mobile', HttpStatus.FORBIDDEN);
    }

    if (eatNode.options) {
      const [date, time] = eatNode.options;
      const { value: d } = date;
      const { value: t } = time;
      eatTime = new Date(dayjs(`${d} ${t}`).format());
    } else {
      throw new HttpException('not found time of eat', HttpStatus.FORBIDDEN);
    }
    return {
      mobile,
      eatTime,
    };
  }
}
