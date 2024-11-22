import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("users")
export class UserEntity {
    @ObjectIdColumn()
    id!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}