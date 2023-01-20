import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: '' })
  bonsaiCreationDate: Date;

  @Column()
  species: string;

  @Column('text', { array: true })
  interventions: string[];

  @BeforeInsert()
  setDate() {
    return (this.bonsaiCreationDate = new Date());
  }
}
