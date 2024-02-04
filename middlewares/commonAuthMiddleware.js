import {
  AUTH_TOKEN_HEADER_LABEL_INVESTORS,
  AUTH_TOKEN_HEADER_LABEL_PITCHERS,
  failureLabel,
  investorLabel,
  pitcherLabel,
} from "../constants.js";
import {
  INTERNAL_SERVER_ERROR_CODE,
  UNAUTHENTICATED_CODE,
} from "../statusCodes.js";
import { getUser } from "../utils/firebase.js";
import { verifyToken } from "../utils/jwt.js";

export const commonAuthMiddleware = async (req, res, next) => {
  // Fetching the Token from headers
  const authTokenPitchers = req.headers[AUTH_TOKEN_HEADER_LABEL_PITCHERS];
  const authTokenInvestors = req.headers[AUTH_TOKEN_HEADER_LABEL_INVESTORS];
  let authFlag = false;

  if (!authTokenInvestors && !authTokenPitchers)
    return res
      .status(UNAUTHENTICATED_CODE)
      .json({ status: failureLabel, msg: "Auth Token Missing" });

  if (authTokenInvestors && authTokenPitchers)
    return res.status(UNAUTHENTICATED_CODE).json({
      status: failureLabel,
      msg: "Only 1 Auth Token is permissible at once",
    });

  try {
    if (authTokenPitchers) {
      const firebaseUser = await getUser(authTokenPitchers);
      if (firebaseUser) {
        req.user = firebaseUser;
        req.role = pitcherLabel;
        authFlag = true;
        next();
      }
    } else {
      const authTokenInvestor = verifyToken(authTokenInvestors);
      if (authTokenInvestor) {
        req.user = authTokenInvestor;
        req.role = investorLabel;
        authFlag = true;
        next();
      }
    }

    if (!authFlag)
      return res
        .status(UNAUTHENTICATED_CODE)
        .json({ status: failureLabel, msg: "Invalid Token" });
  } catch (error) {
    return res.status(UNAUTHENTICATED_CODE).json({
      status: failureLabel,
      msg: "Auth Error.. Try again with correct Token",
    });
  }
};
