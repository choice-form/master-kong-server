import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PushLogModule } from './modules/push-log/push-log.module';
import { PushModule } from './modules/push/push.module';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from './modules/queue/queue.module';
import { SysModule } from './modules/sys/sys.module';
import { MobileTemplateModule } from './modules/template/mobile-template/mobile-template.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        synchronize: config.get('DB_SYNCHRONIZE') === 'true' ? true : false,
        logging: config.get('DB_LOGGING') == 'true' ? true : false,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        prefix: config.get('master_kong'),
        redis: {
          host: config.get<string>('BULL_HOST'),
          port: parseInt(config.get('BULL_PORT')),
        },
      }),
    }),
    UserModule,
    PushLogModule,
    PushModule,
    QueueModule,
    SysModule,
    MobileTemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
