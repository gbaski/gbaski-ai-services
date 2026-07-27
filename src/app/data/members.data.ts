import { SITE_NAME, SITE_URL } from '../seo/site-seo.config';

export interface TeamMember {
  slug: string;
  name: string;
  linkedIn?: string;
  upwork?: string;
  photo?: string;
  jobTitle?: string;
}

export type MemberPhotoContext = 'hero' | 'profile' | 'carousel' | 'avatar';

function linkedIn(url: string): string {
  return url.startsWith('http') ? url : `https://${url.replace(/^\/+/, '')}`;
}

/** Agency leads included on every project collaborator list. */
export const CORE_TEAM_LEADS: TeamMember[] = [
  {
    slug: 'mariam-erhabor',
    name: 'Mariam Erhabor',
    jobTitle: 'AI Automation Engineer',
    linkedIn: linkedIn('https://www.linkedin.com/in/mariamerhabor4325/'),
    photo: '/assets/team/mariam-erhabor.png',
  },
  {
    slug: 'wuyi-adepoju',
    name: 'Wuyi Adepoju',
    jobTitle: 'AI Solutions Engineer',
    linkedIn: linkedIn('https://www.linkedin.com/in/wuyi-adepoju-75421453/'),
    upwork: 'https://www.upwork.com/freelancers/wuyiadepoju',
    photo: '/assets/team/wuyi-adepoju.png',
  },
];

export const CORE_TEAM_LEAD_SLUGS = CORE_TEAM_LEADS.map((member) => member.slug);

/** Extended delivery team shown in the home carousel. */
export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: 'chijioke-ogbonna',
    name: 'Chijioke Ogbonna',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/ogbonnachijioke'),
    photo: '/assets/members/Chijioke-Ogbonna.jpeg',
  },
  {
    slug: 'tony-imunmolen',
    name: 'Tony Imunmolen',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/tony-imunmolen-83550820a'),
    photo: '/assets/members/Tony-Imunmolen.png',
  },
  {
    slug: 'oluwatobiloba-fatunsin',
    name: 'Oluwatobiloba Fatunsin',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/oluwatobiloba-fatunsin/'),
    photo: '/assets/members/Oluwatobiloba-Fatunsin.png',
  },
  {
    slug: 'opeyemi-awe',
    name: 'Opeyemi Awe',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/aweopeyemi/'),
    photo: '/assets/members/Opeyemi-Awe.png',
  },
  {
    slug: 'ayinla-rukayat-temitope',
    name: 'Ayinla Rukayat Temitope',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/rukayat-ayinla'),
    photo: '/assets/members/Ayinla-Rukayat-Temitope.png',
  },
  {
    slug: 'boluwatife-quadri',
    name: 'Boluwatife Quadri',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/tifeblaze/'),
    photo: '/assets/members/Boluwatife-Quadri.png',
  },
  {
    slug: 'eneojo-ochimana',
    name: 'Eneojo Ochimana',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://linkedin.com/in/eneojo'),
    photo: '/assets/members/Eneojo-Ochimana.png',
  },
  {
    slug: 'nnadi-ngozi-chizoma',
    name: 'Nnadi Ngozi Chizoma',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/ngozichizomannadi'),
    photo: '/assets/members/Nnadi-Ngozi-Chizoma.png',
  },
  {
    slug: 'kosisochukwu-nebolisa',
    name: 'Kosisochukwu Nebolisa',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/kosisochukwu-nebolisa-ba8559254'),
    photo: '/assets/members/Kosisochukwu-Nebolisa.png',
  },
  {
    slug: 'jude-baba',
    name: 'Jude Baba',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://www.linkedin.com/in/judemikebaba04'),
    photo: '/assets/members/Jude-Baba.png',
  },
  {
    slug: 'valiant-ezabuku-adiru',
    name: 'Valiant Ezabuku Adiru',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('https://linkedin.com/in/valiant-ezabuku/'),
    photo: '/assets/members/Valiant-Ezabuku-Adiru.png',
  },
  {
    slug: 'flora-etteh',
    name: 'Flora Etteh',
    jobTitle: 'AI Delivery Team Member',
    linkedIn: linkedIn('www.linkedin.com/in/flora-etteh'),
    photo: '/assets/members/Flora-Etteh.png',
  },
];

export const HERO_TEAM_LEAD_PRESENTATION: Record<
  string,
  { anchorId: string; accent: 'aws' | 'loubby'; credential?: string; focusAreas: readonly string[] }
> = {
  'mariam-erhabor': {
    anchorId: 'team-lead-mariam',
    accent: 'loubby',
    credential: 'Loubby AI Trained',
    focusAreas: ['n8n', 'Workflow Automation', 'Conversational AI'],
  },
  'wuyi-adepoju': {
    anchorId: 'team-lead-wuyi',
    accent: 'aws',
    credential: 'AWS AI Certified',
    focusAreas: ['Golang Backend', 'n8n', 'API Integration'],
  },
};

export type HeroTeamLead = TeamMember & {
  anchorId: string;
  accent: 'aws' | 'loubby';
  credential?: string;
  focusAreas: readonly string[];
};

