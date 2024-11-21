import { Patient } from "../entities/patient.entity";

export interface PatientRepository {
    createPatient(patient: Partial<Patient>): Promise<Patient>;
    updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient | null>;
    deletePatient(patientId: string): Promise<void>;
    findAllPatients(): Promise<Patient[]>;
    findPatientById(patientId: string): Promise<Patient | null>;
}