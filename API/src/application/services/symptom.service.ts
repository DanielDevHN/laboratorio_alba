import { SymptomRepository } from "../../infrastructure/database/repositories/symptom.repository";
import { Symptom } from "../../domain/entities/symptom.entity";


export class SymptomService {
    async createSymptom(symptonData: Partial<Symptom>): Promise<Symptom> {
        const symptom = SymptomRepository.create(symptonData);
        return await SymptomRepository.save(symptom);
    }

    async findAllSymptoms(): Promise<Symptom[]> {
        return await SymptomRepository.find();
    }

    async findSymptomById(symptomId: string): Promise<Symptom | null> {
        return await SymptomRepository.findOneBy({ id: symptomId });
    }

    async deleteSymptom(symptomId: string): Promise<void> {
        await SymptomRepository.delete(symptomId);
    }
}