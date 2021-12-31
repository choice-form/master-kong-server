import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Options,
} from '@nestjs/common';
import { PushLogService } from './push-log.service';
import { CreatePushLogDto } from './dto/create-push-log.dto';
import { UpdatePushLogDto } from './dto/update-push-log.dto';
import { SaveFirstSurveyDto } from './dto/save-first-survey.dto';

@Controller('push-log')
export class PushLogController {
  constructor(private readonly pushLogService: PushLogService) {}

  @Post()
  create(@Body() createPushLogDto: CreatePushLogDto) {
    return this.pushLogService.create(createPushLogDto);
  }

  @Get()
  findAll() {
    // return this.pushLogService.findAll(query);
    return this.pushLogService.findList();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePushLogDto: UpdatePushLogDto) {
    return this.pushLogService.update(+id, updatePushLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pushLogService.remove(+id);
  }

  @Post('first')
  saveFirstSurvey(@Body() query: SaveFirstSurveyDto) {
    return this.pushLogService.saveFirstSurvey(query, true);
  }
  @Options('first')
  optionsFirstSurvey(@Body() query: SaveFirstSurveyDto) {
    return this.pushLogService.saveFirstSurvey(query, true);
  }
  @Post('latest')
  saveLatestSurvey(@Body() query: SaveFirstSurveyDto) {
    console.log('query', query);
    return this.pushLogService.save(query, false);
  }
  @Options('latest')
  optionsLatestSurvey(@Body() query: SaveFirstSurveyDto) {
    console.log('query', query);
    return this.pushLogService.save(query, false);
  }
}
