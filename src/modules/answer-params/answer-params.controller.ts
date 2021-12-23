import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AnswerParamsService } from './answer-params.service';
import { CreateAnswerParamDto } from './dto/create-answer-param.dto';
import { UpdateAnswerParamDto } from './dto/update-answer-param.dto';

@Controller('answer-params')
export class AnswerParamsController {
  constructor(private readonly answerParamsService: AnswerParamsService) {}

  @Post()
  create(@Body() createAnswerParamDto: CreateAnswerParamDto) {
    return this.answerParamsService.create(createAnswerParamDto);
  }

  @Get()
  findAll() {
    return this.answerParamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerParamsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAnswerParamDto: UpdateAnswerParamDto,
  ) {
    return this.answerParamsService.update(+id, updateAnswerParamDto);
  }
}
