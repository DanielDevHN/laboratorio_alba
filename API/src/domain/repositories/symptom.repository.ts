import { Symptom } from "../entities/symptom.entity";

export interface SymptomRepository {
    createSymptom(symptom: Partial<Symptom>): Promise<Symptom>;
    findAllPatients(): Promise<Symptom[]>;
    findSymptomById(symptomId: string): Promise<Symptom | null>;
    deletePatient(symptomId: string): Promise<void>;
}