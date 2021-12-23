import { IsNotEmpty } from 'class-validator';

export class SaveFirstSurveyDto {
  @IsNotEmpty()
  surveyId: string;
  @IsNotEmpty()
  answer: string;
  @IsNotEmpty()
  result: string;
  @IsNotEmpty()
  resultId: string;
}
