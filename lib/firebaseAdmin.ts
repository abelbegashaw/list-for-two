import admin from "firebase-admin"

type FirebaseAdminConfig = {
  projectId: string
  clientEmail: string
  privateKey: string
  databaseURL: string
}

const getFirebaseConfig = (): FirebaseAdminConfig => {
  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  const databaseURL = process.env.FIREBASE_DATABASE_URL

  if (!projectId || !clientEmail || !privateKey || !databaseURL) {
    throw new Error("Missing Firebase admin environment variables.")
  }

  return {
    projectId,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
    databaseURL,
  }
}

const ensureFirebaseApp = () => {
  if (admin.apps.length) return
  const config = getFirebaseConfig()
  admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: config.databaseURL,
  })
}

export const getDatabase = () => {
  ensureFirebaseApp()
  return admin.database()
}
