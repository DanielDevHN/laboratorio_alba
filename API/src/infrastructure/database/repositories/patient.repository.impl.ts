import { Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { AppDataSource } from "../../env/config";
import { PatientRepository } from "../../../domain/repositories/patient.repository";


export class PatientRepositoryImpl implements PatientRepository {
    private repository: Repository<Patient> = AppDataSource.getRepository(Patient);

    async createPatient(patient: Partial<Patient>): Promise<Patient> {
       return await this.repository.save(patient);
    }

    async updatePatient(patientId: string, updates: Partial<Patient>): Promise<Patient | null> {
        await this.repository.update(patientId, updates);
        return this.findPatientById(patientId);
    }
    
    async deletePatient(patientId: string): Promise<void> {
        await this.repository.delete({ id: patientId });
    }

    async findAllPatients(): Promise<Patient[]> {
        return await this.repository.find();
    }

    async findPatientById(patientId: string): Promise<Patient | null> {
        return await this.repository.findOneBy({ id: patientId });
    }



    
}

