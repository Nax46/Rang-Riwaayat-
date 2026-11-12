# Database Schema Specification — Rang & Riwaayat

## 1. Collections & Entities

### 1.1 Festival
- `slug`: String (Unique, Indexed)
- `title`: LocalizedObject { en, hi, gu }
- `shortSummary`: LocalizedObject { en, hi, gu }
- `whyCelebrated`: LocalizedObject { en, hi, gu }
- `historyAndSignificance`: LocalizedObject { en, hi, gu }
- `ritualsAndCustoms`: LocalizedObject { en, hi, gu }
- `traditionalFoods`: Array<String>
- `category`: String (Harvest, Spiritual, Seasonal, Cultural)
- `communities`: Array<String> (Hindu, Muslim, Sikh, Christian, Jain, Buddhist, Tribal)
- `statesCovered`: Array<String>
- `heroImage`: { url, alt, caption, license, credit }
- `decorationIdeas`: LocalizedArray { en: [], hi: [], gu: [] }
- `faqs`: Array<{ question: LocalizedObject, answer: LocalizedObject }>
- `status`: String (Draft, Approved, Published)
- `sources`: Array<SourceCitation>
- `lastVerifiedDate`: String

### 1.2 FestivalOccurrence
- `festivalSlug`: String (Indexed)
- `year`: Number (Indexed)
- `startDate`: String (ISO YYYY-MM-DD)
- `endDate`: String (ISO YYYY-MM-DD)
- `primaryDate`: String (ISO YYYY-MM-DD, Indexed)
- `regionalObservances`: Array<{
    regionOrState: String,
    variationName: String,
    distinctCustoms: Array<String>,
    calendarSystem: String,
    tithiOrPanchang: String,
    muhuratVerified: String,
    notes: String
  }>
- `verifiedSources`: Array<SourceCitation>
- `lastVerifiedDate`: String

### 1.3 Recipe
- `slug`: String (Unique, Indexed)
- `title`: LocalizedObject
- `festivalSlug`: String (Indexed)
- `region`: String
- `dietaryType`: String (Vegetarian, Vegan, Sattvic, Prasad)
- `prepTimeMinutes`: Number
- `cookTimeMinutes`: Number
- `defaultServings`: Number
- `ingredients`: Array<{ name: LocalizedObject, amount: Number, unit: String }>
- `instructions`: Array<{ stepNumber: Number, text: LocalizedObject, timerSeconds: Number, tip: String }>
- `culturalStory`: LocalizedObject

### 1.4 CommunityCorrectionReport
- `id`: String (Unique)
- `contentCategory`: String
- `targetSlug`: String
- `userEmail`: String (Optional)
- `proposedCorrection`: String
- `sourceCitationProvided`: String
- `status`: String (Pending Review, Accepted, Rejected)
- `adminNotes`: String
- `submittedAt`: Date

