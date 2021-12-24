import { CommonEntity } from 'src/entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PushLog extends CommonEntity {
  @Column()
  surveyId: string;

  @ManyToOne(() => User, (user) => user.pushLogList)
  user: User;

  @Column('simple-json')
  result: string;

  @Column('varchar')
  resultId: string;

  @Column('simple-json')
  answer: string;

  @Column('timestamp', { nullable: true })
  eat_time?: Date;
}
