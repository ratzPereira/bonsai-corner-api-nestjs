import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {hash} from 'bcrypt'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
