import admin from "firebase-admin";

import serviceAccount from "./admin_sdk_creds.json" assert { type: "json" };

export const firbaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
