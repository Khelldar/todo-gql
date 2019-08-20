import { execSync } from 'child_process';

export function migrate() {
  try {
    execSync(`npx db-migrate --env=local up`, { stdio: 'inherit' });
  } catch (e) {
    console.log('there was an error running db migrations:');
    console.log(e);
    process.exit(1);
  }
}
