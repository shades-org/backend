import express from "express";
import {
  isPitcherRegistered,
  registerPitcher,
} from "../controllers/pitchers/auth.js";
import { getFirebaseUser } from "../middlewares/index.js";

const router = express.Router();

router
  .get("/registration", getFirebaseUser, isPitcherRegistered)
  .post("/registration", getFirebaseUser, registerPitcher);
export default router;
