import { MongoRepository } from "typeorm";
import { PatientSymptomEntity } from "../entities/patient-symptom.entity";
import { AppDataSource } from "../../env/config";
import { PatientSymptomRepository } from "../../../domain/repositories/patient-symptom.repository";
import { PatientSymptom } from "../../../domain/entities/patient-symptom.entity";

export class PatientSymptomRepositoryImpl implements PatientSymptomRepository {
    private repository: MongoRepository<PatientSymptomEntity> = AppDataSource.getMongoRepository(PatientSymptomEntity);

    async assignSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptom> {
        const relation = this.repository.create({
            patientId,
            symptomId,
            assignedAt: new Date()
        });
        const savedEntity = await this.repository.save(relation);
        return {
            id: savedEntity.id.toString(),
            patientId: savedEntity.patientId,
            symptomId: savedEntity.symptomId,
            assignedAt: savedEntity.assignedAt,
            updatedAt: savedEntity.updatedAt
        };
    }

    async findSymptomsByPatientId(patientId: string): Promise<PatientSymptom[]> {
        const entities = await this.repository.find({
            where: { patientId }
        });
        return entities.map(entity => ({
            id: entity.id.toString(),
            patientId: entity.patientId,
            symptomId: entity.symptomId,
            assignedAt: entity.assignedAt,
            updatedAt: entity.updatedAt
        }));
    }

    // async updateSymptomFromPatient(patientId: string, symptomId: string, patientSymptom: PatientSymptom): Promise<void> {
    //     const partialEntity: Partial<PatientSymptomEntity> = {
    //         patientId: patientSymptom.patientId,
    //         symptomId: patientSymptom.symptomId,
    //         assignedAt: patientSymptom.assignedAt
    //     };
    //     await this.repository.updateOne(
    //         { patientId, symptomId },
    //         { $set: partialEntity }
    //     );
    // }

    async removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void> {
        await this.repository.deleteOne({ patientId, symptomId });
    }
}
