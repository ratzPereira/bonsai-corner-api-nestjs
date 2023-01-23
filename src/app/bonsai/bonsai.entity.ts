import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'bonsais' })
export class Bonsai {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  description: string;

  @Column('text', { array: true })
  images: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bonsaiCreationDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  bonsaiUpdatedDate: Date;

  @Column()
  species: string;

  @Column('simple-array')
  interventions: string[];

  @Column({ default: 0 })
  favoritesCount: number;

  @ManyToOne(() => User, (user) => user.bonsais, { eager: true })
  owner: User;

  @BeforeUpdate()
  updateTimestamp() {
    this.bonsaiUpdatedDate = new Date();
  }
}
