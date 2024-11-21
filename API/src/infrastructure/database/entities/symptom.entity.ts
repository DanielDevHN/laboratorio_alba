import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Symptom {
    @ObjectIdColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;
}