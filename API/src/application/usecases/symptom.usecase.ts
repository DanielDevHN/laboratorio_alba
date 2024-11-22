import { SymptomRepository } from "../../domain/repositories/symptom.repository";
import { Symptom } from "../../domain/entities/symptom.entity";

export class SymptomUseCase {
  constructor(private readonly symptomRepository: SymptomRepository) {}

  async createSymptom(symptomData: Partial<Symptom>): Promise<Symptom> {
    return await this.symptomRepository.createSymptom(symptomData);
  }

  async findAllSymptoms(): Promise<Symptom[]> {
    return await this.symptomRepository.findAllSymptoms();
  }

  async findSymptomById(symptomId: string): Promise<Symptom | null> {
    return await this.symptomRepository.findSymptomById(symptomId);
  }

  async deleteSymptom(symptomId: string): Promise<void> {
    return await this.symptomRepository.deleteSymptom(symptomId);
  }
}
