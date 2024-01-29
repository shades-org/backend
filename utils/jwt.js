import jwt from "jsonwebtoken";
import { accessTokenSecret, jwtTokenExpirationDuration } from "../constants.js";

export const getToken = (email) =>
  jwt.sign({ email }, accessTokenSecret, {
    expiresIn: jwtTokenExpirationDuration,
  });
