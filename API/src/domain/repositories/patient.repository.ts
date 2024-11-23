import { Patient } from "../entities/patient.entity";

export interface PatientRepository {
    createPatient(patient: Partial<Patient>): Promise<Patient>;
    deletePatient(patientId: string): Promise<void>;
    findAllPatients(): Promise<Patient[]>;
    updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient | null>;
    findPatientById(patientId: string): Promise<Patient | null>;
}