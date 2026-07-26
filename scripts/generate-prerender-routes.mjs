import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function extractSlugs(filePath, regex) {
  const content = fs.readFileSync(filePath, 'utf8');
  return [...content.matchAll(regex)].map((match) => match[1]);
}

const memberSlugs = extractSlugs(
  path.join(root, 'src/app/data/members.data.ts'),
  /\bslug:\s*'([^']+)'/g,
);
const serviceSlugs = extractSlugs(
  path.join(root, 'src/app/data/services.data.ts'),
  /\bslug:\s*'([^']+)'/g,
);
const industrySlugs = extractSlugs(
  path.join(root, 'src/app/data/industries.data.ts'),
  /\bslug:\s*'([^']+)'/g,
);
const locationSlugs = extractSlugs(
  path.join(root, 'src/app/data/locations.data.ts'),
  /\bslug:\s*'([^']+)'/g,
);
const blogSlugs = extractSlugs(
  path.join(root, 'src/app/data/blog.data.ts'),
  /\bslug:\s*"([^"]+)"/g,
);
const projectIds = extractSlugs(
  path.join(root, 'src/app/data/projects.data.ts'),
  /\bid:\s*'([^']+)'/g,
).filter((id) => !['chat-integration', 'ai-automation'].includes(id));

const staticRoutes = [
  '/',
  '/services',
  '/industries',
  '/locations',
  '/blog',
  '/case-studies',
  '/about',
  '/contact',
  '/resources',
  '/404',
];

const routes = [
  ...staticRoutes,
  ...memberSlugs.map((slug) => `/profile/${slug}`),
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  ...industrySlugs.map((slug) => `/industries/${slug}`),
  ...locationSlugs.map((slug) => `/locations/${slug}`),
  ...blogSlugs.map((slug) => `/blog/${slug}`),
  ...projectIds.map((id) => `/case-studies/${id}`),
];

const uniqueRoutes = [...new Set(routes)];

fs.writeFileSync(path.join(root, 'scripts', 'prerender-routes.txt'), `${uniqueRoutes.join('\n')}\n`);

const today = new Date().toISOString().slice(0, 10);
const urlEntries = uniqueRoutes
  .filter((route) => route !== '/404')
  .map((route) => {
    const loc = `https://ai-services.com.ng${route === '/' ? '/' : route}`;
    const priority =
      route === '/'
        ? '1.0'
        : route.startsWith('/services/')
          ? '0.9'
          : route.startsWith('/blog/')
            ? '0.6'
            : '0.7';
    const changefreq = route.startsWith('/blog/') ? 'monthly' : 'weekly';
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap);

console.log(
  `Generated ${uniqueRoutes.length} prerender routes and sitemap with ${uniqueRoutes.length - 1} URLs`,
);
