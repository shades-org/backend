import { PrismaClient } from "@prisma/client";
import {
  ALREADY_EXISTS_CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESSFUL_RESOURCE_CREATION_CODE,
  SUCCESS_CODE,
} from "../statusCodes.js";

const prisma = new PrismaClient();

/**
 *
 * @param {string} email
 *
 * @returns {prosmise} [flag, msg, code]
 *
 * Function to check wheter a Pitcher is Registered or not
 */
export const getPitcherRegistrationStatus = async (email) => {
  // Find by email in Prisma
  const existingPitcher = await prisma.pitcher.findFirst({
    where: {
      email: email,
    },
  });

  if (existingPitcher) return [true, "User Registered", SUCCESS_CODE];
  else return [false, "User is not registered", NOT_FOUND_CODE];
};

/**
 *
 * @param {object} pitcherObj
 * @param {string} email
 *
 * @returns {promise} [flag, msg, code]
 *
 * Function for Pitcher Registration
 */
export const registerPitcherOps = async (pitcherObj, email) => {
  // Destructuring the Object
  const { name, dob, phoneNumber, profilePic, profileVideo, bio, links } =
    pitcherObj;

  // Getting the Date Object from string
  const parsedDob = new Date(dob);

  // Find by email in Prisma
  const existingPitcher = await prisma.pitcher.findFirst({
    where: {
      email,
    },
  });

  // Pitcher already exists
  if (existingPitcher)
    return [false, "User already registered", ALREADY_EXISTS_CONFLICT_CODE];

  try {
    // Creating new Pitcher
    const newPitcher = await prisma.pitcher.create({
      data: {
        email,
        name,
        dob: parsedDob,
        phoneNumber,
        profilePic,
        profileVideo,
        bio,
        links,
      },
    });

    return [
      true,
      "Pitcher Successfully Registered",
      SUCCESSFUL_RESOURCE_CREATION_CODE,
    ];
  } catch (error) {
    // Internal Server Error
    console.log(error);
    return [false, "Internal Server Error", INTERNAL_SERVER_ERROR_CODE];
  }
};
