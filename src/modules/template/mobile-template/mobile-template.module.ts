import { Module } from '@nestjs/common';
import { MobileTemplateService } from './mobile-template.service';
import { MobileTemplateController } from './mobile-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MobileTemplate } from './entities/mobile-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MobileTemplate])],
  controllers: [MobileTemplateController],
  providers: [MobileTemplateService],
  exports: [MobileTemplateService],
})
export class MobileTemplateModule {}
