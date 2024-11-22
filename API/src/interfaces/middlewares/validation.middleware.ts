import { Request, Response, NextFunction } from "express";

//Validation to create a new user
export const validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
  
    if (!username || typeof username !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'username'" });
    }
  
    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'password'" });
    }
  
    next();
};

//Validation to creat a new patient
export const validateCreatePatient = (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, birthDate, address, phones, emails } = req.body;
  
    if (!firstName || typeof firstName !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'firstName'" });
    }
  
    if (!lastName || typeof lastName !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'lastName'" });
    }
  
    if (!birthDate || isNaN(Date.parse(birthDate))) {
      return res.status(400).json({ error: "Invalid or missing 'birthDate'" });
    }
  
    if (!address || typeof address !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'address'" });
    }
  
    if (!Array.isArray(phones) || phones.some((phone) => typeof phone !== "string")) {
      return res.status(400).json({ error: "Invalid or missing 'phones'" });
    }
  
    if (!Array.isArray(emails) || emails.some((email) => typeof email !== "string")) {
      return res.status(400).json({ error: "Invalid or missing 'emails'" });
    }
  
    next();
};

//Validation to create symptoms
export const validateCreateSymptom = (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
  
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'name'" });
    }
  
    if (!description || typeof description !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'description'" });
    }
  
    next();
};

//Validation to assign a symptom to a patient
export const validateAssignSymptomToPatient = (req: Request, res: Response, next: NextFunction) => {
    const { patientId, symptomId } = req.params;
  
    if (!patientId || typeof patientId !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'patientId'" });
    }
  
    if (!symptomId || typeof symptomId !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'symptomId'" });
    }
  
    next();
};