import { IsInt, IsString } from 'class-validator';

export class CreateAnswerParamDto {
  @IsString()
  mobile_node_title: string;

  @IsString()
  eat_time_node_title: string;

  @IsInt()
  delay_time: number;
}
