import { Request, Response } from "express";
import { SymptomService } from "../../application/services/symptom.service";

const symptomService = new SymptomService();

export const createSymptom = async (req: Request, res: Response) => {
    const symptom = await symptomService.createSymptom(req.body);
    res.status(201).json(symptom);
}

export const getSymptoms = async (req: Request, res: Response) => {
    const symptoms = await symptomService.findAllSymptoms();
    res.status(200).json(symptoms);
}

export const deletedSymptom = async (req: Request, res: Response) => {
    await symptomService.deleteSymptom(req.params.id);
    res.status(200).json({ message: 'Symptom deleted successfully' });
}