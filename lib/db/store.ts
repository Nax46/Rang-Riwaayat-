import { connectToDatabase } from './connect';
import { FestivalModel, FestivalOccurrenceModel, RecipeModel, CorrectionReportModel } from './models';
import {
  VERIFIED_FESTIVALS,
  VERIFIED_OCCURRENCES,
  ALL_INDIAN_STATES_UTS,
  VERIFIED_RECIPES,
  VERIFIED_QUIZ_QUESTIONS
} from '../data/verified-seeds';
import { Festival, FestivalOccurrence, Recipe, StateUTData, QuizQuestion, CommunityCorrectionReport } from '../types';
import { getCurrentYear, getUpcomingYear, getTodayISODate } from '../utils/date';

// In-memory corrections store fallback for local / non-MongoDB setups
let inMemoryCorrections: CommunityCorrectionReport[] = [
  {
    id: 'corr-001',
    contentCategory: 'Regional Variation',
    targetSlug: 'diwali',
    userEmail: 'scholar@ahmedabadheritage.org',
    proposedCorrection: 'Add details regarding Chopda Pujan ledger muhurat timing during Diwali night in Gujarat markets.',
    sourceCitationProvided: 'Gujarat Chamber of Commerce & Industry Traditional Calendar 2024-25',
    status: 'Accepted',
    adminNotes: 'Verified and incorporated into the Gujarat regional observance section.',
    submittedAt: '2025-01-14T10:30:00.000Z'
  }
];

export async function getFestivals(filters?: {
  month?: string; // "01" - "12"
  community?: string;
  state?: string;
  category?: string;
  search?: string;
}): Promise<Festival[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const query: any = { status: 'Published' };
      if (filters?.community && filters.community !== 'All') {
        query.communities = filters.community;
      }
      if (filters?.category && filters.category !== 'All') {
        query.category = filters.category;
      }
      if (filters?.state && filters.state !== 'All') {
        query.statesCovered = { $in: [filters.state, 'All India'] };
      }
      if (filters?.search) {
        const regex = new RegExp(filters.search, 'i');
        query.$or = [
          { 'title.en': regex },
          { 'title.hi': regex },
          { 'title.gu': regex },
          { slug: regex }
        ];
      }
      const records = await FestivalModel.find(query).lean();
      if (records && records.length > 0) {
        return records as unknown as Festival[];
      }
    }
  } catch (err) {
    console.warn('Fallback to seed repository for getFestivals');
  }

  // Seed repository fallback
  let list = [...VERIFIED_FESTIVALS];

  if (filters?.community && filters.community !== 'All') {
    list = list.filter((f) => f.communities.includes(filters.community as any));
  }
  if (filters?.category && filters.category !== 'All') {
    list = list.filter((f) => f.category === filters.category);
  }
  if (filters?.state && filters.state !== 'All') {
    list = list.filter((f) => f.statesCovered.includes(filters.state!) || f.statesCovered.includes('All India'));
  }
  if (filters?.search) {
    const s = filters.search.toLowerCase().trim();
    list = list.filter(
      (f) =>
        f.title.en.toLowerCase().includes(s) ||
        f.title.hi.toLowerCase().includes(s) ||
        f.title.gu.toLowerCase().includes(s) ||
        f.slug.toLowerCase().includes(s) ||
        f.shortSummary.en.toLowerCase().includes(s)
    );
  }
  if (filters?.month && filters.month !== 'All') {
    const monthNum = parseInt(filters.month, 10);
    const matchingSlugs = VERIFIED_OCCURRENCES.filter((occ) => {
      const occMonth = new Date(occ.primaryDate).getMonth() + 1;
      return occMonth === monthNum;
    }).map((occ) => occ.festivalSlug);

    list = list.filter((f) => matchingSlugs.includes(f.slug));
  }

  return list;
}

export async function getFestivalBySlug(slug: string): Promise<Festival | null> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await FestivalModel.findOne({ slug }).lean();
      if (doc) return doc as unknown as Festival;
    }
  } catch (e) {
    console.warn('Fallback to seed repository for getFestivalBySlug');
  }

  const found = VERIFIED_FESTIVALS.find((f) => f.slug === slug);
  return found || null;
}

export async function getAllOccurrences(): Promise<FestivalOccurrence[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const records = await FestivalOccurrenceModel.find({}).lean();
      if (records && records.length > 0) return records as unknown as FestivalOccurrence[];
    }
  } catch (e) {
    console.warn('Fallback to seed repository for getAllOccurrences');
  }

  return [...VERIFIED_OCCURRENCES];
}

export async function getOccurrences(year?: number): Promise<FestivalOccurrence[]> {
  const targetYear = year ?? getCurrentYear();
  try {
    const db = await connectToDatabase();
    if (db) {
      const records = await FestivalOccurrenceModel.find({ year: targetYear }).lean();
      if (records && records.length > 0) return records as unknown as FestivalOccurrence[];
    }
  } catch (e) {
    console.warn('Fallback to seed repository for getOccurrences');
  }

  return VERIFIED_OCCURRENCES.filter((o) => o.year === targetYear);
}

