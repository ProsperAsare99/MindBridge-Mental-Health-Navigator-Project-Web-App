
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime
} = require('./runtime/wasm.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}





/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  googleId: 'googleId',
  isVerified: 'isVerified',
  isAnonymous: 'isAnonymous',
  verificationToken: 'verificationToken',
  image: 'image',
  displayName: 'displayName',
  university: 'university',
  academicLevel: 'academicLevel',
  program: 'program',
  phoneNumber: 'phoneNumber',
  studentId: 'studentId',
  language: 'language',
  notificationPreference: 'notificationPreference',
  preferredCheckInTime: 'preferredCheckInTime',
  concerns: 'concerns',
  supportLevel: 'supportLevel',
  riskLevel: 'riskLevel',
  copingStyles: 'copingStyles',
  faithLevel: 'faithLevel',
  approachPreference: 'approachPreference',
  goals: 'goals',
  stressors: 'stressors',
  trackingPreferences: 'trackingPreferences',
  emergencyContacts: 'emergencyContacts',
  baselineMood: 'baselineMood',
  baseline: 'baseline',
  joinDate: 'joinDate',
  moodCheckInsCount: 'moodCheckInsCount',
  conversationsCount: 'conversationsCount',
  lastActive: 'lastActive',
  onboardingStep: 'onboardingStep',
  onboardingCompleted: 'onboardingCompleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ConversationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  startedAt: 'startedAt',
  lastMessageAt: 'lastMessageAt',
  endedAt: 'endedAt',
  status: 'status',
  metadata: 'metadata',
  summary: 'summary',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  conversationId: 'conversationId',
  role: 'role',
  content: 'content',
  timestamp: 'timestamp',
  metadata: 'metadata'
};

exports.Prisma.MoodEntryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  mood: 'mood',
  energy: 'energy',
  sleep: 'sleep',
  social: 'social',
  anxiety: 'anxiety',
  emotion: 'emotion',
  emotionIntensity: 'emotionIntensity',
  physicalSymptoms: 'physicalSymptoms',
  photoUrl: 'photoUrl',
  audioUrl: 'audioUrl',
  weather: 'weather',
  location: 'location',
  notes: 'notes',
  tags: 'tags',
  sentimentScore: 'sentimentScore',
  sentimentLabel: 'sentimentLabel',
  crisisFlag: 'crisisFlag',
  createdAt: 'createdAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  responses: 'responses',
  score: 'score',
  severity: 'severity',
  interpretation: 'interpretation',
  createdAt: 'createdAt'
};

exports.Prisma.AIInteractionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  userMessage: 'userMessage',
  aiResponse: 'aiResponse',
  model: 'model',
  tokensUsed: 'tokensUsed',
  crisisDetected: 'crisisDetected',
  emotionalIntensity: 'emotionalIntensity',
  responseTime: 'responseTime',
  timestamp: 'timestamp'
};

exports.Prisma.CrisisLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  message: 'message',
  severity: 'severity',
  categories: 'categories',
  responseProvided: 'responseProvided',
  resourcesShown: 'resourcesShown',
  emergencyContactCalled: 'emergencyContactCalled',
  timestamp: 'timestamp'
};

exports.Prisma.UsageLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  service: 'service',
  model: 'model',
  tokensUsed: 'tokensUsed',
  finishReason: 'finishReason',
  timestamp: 'timestamp'
};

exports.Prisma.MemoryEntryScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  importance: 'importance',
  category: 'category',
  embedding: 'embedding',
  timestamp: 'timestamp',
  updatedAt: 'updatedAt'
};

exports.Prisma.AcademicEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  date: 'date',
  importance: 'importance',
  createdAt: 'createdAt'
};

exports.Prisma.UserGoalScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  title: 'title',
  type: 'type',
  status: 'status',
  progress: 'progress',
  targetDate: 'targetDate',
  milestones: 'milestones',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CarePlanScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  weekNumber: 'weekNumber',
  year: 'year',
  summary: 'summary',
  moodAnalysis: 'moodAnalysis',
  growthTasks: 'growthTasks',
  generatedAt: 'generatedAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AchievementScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  title: 'title',
  description: 'description',
  icon: 'icon',
  unlockedAt: 'unlockedAt'
};

exports.Prisma.ChallengeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  durationDays: 'durationDays',
  type: 'type',
  isCommunity: 'isCommunity',
  createdAt: 'createdAt'
};

