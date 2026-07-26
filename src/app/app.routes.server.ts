import { RenderMode, ServerRoute } from '@angular/ssr';
import { CORE_TEAM_LEADS, TEAM_MEMBERS } from './data/members.data';

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
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