export function getHeroTeamLeads(): HeroTeamLead[] {
  return CORE_TEAM_LEADS.map((member) => ({
    ...member, ...HERO_TEAM_LEAD_PRESENTATION[member.slug],
  }));
}

/** Extra collaborators per project (excluding profile owner and core leads). */
export const PROJECT_EXTRA_COLLABORATOR_SLUGS: Record<string, readonly string[]> = {
  'rented123-ai-assistant': ['chijioke-ogbonna', 'tony-imunmolen', 'oluwatobiloba-fatunsin'],
  'tai-librechat': ['opeyemi-awe', 'ayinla-rukayat-temitope'],
  'gbaski-ai-chat': [
    'eneojo-ochimana',
    'nnadi-ngozi-chizoma',
    'kosisochukwu-nebolisa',
    'jude-baba',
    'valiant-ezabuku-adiru',
  ],
  'sisi-safe-calculator': [],
};

const MEMBER_DIRECTORY: TeamMember[] = [...CORE_TEAM_LEADS, ...TEAM_MEMBERS];

export function getMemberBySlug(slug: string): TeamMember | undefined {
  return MEMBER_DIRECTORY.find((member) => member.slug === slug);
}

export function memberProfilePath(slug: string): string {
  return `/profile/${slug}`;
}

export function memberProfileUrl(slug: string): string {
  return `${SITE_URL}${memberProfilePath(slug)}`;
}

export function memberPhotoAbsoluteUrl(photo: string): string {
  if (photo.startsWith('http')) {
    return photo;
  }

  return `${SITE_URL}${photo.startsWith('/') ? photo : `/${photo}`}`;
}

export function memberRoleLabel(member: Pick<TeamMember, 'name' | 'jobTitle'>): string {
  return member.jobTitle ? `${member.jobTitle} at ${SITE_NAME}` : `${SITE_NAME} team member`;
}

export function memberPhotoAlt(
  member: Pick<TeamMember, 'name' | 'jobTitle'>,
  context: MemberPhotoContext = 'carousel',
): string {
  const role = memberRoleLabel(member);

  switch (context) {
    case 'hero':
      return `Portrait photo of ${member.name}, ${role}`;
    case 'profile':
      return `${member.name}, ${role}, professional headshot`;
    case 'avatar':
      return `${member.name}, ${SITE_NAME}`;
    default:
      return `${member.name}, ${role}`;
  }
}

export function memberPageDescription(member: TeamMember): string {
  const role = member.jobTitle ?? 'team member';
  return `${member.name} is ${role.startsWith('AI') ? 'an' : 'a'} ${role} at ${SITE_NAME}, building AI automation, chatbots, and agents for businesses in Nigeria.`;
}

export function buildMemberPersonJsonLd(member: TeamMember): Record<string, unknown> {
  const profileUrl = memberProfileUrl(member.slug);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${profileUrl}#person`,
    name: member.name,
    jobTitle: member.jobTitle,
    image: member.photo ? memberPhotoAbsoluteUrl(member.photo) : undefined,
    url: profileUrl,
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    sameAs: member.linkedIn ? [member.linkedIn] : undefined,
  };
}

export function buildTeamMembersItemListJsonLd(members: TeamMember[]): Record<string, unknown> {
  const withPhotos = members.filter((member): member is TeamMember & { photo: string } => Boolean(member.photo));

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${SITE_NAME} team`,
    itemListElement: withPhotos.map((member, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: member.name,
        jobTitle: member.jobTitle,
        image: memberPhotoAbsoluteUrl(member.photo),
        url: memberProfileUrl(member.slug),
        worksFor: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    })),
  };
}

export function getProjectCollaborators(projectId: string, profileOwnerSlug: string): TeamMember[] {
  const extraSlugs = PROJECT_EXTRA_COLLABORATOR_SLUGS[projectId] ?? [];
  const orderedSlugs = [profileOwnerSlug, ...CORE_TEAM_LEAD_SLUGS, ...extraSlugs];
  const seen = new Set<string>();
  const collaborators: TeamMember[] = [];

  for (const slug of orderedSlugs) {
    if (seen.has(slug)) {
      continue;
    }

    const member = getMemberBySlug(slug);
    if (!member) {
      continue;
    }

    seen.add(slug);
    collaborators.push(member);
  }

  return collaborators;
}

function shuffleCopy<T>(items: readonly T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function pickRandomTeamMembers(count: number): Array<{
  name: string;
  photo: string;
  slug: string;
  jobTitle?: string;
}> {
  const candidates = TEAM_MEMBERS.filter(
    (member): member is TeamMember & { photo: string } => Boolean(member.photo),
  );

  return shuffleCopy(candidates)
    .slice(0, Math.min(count, candidates.length))
    .map(({ name, photo, slug, jobTitle }) => ({ name, photo, slug, jobTitle }));
}

export function memberInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function allTeamMembersWithPhotos(): TeamMember[] {
  return MEMBER_DIRECTORY.filter((member): member is TeamMember & { photo: string } => Boolean(member.photo));
}
