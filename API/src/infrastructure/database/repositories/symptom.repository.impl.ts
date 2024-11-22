import { Repository } from "typeorm";
import { SymptomEntity } from "../entities/symptom.entity";
import { AppDataSource } from "../../env/config";
import { SymptomRepository } from "../../../domain/repositories/symptom.repository";

export class SymptomRepositoryImpl implements SymptomRepository {
    private repository: Repository<SymptomEntity> = AppDataSource.getRepository(SymptomEntity);

    async createSymptom(symptom: Partial<SymptomEntity>): Promise<SymptomEntity> {
        return await this.repository.save(symptom);
    }

    async findAllSymptoms(): Promise<SymptomEntity[]> {
        return await this.repository.find();
    }

    async findSymptomById(symptomId: string): Promise<SymptomEntity | null> {
        return await this.repository.findOneBy({ id: symptomId });
    }

    async updateSymptom(symptomId: string, symptom: Partial<SymptomEntity>): Promise<SymptomEntity | null> {
        await this.repository.update({ id: symptomId }, symptom);
        return await this.repository.findOneBy({ id: symptomId });
    }

    async deleteSymptom(symptomId: string): Promise<void> {
        await this.repository.delete({ id: symptomId });
    }

}