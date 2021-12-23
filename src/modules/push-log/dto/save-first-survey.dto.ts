import { IsNotEmpty, IsString } from 'class-validator';

export class SaveFirstSurveyDto {
  @IsNotEmpty()
  @IsString()
  surveyId: string;

  @IsNotEmpty()
  @IsString()
  answer: string;

  @IsNotEmpty()
  @IsString()
  result: string;

  @IsNotEmpty()
  @IsString()
  resultId: string;
}
