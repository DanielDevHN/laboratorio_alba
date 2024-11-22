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
router.delete("/users/:id/deactivate", authenticateJWT, deactivateUser);
//#endregion

//#region Patient routes
// Create a new patient
router.post("/patients", authenticateJWT, createPatient);

//Get a patient by id
router.get("/patients/:id", authenticateJWT, getPatientById);

//Get all patients
router.get("/patients", authenticateJWT, getPatients);

//Update a patient
router.patch(
  "/patients/:id",
  authenticateJWT,
  validateCreatePatient,
  updatePatient
);

//Delete a patient
router.delete("/patients/:id", authenticateJWT, deletePatient);
//#endregion

//#region Symptom routes
// Create a new symptom
router.post("/symptoms", authenticateJWT, validateCreateSymptom, createSymptom);

//Get all symptoms
router.get("/symptoms", authenticateJWT, getSymptoms);

//Delete a symptom
router.delete("/symptoms/:id", authenticateJWT, deletedSymptom);
//#endregion

//#region PatientSymptom routes
//Assign a symptom to a patient
router.post(
  "/patients/:patientId/symptoms/:symptomId",
  authenticateJWT,
  validateAssignSymptomToPatient,
  assignSymptom
);

//Get all symptoms of a patient
router.get(
  "/patients/:patientId/symptoms",
  authenticateJWT,
  findSymptomsByPatientId
);

//Remove a symptom from a patient
router.delete(
  "/patients/:patientId/symptoms/:symptomId",
  authenticateJWT,
  validateAssignSymptomToPatient,
  removeSymptomFromPatient
);
//#endregion

export default router;
