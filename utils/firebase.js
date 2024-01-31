import { getAuth } from "firebase-admin/auth";
import { firbaseApp } from "../firebase/firbase_config.js";

export const getUser = async (token) => {
  try {
    const { name, picture, email } = await getAuth(firbaseApp).verifyIdToken(
      token
    );
    return { name, picture, email };
  } catch (error) {
    console.error(error);
    return null;
  }
};
