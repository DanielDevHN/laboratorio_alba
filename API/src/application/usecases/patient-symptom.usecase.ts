import { PatientSymptomRepository } from "../../domain/repositories/patient-symptom.repository";
import { PatientSymptom } from "../../domain/entities/patient-symptom.entity";

export class PatientSymptomUseCase {
  constructor(private readonly patientSymptomRepository: PatientSymptomRepository) {}

  async assignSymptomToPatient(patientId: string, symptomId: string): Promise<PatientSymptom> {
    return await this.patientSymptomRepository.assignSymptomToPatient(patientId, symptomId);
  }

  async findSymptomsByPatientId(patientId: string): Promise<PatientSymptom[]> {
    return await this.patientSymptomRepository.findSymptomsByPatientId(patientId);
  }

  // async updateSymptomFromPatient(patientId: string, symptoms: PatientSymptom[]): Promise<void> {
  //   for (const symptom of symptoms) {
  //     await this.patientSymptomRepository.updateSymptomFromPatient(patientId, symptom.symptomId, symptom);
  //   }
  // }

  async removeSymptomFromPatient(patientId: string, symptomId: string): Promise<void> {
    await this.patientSymptomRepository.removeSymptomFromPatient(patientId, symptomId);
  }
}
