import { Router } from "express";
import {
  createUser,
  deactivateUser,
  login,
} from "../controllers/user.controller";
import {
  createPatient,
  deletePatient,
  getPatientById,
  getPatients,
  updatePatient,
} from "../controllers/patient.controller";
import {
  createSymptom,
  deletedSymptom,
  getSymptoms,
  updateSymptom,
} from "../controllers/symptom.controller";
import {
  assignSymptom,
  findSymptomsByPatientId,
  removeSymptomFromPatient,
} from "../controllers/patient-symptom.controller";
import {
  validateAssignSymptomToPatient,
  validateCreatePatient,
  validateCreateSymptom,
  validateCreateUser,
} from "../middlewares/validation.middleware";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

//#region  User routes
// Create a new user
router.post("/users", validateCreateUser, createUser);

//Login user
router.post("/login", validateCreateUser, login);

//Deactivate user
router.delete("/users/:id/deactivate", deactivateUser);
//#endregion

//#region Patient routes
// Create a new patient
router.post("/patients", createPatient);

//Get a patient by id
router.get("/patients/:id", getPatientById);

//Get all patients
router.get("/patients", getPatients);

//Update a patient
router.patch(
  "/patients/:id",
  validateCreatePatient,
  updatePatient
);

//Delete a patient
router.delete("/patients/:id", deletePatient);
//#endregion

//#region Symptom routes
// Create a new symptom
router.post("/symptoms", validateCreateSymptom, createSymptom);

//Get all symptoms
router.get("/symptoms", getSymptoms);

//Update a symptom
router.patch("/symptoms/:id", validateCreateSymptom, updateSymptom);

//Delete a symptom
router.delete("/symptoms/:id", deletedSymptom);
//#endregion

//#region PatientSymptom routes
//Assign a symptom to a patient
router.post(
  "/patients/:patientId/symptoms/:symptomId",
  validateAssignSymptomToPatient,
  assignSymptom
);

//Get all symptoms of a patient
router.get(
  "/patients/:patientId/symptoms",
  findSymptomsByPatientId
);

// //Update a symptom from a patient
// router.patch(
//   "/patients/:patientId/symptoms/:symptomId",
//   validateAssignSymptomToPatient,
//   updateSymptomFromPatient
// );

//Remove a symptom from a patient
router.delete(
  "/patients/:patientId/symptoms/:symptomId",
  validateAssignSymptomToPatient,
  removeSymptomFromPatient
);
//#endregion

export default router;
