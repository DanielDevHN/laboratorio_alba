import { PatientRepository } from "../../infrastructure/database/repositories/patient.repository";
import { Patient } from "../../domain/entities/patient.entity";

export class PatientService {
    async create(patientData: Partial<Patient>): Promise<Patient> {
        const patient = PatientRepository.create(patientData);
        return await PatientRepository.save(patient);
    }

    async findAll(): Promise<Patient[]> {
        return await PatientRepository.find();
    }

    async fundById(patientId: string): Promise<Patient | null> {
        return await PatientRepository.findOneBy({ id: patientId });
    }

    async update(patientId: string, updates: Partial<Patient>): Promise<Patient | null> {
        await PatientRepository.update(patientId, updates);
        return await PatientRepository.findOneBy({ id: patientId });
    }

    async delete(patientId: string): Promise<void> {
        await PatientRepository.delete(patientId);
    }
}