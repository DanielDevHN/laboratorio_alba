import { Repository } from "typeorm";
import { Symptom } from "../entities/symptom.entity";
import { AppDataSource } from "../../env/config";
import { SymptomRepository } from "../../../domain/repositories/symptom.repository";

export class SymptomRepositoryImpl implements SymptomRepository {
    private repository: Repository<Symptom> = AppDataSource.getRepository(Symptom);

    async createSymptom(symptom: Partial<Symptom>): Promise<Symptom> {
        return await this.repository.save(symptom);
    }

    async findAllSymptoms(): Promise<Symptom[]> {
        return await this.repository.find();
    }

    async findSymptomById(symptomId: string): Promise<Symptom | null> {
        return await this.repository.findOneBy({ id: symptomId });
    }

    async deleteSymptom(symptomId: string): Promise<void> {
        await this.repository.delete({ id: symptomId });
    }

}