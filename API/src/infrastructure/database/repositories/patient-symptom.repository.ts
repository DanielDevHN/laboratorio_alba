import { Repository } from "typeorm";
import { PatientSymptom } from "../entities/patient-symptom.entity";
import { AppDataSource } from "../../env/config";

export const PatientRepository = AppDataSource.getRepository(PatientSymptom);