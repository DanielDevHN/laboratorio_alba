import { PatientRepository } from "../../domain/repositories/patient.repository";
import { Patient } from "../../domain/entities/patient.entity";

export class PatientUseCase {
  constructor(private readonly patientRepository: PatientRepository) {}

  async createPatient(patientData: Partial<Patient>): Promise<Patient> {
    return await this.patientRepository.createPatient(patientData);
  }

  async findAllPatients(): Promise<Patient[]> {
    return await this.patientRepository.findAllPatients();
  }

  async findPatientById(patientId: string): Promise<Patient | null> {
    return await this.patientRepository.findPatientById(patientId);
  }

  async updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient | null> {
    return await this.patientRepository.updatePatient(patientId, updates);
  }

  async deletePatient(patientId: string): Promise<void> {
    return await this.patientRepository.deletePatient(patientId);
  }
}
