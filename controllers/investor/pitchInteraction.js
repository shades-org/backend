import { failureLabel, successLabel } from "../../constants.js";
import { pitchFedbackOps } from "../../operations/investors.js";

export const likePitch = (req, res) => {};

export const dislikePitch = (req, res) => {};

// x-access-token
export const pitchFeedback = async (req, res) => {
  const { pitchId, stars, review } = req.body;
  const { email } = req.user;
  const [flag, msg, code] = await pitchFedbackOps(
    email,
    pitchId,
    stars,
    review
  );

  console.log(flag, msg, code);
  return res
    .status(code)
    .json({ status: flag ? successLabel : failureLabel, msg });
};
