import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
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
  eatTitle = '吃面时间';
  mobileTitle = '手机号';

  dispose(data: SaveFirstSurveyDto) {
    const nodeList = this.preAnalyze(data);
    return this.analyze(nodeList);
  }

  preAnalyze(data: SaveFirstSurveyDto): INode[] {
    const { answer } = data;
    const nodeList = JSON.parse(answer);
    return nodeList;
  }

  // TODO: 需要实现,返回一个吃面时间
  analyze(result: INode[]): { eatTime: Date; mobile: string } {
    let eatTime: Date = null;
    let mobile: string = null;
    const eatNode = result.find((n) => {
      return n.title === this.eatTitle;
    });

    const mobileNode = result.find((n) => {
      return n.title === this.mobileTitle;
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
