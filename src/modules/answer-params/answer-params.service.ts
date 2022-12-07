import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswerParamDto } from './dto/create-answer-param.dto';
import { UpdateAnswerParamDto } from './dto/update-answer-param.dto';
import { AnswerParam } from './entities/answer-param.entity';

@Injectable()
export class AnswerParamsService {
  constructor(
    @InjectRepository(AnswerParam)
    private readonly answerParamsRepository: Repository<AnswerParam>,
  ) {}
  async create(createAnswerParamDto: CreateAnswerParamDto) {
    const total = await this.answerParamsRepository.count();
    if (total >= 1) {
      throw new HttpException(
        `not create params of answer`,
        HttpStatus.FORBIDDEN,
      );
    }
    return this.answerParamsRepository.save(createAnswerParamDto);
  }

  findAll() {
    return this.answerParamsRepository.findAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} answerParam`;
  }

  getOne() {
    return this.answerParamsRepository.findOne({});
  }

  update(id: number, updateAnswerParamDto: UpdateAnswerParamDto) {
    return this.answerParamsRepository.update({ id }, updateAnswerParamDto);
  }
}
