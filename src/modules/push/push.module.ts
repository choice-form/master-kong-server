import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { YMApi } from 'src/lib/ym/ym.api';
import { ConfigModule } from '@nestjs/config';
import { MobileTemplateModule } from '../template/mobile-template/mobile-template.module';

@Module({
  imports: [ConfigModule, MobileTemplateModule],
  providers: [PushService, YMApi],
  exports: [PushService],
})
export class PushModule {}
