
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


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

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

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
  ASSESSMENT: 'ASSESSMENT'
};

exports.GoalStatus = exports.$Enums.GoalStatus = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
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
  MoodGarden: 'MoodGarden'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
