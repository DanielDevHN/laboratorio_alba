import { Repository } from "typeorm";
import { PatientEntity } from "../entities/patient.entity";
import { AppDataSource } from "../../env/config";
import { PatientRepository } from "../../../domain/repositories/patient.repository";


export class PatientRepositoryImpl implements PatientRepository {
    private repository: Repository<PatientEntity> = AppDataSource.getRepository(PatientEntity);

    async createPatient(patient: Partial<PatientEntity>): Promise<PatientEntity> {
       return await this.repository.save(patient);
    }

    async updatePatient(patientId: string, updates: Partial<PatientEntity>): Promise<PatientEntity | null> {
        await this.repository.update(patientId, updates);
        return this.findPatientById(patientId);
    }
    
    async deletePatient(patientId: string): Promise<void> {
        await this.repository.delete({ id: patientId });
    }

    async findAllPatients(): Promise<PatientEntity[]> {
        return await this.repository.find();
    }

    async findPatientById(patientId: string): Promise<PatientEntity | null> {
        return await this.repository.findOneBy({ id: patientId });
    }



    
}

