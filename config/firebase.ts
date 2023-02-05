import * as admin from "firebase-admin";
const { getAuth } = require('firebase-admin/auth');

require('dotenv').config()

const firebaseConfig = {
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
    clientEmail: process.env.CLIENT_EMAIL
  }),
  serviceAccountId: "firebase-adminsdk-p2sm9@air-quality-monitor-f1057.iam.gserviceaccount.com",
  databaseURL: "https://air-quality-monitor-d4ec1-default-rtdb.europe-west1.firebasedatabase.app"
};

export const defaultApp = admin.initializeApp(firebaseConfig);
export const defaultAuth = getAuth(defaultApp);

export const auth = getAuth();
export const adminAuth = admin.auth();
export const firebaseDB = defaultApp.firestore();