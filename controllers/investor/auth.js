import { failureLabel, successLabel } from "../../constants.js";

import { loginInvestor, onboardInvestor } from "../../operations/investors.js";

// Route Handler for Investor Onboarding
export const signUp = async (req, res) => {
  const { email, password } = req.body;

  const [flag, msg, code] = await onboardInvestor(email, password);

  return res
    .status(code)
    .json({ status: flag ? successLabel : failureLabel, msg });
};

// Route Handler for Investor login
export const logIn = async (req, res) => {
  const { email, password } = req.body;

  const [flag, msg, code, token] = await loginInvestor(email, password);

  if (flag) return res.status(code).json({ status: successLabel, msg, token });

  return res.status(code).json({ status: failureLabel, msg });
};
