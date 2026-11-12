import mongoose, { Schema, Document, Model } from 'mongoose';

// Festival Schema
const FestivalSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      gu: { type: String, required: true }
    },
    shortSummary: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      gu: { type: String, required: true }
    },
    whyCelebrated: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      gu: { type: String, required: true }
    },
    historyAndSignificance: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      gu: { type: String, required: true }
    },
    ritualsAndCustoms: {
      en: { type: String, required: true },
      hi: { type: String, required: true },
      gu: { type: String, required: true }
    },
    traditionalFoods: [{ type: String }],
    category: { type: String, required: true, index: true },
    communities: [{ type: String, index: true }],
    statesCovered: [{ type: String, index: true }],
    heroImage: {
      url: { type: String, required: true },
      alt: { type: String, required: true },
      caption: { type: String },
      license: { type: String },
      credit: { type: String }
    },
    decorationIdeas: {
      en: [{ type: String }],
      hi: [{ type: String }],
      gu: [{ type: String }]
    },
    faqs: [
      {
        question: { en: String, hi: String, gu: String },
        answer: { en: String, hi: String, gu: String }
      }
    ],
    status: { type: String, default: 'Published', index: true },
    sources: [
      {
        id: String,
        title: String,
        publisherOrInstitution: String,
        type: { type: String },
        url: String,
        accessDate: String,
        notes: String
      }
    ],
    lastVerifiedDate: { type: String },
    isPopular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Festival Occurrence Schema
const FestivalOccurrenceSchema = new Schema(
  {
    festivalSlug: { type: String, required: true, index: true },
    year: { type: Number, required: true, index: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    primaryDate: { type: String, required: true, index: true },
    regionalObservances: [
      {
        regionOrState: String,
        variationName: String,
        distinctCustoms: [String],
        calendarSystem: String,
        tithiOrPanchang: String,
        muhuratVerified: String,
        notes: String
      }
    ],
    verifiedSources: [
      {
        id: String,
        title: String,
        publisherOrInstitution: String,
        type: { type: String },
        url: String,
        accessDate: String,
        notes: String
      }
    ],
    lastVerifiedDate: { type: String }
  },
  { timestamps: true }
);

// Recipe Schema
const RecipeSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { en: String, hi: String, gu: String },
    festivalSlug: { type: String, required: true, index: true },
    region: { type: String, required: true },
    dietaryType: { type: String, required: true },
    prepTimeMinutes: { type: Number, required: true },
    cookTimeMinutes: { type: Number, required: true },
    defaultServings: { type: Number, required: true },
    ingredients: [
      {
        name: { en: String, hi: String, gu: String },
        amount: Number,
        unit: String,
        notes: String
      }
    ],
    instructions: [
      {
        stepNumber: Number,
        text: { en: String, hi: String, gu: String },
        timerSeconds: Number,
        tip: String
      }
    ],
    culturalStory: { en: String, hi: String, gu: String },
    sources: [
      {
        id: String,
        title: String,
        publisherOrInstitution: String,
        type: { type: String },
        url: String
      }
    ]
  },
  { timestamps: true }
);

// Community Correction Report Schema
const CorrectionReportSchema = new Schema(
  {
    contentCategory: { type: String, required: true },
    targetSlug: { type: String, required: true },
    userEmail: { type: String },
    proposedCorrection: { type: String, required: true },
    sourceCitationProvided: { type: String, required: true },
    status: { type: String, default: 'Pending Review', index: true },
    adminNotes: { type: String },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Admin User Schema
const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    role: { type: String, default: 'Editor' },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

export const FestivalModel: Model<any> = mongoose.models.Festival || mongoose.model('Festival', FestivalSchema);
export const FestivalOccurrenceModel: Model<any> = mongoose.models.FestivalOccurrence || mongoose.model('FestivalOccurrence', FestivalOccurrenceSchema);
export const RecipeModel: Model<any> = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
export const CorrectionReportModel: Model<any> = mongoose.models.CorrectionReport || mongoose.model('CorrectionReport', CorrectionReportSchema);
export const AdminUserModel: Model<any> = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);

