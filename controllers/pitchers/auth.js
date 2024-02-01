import { failureLabel, successLabel } from "../../constants.js";

import {
  getPitcherRegistrationStatus,
  registerPitcherOps,
} from "../../operations/pitchers.js";

// Route Handler to check whether a Pitcher is registered or not
export const isPitcherRegistered = async (req, res) => {
  const [flag, msg, code] = await getPitcherRegistrationStatus(req.user.email);

  return res
    .status(code)
    .json({ status: flag ? successLabel : failureLabel, msg });
};

// Route Handler for Pitcher Registration
export const registerPitcher = async (req, res) => {
  // Destructuring the Request Object
  const { name, dob, phoneNumber, profilePic, profileVideo, bio, links } =
    req.body;

  const [flag, msg, code] = await registerPitcherOps(
    {
      name,
      dob,
      phoneNumber,
      profilePic,
      profileVideo,
      bio,
      links,
    },
    req.user.email
  );

  return res
    .status(code)
    .json({ status: flag ? successLabel : failureLabel, msg });
};
