import { CommonEntity } from 'src/entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MobileTemplate extends CommonEntity {
  @Column()
  name: string;
  @Column()
  content: string;
}
