import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_POSTS } from './data/blog.data';
import { INDUSTRY_PAGES } from './data/industries.data';
import { LOCATION_PAGES } from './data/locations.data';
import { CORE_TEAM_LEADS, TEAM_MEMBERS } from './data/members.data';
import { ALL_PROJECTS } from './data/projects.data';
import { SERVICE_PAGES } from './data/services.data';

const PROFILE_SLUGS = [...CORE_TEAM_LEADS, ...TEAM_MEMBERS].map((member) => member.slug);

export const serverRoutes: ServerRoute[] = [
  {
    path: 'profile/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PROFILE_SLUGS.map((slug) => ({ slug }));
    },
  },
  {
    path: 'services/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
    },
  },
  {
    path: 'industries/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return INDUSTRY_PAGES.map((page) => ({ slug: page.slug }));
    },
  },
  {
    path: 'locations/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return LOCATION_PAGES.map((page) => ({ slug: page.slug }));
    },
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOG_POSTS.map((post) => ({ slug: post.slug }));
    },
  },
  {
    path: 'case-studies/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ALL_PROJECTS.map((project) => ({ slug: project.id }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
