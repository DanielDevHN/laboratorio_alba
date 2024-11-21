import { PatientSymptonRepository } from "../../infrastructure/database/repositories/patient-symptom.repository";
import { PatientSymptom } from "../../domain/entities/patient-symptom.entity";

export class PatientSymptomService {
    async assingSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptom> {
        const relation = PatientSymptonRepository.create({ 
            patientId,
            symptomId,
            assignedAt: new Date(),
        });
        return await PatientSymptonRepository.save(relation);
    }

    async getSymptomsForPatient(patientId: string): Promise<PatientSymptom[]> {
        return await PatientSymptonRepository.findBy({ patientId });
    }

    async removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void> {
        await PatientSymptonRepository.delete({ patientId, symptomId });
    }
}