exports.Prisma.ChallengeParticipationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  challengeId: 'challengeId',
  startDate: 'startDate',
  progress: 'progress',
  isCompleted: 'isCompleted',
  lastUpdate: 'lastUpdate'
};

exports.Prisma.MoodGardenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  growthLevel: 'growthLevel',
  plantType: 'plantType',
  healthScore: 'healthScore',
  lastWateredAt: 'lastWateredAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportCircleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CircleMembershipScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  circleId: 'circleId',
  joinedAt: 'joinedAt',
  role: 'role'
};

exports.Prisma.CirclePostScalarFieldEnum = {
  id: 'id',
  circleId: 'circleId',
  authorId: 'authorId',
  content: 'content',
  isAnonymous: 'isAnonymous',
  isApproved: 'isApproved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportStoryScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  content: 'content',
  category: 'category',
  isApproved: 'isApproved',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SupportEncouragementScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  senderId: 'senderId',
  receiverId: 'receiverId',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.MentorMatchScalarFieldEnum = {
  id: 'id',
  mentorId: 'mentorId',
  menteeId: 'menteeId',
  status: 'status',
  topic: 'topic',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.CircleRole = exports.$Enums.CircleRole = {
  MEMBER: 'MEMBER',
  MODERATOR: 'MODERATOR'
};

exports.MatchStatus = exports.$Enums.MatchStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  DECLINED: 'DECLINED'
};

exports.University = exports.$Enums.University = {
  KNUST: 'KNUST',
  UNIVERSITY_OF_GHANA: 'UNIVERSITY_OF_GHANA',
  UNIVERSITY_OF_CAPE_COAST: 'UNIVERSITY_OF_CAPE_COAST',
  ASHESI_UNIVERSITY: 'ASHESI_UNIVERSITY',
  GIMPA: 'GIMPA',
  OTHER: 'OTHER'
};

exports.Language = exports.$Enums.Language = {
  ENGLISH: 'ENGLISH',
  TWI: 'TWI',
  GA: 'GA',
  EWE: 'EWE'
};

exports.NotificationFrequency = exports.$Enums.NotificationFrequency = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  ONLY_WHEN_NEEDED: 'ONLY_WHEN_NEEDED',
  NONE: 'NONE'
};

exports.TimeOfDay = exports.$Enums.TimeOfDay = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
  NIGHT: 'NIGHT'
};

exports.Concern = exports.$Enums.Concern = {
  ACADEMIC_STRESS: 'ACADEMIC_STRESS',
  ANXIETY: 'ANXIETY',
  DEPRESSION: 'DEPRESSION',
  LONELINESS: 'LONELINESS',
  RELATIONSHIP_ISSUES: 'RELATIONSHIP_ISSUES',
  FINANCIAL_STRESS: 'FINANCIAL_STRESS',
  FAMILY_PRESSURE: 'FAMILY_PRESSURE',
  OTHER: 'OTHER'
};

exports.SupportLevel = exports.$Enums.SupportLevel = {
  ALONE: 'ALONE',
  SOMEWHAT: 'SOMEWHAT',
  STRONG: 'STRONG'
};

