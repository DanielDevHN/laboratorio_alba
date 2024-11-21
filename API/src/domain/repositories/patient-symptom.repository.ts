import { PatientSymptom } from "../entities/patient-symptom.entity";

export interface PatientSymptomRepository {
    assignSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptom>;
    findSymptomsByPatientId(patientId: string): Promise<PatientSymptom[]>;
    removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void>;
}