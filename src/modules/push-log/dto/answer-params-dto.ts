import { IsString } from 'class-validator';

export class AnswerParamsDto {
  @IsString()
  mobile_node_title: string;

  @IsString()
  eat_time_node_title: string;
}
