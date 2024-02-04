import express from "express";
import {
  createPitch,
  getPitches,
  updatePitch,
} from "../controllers/pitch/crud.js";
import { commonAuthMiddleware, getFirebaseUser } from "../middlewares/index.js";

const router = express.Router();

router
  .get("/", commonAuthMiddleware, getPitches)
  .post("/", getFirebaseUser, createPitch)
  .patch("/", getFirebaseUser, updatePitch);
export default router;
