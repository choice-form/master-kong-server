import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PushLogService } from './push-log.service';
import { CreatePushLogDto } from './dto/create-push-log.dto';
import { UpdatePushLogDto } from './dto/update-push-log.dto';
import { FindAllPushLogDto } from './dto/find-all-push-log.dto';
import { SaveFirstSurveyDto } from './dto/save-first-survey.dto';

@Controller('push-log')
export class PushLogController {
  constructor(private readonly pushLogService: PushLogService) {}

  @Post()
  create(@Body() createPushLogDto: CreatePushLogDto) {
    return this.pushLogService.create(createPushLogDto);
  }

  @Get()
  findAll(@Query() query: FindAllPushLogDto) {
    return this.pushLogService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePushLogDto: UpdatePushLogDto) {
    return this.pushLogService.update(+id, updatePushLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pushLogService.remove(+id);
  }

  @Get('first')
  saveFirstSurvey(@Query() query: SaveFirstSurveyDto) {
    return this.pushLogService.saveFirstSurvey(query);
  }
  @Get('latest')
  saveLatestSurvey(@Query() query: SaveFirstSurveyDto) {
    return this.pushLogService.save(query);
  }
}
