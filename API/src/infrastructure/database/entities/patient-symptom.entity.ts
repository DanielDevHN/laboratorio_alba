import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("patient_symptoms")
export class PatientSymptomEntity {
    @ObjectIdColumn()
    id!: string;

    @Column()
    patientId!: string;

    @Column()
    symptomId!: string;

    @CreateDateColumn()
    assignedAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}