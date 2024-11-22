import { Request, Response, NextFunction } from "express";

//Validation to create a new user
export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;
  
    if (!username || typeof username !== "string") {
      res.status(400).json({ error: "Invalid or missing 'username'" });
      return;
    }
  
    if (!password || typeof password !== "string") {
      res.status(400).json({ error: "Invalid or missing 'password'" });
      return;
    }
  
    next();
};

//Validation to creat a new patient
export const validateCreatePatient = (req: Request, res: Response, next: NextFunction): void => {
    const { firstName, lastName, birthDate, address, phones, emails } = req.body;
  
    if (!firstName || typeof firstName !== "string") {
      res.status(400).json({ error: "Invalid or missing 'firstName'" });
      return;
    }
  
    if (!lastName || typeof lastName !== "string") {
      res.status(400).json({ error: "Invalid or missing 'lastName'" });
      return;
    }
  
    if (!birthDate || isNaN(Date.parse(birthDate))) {
      res.status(400).json({ error: "Invalid or missing 'birthDate'" });
      return;
    }
  
    if (!address || typeof address !== "string") {
      res.status(400).json({ error: "Invalid or missing 'address'" });
      return;
    }
  
    if (!Array.isArray(phones) || phones.some((phone) => typeof phone !== "string")) {
      res.status(400).json({ error: "Invalid or missing 'phones'" });
      return;
    }
  
    if (!Array.isArray(emails) || emails.some((email) => typeof email !== "string")) {
      res.status(400).json({ error: "Invalid or missing 'emails'" });
      return;
    }
  
    next();
};

//Validation to create symptoms
export const validateCreateSymptom = (req: Request, res: Response, next: NextFunction): void => {
    const { name, description } = req.body;
  
    if (!name || typeof name !== "string") {
      res.status(400).json({ error: "Invalid or missing 'name'" });
      return;
    }
  
    if (!description || typeof description !== "string") {
      res.status(400).json({ error: "Invalid or missing 'description'" });
      return;
    }
  
    next();
};

//Validation to assign a symptom to a patient
export const validateAssignSymptomToPatient = (req: Request, res: Response, next: NextFunction): void => {
    const { patientId, symptomId } = req.params;
  
    if (!patientId || typeof patientId !== "string") {
      res.status(400).json({ error: "Invalid or missing 'patientId'" });
      return;
    }
  
    if (!symptomId || typeof symptomId !== "string") {
      res.status(400).json({ error: "Invalid or missing 'symptomId'" });
      return;
    }
  
    next();
};