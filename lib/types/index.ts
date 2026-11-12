export type Locale = 'en' | 'hi' | 'gu';

export type CommunityType =
  | 'Hindu'
  | 'Muslim'
  | 'Sikh'
  | 'Christian'
  | 'Jain'
  | 'Buddhist'
  | 'Parsi'
  | 'Tribal & Indigenous'
  | 'Secular & National';

export type FestivalCategory =
  | 'Harvest & Agricultural'
  | 'Spiritual & Devotional'
  | 'Seasonal & New Year'
  | 'National & Patriotic'
  | 'Cultural & Folk';

export type ContentStatus =
  | 'Draft'
  | 'In Research'
  | 'Fact Check'
  | 'Translation Pending'
  | 'Cultural Review'
  | 'Approved'
  | 'Published'
  | 'Archived';

export interface SourceCitation {
  id: string;
  title: string;
  publisherOrInstitution: string;
  type: 'Government' | 'Academic' | 'Religious Institution' | 'Museum/Archive' | 'Reputable Editorial';
  url?: string;
  accessDate?: string;
  notes?: string;
}

export interface RegionalObservance {
  regionOrState: string;
  variationName?: string;
  distinctCustoms: string[];
  calendarSystem?: string; // e.g. Vikram Samvat, Shaka Samvat, Nanakshahi, Hijri, Gregorian
  tithiOrPanchang?: string;
  muhuratVerified?: string;
  notes?: string;
}

export interface FestivalOccurrence {
  id: string;
  festivalSlug: string;
  year: number;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string;   // ISO YYYY-MM-DD
  primaryDate: string; // Main celebration day
  regionalObservances: RegionalObservance[];
  verifiedSources: SourceCitation[];
  lastVerifiedDate: string;
  isHistorical?: boolean;
  isVerified?: boolean;
}

export interface Festival {
  id: string;
  slug: string;
  title: {
    en: string;
    hi: string;
    gu: string;
  };
  shortSummary: {
    en: string;
    hi: string;
    gu: string;
  };
  whyCelebrated: {
    en: string;
    hi: string;
    gu: string;
  };
  historyAndSignificance: {
    en: string;
    hi: string;
    gu: string;
  };
  ritualsAndCustoms: {
    en: string;
    hi: string;
    gu: string;
  };
  traditionalFoods: string[];
  category: FestivalCategory;
  communities: CommunityType[];
  statesCovered: string[];
  heroImage: {
    url: string;
    alt: string;
    caption: string;
    license: string;
    credit: string;
  };
  decorationIdeas: {
    en: string[];
    hi: string[];
    gu: string[];
  };
  faqs: Array<{
    question: { en: string; hi: string; gu: string };
    answer: { en: string; hi: string; gu: string };
  }>;
  status: ContentStatus;
  sources: SourceCitation[];
  lastVerifiedDate: string;
  isPopular?: boolean;
}

export interface StateUTData {
  id: string;
  name: { en: string; hi: string; gu: string };
  code: string;
  capital: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  majorFestivals: string[]; // slugs
  traditionalFolkArts: Array<{
    name: string;
    type: 'Dance' | 'Music' | 'Craft' | 'Painting';
    description: string;
  }>;
  famousDishes: string[];
  passportBadge: {
    id: string;
    title: string;
    icon: string;
    criteria: string;
  };
}

export interface RecipeIngredient {
  name: { en: string; hi: string; gu: string };
  amount: number;
  unit: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: { en: string; hi: string; gu: string };
  festivalSlug: string;
  region: string;
  dietaryType: 'Vegetarian' | 'Vegan' | 'Sattvic' | 'Prasad' | 'Traditional';
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  defaultServings: number;
  ingredients: RecipeIngredient[];
  instructions: Array<{
    stepNumber: number;
    text: { en: string; hi: string; gu: string };
    timerSeconds?: number;
    tip?: string;
  }>;
  culturalStory: { en: string; hi: string; gu: string };
  sources: SourceCitation[];
}

export interface CulturalStory {
  id: string;
  slug: string;
  title: { en: string; hi: string; gu: string };
  category: 'Art & Craft' | 'Music & Dance' | 'Textiles' | 'Architecture' | 'Folklore';
  region: string;
  readingTimeMinutes: number;
  body: { en: string; hi: string; gu: string };
  heroImage: {
    url: string;
    credit: string;
    license: string;
  };
  verifiedSources: SourceCitation[];
  publishedDate: string;
}

export interface QuizQuestion {
  id: string;
  question: { en: string; hi: string; gu: string };
  options: {
    en: string[];
    hi: string[];
    gu: string[];
  };
  correctOptionIndex: number;
  explanation: { en: string; hi: string; gu: string };
  historicalCitation: string;
  category: 'Festival' | 'Food' | 'Geography' | 'Tradition' | 'WordHunt';
  difficulty: 'Easy' | 'Medium' | 'Challenging';
}

export interface CommunityCorrectionReport {
  id: string;
  contentCategory: 'Festival Date' | 'Cultural Fact' | 'Translation Nuance' | 'Regional Variation' | 'Attribution';
  targetSlug: string;
  userEmail?: string;
  proposedCorrection: string;
  sourceCitationProvided: string;
  status: 'Pending Review' | 'Accepted' | 'Rejected';
  adminNotes?: string;
  submittedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'SuperAdmin' | 'ChiefEditor' | 'FactChecker' | 'Translator';
  passwordHash: string;
  createdAt: string;
}