exports.RiskLevel = exports.$Enums.RiskLevel = {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.CopingStyle = exports.$Enums.CopingStyle = {
  EXERCISE: 'EXERCISE',
  JOURNAL: 'JOURNAL',
  PRAY: 'PRAY',
  TALK: 'TALK',
  MUSIC: 'MUSIC',
  SLEEP: 'SLEEP',
  MEDITATE: 'MEDITATE',
  OTHER: 'OTHER'
};

exports.FaithLevel = exports.$Enums.FaithLevel = {
  VERY_IMPORTANT: 'VERY_IMPORTANT',
  SOMEWHAT_IMPORTANT: 'SOMEWHAT_IMPORTANT',
  NOT_IMPORTANT: 'NOT_IMPORTANT'
};

exports.ApproachPreference = exports.$Enums.ApproachPreference = {
  CLINICAL: 'CLINICAL',
  HOLISTIC: 'HOLISTIC',
  CULTURAL: 'CULTURAL',
  MIXED: 'MIXED'
};

exports.Goal = exports.$Enums.Goal = {
  REDUCE_STRESS: 'REDUCE_STRESS',
  IMPROVE_MOOD: 'IMPROVE_MOOD',
  BUILD_RESILIENCE: 'BUILD_RESILIENCE',
  BETTER_SLEEP: 'BETTER_SLEEP',
  DEVELOP_HABITS: 'DEVELOP_HABITS',
  CONNECT_SUPPORT: 'CONNECT_SUPPORT',
  TRACK_JOURNEY: 'TRACK_JOURNEY',
  PREPARE_COUNSELING: 'PREPARE_COUNSELING',
  BE_MINDFUL: 'BE_MINDFUL',
  IMPROVE_ACADEMICS: 'IMPROVE_ACADEMICS'
};

exports.GoalStatus = exports.$Enums.GoalStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

exports.ConversationStatus = exports.$Enums.ConversationStatus = {
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
  ARCHIVED: 'ARCHIVED'
};

exports.MessageRole = exports.$Enums.MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

exports.AssessmentType = exports.$Enums.AssessmentType = {
  PHQ9: 'PHQ9',
  GAD7: 'GAD7',
  PSS: 'PSS',
  CUSTOM: 'CUSTOM'
};

exports.Severity = exports.$Enums.Severity = {
  MINIMAL: 'MINIMAL',
  MILD: 'MILD',
  MODERATE: 'MODERATE',
  MODERATELY_SEVERE: 'MODERATELY_SEVERE',
  SEVERE: 'SEVERE'
};

exports.Service = exports.$Enums.Service = {
  GEMINI: 'GEMINI',
  CHAT: 'CHAT',
  MOOD: 'MOOD',
  ASSESSMENT: 'ASSESSMENT',
  RESOURCE: 'RESOURCE'
};

exports.Prisma.ModelName = {
  User: 'User',
  Conversation: 'Conversation',
  Message: 'Message',
  MoodEntry: 'MoodEntry',
  Assessment: 'Assessment',
  AIInteraction: 'AIInteraction',
  CrisisLog: 'CrisisLog',
  UsageLog: 'UsageLog',
  MemoryEntry: 'MemoryEntry',
  AcademicEvent: 'AcademicEvent',
  UserGoal: 'UserGoal',
  CarePlan: 'CarePlan',
  Achievement: 'Achievement',
  Challenge: 'Challenge',
  ChallengeParticipation: 'ChallengeParticipation',
  MoodGarden: 'MoodGarden',
  SupportCircle: 'SupportCircle',
  CircleMembership: 'CircleMembership',
  CirclePost: 'CirclePost',
  SupportStory: 'SupportStory',
  SupportEncouragement: 'SupportEncouragement',
  MentorMatch: 'MentorMatch'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\src\\generated\\client_new",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [
      "driverAdapters"
    ],
    "sourceFilePath": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.2.1",
  "engineVersion": "4123509d24aa4dede1e864b46351bf2790323b69",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"../src/generated/client_new\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\n// ============================================\n// USER MODEL\n// ============================================\nmodel User {\n  id       String  @id @default(uuid())\n  email    String  @unique\n  password String?\n\n  // Authentication Extras (Retained)\n  googleId          String? @unique\n  isVerified        Boolean @default(false)\n  isAnonymous       Boolean @default(false)\n  verificationToken String?\n  image             String?\n\n  // Basic Profile\n  displayName   String?\n  university    University?\n  academicLevel Int?\n  program       String?\n  phoneNumber   String?\n  studentId     String?\n\n  // Communication Preferences\n  language               Language              @default(ENGLISH)\n  notificationPreference NotificationFrequency @default(DAILY)\n  preferredCheckInTime   TimeOfDay             @default(MORNING)\n\n  // Mental Health Context\n  concerns     Concern[]    @default([])\n  supportLevel SupportLevel @default(SOMEWHAT)\n  riskLevel    RiskLevel    @default(LOW)\n\n  // Personalization\n  copingStyles       CopingStyle[]      @default([])\n  faithLevel         FaithLevel         @default(SOMEWHAT_IMPORTANT)\n  approachPreference ApproachPreference @default(HOLISTIC)\n  goals              Goal[]             @default([])\n\n  // Academic Stressors (JSON for flexibility)\n  stressors Json? // { exams: 3, assignments: 4, financial: 5, ... }\n\n  // Tracking Preferences (JSON)\n  trackingPreferences Json? // { mood: true, sleep: false, ... }\n\n  // Emergency Contacts (JSON array)\n  emergencyContacts Json? // [{ name: \"\", relationship: \"\", phone: \"\" }]\n\n  // Baseline Data\n  baselineMood Int?\n  baseline     Json? // Retained for existing complex baseline data\n  joinDate     DateTime @default(now())\n\n  // Usage Metrics\n  moodCheckInsCount  Int       @default(0)\n  conversationsCount Int       @default(0)\n  lastActive         DateTime?\n\n  // Onboarding Status (Retained)\n  onboardingStep      Int     @default(1)\n  onboardingCompleted Boolean @default(false)\n\n  // Timestamps\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  // Relations\n  conversations  Conversation[]\n  moodEntries    MoodEntry[]\n  assessments    Assessment[]\n  aiInteractions AIInteraction[]\n  crisisLogs     CrisisLog[]\n  usageLogs      UsageLog[]\n  memoryEntries  MemoryEntry[]\n  userGoals      UserGoal[]\n  carePlans      CarePlan[]\n  achievements   Achievement[]\n  challenges     ChallengeParticipation[]\n  moodGarden     MoodGarden?\n\n  // Community Relations\n  circleMemberships      CircleMembership[]\n  circlePosts            CirclePost[]\n  stories                SupportStory[]\n  sentEncouragements     SupportEncouragement[] @relation(\"SentEncouragement\")\n  receivedEncouragements SupportEncouragement[] @relation(\"ReceivedEncouragement\")\n  mentorMatches          MentorMatch[]          @relation(\"Mentor\")\n  menteeMatches          MentorMatch[]          @relation(\"Mentee\")\n\n  @@index([email])\n  @@index([university, academicLevel])\n  @@index([riskLevel])\n}\n\n// ============================================\n// CONVERSATION MODEL\n// ============================================\nmodel Conversation {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  startedAt     DateTime  @default(now())\n  lastMessageAt DateTime  @default(now())\n  endedAt       DateTime?\n\n  status ConversationStatus @default(ACTIVE)\n\n  // Metadata (JSON)\n  metadata Json? // { userRiskLevel: \"LOW\", initialMood: 3, context: \"\" }\n\n  summary String?\n\n  // Relations\n  messages Message[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId, startedAt(sort: Desc)])\n  @@index([status])\n}\n\n// ============================================\n// MESSAGE MODEL\n// ============================================\nmodel Message {\n  id             String       @id @default(uuid())\n  conversationId String\n  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)\n\n  role      MessageRole\n  content   String      @db.Text\n  timestamp DateTime    @default(now())\n\n  // Metadata (JSON)\n  metadata Json? // { model: \"\", tokensUsed: 0, crisisDetected: false, ... }\n\n  @@index([conversationId, timestamp(sort: Desc)])\n}\n\n// ============================================\n// MOOD ENTRY MODEL\n// ============================================\nmodel MoodEntry {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  mood    Int // 1-5 scale\n  energy  Int? // 1-5 scale\n  sleep   Int? // 1-5 scale\n  social  Int? // 1-5 scale\n  anxiety Int? // 1-10 scale\n\n  // Advanced Tracking\n  emotion          String? // Nuanced emotion (e.g., \"Radiant\", \"Serene\")\n  emotionIntensity Float? // 0.0 to 1.0\n  physicalSymptoms String[] // Array of symptoms (e.g., [\"Headache\", \"Fatigue\"])\n\n  // Media Journaling\n  photoUrl String?\n  audioUrl String?\n\n  // Environmental Context\n  weather  Json? // { temp, condition, icon }\n  location Json? // { city, country, lat, lng }\n\n  notes          String?\n  tags           String[] // Array of tags\n  sentimentScore Float?\n  sentimentLabel String?\n  crisisFlag     Boolean  @default(false)\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, createdAt(sort: Desc)])\n}\n\n// ============================================\n// ASSESSMENT MODEL\n// ============================================\nmodel Assessment {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  type           AssessmentType\n  responses      Json // Array of { question: \"\", answer: \"\" }\n  score          Int\n  severity       Severity?\n  interpretation String?\n\n  createdAt DateTime @default(now())\n\n  @@index([userId, type, createdAt(sort: Desc)])\n}\n\n// ============================================\n// AI INTERACTION LOG\n// ============================================\nmodel AIInteraction {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  userMessage        String  @db.Text\n  aiResponse         String  @db.Text\n  model              String?\n  tokensUsed         Int?\n  crisisDetected     Boolean @default(false)\n  emotionalIntensity Int?\n  responseTime       Int? // milliseconds\n\n  timestamp DateTime @default(now())\n\n  @@index([userId, timestamp(sort: Desc)])\n  @@index([crisisDetected])\n}\n\n// ============================================\n// CRISIS LOG\n// ============================================\nmodel CrisisLog {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  message    String @db.Text\n  severity   Int // 1-10 scale\n  categories Json // Array of { category: \"\", matches: [], severity: 0 }\n\n  responseProvided       Boolean @default(false)\n  resourcesShown         Boolean @default(false)\n  emergencyContactCalled Boolean @default(false)\n\n  timestamp DateTime @default(now())\n\n  @@index([userId, timestamp(sort: Desc)])\n  @@index([severity(sort: Desc)])\n}\n\n// ============================================\n// USAGE LOG\n// ============================================\nmodel UsageLog {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  service      Service\n  model        String?\n  tokensUsed   Int?\n  finishReason String?\n\n  timestamp DateTime @default(now())\n\n  @@index([userId, timestamp(sort: Desc)])\n  @@index([service])\n}\n\nmodel MemoryEntry {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  content    String  @db.Text\n  importance Int     @default(1) // 1-10 scale\n  category   String? // ACADEMIC, PERSONAL, MEDICAL, GOAL\n\n  // Vector embedding stored as JSON array of numbers\n  embedding Json?\n\n  timestamp DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([category])\n}\n\nmodel AcademicEvent {\n  id         String   @id @default(uuid())\n  title      String\n  type       String\n  date       DateTime\n  importance Int      @default(1)\n  createdAt  DateTime @default(now())\n}\n\nmodel UserGoal {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  title    String\n  type     Goal\n  status   GoalStatus @default(ACTIVE)\n  progress Int        @default(0) // 0-100\n\n  targetDate DateTime?\n  milestones Json? // Array of { title: string, completed: boolean }\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([status])\n}\n\nmodel CarePlan {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  weekNumber Int\n  year       Int\n\n  summary      String @db.Text\n  moodAnalysis Json? // e.g., { avgMood: number, trend: string }\n  growthTasks  Json // Array of { task: string, reason: string, completed: boolean }\n\n  generatedAt DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  @@unique([userId, weekNumber, year])\n  @@index([userId])\n}\n\nmodel Achievement {\n  id     String @id @default(uuid())\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  type        String // milestone_7, milestone_30, resilience_builder, etc.\n  title       String\n  description String?\n  icon        String?\n  unlockedAt  DateTime @default(now())\n\n  @@unique([userId, type])\n  @@index([userId])\n}\n\nmodel Challenge {\n  id           String  @id @default(uuid())\n  title        String\n  description  String\n  durationDays Int     @default(30)\n  type         String // GRATITUDE, MINDFULNESS, etc.\n  isCommunity  Boolean @default(false)\n\n  participants ChallengeParticipation[]\n\n  createdAt DateTime @default(now())\n}\n\nmodel ChallengeParticipation {\n  id          String    @id @default(uuid())\n  userId      String\n  challengeId String\n  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  challenge   Challenge @relation(fields: [challengeId], references: [id], onDelete: Cascade)\n\n  startDate   DateTime  @default(now())\n  progress    Int       @default(0) // Number of days completed\n  isCompleted Boolean   @default(false)\n  lastUpdate  DateTime?\n\n  @@unique([userId, challengeId])\n}\n\nmodel MoodGarden {\n  id     String @id @default(uuid())\n  userId String @unique\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  growthLevel   Int      @default(1) // 1-5\n  plantType     String   @default(\"OAK\")\n  healthScore   Float    @default(50.0) // 0-100\n  lastWateredAt DateTime @default(now())\n\n  updatedAt DateTime @updatedAt\n}\n\n// ============================================\n// SOCIAL & COMMUNITY MODELS\n// ============================================\n\nmodel SupportCircle {\n  id          String  @id @default(uuid())\n  name        String\n  description String?\n  category    Concern // Uses existing Concern enum\n\n  members CircleMembership[]\n  posts   CirclePost[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([category])\n}\n\nmodel CircleMembership {\n  id       String        @id @default(uuid())\n  userId   String\n  circleId String\n  user     User          @relation(fields: [userId], references: [id], onDelete: Cascade)\n  circle   SupportCircle @relation(fields: [circleId], references: [id], onDelete: Cascade)\n\n  joinedAt DateTime   @default(now())\n  role     CircleRole @default(MEMBER)\n\n  @@unique([userId, circleId])\n}\n\nmodel CirclePost {\n  id       String        @id @default(uuid())\n  circleId String\n  circle   SupportCircle @relation(fields: [circleId], references: [id], onDelete: Cascade)\n\n  authorId String\n  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)\n\n  content     String  @db.Text\n  isAnonymous Boolean @default(true)\n  isApproved  Boolean @default(false)\n\n  encouragements SupportEncouragement[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([circleId])\n}\n\nmodel SupportStory {\n  id       String @id @default(uuid())\n  authorId String\n  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)\n\n  title      String\n  content    String  @db.Text\n  category   Concern\n  isApproved Boolean @default(false)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([category])\n  @@index([authorId])\n}\n\nmodel SupportEncouragement {\n  id     String      @id @default(uuid())\n  postId String?\n  post   CirclePost? @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  senderId String\n  sender   User   @relation(\"SentEncouragement\", fields: [senderId], references: [id], onDelete: Cascade)\n\n  receiverId String?\n  receiver   User?   @relation(\"ReceivedEncouragement\", fields: [receiverId], references: [id], onDelete: Cascade)\n\n  content   String   @db.Text\n  createdAt DateTime @default(now())\n\n  @@index([postId])\n  @@index([receiverId])\n}\n\nmodel MentorMatch {\n  id       String @id @default(uuid())\n  mentorId String\n  mentor   User   @relation(\"Mentor\", fields: [mentorId], references: [id], onDelete: Cascade)\n\n  menteeId String\n  mentee   User   @relation(\"Mentee\", fields: [menteeId], references: [id], onDelete: Cascade)\n\n  status MatchStatus @default(PENDING)\n  topic  Concern\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([mentorId])\n  @@index([menteeId])\n  @@index([status])\n}\n\nenum CircleRole {\n  MEMBER\n  MODERATOR\n}\n\nenum MatchStatus {\n  PENDING\n  ACTIVE\n  COMPLETED\n  DECLINED\n}\n\n// ============================================\n// ENUMS\n// ============================================\n\nenum University {\n  KNUST\n  UNIVERSITY_OF_GHANA\n  UNIVERSITY_OF_CAPE_COAST\n  ASHESI_UNIVERSITY\n  GIMPA\n  OTHER\n}\n\nenum Language {\n  ENGLISH\n  TWI\n  GA\n  EWE\n}\n\nenum NotificationFrequency {\n  DAILY\n  WEEKLY\n  ONLY_WHEN_NEEDED\n  NONE\n}\n\nenum TimeOfDay {\n  MORNING\n  AFTERNOON\n  EVENING\n  NIGHT\n}\n\nenum Concern {\n  ACADEMIC_STRESS\n  ANXIETY\n  DEPRESSION\n  LONELINESS\n  RELATIONSHIP_ISSUES\n  FINANCIAL_STRESS\n  FAMILY_PRESSURE\n  OTHER\n}\n\nenum SupportLevel {\n  ALONE\n  SOMEWHAT\n  STRONG\n}\n\nenum RiskLevel {\n  LOW\n  MODERATE\n  HIGH\n  CRITICAL\n}\n\nenum CopingStyle {\n  EXERCISE\n  JOURNAL\n  PRAY\n  TALK\n  MUSIC\n  SLEEP\n  MEDITATE\n  OTHER\n}\n\nenum FaithLevel {\n  VERY_IMPORTANT\n  SOMEWHAT_IMPORTANT\n  NOT_IMPORTANT\n}\n\nenum ApproachPreference {\n  CLINICAL\n  HOLISTIC\n  CULTURAL\n  MIXED\n}\n\nenum Goal {\n  REDUCE_STRESS\n  IMPROVE_MOOD\n  BUILD_RESILIENCE\n  BETTER_SLEEP\n  DEVELOP_HABITS\n  CONNECT_SUPPORT\n  TRACK_JOURNEY\n  PREPARE_COUNSELING\n  BE_MINDFUL\n  IMPROVE_ACADEMICS\n}\n\nenum GoalStatus {\n  ACTIVE\n  COMPLETED\n  ARCHIVED\n}\n\nenum ConversationStatus {\n  ACTIVE\n  ENDED\n  ARCHIVED\n}\n\nenum MessageRole {\n  USER\n  ASSISTANT\n}\n\nenum AssessmentType {\n  PHQ9\n  GAD7\n  PSS\n  CUSTOM\n}\n\nenum Severity {\n  MINIMAL\n  MILD\n  MODERATE\n  MODERATELY_SEVERE\n  SEVERE\n}\n\nenum Service {\n  GEMINI\n  CHAT\n  MOOD\n  ASSESSMENT\n  RESOURCE\n}\n",
  "inlineSchemaHash": "a03950263cf8e6543401cae41ecddc1f1a33587ea8378c1e895709c0fdd68512",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"googleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isAnonymous\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"verificationToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"university\",\"kind\":\"enum\",\"type\":\"University\"},{\"name\":\"academicLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"program\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"studentId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"language\",\"kind\":\"enum\",\"type\":\"Language\"},{\"name\":\"notificationPreference\",\"kind\":\"enum\",\"type\":\"NotificationFrequency\"},{\"name\":\"preferredCheckInTime\",\"kind\":\"enum\",\"type\":\"TimeOfDay\"},{\"name\":\"concerns\",\"kind\":\"enum\",\"type\":\"Concern\"},{\"name\":\"supportLevel\",\"kind\":\"enum\",\"type\":\"SupportLevel\"},{\"name\":\"riskLevel\",\"kind\":\"enum\",\"type\":\"RiskLevel\"},{\"name\":\"copingStyles\",\"kind\":\"enum\",\"type\":\"CopingStyle\"},{\"name\":\"faithLevel\",\"kind\":\"enum\",\"type\":\"FaithLevel\"},{\"name\":\"approachPreference\",\"kind\":\"enum\",\"type\":\"ApproachPreference\"},{\"name\":\"goals\",\"kind\":\"enum\",\"type\":\"Goal\"},{\"name\":\"stressors\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"trackingPreferences\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"emergencyContacts\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"baselineMood\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"baseline\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"joinDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"moodCheckInsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"conversationsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastActive\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"onboardingStep\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"onboardingCompleted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"conversations\",\"kind\":\"object\",\"type\":\"Conversation\",\"relationName\":\"ConversationToUser\"},{\"name\":\"moodEntries\",\"kind\":\"object\",\"type\":\"MoodEntry\",\"relationName\":\"MoodEntryToUser\"},{\"name\":\"assessments\",\"kind\":\"object\",\"type\":\"Assessment\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"aiInteractions\",\"kind\":\"object\",\"type\":\"AIInteraction\",\"relationName\":\"AIInteractionToUser\"},{\"name\":\"crisisLogs\",\"kind\":\"object\",\"type\":\"CrisisLog\",\"relationName\":\"CrisisLogToUser\"},{\"name\":\"usageLogs\",\"kind\":\"object\",\"type\":\"UsageLog\",\"relationName\":\"UsageLogToUser\"},{\"name\":\"memoryEntries\",\"kind\":\"object\",\"type\":\"MemoryEntry\",\"relationName\":\"MemoryEntryToUser\"},{\"name\":\"userGoals\",\"kind\":\"object\",\"type\":\"UserGoal\",\"relationName\":\"UserToUserGoal\"},{\"name\":\"carePlans\",\"kind\":\"object\",\"type\":\"CarePlan\",\"relationName\":\"CarePlanToUser\"},{\"name\":\"achievements\",\"kind\":\"object\",\"type\":\"Achievement\",\"relationName\":\"AchievementToUser\"},{\"name\":\"challenges\",\"kind\":\"object\",\"type\":\"ChallengeParticipation\",\"relationName\":\"ChallengeParticipationToUser\"},{\"name\":\"moodGarden\",\"kind\":\"object\",\"type\":\"MoodGarden\",\"relationName\":\"MoodGardenToUser\"},{\"name\":\"circleMemberships\",\"kind\":\"object\",\"type\":\"CircleMembership\",\"relationName\":\"CircleMembershipToUser\"},{\"name\":\"circlePosts\",\"kind\":\"object\",\"type\":\"CirclePost\",\"relationName\":\"CirclePostToUser\"},{\"name\":\"stories\",\"kind\":\"object\",\"type\":\"SupportStory\",\"relationName\":\"SupportStoryToUser\"},{\"name\":\"sentEncouragements\",\"kind\":\"object\",\"type\":\"SupportEncouragement\",\"relationName\":\"SentEncouragement\"},{\"name\":\"receivedEncouragements\",\"kind\":\"object\",\"type\":\"SupportEncouragement\",\"relationName\":\"ReceivedEncouragement\"},{\"name\":\"mentorMatches\",\"kind\":\"object\",\"type\":\"MentorMatch\",\"relationName\":\"Mentor\"},{\"name\":\"menteeMatches\",\"kind\":\"object\",\"type\":\"MentorMatch\",\"relationName\":\"Mentee\"}],\"dbName\":null},\"Conversation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ConversationToUser\"},{\"name\":\"startedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"lastMessageAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"endedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ConversationStatus\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"messages\",\"kind\":\"object\",\"type\":\"Message\",\"relationName\":\"ConversationToMessage\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Message\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"conversationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"conversation\",\"kind\":\"object\",\"type\":\"Conversation\",\"relationName\":\"ConversationToMessage\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"MessageRole\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"metadata\",\"kind\":\"scalar\",\"type\":\"Json\"}],\"dbName\":null},\"MoodEntry\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MoodEntryToUser\"},{\"name\":\"mood\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"energy\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"sleep\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"social\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"anxiety\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"emotion\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"emotionIntensity\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"physicalSymptoms\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"photoUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"audioUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"weather\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"location\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"notes\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tags\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentimentScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"sentimentLabel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crisisFlag\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Assessment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"AssessmentType\"},{\"name\":\"responses\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"severity\",\"kind\":\"enum\",\"type\":\"Severity\"},{\"name\":\"interpretation\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AIInteraction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AIInteractionToUser\"},{\"name\":\"userMessage\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"aiResponse\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"model\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokensUsed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"crisisDetected\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"emotionalIntensity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"responseTime\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CrisisLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CrisisLogToUser\"},{\"name\":\"message\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"severity\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"categories\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"responseProvided\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"resourcesShown\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"emergencyContactCalled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"UsageLog\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UsageLogToUser\"},{\"name\":\"service\",\"kind\":\"enum\",\"type\":\"Service\"},{\"name\":\"model\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"tokensUsed\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"finishReason\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"MemoryEntry\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MemoryEntryToUser\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"importance\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"embedding\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"timestamp\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AcademicEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"importance\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"UserGoal\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"UserToUserGoal\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"Goal\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"GoalStatus\"},{\"name\":\"progress\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"targetDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"milestones\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CarePlan\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CarePlanToUser\"},{\"name\":\"weekNumber\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"year\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"summary\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"moodAnalysis\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"growthTasks\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"generatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Achievement\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AchievementToUser\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"unlockedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Challenge\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"durationDays\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isCommunity\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"participants\",\"kind\":\"object\",\"type\":\"ChallengeParticipation\",\"relationName\":\"ChallengeToChallengeParticipation\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"ChallengeParticipation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"challengeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ChallengeParticipationToUser\"},{\"name\":\"challenge\",\"kind\":\"object\",\"type\":\"Challenge\",\"relationName\":\"ChallengeToChallengeParticipation\"},{\"name\":\"startDate\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"progress\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"isCompleted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"lastUpdate\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"MoodGarden\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MoodGardenToUser\"},{\"name\":\"growthLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"plantType\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"healthScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"lastWateredAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SupportCircle\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"Concern\"},{\"name\":\"members\",\"kind\":\"object\",\"type\":\"CircleMembership\",\"relationName\":\"CircleMembershipToSupportCircle\"},{\"name\":\"posts\",\"kind\":\"object\",\"type\":\"CirclePost\",\"relationName\":\"CirclePostToSupportCircle\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"CircleMembership\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"circleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CircleMembershipToUser\"},{\"name\":\"circle\",\"kind\":\"object\",\"type\":\"SupportCircle\",\"relationName\":\"CircleMembershipToSupportCircle\"},{\"name\":\"joinedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"CircleRole\"}],\"dbName\":null},\"CirclePost\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"circleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"circle\",\"kind\":\"object\",\"type\":\"SupportCircle\",\"relationName\":\"CirclePostToSupportCircle\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"CirclePostToUser\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isAnonymous\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isApproved\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"encouragements\",\"kind\":\"object\",\"type\":\"SupportEncouragement\",\"relationName\":\"CirclePostToSupportEncouragement\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SupportStory\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SupportStoryToUser\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"enum\",\"type\":\"Concern\"},{\"name\":\"isApproved\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"SupportEncouragement\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"postId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"post\",\"kind\":\"object\",\"type\":\"CirclePost\",\"relationName\":\"CirclePostToSupportEncouragement\"},{\"name\":\"senderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sender\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"SentEncouragement\"},{\"name\":\"receiverId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"receiver\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReceivedEncouragement\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"MentorMatch\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentor\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Mentor\"},{\"name\":\"menteeId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"mentee\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"Mentee\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"MatchStatus\"},{\"name\":\"topic\",\"kind\":\"enum\",\"type\":\"Concern\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = {
  getRuntime: () => require('./query_engine_bg.js'),
  getQueryEngineWasmModule: async () => {
    const loader = (await import('#wasm-engine-loader')).default
    const engine = (await loader).default
    return engine 
  }
}

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

