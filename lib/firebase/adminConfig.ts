export function isFirebaseAdminConfigured(): boolean {
  const jsonKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (jsonKey) {
    try {
      const parsed = JSON.parse(jsonKey) as {
        project_id?: string;
        client_email?: string;
        private_key?: string;
      };
      return Boolean(parsed.project_id && parsed.client_email && parsed.private_key);
    } catch {
      return false;
    }
  }

  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}
