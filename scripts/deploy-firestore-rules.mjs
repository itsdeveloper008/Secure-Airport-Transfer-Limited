import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const i = line.indexOf('=');
      return [line.slice(0, i), line.slice(i + 1).replace(/^"|"$/g, '')];
    }),
);

const projectId = env.FIREBASE_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
if (!projectId || !env.FIREBASE_CLIENT_EMAIL || !env.FIREBASE_PRIVATE_KEY) {
  console.error('Missing Firebase Admin credentials in .env.local');
  process.exit(1);
}

const keyPath = join(tmpdir(), `satl-sa-${Date.now()}.json`);
writeFileSync(
  keyPath,
  JSON.stringify({
    type: 'service_account',
    project_id: projectId,
    client_email: env.FIREBASE_CLIENT_EMAIL,
    private_key: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
);

try {
  execSync(`firebase deploy --only firestore:rules --project ${projectId} --non-interactive`, {
    stdio: 'inherit',
    env: { ...process.env, GOOGLE_APPLICATION_CREDENTIALS: keyPath },
  });
  console.log('Firestore rules deployed successfully.');
} finally {
  unlinkSync(keyPath);
}
