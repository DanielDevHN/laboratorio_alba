import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PatientSymptom {
  @ObjectIdColumn()
  id!: string;

  @Column()
  patientId!: string;

  @Column()
  symptomId!: string;

  @CreateDateColumn()
  assignedAt!: Date;
}