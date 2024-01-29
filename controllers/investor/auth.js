import { PrismaClient } from "@prisma/client";
import { failureLabel, successLabel } from "../../constants.js";
import {
  ALREADY_EXISTS_CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESSFUL_RESOURCE_CREATION_CODE,
  SUCCESS_CODE,
  UNAUTHENTICATED_CODE,
} from "../../statusCodes.js";
import { getToken } from "../../utils/jwt.js";
import { AreSamePasswords, hashPassword } from "../../utils/password.js";

const prisma = new PrismaClient();

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  // Find if the user with same email already exists
  const existingInvestor = await prisma.investor.findFirst({
    where: { email: email },
  });

  // Investor with the email already exists
  if (existingInvestor)
    return res
      .status(ALREADY_EXISTS_CONFLICT_CODE)
      .json({ status: failureLabel, msg: "Investor already exists" });

  try {
    const hashedPassword = await hashPassword(password);

    // Adding the Investor and returning the response
    const newInvestor = await prisma.investor.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(SUCCESSFUL_RESOURCE_CREATION_CODE).json({
      status: successLabel,
      msg: "Investor Successfully Onboarded",
      id: newInvestor.id,
    });
  } catch (error) {
    // Internal Server Error
    console.error(error);

    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ status: failureLabel, msg: "Internal Server Error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;

  // Find if the user with same email already exists
  const existingInvestor = await prisma.investor.findFirst({
    where: { email: email },
  });

  if (!existingInvestor)
    return res
      .status(NOT_FOUND_CODE)
      .json({ status: failureLabel, msg: "Investor does not exist" });

  try {
    const passwordParity = await AreSamePasswords(
      password,
      existingInvestor.password
    );

    // Wrong Password
    if (!passwordParity)
      return res
        .status(UNAUTHENTICATED_CODE)
        .json({ status: failureLabel, msg: "Invalid Credentials" });

    // Password matches and hence send a JWT Token
    const jwtToken = getToken(email);
    return res
      .status(SUCCESS_CODE)
      .json({ status: successLabel, msg: "Authenticated", token: jwtToken });
  } catch (error) {
    // Internal Server Error
    console.error(error);

    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ status: failureLabel, msg: "Internal Server Error" });
  }
};
