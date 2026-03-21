
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
  displayName: 'displayName',
  university: 'university',
  academicLevel: 'academicLevel',
  program: 'program',
  image: 'image',
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
  baseline: 'baseline',
  moodCheckInsCount: 'moodCheckInsCount',
  conversationsCount: 'conversationsCount',
  lastActive: 'lastActive',
  onboardingStep: 'onboardingStep',
  onboardingCompleted: 'onboardingCompleted',
  verificationToken: 'verificationToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChatMessageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  content: 'content',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.AssessmentScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  score: 'score',
  severity: 'severity',
  createdAt: 'createdAt'
};

exports.Prisma.MoodScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  value: 'value',
  note: 'note',
  sentimentScore: 'sentimentScore',
  sentimentLabel: 'sentimentLabel',
  crisisFlag: 'crisisFlag',
  createdAt: 'createdAt'
};

exports.Prisma.AcademicEventScalarFieldEnum = {
  id: 'id',
  title: 'title',
  type: 'type',
  date: 'date',
  importance: 'importance',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
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


exports.Prisma.ModelName = {
  User: 'User',
  ChatMessage: 'ChatMessage',
  Assessment: 'Assessment',
  Mood: 'Mood',
  AcademicEvent: 'AcademicEvent'
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
      "value": "C:\\Users\\asare\\Desktop\\MindBridge-Mental-Health-Navigator-Project\\server\\src\\generated\\client",
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
  "inlineSchema": "generator client {\n  provider        = \"prisma-client-js\"\n  previewFeatures = [\"driverAdapters\"]\n  output          = \"../src/generated/client\"\n}\n\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\")\n  directUrl = env(\"DIRECT_URL\")\n}\n\nmodel User {\n  id String @id @default(uuid())\n\n  // Authentication\n  email       String  @unique\n  password    String?\n  googleId    String? @unique\n  isVerified  Boolean @default(false)\n  isAnonymous Boolean @default(false)\n\n  // Basic Profile\n  displayName   String? // From Mongoose: displayName\n  university    String? // From Mongoose: university\n  academicLevel Int? // From Mongoose: academicLevel (100, 200, 300, 400)\n  program       String? // From Mongoose: program\n  image         String?\n\n  // Communication Preferences\n  language               String @default(\"english\") // english, twi, ga, ewe\n  notificationPreference String @default(\"daily\") // daily, weekly, only_when_needed, none\n  preferredCheckInTime   String @default(\"morning\") // morning, afternoon, evening, night\n\n  // Mental Health Context\n  concerns     String[] @default([]) // academic_stress, anxiety, etc.\n  supportLevel String   @default(\"somewhat\") // alone, somewhat, strong\n  riskLevel    String   @default(\"LOW\") // LOW, MODERATE, HIGH, CRITICAL\n\n  // Personalization\n  copingStyles       String[] @default([]) // exercise, journal, etc.\n  faithLevel         String   @default(\"somewhat_important\") // very_important, etc.\n  approachPreference String   @default(\"holistic\") // clinical, holistic, cultural, mixed\n  goals              String[] @default([]) // reduce_stress, improve_mood, etc.\n\n  // Complex Data (JSONB)\n  stressors           Json? // exams, assignments, etc. (1-5 scale)\n  trackingPreferences Json? // mood, sleep, etc. (Boolean map)\n  emergencyContacts   Json? // Name, Relationship, Phone\n\n  // Baseline & Metrics\n  baseline           Json? // mood, joinDate\n  moodCheckInsCount  Int       @default(0)\n  conversationsCount Int       @default(0)\n  lastActive         DateTime?\n\n  // Onboarding Status (Legacy/System)\n  onboardingStep      Int     @default(1)\n  onboardingCompleted Boolean @default(false)\n  verificationToken   String?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  assessments  Assessment[]\n  moods        Mood[]\n  chatMessages ChatMessage[]\n}\n\nmodel ChatMessage {\n  id        String   @id @default(uuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  content   String   @db.Text\n  role      String // 'user' or 'assistant'\n  createdAt DateTime @default(now())\n}\n\nmodel Assessment {\n  id        String   @id @default(uuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  type      String\n  score     Int\n  severity  String\n  createdAt DateTime @default(now())\n}\n\nmodel Mood {\n  id             String   @id @default(uuid())\n  userId         String\n  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  value          Int // 1-5 (Awful to Great)\n  note           String?\n  sentimentScore Float?\n  sentimentLabel String?\n  crisisFlag     Boolean  @default(false)\n  createdAt      DateTime @default(now())\n}\n\nmodel AcademicEvent {\n  id         String   @id @default(uuid())\n  title      String\n  type       String // 'exam', 'deadline', 'holiday'\n  date       DateTime\n  importance Int      @default(1) // 1-5\n  createdAt  DateTime @default(now())\n}\n",
  "inlineSchemaHash": "fa600d8285cf560a3e9d8de7c85259fa79f680010df6b173a7f22ce4c295a90f",
  "copyEngine": true
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"googleId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"isVerified\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"isAnonymous\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"displayName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"university\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"academicLevel\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"program\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"image\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"language\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"notificationPreference\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"preferredCheckInTime\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"concerns\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"supportLevel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"riskLevel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"copingStyles\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"faithLevel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"approachPreference\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"goals\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"stressors\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"trackingPreferences\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"emergencyContacts\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"baseline\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"moodCheckInsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"conversationsCount\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"lastActive\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"onboardingStep\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"onboardingCompleted\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"verificationToken\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"assessments\",\"kind\":\"object\",\"type\":\"Assessment\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"moods\",\"kind\":\"object\",\"type\":\"Mood\",\"relationName\":\"MoodToUser\"},{\"name\":\"chatMessages\",\"kind\":\"object\",\"type\":\"ChatMessage\",\"relationName\":\"ChatMessageToUser\"}],\"dbName\":null},\"ChatMessage\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ChatMessageToUser\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Assessment\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"AssessmentToUser\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"score\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"severity\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"Mood\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"MoodToUser\"},{\"name\":\"value\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"note\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentimentScore\",\"kind\":\"scalar\",\"type\":\"Float\"},{\"name\":\"sentimentLabel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"crisisFlag\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"AcademicEvent\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"date\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"importance\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}")
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

