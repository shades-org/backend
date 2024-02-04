import { failureLabel, successLabel } from "../../constants.js";
import { createPitchOps, getPitchesOps } from "../../operations/pitches.js";
import { SUCCESS_CODE } from "../../statusCodes.js";

// Both Pitchers and Investors can access
// req.role, req.user => email
export const getPitches = async (req, res) => {
  const [flag, msg, code, data] = await getPitchesOps(req.user.email, req.role);

  if (flag)
    return res.status(code).json({ status: successLabel, msg, pitches: data });
  else return res.status(code).json({ status: failureLabel, msg });
};

// Only Pitchers can access
export const createPitch = async (req, res) => {
  const {
    name,
    tagline,
    description,
    logoURL,
    videoURL,
    imageURL,
    turnover,
    tags,
    links,
    founders,
  } = req.body;

  const [flag, msg, code] = await createPitchOps(req.user.email, {
    name,
    tagline,
    description,
    logoURL,
    videoURL,
    imageURL,
    turnover,
    tags,
    links,
    founders,
  });
  return res.status(code).json({
    status: flag ? successLabel : failureLabel,
    msg,
  });
};

// Only Pitchers can access
export const updatePitch = (req, res) => {
  res.json({ status: successLabel });
};
