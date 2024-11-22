import { Symptom } from "../entities/symptom.entity";

export interface SymptomRepository {
    createSymptom(symptom: Partial<Symptom>): Promise<Symptom>;
    findAllSymptoms(): Promise<Symptom[]>;
    findSymptomById(symptomId: string): Promise<Symptom | null>;
    deleteSymptom(symptomId: string): Promise<void>;
}