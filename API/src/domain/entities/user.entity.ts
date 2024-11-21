import { Entity, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id!: string;

  @Column()
  username!: string;

  @Column()
  password!: string; // Contraseña hasheada

  @Column({ default: true })
  isActive!: boolean; 
}
