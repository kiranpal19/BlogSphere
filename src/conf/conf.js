function normalize(value) {
  let v = (value ?? "").toString().trim();
  // Strip wrapping quotes if present in .env (e.g., "https://...")
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

const conf = {
  // Expect a full URL as provided by Appwrite Console (including /v1)
  appwriteUrl: normalize(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: normalize(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: normalize(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: normalize(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: normalize(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;