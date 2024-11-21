import { Repository } from "typeorm";
import { Symptom } from "../entities/symptom.entity";
import { AppDataSource } from "../../env/config";

export const SymptomRepository = AppDataSource.getRepository(Symptom);