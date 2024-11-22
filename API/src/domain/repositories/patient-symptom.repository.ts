import { PatientSymptom } from "../entities/patient-symptom.entity";

export interface PatientSymptomRepository {
    assignSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptom>;
    findSymptomsByPatientId(patientId: string): Promise<PatientSymptom[]>;
    updateSymptomFromPatient(patientId: string, symptomId: string, patientSymptom: PatientSymptom): Promise<void>;
    removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void>;
}