export async function getFestivalWithOccurrence(slug: string, year?: number) {
  const festival = await getFestivalBySlug(slug);
  if (!festival) return null;

  const targetYear = year ?? getCurrentYear();
  const nextYear = targetYear + 1;

  const currentOccurrences = await getOccurrences(targetYear);
  const occurrence = currentOccurrences.find((o) => o.festivalSlug === slug) || null;

  const futureOccurrences = await getOccurrences(nextYear);
  const futureOccurrence = futureOccurrences.find((o) => o.festivalSlug === slug) || null;

  const historicalOccurrences = await getOccurrences(2025);
  const historicalOccurrence = historicalOccurrences.find((o) => o.festivalSlug === slug) || null;

  return {
    festival,
    occurrence,
    futureOccurrence,
    historicalOccurrence,
    targetYear
  };
}

export async function getAllStatesUTs(): Promise<StateUTData[]> {
  return ALL_INDIAN_STATES_UTS;
}

export async function getStateUTByCode(code: string): Promise<StateUTData | null> {
  const normalized = code.toUpperCase();
  const found = ALL_INDIAN_STATES_UTS.find((s) => s.code === normalized || s.id === code);
  return found || null;
}

export async function getRecipes(filters?: { festivalSlug?: string; region?: string }): Promise<Recipe[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const q: any = {};
      if (filters?.festivalSlug) q.festivalSlug = filters.festivalSlug;
      if (filters?.region) q.region = filters.region;
      const records = await RecipeModel.find(q).lean();
      if (records && records.length > 0) return records as unknown as Recipe[];
    }
  } catch (e) {
    console.warn('Fallback to seed repository for getRecipes');
  }

  let list = [...VERIFIED_RECIPES];
  if (filters?.festivalSlug) {
    list = list.filter((r) => r.festivalSlug === filters.festivalSlug);
  }
  return list;
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await RecipeModel.findOne({ slug }).lean();
      if (doc) return doc as unknown as Recipe;
    }
  } catch (e) {
    console.warn('Fallback to seed repository for getRecipeBySlug');
  }

  return VERIFIED_RECIPES.find((r) => r.slug === slug) || null;
}

export async function getQuizQuestions(category?: string, limit: number = 10): Promise<QuizQuestion[]> {
  let questions = [...VERIFIED_QUIZ_QUESTIONS];
  if (category && category !== 'All') {
    questions = questions.filter((q) => q.category === category);
  }
  return questions.slice(0, limit);
}

export async function submitCorrection(report: Omit<CommunityCorrectionReport, 'id' | 'status' | 'submittedAt'>): Promise<CommunityCorrectionReport> {
  const newReport: CommunityCorrectionReport = {
    ...report,
    id: `corr-${Date.now()}`,
    status: 'Pending Review',
    submittedAt: new Date().toISOString()
  };

  try {
    const db = await connectToDatabase();
    if (db) {
      await CorrectionReportModel.create(newReport);
    }
  } catch (e) {
    console.warn('Saved to in-memory corrections repository');
  }

  inMemoryCorrections.unshift(newReport);
  return newReport;
}

export async function getCorrections(): Promise<CommunityCorrectionReport[]> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const docs = await CorrectionReportModel.find().sort({ submittedAt: -1 }).lean();
      if (docs && docs.length > 0) return docs as unknown as CommunityCorrectionReport[];
    }
  } catch (e) {
    console.warn('Returning in-memory corrections list');
  }

  return inMemoryCorrections;
}

export async function updateCorrectionStatus(id: string, status: 'Accepted' | 'Rejected', adminNotes?: string): Promise<boolean> {
  try {
    const db = await connectToDatabase();
    if (db) {
      await CorrectionReportModel.updateOne({ id }, { $set: { status, adminNotes } });
    }
  } catch (e) {
    console.warn('Updating in-memory correction');
  }

  const item = inMemoryCorrections.find((c) => c.id === id);
  if (item) {
    item.status = status;
    if (adminNotes) item.adminNotes = adminNotes;
    return true;
  }
  return false;
}

export async function getAdminMetrics() {
  const festivals = await getFestivals();
  const occurrences = await getAllOccurrences();
  const recipes = await getRecipes();
  const corrections = await getCorrections();

  return {
    totalFestivals: festivals.length,
    publishedFestivals: festivals.filter((f) => f.status === 'Published').length,
    draftFestivals: festivals.filter((f) => f.status === 'Draft').length,
    totalOccurrences: occurrences.length,
    totalRecipes: recipes.length,
    pendingCorrections: corrections.filter((c) => c.status === 'Pending Review').length,
    totalCorrections: corrections.length,
    languagesSupported: ['English (en)', 'हिन्दी (hi)', 'ગુજરાતી (gu)']
  };
}

