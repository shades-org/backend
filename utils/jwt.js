import jwt from "jsonwebtoken";
import { accessTokenSecret, jwtTokenExpirationDuration } from "../constants.js";

export const getToken = (email) =>
  jwt.sign({ email }, accessTokenSecret, {
    expiresIn: jwtTokenExpirationDuration,
  });

export const verifyToken = (token) => {
  try {
    const decodedToken = jwt.decode(token, accessTokenSecret);
    if (!decodedToken) return null;

    return { email: decodedToken.email };
  } catch (error) {
    console.log(error);
    return null;
  }
};
