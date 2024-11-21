import { PatientRepository } from "../../infrastructure/database/repositories/patient.repository";
import { Patient } from "../../domain/entities/patient.entity";

export class PatientService {
    async createPatient(patientData: Partial<Patient>): Promise<Patient> {
        const patient = PatientRepository.create(patientData);
        return await PatientRepository.save(patient);
    }

    async findAllPatients(): Promise<Patient[]> {
        return await PatientRepository.find();
    }

    async findPatientById(patientId: string): Promise<Patient | null> {
        return await PatientRepository.findOneBy({ id: patientId });
    }

    async updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient | null> {
        await PatientRepository.update(patientId, updates);
        return await PatientRepository.findOneBy({ id: patientId });
    }

    async deletePatient(patientId: string): Promise<void> {
        await PatientRepository.delete(patientId);
    }
}