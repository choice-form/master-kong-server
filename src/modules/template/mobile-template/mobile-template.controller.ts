import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MobileTemplateService } from './mobile-template.service';
import { CreateMobileTemplateDto } from './dto/create-mobile-template.dto';
import { UpdateMobileTemplateDto } from './dto/update-mobile-template.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('mobile-template')
export class MobileTemplateController {
  constructor(private readonly mobileTemplateService: MobileTemplateService) {}

  @Post()
  create(@Body() createMobileTemplateDto: CreateMobileTemplateDto) {
    return this.mobileTemplateService.create(createMobileTemplateDto);
  }

  @Get()
  findAll() {
    return this.mobileTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mobileTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMobileTemplateDto: UpdateMobileTemplateDto,
  ) {
    return this.mobileTemplateService.update(+id, updateMobileTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mobileTemplateService.remove(+id);
  }
}
