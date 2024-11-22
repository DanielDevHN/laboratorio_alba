import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("symptoms")
export class SymptomEntity {
    @ObjectIdColumn()
    id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @CreateDateColumn()
    createdAt!: Date;
}