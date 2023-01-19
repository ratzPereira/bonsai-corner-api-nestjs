import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bonsais' })
export class BonsaiEntity {
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

  @Column()
  bonsaiCreationDate: Date;

  @Column()
  species: string;

  @Column('text', { array: true })
  interventions: string[];
}
