import { Repository } from "typeorm";
import { Patient } from "../entities/patient.entity";
import { AppDataSource } from "../../env/config";

export const PatientRepository = AppDataSource.getRepository(Patient);