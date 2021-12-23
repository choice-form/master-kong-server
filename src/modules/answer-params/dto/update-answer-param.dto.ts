import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerParamDto } from './create-answer-param.dto';

export class UpdateAnswerParamDto extends PartialType(CreateAnswerParamDto) {}
