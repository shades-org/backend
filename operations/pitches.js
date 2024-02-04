import { PrismaClient } from "@prisma/client";
import { pitcherLabel } from "../constants.js";
import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_FOUND_CODE,
  SUCCESSFUL_RESOURCE_CREATION_CODE,
  SUCCESS_CODE,
} from "../statusCodes.js";

const prisma = new PrismaClient();

export const getPitchesOps = async (email, role) => {
  try {
    if (role === pitcherLabel) {
      const existingPitcher = await prisma.pitcher.findFirst({
        where: { email },
      });

      if (!existingPitcher) {
        return [false, "Pitcher Not Found", NOT_FOUND_CODE];
      }

      const pitchMapInstances = await prisma.pitcher_Pitch_Map.findMany({
        where: { pitcherId: existingPitcher.id },
      });

      const pitchRes = [];

      for (let pitchMapInstance of pitchMapInstances) {
        const pitchInstance = await prisma.pitch.findFirst({
          where: { id: pitchMapInstance.pitchId },
          include: { FoundingTeamMembers: true },
        });

        pitchRes.push(pitchInstance);
      }

      console.log(pitchRes);
      return [true, "Success", SUCCESS_CODE, pitchRes];
    } else {
      const pitches = await prisma.pitch.findMany({
        include: { FoundingTeamMembers: true },
      });

      return [true, "Success", SUCCESS_CODE, pitches];
    }
  } catch (error) {
    console.log(error);
    return [false, "Internal Server Error", INTERNAL_SERVER_ERROR_CODE, null];
  }
};

export const createPitchOps = async (email, pitchObj) => {
  const {
    name,
    tagline,
    description,
    logoURL,
    videoURL,
    imageURL,
    turnover,
    tags,
    links,
    founders,
  } = pitchObj;

  try {
    const existingPitcher = await prisma.pitcher.findFirst({
      where: {
        email,
      },
    });

    if (!existingPitcher) {
      return [false, "Pitcher Not Found", NOT_FOUND_CODE];
    }

    const newPitch = await prisma.pitch.create({
      data: {
        name,
        tagline,
        description,
        logoURL,
        videoURL,
        imageURL,
        turnover: parseFloat(turnover),
        tags,
        links,
        last_modified_at: new Date(),
      },
    });

    console.log(newPitch);
    const newPitcherPitchMap = await prisma.pitcher_Pitch_Map.create({
      data: {
        pitcherId: existingPitcher.id,
        pitchId: newPitch.id,
      },
    });

    for (let founder of founders) {
      let foundingTeamMember = await prisma.foundingTeamMember.create({
        data: {
          pitchId: newPitch.id,
          name: founder.name,
          imageURL: founder.imageURL,
          designation: founder.designation,
          portfolioLink: founder.portfolioLink,
        },
      });
    }

    return [
      true,
      "Pitch Created Successfully",
      SUCCESSFUL_RESOURCE_CREATION_CODE,
    ];
  } catch (error) {
    console.log(error);
    return [false, "Internal Server Error", INTERNAL_SERVER_ERROR_CODE];
  }
};
