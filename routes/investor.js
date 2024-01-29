import express from "express";
import { logIn, signUp } from "../controllers/investor/auth.js";

const router = express.Router();

router.post("/signup", signUp).post("/login", logIn);

export default router;
