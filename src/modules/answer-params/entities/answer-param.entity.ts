import { CommonEntity } from 'src/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class AnswerParam extends CommonEntity {
  @Column()
  mobile_node_title: string;

  @Column()
  eat_time_node_title: string;
}
