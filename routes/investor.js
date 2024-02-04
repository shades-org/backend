import express from "express";
import { logIn, signUp } from "../controllers/investor/auth.js";
import {
  dislikePitch,
  likePitch,
  pitchFeedback,
} from "../controllers/investor/pitchInteraction.js";
import { getInvestor } from "../middlewares/index.js";

const router = express.Router();

router
  .post("/signup", signUp)
  .post("/login", logIn)
  .post("/feedback", getInvestor, pitchFeedback);

export default router;
