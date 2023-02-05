"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseDB = exports.adminAuth = exports.auth = exports.defaultAuth = exports.defaultApp = void 0;
const admin = __importStar(require("firebase-admin"));
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config();
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
exports.defaultApp = admin.initializeApp(firebaseConfig);
exports.defaultAuth = getAuth(exports.defaultApp);
exports.auth = getAuth();
exports.adminAuth = admin.auth();
exports.firebaseDB = exports.defaultApp.firestore();
