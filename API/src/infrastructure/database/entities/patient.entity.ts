import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("patients")
export class PatientEntity {
    @ObjectIdColumn()
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    birthDate!: Date;

    @Column()
    address!: string;

    @Column()
    phones!: string[];

    @Column()
    emails!: string[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}