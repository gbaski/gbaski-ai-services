import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const membersDataPath = path.join(root, 'src/app/data/members.data.ts');
const membersData = fs.readFileSync(membersDataPath, 'utf8');
const memberSlugs = [...membersData.matchAll(/\bslug:\s*'([^']+)'/g)].map((match) => match[1]);

if (memberSlugs.length === 0) {
  throw new Error(`No member slugs found in ${membersDataPath}`);
}

const routes = ['/', ...memberSlugs.map((slug) => `/profile/${slug}`)];

fs.writeFileSync(path.join(root, 'scripts', 'prerender-routes.txt'), `${routes.join('\n')}\n`);
console.log(`Generated scripts/prerender-routes.txt with ${routes.length} routes`);
