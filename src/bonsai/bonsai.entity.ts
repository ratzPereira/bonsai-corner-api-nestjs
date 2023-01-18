import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'bonsais'})
export class BonsaiEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}