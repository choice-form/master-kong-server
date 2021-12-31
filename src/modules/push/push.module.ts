import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { YMApi } from 'src/lib/ym/ym.api';
import { ConfigModule } from '@nestjs/config';
import { MobileTemplateModule } from '../template/mobile-template/mobile-template.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YmPush } from './entities/ym-push.entity';
import { User } from '../user/entities/user.entity';
import { PushController } from './push.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([YmPush, User]),
    ConfigModule,
    MobileTemplateModule,
  ],
  providers: [PushService, YMApi],
  exports: [PushService],
  controllers: [PushController],
})
export class PushModule {}
