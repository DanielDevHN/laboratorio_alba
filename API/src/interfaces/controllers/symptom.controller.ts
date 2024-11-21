import { Request, Response } from "express";
import { SymptomService } from "../../application/services/symptom.service";

const symptomService = new SymptomService();

export const createSymptom = async (req: Request, res: Response) => {
    const symptom = await symptomService.createSymptom(req.body);
    res.status(201).json(symptom);
}