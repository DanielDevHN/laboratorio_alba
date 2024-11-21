import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class Patient {
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

    @Column
    phones!: string[];

    @Column()
    emails!: string[];

}