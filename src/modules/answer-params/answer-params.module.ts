import { Module } from '@nestjs/common';
import { AnswerParamsService } from './answer-params.service';
import { AnswerParamsController } from './answer-params.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerParam } from './entities/answer-param.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerParam])],
  controllers: [AnswerParamsController],
  providers: [AnswerParamsService],
  exports: [AnswerParamsService],
})
export class AnswerParamsModule {}
