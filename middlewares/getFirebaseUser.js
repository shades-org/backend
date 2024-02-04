import {
  AUTH_TOKEN_HEADER_LABEL_PITCHERS,
  failureLabel,
} from "../constants.js";
import { UNAUTHENTICATED_CODE } from "../statusCodes.js";
import { getUser } from "../utils/firebase.js";

export const getFirebaseUser = async (req, res, next) => {
  // Fetching the Token from headers
  const idToken = req.headers[AUTH_TOKEN_HEADER_LABEL_PITCHERS];

  if (!idToken)
    return res
      .status(UNAUTHENTICATED_CODE)
      .json({ status: failureLabel, msg: "Id Token Missing" });

  const userObj = await getUser(idToken);

  if (!userObj)
    return res
      .status(UNAUTHENTICATED_CODE)
      .json({ status: failureLabel, msg: "Invalid Id Token" });

  req.user = userObj;
  next();
};
