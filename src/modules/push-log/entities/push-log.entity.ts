import { CommonEntity } from 'src/entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class PushLog extends CommonEntity {
  @Column()
  surveyId: string;

  @Column()
  survey: string;

  @ManyToOne(() => User, (user) => user.pushLogList)
  user: User;

  @Column('simple-json')
  result: string;

  @Column('varchar')
  resultId: string;
}
