import express from "express";
import {
  getProfile,
  isPitcherRegistered,
  registerPitcher,
} from "../controllers/pitchers/auth.js";
import { getFirebaseUser } from "../middlewares/index.js";

const router = express.Router();

router
  .get("/registration", getFirebaseUser, isPitcherRegistered)
  .post("/registration", getFirebaseUser, registerPitcher)
  .get("/profile", getFirebaseUser, getProfile);
export default router;
