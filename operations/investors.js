import { PrismaClient } from "@prisma/client";
import {
  ALREADY_EXISTS_CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESSFUL_RESOURCE_CREATION_CODE,
  SUCCESS_CODE,
  UNAUTHENTICATED_CODE,
} from "../statusCodes.js";
import { getToken } from "../utils/jwt.js";
import { AreSamePasswords, hashPassword } from "../utils/password.js";

const prisma = new PrismaClient();

/**
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {promise} [flag, msg, code]
 *
 * Function for Investor Onboard (Sign Up)
 */

export const onboardInvestor = async (email, password) => {
  // Find if the user with same email already exists
  const existingInvestor = await prisma.investor.findFirst({
    where: { email: email },
  });

  // Investor already exists
  if (existingInvestor)
    return [false, "Investor already exists", ALREADY_EXISTS_CONFLICT_CODE];

  try {
    const hashedPassword = await hashPassword(password);

    // Adding the Investor and returning the response
    const newInvestor = await prisma.investor.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return [
      true,
      "Investor Successfully Onboarded",
      SUCCESSFUL_RESOURCE_CREATION_CODE,
    ];
  } catch (error) {
    // Internal Server Error
    console.log(error);
    return [false, "Internal Server Error", INTERNAL_SERVER_ERROR_CODE];
  }
};

/**
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {promise} [flag, msg, code, token]
 *
 * Function for Investor Log In
 */
export const loginInvestor = async (email, password) => {
  // Find if the user with same email already exists
  const existingInvestor = await prisma.investor.findFirst({
    where: { email: email },
  });

  // No such Investor found
  if (!existingInvestor)
    return [false, "Investor does not exist", NOT_FOUND_CODE, null];

  try {
    const passwordParity = await AreSamePasswords(
      password,
      existingInvestor.password
    );

    // Wrong password
    if (!passwordParity)
      return [false, "Invalid Credentials", UNAUTHENTICATED_CODE, null];

    const token = getToken(email);

    return [true, "Authenticated", SUCCESS_CODE, token];
  } catch (error) {
    // Internal Server Error
    console.log(error);
    return [false, "Internal Server Error", INTERNAL_SERVER_ERROR_CODE, null];
  }
};
