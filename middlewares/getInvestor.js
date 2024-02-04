import { AUTH_TOKEN_HEADER_LABEL_INVESTORS } from "../constants.js";
import { verifyToken } from "../utils/jwt.js";

export const getInvestor = async (req, res, next) => {
  // Fetching the Token from headers
  const idToken = req.headers[AUTH_TOKEN_HEADER_LABEL_INVESTORS];

  if (!idToken)
    return res
      .status(UNAUTHENTICATED_CODE)
      .json({ status: failureLabel, msg: "Id Token Missing" });

  const userObj = verifyToken(idToken);

  if (!userObj)
    return res
      .status(UNAUTHENTICATED_CODE)
      .json({ status: failureLabel, msg: "Invalid Id Token" });

  req.user = userObj;
  next();
};
