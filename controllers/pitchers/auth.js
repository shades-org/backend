import { PrismaClient } from "@prisma/client";
import { failureLabel, successLabel } from "../../constants.js";
import {
  ALREADY_EXISTS_CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESSFUL_RESOURCE_CREATION_CODE,
  SUCCESS_CODE,
} from "../../statusCodes.js";
import { getUser } from "../../utils/firebase.js";

const prisma = new PrismaClient();

export const isPitcherRegistered = async (req, res) => {
  // Find by email in Prisma
  const existingPitcher = await prisma.pitcher.findFirst({
    where: {
      email: req.user.email,
    },
  });

  if (existingPitcher)
    return res
      .status(SUCCESS_CODE)
      .json({ status: successLabel, msg: "User registered" });
  else
    return res
      .status(NOT_FOUND_CODE)
      .json({ status: failureLabel, msg: "User is not registered" });
};

export const registerPitcher = async (req, res) => {
  // destructuring the Request Object
  const { name, dob, phoneNumber, profilePic, profileVideo, bio, links } =
    req.body;

  const parsedDob = new Date(dob);

  // Find by email in Prisma
  const existingPitcher = await prisma.pitcher.findFirst({
    where: {
      email: req.user.email,
    },
  });

  if (existingPitcher)
    return res
      .status(ALREADY_EXISTS_CONFLICT_CODE)
      .json({ status: failureLabel, msg: "User already registered" });

  try {
    const newPitcher = await prisma.pitcher.create({
      data: {
        email: req.user.email,
        name,
        dob: parsedDob,
        phoneNumber,
        profilePic,
        profileVideo,
        bio,
        links,
      },
    });

    return res
      .status(SUCCESSFUL_RESOURCE_CREATION_CODE)
      .json({ status: successLabel, msg: "Pitcher Successfully Registered" });
  } catch (error) {
    console.error(error);
    return res
      .status(INTERNAL_SERVER_ERROR_CODE)
      .json({ status: failureLabel, msg: "Internal Server Error" });
  }
};
