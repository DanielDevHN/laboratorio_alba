import { Repository } from "typeorm";
import { PatientSymptomEntity } from "../entities/patient-symptom.entity";
import { AppDataSource } from "../../env/config";
import { PatientSymptomRepository } from "../../../domain/repositories/patient-symptom.repository";


export  class PatientSymptomRepositoryImpl implements PatientSymptomRepository {
    private repository: Repository<PatientSymptomEntity> = AppDataSource.getRepository(PatientSymptomEntity);

    async assignSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptomEntity> {
       const relation = this.repository.create({
            patientId,
            symptomId,
            assignedAt: new Date()
       });
       return this.repository.save(relation);
    }

    async findSymptomsByPatientId(patientId: string): Promise<PatientSymptomEntity[]> {
        return await this.repository.findBy({patientId});
    }
    async removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void> {
        await this.repository.delete({patientId, symptomId});
    }
}