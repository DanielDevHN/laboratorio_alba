import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class PatientSymptom {
    @ObjectIdColumn()
    id!: string;

    @Column()
    patientId!: string;

    @Column()
    symptomId!: string;

    @Column()
    assingedAt!: Date;
}