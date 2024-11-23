import { Entity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectId } from "mongodb";

@Entity("patient_symptoms")
export class PatientSymptomEntity {
    @ObjectIdColumn()
    id!: ObjectId; 
    
    @Column()
    patientId!: string;

    @Column()
    symptomId!: string;

    @CreateDateColumn()
    assignedAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
