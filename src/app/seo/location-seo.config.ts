/** Standard search intents paired with city pages (Lagos, Abuja, etc.) */
export const LOCATION_SEARCH_INTENTS = [
  'AI services',
  'AI platforms',
  'AI integrations',
  'best AI services',
  'best AI platforms',
  'best AI services companies',
] as const;

export interface ServiceCity {
  name: string;
  state: string;
  label: string;
}

/** Primary cities for local SEO (Lagos, Abuja) */
export const PRIMARY_SERVICE_CITIES: ServiceCity[] = [
  { name: 'Lagos', state: 'Lagos State', label: 'Lagos, Nigeria' },
  { name: 'Abuja', state: 'Federal Capital Territory', label: 'Abuja, Nigeria' },
];

/** Additional states served beyond primary cities */
export const ADDITIONAL_SERVICE_STATES = [
  'Rivers',
  'Oyo',
  'Kano',
  'Enugu',
  'Delta',
  'Ogun',
  'Kaduna',
] as const;

export const SERVICE_AREAS_DISPLAY =
  'Lagos, Abuja, Port Harcourt, Ibadan, Kano, Enugu, and nationwide';

export function buildLocationMetaKeywords(): string[] {
  const keywords: string[] = [
    'AI services in Nigeria',
    'best AI services in Nigeria',
    'AI automation in Nigeria',
  ];

  for (const city of PRIMARY_SERVICE_CITIES) {
    for (const intent of LOCATION_SEARCH_INTENTS) {
      keywords.push(`${intent} in ${city.label}`);
      keywords.push(`${intent} ${city.label}`);
    }
  }

  for (const state of ADDITIONAL_SERVICE_STATES) {
    keywords.push(`AI services in ${state}, Nigeria`);
    keywords.push(`AI platforms in ${state}, Nigeria`);
    keywords.push(`AI integrations in ${state}, Nigeria`);
  }

  return keywords;
}

export function buildSchemaAreaServed(): Array<Record<string, unknown>> {
  const cities = PRIMARY_SERVICE_CITIES.map((city) => ({
    '@type': 'City',
    name: city.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: city.state,
      containedInPlace: {
        '@type': 'Country',
        name: 'Nigeria',
      },
    },
  }));

  return [
    ...cities,
    {
      '@type': 'Country',
      name: 'Nigeria',
    },
  ];
}

export function buildLocationServiceAnswer(city: ServiceCity): string {
  return (
    `Yes. Gbaski AI Services provides AI services, platforms, and integrations for businesses in ${city.label}. ` +
    `We deliver automation, chatbot and WhatsApp integration, voice assistants, custom AI agents, and CRM workflows built for production.`
  );
}
