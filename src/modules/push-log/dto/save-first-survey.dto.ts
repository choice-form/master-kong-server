import { IsNotEmpty } from 'class-validator';

export class SaveFirstSurveyDto {
  @IsNotEmpty()
  mobile: string;
  @IsNotEmpty()
  surveyId: string;
  @IsNotEmpty()
  survey: string;
  @IsNotEmpty()
  result: string;
  @IsNotEmpty()
  resultId: string;
}
