
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model MoodEntry
 * 
 */
export type MoodEntry = $Result.DefaultSelection<Prisma.$MoodEntryPayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>
/**
 * Model AIInteraction
 * 
 */
export type AIInteraction = $Result.DefaultSelection<Prisma.$AIInteractionPayload>
/**
 * Model CrisisLog
 * 
 */
export type CrisisLog = $Result.DefaultSelection<Prisma.$CrisisLogPayload>
/**
 * Model UsageLog
 * 
 */
export type UsageLog = $Result.DefaultSelection<Prisma.$UsageLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const University: {
  KNUST: 'KNUST',
  UNIVERSITY_OF_GHANA: 'UNIVERSITY_OF_GHANA',
  UNIVERSITY_OF_CAPE_COAST: 'UNIVERSITY_OF_CAPE_COAST',
  ASHESI_UNIVERSITY: 'ASHESI_UNIVERSITY',
  GIMPA: 'GIMPA',
  OTHER: 'OTHER'
};

export type University = (typeof University)[keyof typeof University]


export const Language: {
  ENGLISH: 'ENGLISH',
  TWI: 'TWI',
  GA: 'GA',
  EWE: 'EWE'
};

export type Language = (typeof Language)[keyof typeof Language]


export const NotificationFrequency: {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  ONLY_WHEN_NEEDED: 'ONLY_WHEN_NEEDED',
  NONE: 'NONE'
};

export type NotificationFrequency = (typeof NotificationFrequency)[keyof typeof NotificationFrequency]


export const TimeOfDay: {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
  NIGHT: 'NIGHT'
};

export type TimeOfDay = (typeof TimeOfDay)[keyof typeof TimeOfDay]


export const Concern: {
  ACADEMIC_STRESS: 'ACADEMIC_STRESS',
  ANXIETY: 'ANXIETY',
  DEPRESSION: 'DEPRESSION',
  LONELINESS: 'LONELINESS',
  RELATIONSHIP_ISSUES: 'RELATIONSHIP_ISSUES',
  FINANCIAL_STRESS: 'FINANCIAL_STRESS',
  FAMILY_PRESSURE: 'FAMILY_PRESSURE',
  OTHER: 'OTHER'
};

export type Concern = (typeof Concern)[keyof typeof Concern]


export const SupportLevel: {
  ALONE: 'ALONE',
  SOMEWHAT: 'SOMEWHAT',
  STRONG: 'STRONG'
};

export type SupportLevel = (typeof SupportLevel)[keyof typeof SupportLevel]


export const RiskLevel: {
  LOW: 'LOW',
  MODERATE: 'MODERATE',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel]


export const CopingStyle: {
  EXERCISE: 'EXERCISE',
  JOURNAL: 'JOURNAL',
  PRAY: 'PRAY',
  TALK: 'TALK',
  MUSIC: 'MUSIC',
  SLEEP: 'SLEEP',
  MEDITATE: 'MEDITATE',
  OTHER: 'OTHER'
};

export type CopingStyle = (typeof CopingStyle)[keyof typeof CopingStyle]


export const FaithLevel: {
  VERY_IMPORTANT: 'VERY_IMPORTANT',
  SOMEWHAT_IMPORTANT: 'SOMEWHAT_IMPORTANT',
  NOT_IMPORTANT: 'NOT_IMPORTANT'
};

export type FaithLevel = (typeof FaithLevel)[keyof typeof FaithLevel]


export const ApproachPreference: {
  CLINICAL: 'CLINICAL',
  HOLISTIC: 'HOLISTIC',
  CULTURAL: 'CULTURAL',
  MIXED: 'MIXED'
};

export type ApproachPreference = (typeof ApproachPreference)[keyof typeof ApproachPreference]


export const Goal: {
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

export type Goal = (typeof Goal)[keyof typeof Goal]


export const ConversationStatus: {
  ACTIVE: 'ACTIVE',
  ENDED: 'ENDED',
  ARCHIVED: 'ARCHIVED'
};

export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus]


export const MessageRole: {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT'
};

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole]


export const AssessmentType: {
  PHQ9: 'PHQ9',
  GAD7: 'GAD7',
  PSS: 'PSS',
  CUSTOM: 'CUSTOM'
};

export type AssessmentType = (typeof AssessmentType)[keyof typeof AssessmentType]


export const Severity: {
  MINIMAL: 'MINIMAL',
  MILD: 'MILD',
  MODERATE: 'MODERATE',
  MODERATELY_SEVERE: 'MODERATELY_SEVERE',
  SEVERE: 'SEVERE'
};

export type Severity = (typeof Severity)[keyof typeof Severity]


export const Service: {
  GEMINI: 'GEMINI',
  CHAT: 'CHAT',
  MOOD: 'MOOD',
  ASSESSMENT: 'ASSESSMENT'
};

export type Service = (typeof Service)[keyof typeof Service]

}

export type University = $Enums.University

export const University: typeof $Enums.University

export type Language = $Enums.Language

export const Language: typeof $Enums.Language

export type NotificationFrequency = $Enums.NotificationFrequency

export const NotificationFrequency: typeof $Enums.NotificationFrequency

export type TimeOfDay = $Enums.TimeOfDay

export const TimeOfDay: typeof $Enums.TimeOfDay

export type Concern = $Enums.Concern

export const Concern: typeof $Enums.Concern

export type SupportLevel = $Enums.SupportLevel

export const SupportLevel: typeof $Enums.SupportLevel

export type RiskLevel = $Enums.RiskLevel

export const RiskLevel: typeof $Enums.RiskLevel

export type CopingStyle = $Enums.CopingStyle

export const CopingStyle: typeof $Enums.CopingStyle

export type FaithLevel = $Enums.FaithLevel

export const FaithLevel: typeof $Enums.FaithLevel

export type ApproachPreference = $Enums.ApproachPreference

export const ApproachPreference: typeof $Enums.ApproachPreference

export type Goal = $Enums.Goal

export const Goal: typeof $Enums.Goal

export type ConversationStatus = $Enums.ConversationStatus

export const ConversationStatus: typeof $Enums.ConversationStatus

export type MessageRole = $Enums.MessageRole

export const MessageRole: typeof $Enums.MessageRole

export type AssessmentType = $Enums.AssessmentType

export const AssessmentType: typeof $Enums.AssessmentType

export type Severity = $Enums.Severity

export const Severity: typeof $Enums.Severity

export type Service = $Enums.Service

export const Service: typeof $Enums.Service

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moodEntry`: Exposes CRUD operations for the **MoodEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoodEntries
    * const moodEntries = await prisma.moodEntry.findMany()
    * ```
    */
  get moodEntry(): Prisma.MoodEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aIInteraction`: Exposes CRUD operations for the **AIInteraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIInteractions
    * const aIInteractions = await prisma.aIInteraction.findMany()
    * ```
    */
  get aIInteraction(): Prisma.AIInteractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.crisisLog`: Exposes CRUD operations for the **CrisisLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CrisisLogs
    * const crisisLogs = await prisma.crisisLog.findMany()
    * ```
    */
  get crisisLog(): Prisma.CrisisLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageLog`: Exposes CRUD operations for the **UsageLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageLogs
    * const usageLogs = await prisma.usageLog.findMany()
    * ```
    */
  get usageLog(): Prisma.UsageLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Conversation: 'Conversation',
    Message: 'Message',
    MoodEntry: 'MoodEntry',
    Assessment: 'Assessment',
    AIInteraction: 'AIInteraction',
    CrisisLog: 'CrisisLog',
    UsageLog: 'UsageLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "conversation" | "message" | "moodEntry" | "assessment" | "aIInteraction" | "crisisLog" | "usageLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      MoodEntry: {
        payload: Prisma.$MoodEntryPayload<ExtArgs>
        fields: Prisma.MoodEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findFirst: {
            args: Prisma.MoodEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findMany: {
            args: Prisma.MoodEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          create: {
            args: Prisma.MoodEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          createMany: {
            args: Prisma.MoodEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          delete: {
            args: Prisma.MoodEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          update: {
            args: Prisma.MoodEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          deleteMany: {
            args: Prisma.MoodEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          upsert: {
            args: Prisma.MoodEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          aggregate: {
            args: Prisma.MoodEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoodEntry>
          }
          groupBy: {
            args: Prisma.MoodEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodEntryCountArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
          }
        }
      }
      AIInteraction: {
        payload: Prisma.$AIInteractionPayload<ExtArgs>
        fields: Prisma.AIInteractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIInteractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIInteractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          findFirst: {
            args: Prisma.AIInteractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIInteractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          findMany: {
            args: Prisma.AIInteractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>[]
          }
          create: {
            args: Prisma.AIInteractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          createMany: {
            args: Prisma.AIInteractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIInteractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>[]
          }
          delete: {
            args: Prisma.AIInteractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          update: {
            args: Prisma.AIInteractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          deleteMany: {
            args: Prisma.AIInteractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIInteractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AIInteractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>[]
          }
          upsert: {
            args: Prisma.AIInteractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIInteractionPayload>
          }
          aggregate: {
            args: Prisma.AIInteractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIInteraction>
          }
          groupBy: {
            args: Prisma.AIInteractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIInteractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIInteractionCountArgs<ExtArgs>
            result: $Utils.Optional<AIInteractionCountAggregateOutputType> | number
          }
        }
      }
      CrisisLog: {
        payload: Prisma.$CrisisLogPayload<ExtArgs>
        fields: Prisma.CrisisLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CrisisLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CrisisLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          findFirst: {
            args: Prisma.CrisisLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CrisisLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          findMany: {
            args: Prisma.CrisisLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>[]
          }
          create: {
            args: Prisma.CrisisLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          createMany: {
            args: Prisma.CrisisLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CrisisLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>[]
          }
          delete: {
            args: Prisma.CrisisLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          update: {
            args: Prisma.CrisisLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          deleteMany: {
            args: Prisma.CrisisLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CrisisLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CrisisLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>[]
          }
          upsert: {
            args: Prisma.CrisisLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CrisisLogPayload>
          }
          aggregate: {
            args: Prisma.CrisisLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCrisisLog>
          }
          groupBy: {
            args: Prisma.CrisisLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CrisisLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CrisisLogCountArgs<ExtArgs>
            result: $Utils.Optional<CrisisLogCountAggregateOutputType> | number
          }
        }
      }
      UsageLog: {
        payload: Prisma.$UsageLogPayload<ExtArgs>
        fields: Prisma.UsageLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findFirst: {
            args: Prisma.UsageLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          findMany: {
            args: Prisma.UsageLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          create: {
            args: Prisma.UsageLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          createMany: {
            args: Prisma.UsageLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          delete: {
            args: Prisma.UsageLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          update: {
            args: Prisma.UsageLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          deleteMany: {
            args: Prisma.UsageLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>[]
          }
          upsert: {
            args: Prisma.UsageLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLogPayload>
          }
          aggregate: {
            args: Prisma.UsageLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageLog>
          }
          groupBy: {
            args: Prisma.UsageLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageLogCountArgs<ExtArgs>
            result: $Utils.Optional<UsageLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.DriverAdapter | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    conversation?: ConversationOmit
    message?: MessageOmit
    moodEntry?: MoodEntryOmit
    assessment?: AssessmentOmit
    aIInteraction?: AIInteractionOmit
    crisisLog?: CrisisLogOmit
    usageLog?: UsageLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    conversations: number
    moodEntries: number
    assessments: number
    aiInteractions: number
    crisisLogs: number
    usageLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    moodEntries?: boolean | UserCountOutputTypeCountMoodEntriesArgs
    assessments?: boolean | UserCountOutputTypeCountAssessmentsArgs
    aiInteractions?: boolean | UserCountOutputTypeCountAiInteractionsArgs
    crisisLogs?: boolean | UserCountOutputTypeCountCrisisLogsArgs
    usageLogs?: boolean | UserCountOutputTypeCountUsageLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMoodEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAssessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIInteractionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCrisisLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrisisLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    messages: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ConversationCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    academicLevel: number | null
    baselineMood: number | null
    moodCheckInsCount: number | null
    conversationsCount: number | null
    onboardingStep: number | null
  }

  export type UserSumAggregateOutputType = {
    academicLevel: number | null
    baselineMood: number | null
    moodCheckInsCount: number | null
    conversationsCount: number | null
    onboardingStep: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    googleId: string | null
    isVerified: boolean | null
    isAnonymous: boolean | null
    verificationToken: string | null
    image: string | null
    displayName: string | null
    university: $Enums.University | null
    academicLevel: number | null
    program: string | null
    language: $Enums.Language | null
    notificationPreference: $Enums.NotificationFrequency | null
    preferredCheckInTime: $Enums.TimeOfDay | null
    supportLevel: $Enums.SupportLevel | null
    riskLevel: $Enums.RiskLevel | null
    faithLevel: $Enums.FaithLevel | null
    approachPreference: $Enums.ApproachPreference | null
    baselineMood: number | null
    joinDate: Date | null
    moodCheckInsCount: number | null
    conversationsCount: number | null
    lastActive: Date | null
    onboardingStep: number | null
    onboardingCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    googleId: string | null
    isVerified: boolean | null
    isAnonymous: boolean | null
    verificationToken: string | null
    image: string | null
    displayName: string | null
    university: $Enums.University | null
    academicLevel: number | null
    program: string | null
    language: $Enums.Language | null
    notificationPreference: $Enums.NotificationFrequency | null
    preferredCheckInTime: $Enums.TimeOfDay | null
    supportLevel: $Enums.SupportLevel | null
    riskLevel: $Enums.RiskLevel | null
    faithLevel: $Enums.FaithLevel | null
    approachPreference: $Enums.ApproachPreference | null
    baselineMood: number | null
    joinDate: Date | null
    moodCheckInsCount: number | null
    conversationsCount: number | null
    lastActive: Date | null
    onboardingStep: number | null
    onboardingCompleted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    googleId: number
    isVerified: number
    isAnonymous: number
    verificationToken: number
    image: number
    displayName: number
    university: number
    academicLevel: number
    program: number
    language: number
    notificationPreference: number
    preferredCheckInTime: number
    concerns: number
    supportLevel: number
    riskLevel: number
    copingStyles: number
    faithLevel: number
    approachPreference: number
    goals: number
    stressors: number
    trackingPreferences: number
    emergencyContacts: number
    baselineMood: number
    baseline: number
    joinDate: number
    moodCheckInsCount: number
    conversationsCount: number
    lastActive: number
    onboardingStep: number
    onboardingCompleted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    academicLevel?: true
    baselineMood?: true
    moodCheckInsCount?: true
    conversationsCount?: true
    onboardingStep?: true
  }

  export type UserSumAggregateInputType = {
    academicLevel?: true
    baselineMood?: true
    moodCheckInsCount?: true
    conversationsCount?: true
    onboardingStep?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    isVerified?: true
    isAnonymous?: true
    verificationToken?: true
    image?: true
    displayName?: true
    university?: true
    academicLevel?: true
    program?: true
    language?: true
    notificationPreference?: true
    preferredCheckInTime?: true
    supportLevel?: true
    riskLevel?: true
    faithLevel?: true
    approachPreference?: true
    baselineMood?: true
    joinDate?: true
    moodCheckInsCount?: true
    conversationsCount?: true
    lastActive?: true
    onboardingStep?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    isVerified?: true
    isAnonymous?: true
    verificationToken?: true
    image?: true
    displayName?: true
    university?: true
    academicLevel?: true
    program?: true
    language?: true
    notificationPreference?: true
    preferredCheckInTime?: true
    supportLevel?: true
    riskLevel?: true
    faithLevel?: true
    approachPreference?: true
    baselineMood?: true
    joinDate?: true
    moodCheckInsCount?: true
    conversationsCount?: true
    lastActive?: true
    onboardingStep?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    googleId?: true
    isVerified?: true
    isAnonymous?: true
    verificationToken?: true
    image?: true
    displayName?: true
    university?: true
    academicLevel?: true
    program?: true
    language?: true
    notificationPreference?: true
    preferredCheckInTime?: true
    concerns?: true
    supportLevel?: true
    riskLevel?: true
    copingStyles?: true
    faithLevel?: true
    approachPreference?: true
    goals?: true
    stressors?: true
    trackingPreferences?: true
    emergencyContacts?: true
    baselineMood?: true
    baseline?: true
    joinDate?: true
    moodCheckInsCount?: true
    conversationsCount?: true
    lastActive?: true
    onboardingStep?: true
    onboardingCompleted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string | null
    googleId: string | null
    isVerified: boolean
    isAnonymous: boolean
    verificationToken: string | null
    image: string | null
    displayName: string | null
    university: $Enums.University | null
    academicLevel: number | null
    program: string | null
    language: $Enums.Language
    notificationPreference: $Enums.NotificationFrequency
    preferredCheckInTime: $Enums.TimeOfDay
    concerns: $Enums.Concern[]
    supportLevel: $Enums.SupportLevel
    riskLevel: $Enums.RiskLevel
    copingStyles: $Enums.CopingStyle[]
    faithLevel: $Enums.FaithLevel
    approachPreference: $Enums.ApproachPreference
    goals: $Enums.Goal[]
    stressors: JsonValue | null
    trackingPreferences: JsonValue | null
    emergencyContacts: JsonValue | null
    baselineMood: number | null
    baseline: JsonValue | null
    joinDate: Date
    moodCheckInsCount: number
    conversationsCount: number
    lastActive: Date | null
    onboardingStep: number
    onboardingCompleted: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: boolean
    image?: boolean
    displayName?: boolean
    university?: boolean
    academicLevel?: boolean
    program?: boolean
    language?: boolean
    notificationPreference?: boolean
    preferredCheckInTime?: boolean
    concerns?: boolean
    supportLevel?: boolean
    riskLevel?: boolean
    copingStyles?: boolean
    faithLevel?: boolean
    approachPreference?: boolean
    goals?: boolean
    stressors?: boolean
    trackingPreferences?: boolean
    emergencyContacts?: boolean
    baselineMood?: boolean
    baseline?: boolean
    joinDate?: boolean
    moodCheckInsCount?: boolean
    conversationsCount?: boolean
    lastActive?: boolean
    onboardingStep?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    moodEntries?: boolean | User$moodEntriesArgs<ExtArgs>
    assessments?: boolean | User$assessmentsArgs<ExtArgs>
    aiInteractions?: boolean | User$aiInteractionsArgs<ExtArgs>
    crisisLogs?: boolean | User$crisisLogsArgs<ExtArgs>
    usageLogs?: boolean | User$usageLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: boolean
    image?: boolean
    displayName?: boolean
    university?: boolean
    academicLevel?: boolean
    program?: boolean
    language?: boolean
    notificationPreference?: boolean
    preferredCheckInTime?: boolean
    concerns?: boolean
    supportLevel?: boolean
    riskLevel?: boolean
    copingStyles?: boolean
    faithLevel?: boolean
    approachPreference?: boolean
    goals?: boolean
    stressors?: boolean
    trackingPreferences?: boolean
    emergencyContacts?: boolean
    baselineMood?: boolean
    baseline?: boolean
    joinDate?: boolean
    moodCheckInsCount?: boolean
    conversationsCount?: boolean
    lastActive?: boolean
    onboardingStep?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: boolean
    image?: boolean
    displayName?: boolean
    university?: boolean
    academicLevel?: boolean
    program?: boolean
    language?: boolean
    notificationPreference?: boolean
    preferredCheckInTime?: boolean
    concerns?: boolean
    supportLevel?: boolean
    riskLevel?: boolean
    copingStyles?: boolean
    faithLevel?: boolean
    approachPreference?: boolean
    goals?: boolean
    stressors?: boolean
    trackingPreferences?: boolean
    emergencyContacts?: boolean
    baselineMood?: boolean
    baseline?: boolean
    joinDate?: boolean
    moodCheckInsCount?: boolean
    conversationsCount?: boolean
    lastActive?: boolean
    onboardingStep?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    googleId?: boolean
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: boolean
    image?: boolean
    displayName?: boolean
    university?: boolean
    academicLevel?: boolean
    program?: boolean
    language?: boolean
    notificationPreference?: boolean
    preferredCheckInTime?: boolean
    concerns?: boolean
    supportLevel?: boolean
    riskLevel?: boolean
    copingStyles?: boolean
    faithLevel?: boolean
    approachPreference?: boolean
    goals?: boolean
    stressors?: boolean
    trackingPreferences?: boolean
    emergencyContacts?: boolean
    baselineMood?: boolean
    baseline?: boolean
    joinDate?: boolean
    moodCheckInsCount?: boolean
    conversationsCount?: boolean
    lastActive?: boolean
    onboardingStep?: boolean
    onboardingCompleted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "googleId" | "isVerified" | "isAnonymous" | "verificationToken" | "image" | "displayName" | "university" | "academicLevel" | "program" | "language" | "notificationPreference" | "preferredCheckInTime" | "concerns" | "supportLevel" | "riskLevel" | "copingStyles" | "faithLevel" | "approachPreference" | "goals" | "stressors" | "trackingPreferences" | "emergencyContacts" | "baselineMood" | "baseline" | "joinDate" | "moodCheckInsCount" | "conversationsCount" | "lastActive" | "onboardingStep" | "onboardingCompleted" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    moodEntries?: boolean | User$moodEntriesArgs<ExtArgs>
    assessments?: boolean | User$assessmentsArgs<ExtArgs>
    aiInteractions?: boolean | User$aiInteractionsArgs<ExtArgs>
    crisisLogs?: boolean | User$crisisLogsArgs<ExtArgs>
    usageLogs?: boolean | User$usageLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      moodEntries: Prisma.$MoodEntryPayload<ExtArgs>[]
      assessments: Prisma.$AssessmentPayload<ExtArgs>[]
      aiInteractions: Prisma.$AIInteractionPayload<ExtArgs>[]
      crisisLogs: Prisma.$CrisisLogPayload<ExtArgs>[]
      usageLogs: Prisma.$UsageLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string | null
      googleId: string | null
      isVerified: boolean
      isAnonymous: boolean
      verificationToken: string | null
      image: string | null
      displayName: string | null
      university: $Enums.University | null
      academicLevel: number | null
      program: string | null
      language: $Enums.Language
      notificationPreference: $Enums.NotificationFrequency
      preferredCheckInTime: $Enums.TimeOfDay
      concerns: $Enums.Concern[]
      supportLevel: $Enums.SupportLevel
      riskLevel: $Enums.RiskLevel
      copingStyles: $Enums.CopingStyle[]
      faithLevel: $Enums.FaithLevel
      approachPreference: $Enums.ApproachPreference
      goals: $Enums.Goal[]
      stressors: Prisma.JsonValue | null
      trackingPreferences: Prisma.JsonValue | null
      emergencyContacts: Prisma.JsonValue | null
      baselineMood: number | null
      baseline: Prisma.JsonValue | null
      joinDate: Date
      moodCheckInsCount: number
      conversationsCount: number
      lastActive: Date | null
      onboardingStep: number
      onboardingCompleted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    moodEntries<T extends User$moodEntriesArgs<ExtArgs> = {}>(args?: Subset<T, User$moodEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    assessments<T extends User$assessmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    aiInteractions<T extends User$aiInteractionsArgs<ExtArgs> = {}>(args?: Subset<T, User$aiInteractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    crisisLogs<T extends User$crisisLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$crisisLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    usageLogs<T extends User$usageLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$usageLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly isAnonymous: FieldRef<"User", 'Boolean'>
    readonly verificationToken: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly university: FieldRef<"User", 'University'>
    readonly academicLevel: FieldRef<"User", 'Int'>
    readonly program: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'Language'>
    readonly notificationPreference: FieldRef<"User", 'NotificationFrequency'>
    readonly preferredCheckInTime: FieldRef<"User", 'TimeOfDay'>
    readonly concerns: FieldRef<"User", 'Concern[]'>
    readonly supportLevel: FieldRef<"User", 'SupportLevel'>
    readonly riskLevel: FieldRef<"User", 'RiskLevel'>
    readonly copingStyles: FieldRef<"User", 'CopingStyle[]'>
    readonly faithLevel: FieldRef<"User", 'FaithLevel'>
    readonly approachPreference: FieldRef<"User", 'ApproachPreference'>
    readonly goals: FieldRef<"User", 'Goal[]'>
    readonly stressors: FieldRef<"User", 'Json'>
    readonly trackingPreferences: FieldRef<"User", 'Json'>
    readonly emergencyContacts: FieldRef<"User", 'Json'>
    readonly baselineMood: FieldRef<"User", 'Int'>
    readonly baseline: FieldRef<"User", 'Json'>
    readonly joinDate: FieldRef<"User", 'DateTime'>
    readonly moodCheckInsCount: FieldRef<"User", 'Int'>
    readonly conversationsCount: FieldRef<"User", 'Int'>
    readonly lastActive: FieldRef<"User", 'DateTime'>
    readonly onboardingStep: FieldRef<"User", 'Int'>
    readonly onboardingCompleted: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.moodEntries
   */
  export type User$moodEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    where?: MoodEntryWhereInput
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    cursor?: MoodEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * User.assessments
   */
  export type User$assessmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    cursor?: AssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * User.aiInteractions
   */
  export type User$aiInteractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    where?: AIInteractionWhereInput
    orderBy?: AIInteractionOrderByWithRelationInput | AIInteractionOrderByWithRelationInput[]
    cursor?: AIInteractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIInteractionScalarFieldEnum | AIInteractionScalarFieldEnum[]
  }

  /**
   * User.crisisLogs
   */
  export type User$crisisLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    where?: CrisisLogWhereInput
    orderBy?: CrisisLogOrderByWithRelationInput | CrisisLogOrderByWithRelationInput[]
    cursor?: CrisisLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CrisisLogScalarFieldEnum | CrisisLogScalarFieldEnum[]
  }

  /**
   * User.usageLogs
   */
  export type User$usageLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    cursor?: UsageLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    startedAt: Date | null
    lastMessageAt: Date | null
    endedAt: Date | null
    status: $Enums.ConversationStatus | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    startedAt: Date | null
    lastMessageAt: Date | null
    endedAt: Date | null
    status: $Enums.ConversationStatus | null
    summary: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    userId: number
    startedAt: number
    lastMessageAt: number
    endedAt: number
    status: number
    metadata: number
    summary: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    userId?: true
    startedAt?: true
    lastMessageAt?: true
    endedAt?: true
    status?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    userId?: true
    startedAt?: true
    lastMessageAt?: true
    endedAt?: true
    status?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    userId?: true
    startedAt?: true
    lastMessageAt?: true
    endedAt?: true
    status?: true
    metadata?: true
    summary?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    userId: string
    startedAt: Date
    lastMessageAt: Date
    endedAt: Date | null
    status: $Enums.ConversationStatus
    metadata: JsonValue | null
    summary: string | null
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startedAt?: boolean
    lastMessageAt?: boolean
    endedAt?: boolean
    status?: boolean
    metadata?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startedAt?: boolean
    lastMessageAt?: boolean
    endedAt?: boolean
    status?: boolean
    metadata?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    startedAt?: boolean
    lastMessageAt?: boolean
    endedAt?: boolean
    status?: boolean
    metadata?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    userId?: boolean
    startedAt?: boolean
    lastMessageAt?: boolean
    endedAt?: boolean
    status?: boolean
    metadata?: boolean
    summary?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "startedAt" | "lastMessageAt" | "endedAt" | "status" | "metadata" | "summary" | "createdAt" | "updatedAt", ExtArgs["result"]["conversation"]>
  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    messages?: boolean | Conversation$messagesArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      startedAt: Date
      lastMessageAt: Date
      endedAt: Date | null
      status: $Enums.ConversationStatus
      metadata: Prisma.JsonValue | null
      summary: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations and returns the data updated in the database.
     * @param {ConversationUpdateManyAndReturnArgs} args - Arguments to update many Conversations.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConversationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    messages<T extends Conversation$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Conversation model
   */ 
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly userId: FieldRef<"Conversation", 'String'>
    readonly startedAt: FieldRef<"Conversation", 'DateTime'>
    readonly lastMessageAt: FieldRef<"Conversation", 'DateTime'>
    readonly endedAt: FieldRef<"Conversation", 'DateTime'>
    readonly status: FieldRef<"Conversation", 'ConversationStatus'>
    readonly metadata: FieldRef<"Conversation", 'Json'>
    readonly summary: FieldRef<"Conversation", 'String'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation updateManyAndReturn
   */
  export type ConversationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation.messages
   */
  export type Conversation$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Conversation
     */
    omit?: ConversationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: $Enums.MessageRole | null
    content: string | null
    timestamp: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    role: $Enums.MessageRole | null
    content: string | null
    timestamp: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    conversationId: number
    role: number
    content: number
    timestamp: number
    metadata: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    timestamp?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    timestamp?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    conversationId?: true
    role?: true
    content?: true
    timestamp?: true
    metadata?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    conversationId: string
    role: $Enums.MessageRole
    content: string
    timestamp: Date
    metadata: JsonValue | null
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    metadata?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    metadata?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    metadata?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    conversationId?: boolean
    role?: boolean
    content?: boolean
    timestamp?: boolean
    metadata?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "conversationId" | "role" | "content" | "timestamp" | "metadata", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      role: $Enums.MessageRole
      content: string
      timestamp: Date
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */ 
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly conversationId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'MessageRole'>
    readonly content: FieldRef<"Message", 'String'>
    readonly timestamp: FieldRef<"Message", 'DateTime'>
    readonly metadata: FieldRef<"Message", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model MoodEntry
   */

  export type AggregateMoodEntry = {
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  export type MoodEntryAvgAggregateOutputType = {
    mood: number | null
    energy: number | null
    sleep: number | null
    social: number | null
    anxiety: number | null
    sentimentScore: number | null
  }

  export type MoodEntrySumAggregateOutputType = {
    mood: number | null
    energy: number | null
    sleep: number | null
    social: number | null
    anxiety: number | null
    sentimentScore: number | null
  }

  export type MoodEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    mood: number | null
    energy: number | null
    sleep: number | null
    social: number | null
    anxiety: number | null
    notes: string | null
    sentimentScore: number | null
    sentimentLabel: string | null
    crisisFlag: boolean | null
    createdAt: Date | null
  }

  export type MoodEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    mood: number | null
    energy: number | null
    sleep: number | null
    social: number | null
    anxiety: number | null
    notes: string | null
    sentimentScore: number | null
    sentimentLabel: string | null
    crisisFlag: boolean | null
    createdAt: Date | null
  }

  export type MoodEntryCountAggregateOutputType = {
    id: number
    userId: number
    mood: number
    energy: number
    sleep: number
    social: number
    anxiety: number
    notes: number
    tags: number
    sentimentScore: number
    sentimentLabel: number
    crisisFlag: number
    createdAt: number
    _all: number
  }


  export type MoodEntryAvgAggregateInputType = {
    mood?: true
    energy?: true
    sleep?: true
    social?: true
    anxiety?: true
    sentimentScore?: true
  }

  export type MoodEntrySumAggregateInputType = {
    mood?: true
    energy?: true
    sleep?: true
    social?: true
    anxiety?: true
    sentimentScore?: true
  }

  export type MoodEntryMinAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    energy?: true
    sleep?: true
    social?: true
    anxiety?: true
    notes?: true
    sentimentScore?: true
    sentimentLabel?: true
    crisisFlag?: true
    createdAt?: true
  }

  export type MoodEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    energy?: true
    sleep?: true
    social?: true
    anxiety?: true
    notes?: true
    sentimentScore?: true
    sentimentLabel?: true
    crisisFlag?: true
    createdAt?: true
  }

  export type MoodEntryCountAggregateInputType = {
    id?: true
    userId?: true
    mood?: true
    energy?: true
    sleep?: true
    social?: true
    anxiety?: true
    notes?: true
    tags?: true
    sentimentScore?: true
    sentimentLabel?: true
    crisisFlag?: true
    createdAt?: true
    _all?: true
  }

  export type MoodEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntry to aggregate.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoodEntries
    **/
    _count?: true | MoodEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodEntryMaxAggregateInputType
  }

  export type GetMoodEntryAggregateType<T extends MoodEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateMoodEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoodEntry[P]>
      : GetScalarType<T[P], AggregateMoodEntry[P]>
  }




  export type MoodEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodEntryWhereInput
    orderBy?: MoodEntryOrderByWithAggregationInput | MoodEntryOrderByWithAggregationInput[]
    by: MoodEntryScalarFieldEnum[] | MoodEntryScalarFieldEnum
    having?: MoodEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodEntryCountAggregateInputType | true
    _avg?: MoodEntryAvgAggregateInputType
    _sum?: MoodEntrySumAggregateInputType
    _min?: MoodEntryMinAggregateInputType
    _max?: MoodEntryMaxAggregateInputType
  }

  export type MoodEntryGroupByOutputType = {
    id: string
    userId: string
    mood: number
    energy: number | null
    sleep: number | null
    social: number | null
    anxiety: number | null
    notes: string | null
    tags: string[]
    sentimentScore: number | null
    sentimentLabel: string | null
    crisisFlag: boolean
    createdAt: Date
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  type GetMoodEntryGroupByPayload<T extends MoodEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
            : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
        }
      >
    >


  export type MoodEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    energy?: boolean
    sleep?: boolean
    social?: boolean
    anxiety?: boolean
    notes?: boolean
    tags?: boolean
    sentimentScore?: boolean
    sentimentLabel?: boolean
    crisisFlag?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    energy?: boolean
    sleep?: boolean
    social?: boolean
    anxiety?: boolean
    notes?: boolean
    tags?: boolean
    sentimentScore?: boolean
    sentimentLabel?: boolean
    crisisFlag?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    mood?: boolean
    energy?: boolean
    sleep?: boolean
    social?: boolean
    anxiety?: boolean
    notes?: boolean
    tags?: boolean
    sentimentScore?: boolean
    sentimentLabel?: boolean
    crisisFlag?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    mood?: boolean
    energy?: boolean
    sleep?: boolean
    social?: boolean
    anxiety?: boolean
    notes?: boolean
    tags?: boolean
    sentimentScore?: boolean
    sentimentLabel?: boolean
    crisisFlag?: boolean
    createdAt?: boolean
  }

  export type MoodEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "mood" | "energy" | "sleep" | "social" | "anxiety" | "notes" | "tags" | "sentimentScore" | "sentimentLabel" | "crisisFlag" | "createdAt", ExtArgs["result"]["moodEntry"]>
  export type MoodEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MoodEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MoodEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoodEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      mood: number
      energy: number | null
      sleep: number | null
      social: number | null
      anxiety: number | null
      notes: string | null
      tags: string[]
      sentimentScore: number | null
      sentimentLabel: string | null
      crisisFlag: boolean
      createdAt: Date
    }, ExtArgs["result"]["moodEntry"]>
    composites: {}
  }

  type MoodEntryGetPayload<S extends boolean | null | undefined | MoodEntryDefaultArgs> = $Result.GetResult<Prisma.$MoodEntryPayload, S>

  type MoodEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodEntryCountAggregateInputType | true
    }

  export interface MoodEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoodEntry'], meta: { name: 'MoodEntry' } }
    /**
     * Find zero or one MoodEntry that matches the filter.
     * @param {MoodEntryFindUniqueArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodEntryFindUniqueArgs>(args: SelectSubset<T, MoodEntryFindUniqueArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one MoodEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodEntryFindUniqueOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first MoodEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodEntryFindFirstArgs>(args?: SelectSubset<T, MoodEntryFindFirstArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first MoodEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more MoodEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany()
     * 
     * // Get first 10 MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodEntryFindManyArgs>(args?: SelectSubset<T, MoodEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a MoodEntry.
     * @param {MoodEntryCreateArgs} args - Arguments to create a MoodEntry.
     * @example
     * // Create one MoodEntry
     * const MoodEntry = await prisma.moodEntry.create({
     *   data: {
     *     // ... data to create a MoodEntry
     *   }
     * })
     * 
     */
    create<T extends MoodEntryCreateArgs>(args: SelectSubset<T, MoodEntryCreateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many MoodEntries.
     * @param {MoodEntryCreateManyArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodEntryCreateManyArgs>(args?: SelectSubset<T, MoodEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoodEntries and returns the data saved in the database.
     * @param {MoodEntryCreateManyAndReturnArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a MoodEntry.
     * @param {MoodEntryDeleteArgs} args - Arguments to delete one MoodEntry.
     * @example
     * // Delete one MoodEntry
     * const MoodEntry = await prisma.moodEntry.delete({
     *   where: {
     *     // ... filter to delete one MoodEntry
     *   }
     * })
     * 
     */
    delete<T extends MoodEntryDeleteArgs>(args: SelectSubset<T, MoodEntryDeleteArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one MoodEntry.
     * @param {MoodEntryUpdateArgs} args - Arguments to update one MoodEntry.
     * @example
     * // Update one MoodEntry
     * const moodEntry = await prisma.moodEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodEntryUpdateArgs>(args: SelectSubset<T, MoodEntryUpdateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more MoodEntries.
     * @param {MoodEntryDeleteManyArgs} args - Arguments to filter MoodEntries to delete.
     * @example
     * // Delete a few MoodEntries
     * const { count } = await prisma.moodEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodEntryDeleteManyArgs>(args?: SelectSubset<T, MoodEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodEntryUpdateManyArgs>(args: SelectSubset<T, MoodEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries and returns the data updated in the database.
     * @param {MoodEntryUpdateManyAndReturnArgs} args - Arguments to update many MoodEntries.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MoodEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one MoodEntry.
     * @param {MoodEntryUpsertArgs} args - Arguments to update or create a MoodEntry.
     * @example
     * // Update or create a MoodEntry
     * const moodEntry = await prisma.moodEntry.upsert({
     *   create: {
     *     // ... data to create a MoodEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoodEntry we want to update
     *   }
     * })
     */
    upsert<T extends MoodEntryUpsertArgs>(args: SelectSubset<T, MoodEntryUpsertArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryCountArgs} args - Arguments to filter MoodEntries to count.
     * @example
     * // Count the number of MoodEntries
     * const count = await prisma.moodEntry.count({
     *   where: {
     *     // ... the filter for the MoodEntries we want to count
     *   }
     * })
    **/
    count<T extends MoodEntryCountArgs>(
      args?: Subset<T, MoodEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MoodEntryAggregateArgs>(args: Subset<T, MoodEntryAggregateArgs>): Prisma.PrismaPromise<GetMoodEntryAggregateType<T>>

    /**
     * Group by MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MoodEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodEntryGroupByArgs['orderBy'] }
        : { orderBy?: MoodEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoodEntry model
   */
  readonly fields: MoodEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoodEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoodEntry model
   */ 
  interface MoodEntryFieldRefs {
    readonly id: FieldRef<"MoodEntry", 'String'>
    readonly userId: FieldRef<"MoodEntry", 'String'>
    readonly mood: FieldRef<"MoodEntry", 'Int'>
    readonly energy: FieldRef<"MoodEntry", 'Int'>
    readonly sleep: FieldRef<"MoodEntry", 'Int'>
    readonly social: FieldRef<"MoodEntry", 'Int'>
    readonly anxiety: FieldRef<"MoodEntry", 'Int'>
    readonly notes: FieldRef<"MoodEntry", 'String'>
    readonly tags: FieldRef<"MoodEntry", 'String[]'>
    readonly sentimentScore: FieldRef<"MoodEntry", 'Float'>
    readonly sentimentLabel: FieldRef<"MoodEntry", 'String'>
    readonly crisisFlag: FieldRef<"MoodEntry", 'Boolean'>
    readonly createdAt: FieldRef<"MoodEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MoodEntry findUnique
   */
  export type MoodEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findUniqueOrThrow
   */
  export type MoodEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findFirst
   */
  export type MoodEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findFirstOrThrow
   */
  export type MoodEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findMany
   */
  export type MoodEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter, which MoodEntries to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry create
   */
  export type MoodEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a MoodEntry.
     */
    data: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
  }

  /**
   * MoodEntry createMany
   */
  export type MoodEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoodEntry createManyAndReturn
   */
  export type MoodEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodEntry update
   */
  export type MoodEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a MoodEntry.
     */
    data: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
    /**
     * Choose, which MoodEntry to update.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry updateMany
   */
  export type MoodEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
  }

  /**
   * MoodEntry updateManyAndReturn
   */
  export type MoodEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MoodEntry upsert
   */
  export type MoodEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the MoodEntry to update in case it exists.
     */
    where: MoodEntryWhereUniqueInput
    /**
     * In case the MoodEntry found by the `where` argument doesn't exist, create a new MoodEntry with this data.
     */
    create: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
    /**
     * In case the MoodEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
  }

  /**
   * MoodEntry delete
   */
  export type MoodEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
    /**
     * Filter which MoodEntry to delete.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry deleteMany
   */
  export type MoodEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntries to delete
     */
    where?: MoodEntryWhereInput
  }

  /**
   * MoodEntry without action
   */
  export type MoodEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MoodEntryInclude<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentAvgAggregateOutputType = {
    score: number | null
  }

  export type AssessmentSumAggregateOutputType = {
    score: number | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.AssessmentType | null
    score: number | null
    severity: $Enums.Severity | null
    interpretation: string | null
    createdAt: Date | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: $Enums.AssessmentType | null
    score: number | null
    severity: $Enums.Severity | null
    interpretation: string | null
    createdAt: Date | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    responses: number
    score: number
    severity: number
    interpretation: number
    createdAt: number
    _all: number
  }


  export type AssessmentAvgAggregateInputType = {
    score?: true
  }

  export type AssessmentSumAggregateInputType = {
    score?: true
  }

  export type AssessmentMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    score?: true
    severity?: true
    interpretation?: true
    createdAt?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    score?: true
    severity?: true
    interpretation?: true
    createdAt?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    responses?: true
    score?: true
    severity?: true
    interpretation?: true
    createdAt?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _avg?: AssessmentAvgAggregateInputType
    _sum?: AssessmentSumAggregateInputType
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: string
    userId: string
    type: $Enums.AssessmentType
    responses: JsonValue
    score: number
    severity: $Enums.Severity | null
    interpretation: string | null
    createdAt: Date
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    responses?: boolean
    score?: boolean
    severity?: boolean
    interpretation?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    responses?: boolean
    score?: boolean
    severity?: boolean
    interpretation?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    responses?: boolean
    score?: boolean
    severity?: boolean
    interpretation?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    responses?: boolean
    score?: boolean
    severity?: boolean
    interpretation?: boolean
    createdAt?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "responses" | "score" | "severity" | "interpretation" | "createdAt", ExtArgs["result"]["assessment"]>
  export type AssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: $Enums.AssessmentType
      responses: Prisma.JsonValue
      score: number
      severity: $Enums.Severity | null
      interpretation: string | null
      createdAt: Date
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assessments and returns the data saved in the database.
     * @param {AssessmentCreateManyAndReturnArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments and returns the data updated in the database.
     * @param {AssessmentUpdateManyAndReturnArgs} args - Arguments to update many Assessments.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Assessment model
   */ 
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'String'>
    readonly userId: FieldRef<"Assessment", 'String'>
    readonly type: FieldRef<"Assessment", 'AssessmentType'>
    readonly responses: FieldRef<"Assessment", 'Json'>
    readonly score: FieldRef<"Assessment", 'Int'>
    readonly severity: FieldRef<"Assessment", 'Severity'>
    readonly interpretation: FieldRef<"Assessment", 'String'>
    readonly createdAt: FieldRef<"Assessment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment createManyAndReturn
   */
  export type AssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
  }

  /**
   * Assessment updateManyAndReturn
   */
  export type AssessmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
  }


  /**
   * Model AIInteraction
   */

  export type AggregateAIInteraction = {
    _count: AIInteractionCountAggregateOutputType | null
    _avg: AIInteractionAvgAggregateOutputType | null
    _sum: AIInteractionSumAggregateOutputType | null
    _min: AIInteractionMinAggregateOutputType | null
    _max: AIInteractionMaxAggregateOutputType | null
  }

  export type AIInteractionAvgAggregateOutputType = {
    tokensUsed: number | null
    emotionalIntensity: number | null
    responseTime: number | null
  }

  export type AIInteractionSumAggregateOutputType = {
    tokensUsed: number | null
    emotionalIntensity: number | null
    responseTime: number | null
  }

  export type AIInteractionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    userMessage: string | null
    aiResponse: string | null
    model: string | null
    tokensUsed: number | null
    crisisDetected: boolean | null
    emotionalIntensity: number | null
    responseTime: number | null
    timestamp: Date | null
  }

  export type AIInteractionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    userMessage: string | null
    aiResponse: string | null
    model: string | null
    tokensUsed: number | null
    crisisDetected: boolean | null
    emotionalIntensity: number | null
    responseTime: number | null
    timestamp: Date | null
  }

  export type AIInteractionCountAggregateOutputType = {
    id: number
    userId: number
    userMessage: number
    aiResponse: number
    model: number
    tokensUsed: number
    crisisDetected: number
    emotionalIntensity: number
    responseTime: number
    timestamp: number
    _all: number
  }


  export type AIInteractionAvgAggregateInputType = {
    tokensUsed?: true
    emotionalIntensity?: true
    responseTime?: true
  }

  export type AIInteractionSumAggregateInputType = {
    tokensUsed?: true
    emotionalIntensity?: true
    responseTime?: true
  }

  export type AIInteractionMinAggregateInputType = {
    id?: true
    userId?: true
    userMessage?: true
    aiResponse?: true
    model?: true
    tokensUsed?: true
    crisisDetected?: true
    emotionalIntensity?: true
    responseTime?: true
    timestamp?: true
  }

  export type AIInteractionMaxAggregateInputType = {
    id?: true
    userId?: true
    userMessage?: true
    aiResponse?: true
    model?: true
    tokensUsed?: true
    crisisDetected?: true
    emotionalIntensity?: true
    responseTime?: true
    timestamp?: true
  }

  export type AIInteractionCountAggregateInputType = {
    id?: true
    userId?: true
    userMessage?: true
    aiResponse?: true
    model?: true
    tokensUsed?: true
    crisisDetected?: true
    emotionalIntensity?: true
    responseTime?: true
    timestamp?: true
    _all?: true
  }

  export type AIInteractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIInteraction to aggregate.
     */
    where?: AIInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIInteractions to fetch.
     */
    orderBy?: AIInteractionOrderByWithRelationInput | AIInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIInteractions
    **/
    _count?: true | AIInteractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AIInteractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AIInteractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIInteractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIInteractionMaxAggregateInputType
  }

  export type GetAIInteractionAggregateType<T extends AIInteractionAggregateArgs> = {
        [P in keyof T & keyof AggregateAIInteraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIInteraction[P]>
      : GetScalarType<T[P], AggregateAIInteraction[P]>
  }




  export type AIInteractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIInteractionWhereInput
    orderBy?: AIInteractionOrderByWithAggregationInput | AIInteractionOrderByWithAggregationInput[]
    by: AIInteractionScalarFieldEnum[] | AIInteractionScalarFieldEnum
    having?: AIInteractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIInteractionCountAggregateInputType | true
    _avg?: AIInteractionAvgAggregateInputType
    _sum?: AIInteractionSumAggregateInputType
    _min?: AIInteractionMinAggregateInputType
    _max?: AIInteractionMaxAggregateInputType
  }

  export type AIInteractionGroupByOutputType = {
    id: string
    userId: string
    userMessage: string
    aiResponse: string
    model: string | null
    tokensUsed: number | null
    crisisDetected: boolean
    emotionalIntensity: number | null
    responseTime: number | null
    timestamp: Date
    _count: AIInteractionCountAggregateOutputType | null
    _avg: AIInteractionAvgAggregateOutputType | null
    _sum: AIInteractionSumAggregateOutputType | null
    _min: AIInteractionMinAggregateOutputType | null
    _max: AIInteractionMaxAggregateOutputType | null
  }

  type GetAIInteractionGroupByPayload<T extends AIInteractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIInteractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIInteractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIInteractionGroupByOutputType[P]>
            : GetScalarType<T[P], AIInteractionGroupByOutputType[P]>
        }
      >
    >


  export type AIInteractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userMessage?: boolean
    aiResponse?: boolean
    model?: boolean
    tokensUsed?: boolean
    crisisDetected?: boolean
    emotionalIntensity?: boolean
    responseTime?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIInteraction"]>

  export type AIInteractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userMessage?: boolean
    aiResponse?: boolean
    model?: boolean
    tokensUsed?: boolean
    crisisDetected?: boolean
    emotionalIntensity?: boolean
    responseTime?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIInteraction"]>

  export type AIInteractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    userMessage?: boolean
    aiResponse?: boolean
    model?: boolean
    tokensUsed?: boolean
    crisisDetected?: boolean
    emotionalIntensity?: boolean
    responseTime?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIInteraction"]>

  export type AIInteractionSelectScalar = {
    id?: boolean
    userId?: boolean
    userMessage?: boolean
    aiResponse?: boolean
    model?: boolean
    tokensUsed?: boolean
    crisisDetected?: boolean
    emotionalIntensity?: boolean
    responseTime?: boolean
    timestamp?: boolean
  }

  export type AIInteractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "userMessage" | "aiResponse" | "model" | "tokensUsed" | "crisisDetected" | "emotionalIntensity" | "responseTime" | "timestamp", ExtArgs["result"]["aIInteraction"]>
  export type AIInteractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AIInteractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AIInteractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AIInteractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIInteraction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      userMessage: string
      aiResponse: string
      model: string | null
      tokensUsed: number | null
      crisisDetected: boolean
      emotionalIntensity: number | null
      responseTime: number | null
      timestamp: Date
    }, ExtArgs["result"]["aIInteraction"]>
    composites: {}
  }

  type AIInteractionGetPayload<S extends boolean | null | undefined | AIInteractionDefaultArgs> = $Result.GetResult<Prisma.$AIInteractionPayload, S>

  type AIInteractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AIInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AIInteractionCountAggregateInputType | true
    }

  export interface AIInteractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIInteraction'], meta: { name: 'AIInteraction' } }
    /**
     * Find zero or one AIInteraction that matches the filter.
     * @param {AIInteractionFindUniqueArgs} args - Arguments to find a AIInteraction
     * @example
     * // Get one AIInteraction
     * const aIInteraction = await prisma.aIInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIInteractionFindUniqueArgs>(args: SelectSubset<T, AIInteractionFindUniqueArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AIInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AIInteractionFindUniqueOrThrowArgs} args - Arguments to find a AIInteraction
     * @example
     * // Get one AIInteraction
     * const aIInteraction = await prisma.aIInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIInteractionFindUniqueOrThrowArgs>(args: SelectSubset<T, AIInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AIInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionFindFirstArgs} args - Arguments to find a AIInteraction
     * @example
     * // Get one AIInteraction
     * const aIInteraction = await prisma.aIInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIInteractionFindFirstArgs>(args?: SelectSubset<T, AIInteractionFindFirstArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AIInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionFindFirstOrThrowArgs} args - Arguments to find a AIInteraction
     * @example
     * // Get one AIInteraction
     * const aIInteraction = await prisma.aIInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIInteractionFindFirstOrThrowArgs>(args?: SelectSubset<T, AIInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AIInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIInteractions
     * const aIInteractions = await prisma.aIInteraction.findMany()
     * 
     * // Get first 10 AIInteractions
     * const aIInteractions = await prisma.aIInteraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIInteractionWithIdOnly = await prisma.aIInteraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIInteractionFindManyArgs>(args?: SelectSubset<T, AIInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AIInteraction.
     * @param {AIInteractionCreateArgs} args - Arguments to create a AIInteraction.
     * @example
     * // Create one AIInteraction
     * const AIInteraction = await prisma.aIInteraction.create({
     *   data: {
     *     // ... data to create a AIInteraction
     *   }
     * })
     * 
     */
    create<T extends AIInteractionCreateArgs>(args: SelectSubset<T, AIInteractionCreateArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AIInteractions.
     * @param {AIInteractionCreateManyArgs} args - Arguments to create many AIInteractions.
     * @example
     * // Create many AIInteractions
     * const aIInteraction = await prisma.aIInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIInteractionCreateManyArgs>(args?: SelectSubset<T, AIInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIInteractions and returns the data saved in the database.
     * @param {AIInteractionCreateManyAndReturnArgs} args - Arguments to create many AIInteractions.
     * @example
     * // Create many AIInteractions
     * const aIInteraction = await prisma.aIInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIInteractions and only return the `id`
     * const aIInteractionWithIdOnly = await prisma.aIInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIInteractionCreateManyAndReturnArgs>(args?: SelectSubset<T, AIInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AIInteraction.
     * @param {AIInteractionDeleteArgs} args - Arguments to delete one AIInteraction.
     * @example
     * // Delete one AIInteraction
     * const AIInteraction = await prisma.aIInteraction.delete({
     *   where: {
     *     // ... filter to delete one AIInteraction
     *   }
     * })
     * 
     */
    delete<T extends AIInteractionDeleteArgs>(args: SelectSubset<T, AIInteractionDeleteArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AIInteraction.
     * @param {AIInteractionUpdateArgs} args - Arguments to update one AIInteraction.
     * @example
     * // Update one AIInteraction
     * const aIInteraction = await prisma.aIInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIInteractionUpdateArgs>(args: SelectSubset<T, AIInteractionUpdateArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AIInteractions.
     * @param {AIInteractionDeleteManyArgs} args - Arguments to filter AIInteractions to delete.
     * @example
     * // Delete a few AIInteractions
     * const { count } = await prisma.aIInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIInteractionDeleteManyArgs>(args?: SelectSubset<T, AIInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIInteractions
     * const aIInteraction = await prisma.aIInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIInteractionUpdateManyArgs>(args: SelectSubset<T, AIInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIInteractions and returns the data updated in the database.
     * @param {AIInteractionUpdateManyAndReturnArgs} args - Arguments to update many AIInteractions.
     * @example
     * // Update many AIInteractions
     * const aIInteraction = await prisma.aIInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AIInteractions and only return the `id`
     * const aIInteractionWithIdOnly = await prisma.aIInteraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AIInteractionUpdateManyAndReturnArgs>(args: SelectSubset<T, AIInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AIInteraction.
     * @param {AIInteractionUpsertArgs} args - Arguments to update or create a AIInteraction.
     * @example
     * // Update or create a AIInteraction
     * const aIInteraction = await prisma.aIInteraction.upsert({
     *   create: {
     *     // ... data to create a AIInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIInteraction we want to update
     *   }
     * })
     */
    upsert<T extends AIInteractionUpsertArgs>(args: SelectSubset<T, AIInteractionUpsertArgs<ExtArgs>>): Prisma__AIInteractionClient<$Result.GetResult<Prisma.$AIInteractionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AIInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionCountArgs} args - Arguments to filter AIInteractions to count.
     * @example
     * // Count the number of AIInteractions
     * const count = await prisma.aIInteraction.count({
     *   where: {
     *     // ... the filter for the AIInteractions we want to count
     *   }
     * })
    **/
    count<T extends AIInteractionCountArgs>(
      args?: Subset<T, AIInteractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIInteractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIInteractionAggregateArgs>(args: Subset<T, AIInteractionAggregateArgs>): Prisma.PrismaPromise<GetAIInteractionAggregateType<T>>

    /**
     * Group by AIInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIInteractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIInteractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIInteractionGroupByArgs['orderBy'] }
        : { orderBy?: AIInteractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIInteraction model
   */
  readonly fields: AIInteractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIInteraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIInteractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIInteraction model
   */ 
  interface AIInteractionFieldRefs {
    readonly id: FieldRef<"AIInteraction", 'String'>
    readonly userId: FieldRef<"AIInteraction", 'String'>
    readonly userMessage: FieldRef<"AIInteraction", 'String'>
    readonly aiResponse: FieldRef<"AIInteraction", 'String'>
    readonly model: FieldRef<"AIInteraction", 'String'>
    readonly tokensUsed: FieldRef<"AIInteraction", 'Int'>
    readonly crisisDetected: FieldRef<"AIInteraction", 'Boolean'>
    readonly emotionalIntensity: FieldRef<"AIInteraction", 'Int'>
    readonly responseTime: FieldRef<"AIInteraction", 'Int'>
    readonly timestamp: FieldRef<"AIInteraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIInteraction findUnique
   */
  export type AIInteractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AIInteraction to fetch.
     */
    where: AIInteractionWhereUniqueInput
  }

  /**
   * AIInteraction findUniqueOrThrow
   */
  export type AIInteractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AIInteraction to fetch.
     */
    where: AIInteractionWhereUniqueInput
  }

  /**
   * AIInteraction findFirst
   */
  export type AIInteractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AIInteraction to fetch.
     */
    where?: AIInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIInteractions to fetch.
     */
    orderBy?: AIInteractionOrderByWithRelationInput | AIInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIInteractions.
     */
    cursor?: AIInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIInteractions.
     */
    distinct?: AIInteractionScalarFieldEnum | AIInteractionScalarFieldEnum[]
  }

  /**
   * AIInteraction findFirstOrThrow
   */
  export type AIInteractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AIInteraction to fetch.
     */
    where?: AIInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIInteractions to fetch.
     */
    orderBy?: AIInteractionOrderByWithRelationInput | AIInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIInteractions.
     */
    cursor?: AIInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIInteractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIInteractions.
     */
    distinct?: AIInteractionScalarFieldEnum | AIInteractionScalarFieldEnum[]
  }

  /**
   * AIInteraction findMany
   */
  export type AIInteractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter, which AIInteractions to fetch.
     */
    where?: AIInteractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIInteractions to fetch.
     */
    orderBy?: AIInteractionOrderByWithRelationInput | AIInteractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIInteractions.
     */
    cursor?: AIInteractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIInteractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIInteractions.
     */
    skip?: number
    distinct?: AIInteractionScalarFieldEnum | AIInteractionScalarFieldEnum[]
  }

  /**
   * AIInteraction create
   */
  export type AIInteractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * The data needed to create a AIInteraction.
     */
    data: XOR<AIInteractionCreateInput, AIInteractionUncheckedCreateInput>
  }

  /**
   * AIInteraction createMany
   */
  export type AIInteractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIInteractions.
     */
    data: AIInteractionCreateManyInput | AIInteractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIInteraction createManyAndReturn
   */
  export type AIInteractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * The data used to create many AIInteractions.
     */
    data: AIInteractionCreateManyInput | AIInteractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIInteraction update
   */
  export type AIInteractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * The data needed to update a AIInteraction.
     */
    data: XOR<AIInteractionUpdateInput, AIInteractionUncheckedUpdateInput>
    /**
     * Choose, which AIInteraction to update.
     */
    where: AIInteractionWhereUniqueInput
  }

  /**
   * AIInteraction updateMany
   */
  export type AIInteractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIInteractions.
     */
    data: XOR<AIInteractionUpdateManyMutationInput, AIInteractionUncheckedUpdateManyInput>
    /**
     * Filter which AIInteractions to update
     */
    where?: AIInteractionWhereInput
  }

  /**
   * AIInteraction updateManyAndReturn
   */
  export type AIInteractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * The data used to update AIInteractions.
     */
    data: XOR<AIInteractionUpdateManyMutationInput, AIInteractionUncheckedUpdateManyInput>
    /**
     * Filter which AIInteractions to update
     */
    where?: AIInteractionWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIInteraction upsert
   */
  export type AIInteractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * The filter to search for the AIInteraction to update in case it exists.
     */
    where: AIInteractionWhereUniqueInput
    /**
     * In case the AIInteraction found by the `where` argument doesn't exist, create a new AIInteraction with this data.
     */
    create: XOR<AIInteractionCreateInput, AIInteractionUncheckedCreateInput>
    /**
     * In case the AIInteraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIInteractionUpdateInput, AIInteractionUncheckedUpdateInput>
  }

  /**
   * AIInteraction delete
   */
  export type AIInteractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
    /**
     * Filter which AIInteraction to delete.
     */
    where: AIInteractionWhereUniqueInput
  }

  /**
   * AIInteraction deleteMany
   */
  export type AIInteractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIInteractions to delete
     */
    where?: AIInteractionWhereInput
  }

  /**
   * AIInteraction without action
   */
  export type AIInteractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIInteraction
     */
    select?: AIInteractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AIInteraction
     */
    omit?: AIInteractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIInteractionInclude<ExtArgs> | null
  }


  /**
   * Model CrisisLog
   */

  export type AggregateCrisisLog = {
    _count: CrisisLogCountAggregateOutputType | null
    _avg: CrisisLogAvgAggregateOutputType | null
    _sum: CrisisLogSumAggregateOutputType | null
    _min: CrisisLogMinAggregateOutputType | null
    _max: CrisisLogMaxAggregateOutputType | null
  }

  export type CrisisLogAvgAggregateOutputType = {
    severity: number | null
  }

  export type CrisisLogSumAggregateOutputType = {
    severity: number | null
  }

  export type CrisisLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    message: string | null
    severity: number | null
    responseProvided: boolean | null
    resourcesShown: boolean | null
    emergencyContactCalled: boolean | null
    timestamp: Date | null
  }

  export type CrisisLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    message: string | null
    severity: number | null
    responseProvided: boolean | null
    resourcesShown: boolean | null
    emergencyContactCalled: boolean | null
    timestamp: Date | null
  }

  export type CrisisLogCountAggregateOutputType = {
    id: number
    userId: number
    message: number
    severity: number
    categories: number
    responseProvided: number
    resourcesShown: number
    emergencyContactCalled: number
    timestamp: number
    _all: number
  }


  export type CrisisLogAvgAggregateInputType = {
    severity?: true
  }

  export type CrisisLogSumAggregateInputType = {
    severity?: true
  }

  export type CrisisLogMinAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    severity?: true
    responseProvided?: true
    resourcesShown?: true
    emergencyContactCalled?: true
    timestamp?: true
  }

  export type CrisisLogMaxAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    severity?: true
    responseProvided?: true
    resourcesShown?: true
    emergencyContactCalled?: true
    timestamp?: true
  }

  export type CrisisLogCountAggregateInputType = {
    id?: true
    userId?: true
    message?: true
    severity?: true
    categories?: true
    responseProvided?: true
    resourcesShown?: true
    emergencyContactCalled?: true
    timestamp?: true
    _all?: true
  }

  export type CrisisLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrisisLog to aggregate.
     */
    where?: CrisisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrisisLogs to fetch.
     */
    orderBy?: CrisisLogOrderByWithRelationInput | CrisisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CrisisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrisisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrisisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CrisisLogs
    **/
    _count?: true | CrisisLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CrisisLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CrisisLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CrisisLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CrisisLogMaxAggregateInputType
  }

  export type GetCrisisLogAggregateType<T extends CrisisLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCrisisLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCrisisLog[P]>
      : GetScalarType<T[P], AggregateCrisisLog[P]>
  }




  export type CrisisLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CrisisLogWhereInput
    orderBy?: CrisisLogOrderByWithAggregationInput | CrisisLogOrderByWithAggregationInput[]
    by: CrisisLogScalarFieldEnum[] | CrisisLogScalarFieldEnum
    having?: CrisisLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CrisisLogCountAggregateInputType | true
    _avg?: CrisisLogAvgAggregateInputType
    _sum?: CrisisLogSumAggregateInputType
    _min?: CrisisLogMinAggregateInputType
    _max?: CrisisLogMaxAggregateInputType
  }

  export type CrisisLogGroupByOutputType = {
    id: string
    userId: string
    message: string
    severity: number
    categories: JsonValue
    responseProvided: boolean
    resourcesShown: boolean
    emergencyContactCalled: boolean
    timestamp: Date
    _count: CrisisLogCountAggregateOutputType | null
    _avg: CrisisLogAvgAggregateOutputType | null
    _sum: CrisisLogSumAggregateOutputType | null
    _min: CrisisLogMinAggregateOutputType | null
    _max: CrisisLogMaxAggregateOutputType | null
  }

  type GetCrisisLogGroupByPayload<T extends CrisisLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CrisisLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CrisisLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CrisisLogGroupByOutputType[P]>
            : GetScalarType<T[P], CrisisLogGroupByOutputType[P]>
        }
      >
    >


  export type CrisisLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    severity?: boolean
    categories?: boolean
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crisisLog"]>

  export type CrisisLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    severity?: boolean
    categories?: boolean
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crisisLog"]>

  export type CrisisLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    message?: boolean
    severity?: boolean
    categories?: boolean
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["crisisLog"]>

  export type CrisisLogSelectScalar = {
    id?: boolean
    userId?: boolean
    message?: boolean
    severity?: boolean
    categories?: boolean
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: boolean
  }

  export type CrisisLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "message" | "severity" | "categories" | "responseProvided" | "resourcesShown" | "emergencyContactCalled" | "timestamp", ExtArgs["result"]["crisisLog"]>
  export type CrisisLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CrisisLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CrisisLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CrisisLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CrisisLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      message: string
      severity: number
      categories: Prisma.JsonValue
      responseProvided: boolean
      resourcesShown: boolean
      emergencyContactCalled: boolean
      timestamp: Date
    }, ExtArgs["result"]["crisisLog"]>
    composites: {}
  }

  type CrisisLogGetPayload<S extends boolean | null | undefined | CrisisLogDefaultArgs> = $Result.GetResult<Prisma.$CrisisLogPayload, S>

  type CrisisLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CrisisLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CrisisLogCountAggregateInputType | true
    }

  export interface CrisisLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CrisisLog'], meta: { name: 'CrisisLog' } }
    /**
     * Find zero or one CrisisLog that matches the filter.
     * @param {CrisisLogFindUniqueArgs} args - Arguments to find a CrisisLog
     * @example
     * // Get one CrisisLog
     * const crisisLog = await prisma.crisisLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CrisisLogFindUniqueArgs>(args: SelectSubset<T, CrisisLogFindUniqueArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one CrisisLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CrisisLogFindUniqueOrThrowArgs} args - Arguments to find a CrisisLog
     * @example
     * // Get one CrisisLog
     * const crisisLog = await prisma.crisisLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CrisisLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CrisisLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first CrisisLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogFindFirstArgs} args - Arguments to find a CrisisLog
     * @example
     * // Get one CrisisLog
     * const crisisLog = await prisma.crisisLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CrisisLogFindFirstArgs>(args?: SelectSubset<T, CrisisLogFindFirstArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first CrisisLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogFindFirstOrThrowArgs} args - Arguments to find a CrisisLog
     * @example
     * // Get one CrisisLog
     * const crisisLog = await prisma.crisisLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CrisisLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CrisisLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more CrisisLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CrisisLogs
     * const crisisLogs = await prisma.crisisLog.findMany()
     * 
     * // Get first 10 CrisisLogs
     * const crisisLogs = await prisma.crisisLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const crisisLogWithIdOnly = await prisma.crisisLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CrisisLogFindManyArgs>(args?: SelectSubset<T, CrisisLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a CrisisLog.
     * @param {CrisisLogCreateArgs} args - Arguments to create a CrisisLog.
     * @example
     * // Create one CrisisLog
     * const CrisisLog = await prisma.crisisLog.create({
     *   data: {
     *     // ... data to create a CrisisLog
     *   }
     * })
     * 
     */
    create<T extends CrisisLogCreateArgs>(args: SelectSubset<T, CrisisLogCreateArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many CrisisLogs.
     * @param {CrisisLogCreateManyArgs} args - Arguments to create many CrisisLogs.
     * @example
     * // Create many CrisisLogs
     * const crisisLog = await prisma.crisisLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CrisisLogCreateManyArgs>(args?: SelectSubset<T, CrisisLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CrisisLogs and returns the data saved in the database.
     * @param {CrisisLogCreateManyAndReturnArgs} args - Arguments to create many CrisisLogs.
     * @example
     * // Create many CrisisLogs
     * const crisisLog = await prisma.crisisLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CrisisLogs and only return the `id`
     * const crisisLogWithIdOnly = await prisma.crisisLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CrisisLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CrisisLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a CrisisLog.
     * @param {CrisisLogDeleteArgs} args - Arguments to delete one CrisisLog.
     * @example
     * // Delete one CrisisLog
     * const CrisisLog = await prisma.crisisLog.delete({
     *   where: {
     *     // ... filter to delete one CrisisLog
     *   }
     * })
     * 
     */
    delete<T extends CrisisLogDeleteArgs>(args: SelectSubset<T, CrisisLogDeleteArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one CrisisLog.
     * @param {CrisisLogUpdateArgs} args - Arguments to update one CrisisLog.
     * @example
     * // Update one CrisisLog
     * const crisisLog = await prisma.crisisLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CrisisLogUpdateArgs>(args: SelectSubset<T, CrisisLogUpdateArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more CrisisLogs.
     * @param {CrisisLogDeleteManyArgs} args - Arguments to filter CrisisLogs to delete.
     * @example
     * // Delete a few CrisisLogs
     * const { count } = await prisma.crisisLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CrisisLogDeleteManyArgs>(args?: SelectSubset<T, CrisisLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrisisLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CrisisLogs
     * const crisisLog = await prisma.crisisLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CrisisLogUpdateManyArgs>(args: SelectSubset<T, CrisisLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CrisisLogs and returns the data updated in the database.
     * @param {CrisisLogUpdateManyAndReturnArgs} args - Arguments to update many CrisisLogs.
     * @example
     * // Update many CrisisLogs
     * const crisisLog = await prisma.crisisLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CrisisLogs and only return the `id`
     * const crisisLogWithIdOnly = await prisma.crisisLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CrisisLogUpdateManyAndReturnArgs>(args: SelectSubset<T, CrisisLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one CrisisLog.
     * @param {CrisisLogUpsertArgs} args - Arguments to update or create a CrisisLog.
     * @example
     * // Update or create a CrisisLog
     * const crisisLog = await prisma.crisisLog.upsert({
     *   create: {
     *     // ... data to create a CrisisLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CrisisLog we want to update
     *   }
     * })
     */
    upsert<T extends CrisisLogUpsertArgs>(args: SelectSubset<T, CrisisLogUpsertArgs<ExtArgs>>): Prisma__CrisisLogClient<$Result.GetResult<Prisma.$CrisisLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of CrisisLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogCountArgs} args - Arguments to filter CrisisLogs to count.
     * @example
     * // Count the number of CrisisLogs
     * const count = await prisma.crisisLog.count({
     *   where: {
     *     // ... the filter for the CrisisLogs we want to count
     *   }
     * })
    **/
    count<T extends CrisisLogCountArgs>(
      args?: Subset<T, CrisisLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CrisisLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CrisisLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CrisisLogAggregateArgs>(args: Subset<T, CrisisLogAggregateArgs>): Prisma.PrismaPromise<GetCrisisLogAggregateType<T>>

    /**
     * Group by CrisisLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CrisisLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CrisisLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CrisisLogGroupByArgs['orderBy'] }
        : { orderBy?: CrisisLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CrisisLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCrisisLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CrisisLog model
   */
  readonly fields: CrisisLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CrisisLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CrisisLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CrisisLog model
   */ 
  interface CrisisLogFieldRefs {
    readonly id: FieldRef<"CrisisLog", 'String'>
    readonly userId: FieldRef<"CrisisLog", 'String'>
    readonly message: FieldRef<"CrisisLog", 'String'>
    readonly severity: FieldRef<"CrisisLog", 'Int'>
    readonly categories: FieldRef<"CrisisLog", 'Json'>
    readonly responseProvided: FieldRef<"CrisisLog", 'Boolean'>
    readonly resourcesShown: FieldRef<"CrisisLog", 'Boolean'>
    readonly emergencyContactCalled: FieldRef<"CrisisLog", 'Boolean'>
    readonly timestamp: FieldRef<"CrisisLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CrisisLog findUnique
   */
  export type CrisisLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter, which CrisisLog to fetch.
     */
    where: CrisisLogWhereUniqueInput
  }

  /**
   * CrisisLog findUniqueOrThrow
   */
  export type CrisisLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter, which CrisisLog to fetch.
     */
    where: CrisisLogWhereUniqueInput
  }

  /**
   * CrisisLog findFirst
   */
  export type CrisisLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter, which CrisisLog to fetch.
     */
    where?: CrisisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrisisLogs to fetch.
     */
    orderBy?: CrisisLogOrderByWithRelationInput | CrisisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrisisLogs.
     */
    cursor?: CrisisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrisisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrisisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrisisLogs.
     */
    distinct?: CrisisLogScalarFieldEnum | CrisisLogScalarFieldEnum[]
  }

  /**
   * CrisisLog findFirstOrThrow
   */
  export type CrisisLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter, which CrisisLog to fetch.
     */
    where?: CrisisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrisisLogs to fetch.
     */
    orderBy?: CrisisLogOrderByWithRelationInput | CrisisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CrisisLogs.
     */
    cursor?: CrisisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrisisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrisisLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CrisisLogs.
     */
    distinct?: CrisisLogScalarFieldEnum | CrisisLogScalarFieldEnum[]
  }

  /**
   * CrisisLog findMany
   */
  export type CrisisLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter, which CrisisLogs to fetch.
     */
    where?: CrisisLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CrisisLogs to fetch.
     */
    orderBy?: CrisisLogOrderByWithRelationInput | CrisisLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CrisisLogs.
     */
    cursor?: CrisisLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CrisisLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CrisisLogs.
     */
    skip?: number
    distinct?: CrisisLogScalarFieldEnum | CrisisLogScalarFieldEnum[]
  }

  /**
   * CrisisLog create
   */
  export type CrisisLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CrisisLog.
     */
    data: XOR<CrisisLogCreateInput, CrisisLogUncheckedCreateInput>
  }

  /**
   * CrisisLog createMany
   */
  export type CrisisLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CrisisLogs.
     */
    data: CrisisLogCreateManyInput | CrisisLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CrisisLog createManyAndReturn
   */
  export type CrisisLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * The data used to create many CrisisLogs.
     */
    data: CrisisLogCreateManyInput | CrisisLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrisisLog update
   */
  export type CrisisLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CrisisLog.
     */
    data: XOR<CrisisLogUpdateInput, CrisisLogUncheckedUpdateInput>
    /**
     * Choose, which CrisisLog to update.
     */
    where: CrisisLogWhereUniqueInput
  }

  /**
   * CrisisLog updateMany
   */
  export type CrisisLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CrisisLogs.
     */
    data: XOR<CrisisLogUpdateManyMutationInput, CrisisLogUncheckedUpdateManyInput>
    /**
     * Filter which CrisisLogs to update
     */
    where?: CrisisLogWhereInput
  }

  /**
   * CrisisLog updateManyAndReturn
   */
  export type CrisisLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * The data used to update CrisisLogs.
     */
    data: XOR<CrisisLogUpdateManyMutationInput, CrisisLogUncheckedUpdateManyInput>
    /**
     * Filter which CrisisLogs to update
     */
    where?: CrisisLogWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CrisisLog upsert
   */
  export type CrisisLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CrisisLog to update in case it exists.
     */
    where: CrisisLogWhereUniqueInput
    /**
     * In case the CrisisLog found by the `where` argument doesn't exist, create a new CrisisLog with this data.
     */
    create: XOR<CrisisLogCreateInput, CrisisLogUncheckedCreateInput>
    /**
     * In case the CrisisLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CrisisLogUpdateInput, CrisisLogUncheckedUpdateInput>
  }

  /**
   * CrisisLog delete
   */
  export type CrisisLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
    /**
     * Filter which CrisisLog to delete.
     */
    where: CrisisLogWhereUniqueInput
  }

  /**
   * CrisisLog deleteMany
   */
  export type CrisisLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CrisisLogs to delete
     */
    where?: CrisisLogWhereInput
  }

  /**
   * CrisisLog without action
   */
  export type CrisisLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CrisisLog
     */
    select?: CrisisLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CrisisLog
     */
    omit?: CrisisLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CrisisLogInclude<ExtArgs> | null
  }


  /**
   * Model UsageLog
   */

  export type AggregateUsageLog = {
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  export type UsageLogAvgAggregateOutputType = {
    tokensUsed: number | null
  }

  export type UsageLogSumAggregateOutputType = {
    tokensUsed: number | null
  }

  export type UsageLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    service: $Enums.Service | null
    model: string | null
    tokensUsed: number | null
    finishReason: string | null
    timestamp: Date | null
  }

  export type UsageLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    service: $Enums.Service | null
    model: string | null
    tokensUsed: number | null
    finishReason: string | null
    timestamp: Date | null
  }

  export type UsageLogCountAggregateOutputType = {
    id: number
    userId: number
    service: number
    model: number
    tokensUsed: number
    finishReason: number
    timestamp: number
    _all: number
  }


  export type UsageLogAvgAggregateInputType = {
    tokensUsed?: true
  }

  export type UsageLogSumAggregateInputType = {
    tokensUsed?: true
  }

  export type UsageLogMinAggregateInputType = {
    id?: true
    userId?: true
    service?: true
    model?: true
    tokensUsed?: true
    finishReason?: true
    timestamp?: true
  }

  export type UsageLogMaxAggregateInputType = {
    id?: true
    userId?: true
    service?: true
    model?: true
    tokensUsed?: true
    finishReason?: true
    timestamp?: true
  }

  export type UsageLogCountAggregateInputType = {
    id?: true
    userId?: true
    service?: true
    model?: true
    tokensUsed?: true
    finishReason?: true
    timestamp?: true
    _all?: true
  }

  export type UsageLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLog to aggregate.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageLogs
    **/
    _count?: true | UsageLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageLogMaxAggregateInputType
  }

  export type GetUsageLogAggregateType<T extends UsageLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageLog[P]>
      : GetScalarType<T[P], AggregateUsageLog[P]>
  }




  export type UsageLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLogWhereInput
    orderBy?: UsageLogOrderByWithAggregationInput | UsageLogOrderByWithAggregationInput[]
    by: UsageLogScalarFieldEnum[] | UsageLogScalarFieldEnum
    having?: UsageLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageLogCountAggregateInputType | true
    _avg?: UsageLogAvgAggregateInputType
    _sum?: UsageLogSumAggregateInputType
    _min?: UsageLogMinAggregateInputType
    _max?: UsageLogMaxAggregateInputType
  }

  export type UsageLogGroupByOutputType = {
    id: string
    userId: string
    service: $Enums.Service
    model: string | null
    tokensUsed: number | null
    finishReason: string | null
    timestamp: Date
    _count: UsageLogCountAggregateOutputType | null
    _avg: UsageLogAvgAggregateOutputType | null
    _sum: UsageLogSumAggregateOutputType | null
    _min: UsageLogMinAggregateOutputType | null
    _max: UsageLogMaxAggregateOutputType | null
  }

  type GetUsageLogGroupByPayload<T extends UsageLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
            : GetScalarType<T[P], UsageLogGroupByOutputType[P]>
        }
      >
    >


  export type UsageLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    service?: boolean
    model?: boolean
    tokensUsed?: boolean
    finishReason?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    service?: boolean
    model?: boolean
    tokensUsed?: boolean
    finishReason?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    service?: boolean
    model?: boolean
    tokensUsed?: boolean
    finishReason?: boolean
    timestamp?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usageLog"]>

  export type UsageLogSelectScalar = {
    id?: boolean
    userId?: boolean
    service?: boolean
    model?: boolean
    tokensUsed?: boolean
    finishReason?: boolean
    timestamp?: boolean
  }

  export type UsageLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "service" | "model" | "tokensUsed" | "finishReason" | "timestamp", ExtArgs["result"]["usageLog"]>
  export type UsageLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UsageLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UsageLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      service: $Enums.Service
      model: string | null
      tokensUsed: number | null
      finishReason: string | null
      timestamp: Date
    }, ExtArgs["result"]["usageLog"]>
    composites: {}
  }

  type UsageLogGetPayload<S extends boolean | null | undefined | UsageLogDefaultArgs> = $Result.GetResult<Prisma.$UsageLogPayload, S>

  type UsageLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageLogCountAggregateInputType | true
    }

  export interface UsageLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageLog'], meta: { name: 'UsageLog' } }
    /**
     * Find zero or one UsageLog that matches the filter.
     * @param {UsageLogFindUniqueArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageLogFindUniqueArgs>(args: SelectSubset<T, UsageLogFindUniqueArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UsageLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageLogFindUniqueOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UsageLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageLogFindFirstArgs>(args?: SelectSubset<T, UsageLogFindFirstArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UsageLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindFirstOrThrowArgs} args - Arguments to find a UsageLog
     * @example
     * // Get one UsageLog
     * const usageLog = await prisma.usageLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UsageLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageLogs
     * const usageLogs = await prisma.usageLog.findMany()
     * 
     * // Get first 10 UsageLogs
     * const usageLogs = await prisma.usageLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageLogFindManyArgs>(args?: SelectSubset<T, UsageLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UsageLog.
     * @param {UsageLogCreateArgs} args - Arguments to create a UsageLog.
     * @example
     * // Create one UsageLog
     * const UsageLog = await prisma.usageLog.create({
     *   data: {
     *     // ... data to create a UsageLog
     *   }
     * })
     * 
     */
    create<T extends UsageLogCreateArgs>(args: SelectSubset<T, UsageLogCreateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UsageLogs.
     * @param {UsageLogCreateManyArgs} args - Arguments to create many UsageLogs.
     * @example
     * // Create many UsageLogs
     * const usageLog = await prisma.usageLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageLogCreateManyArgs>(args?: SelectSubset<T, UsageLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageLogs and returns the data saved in the database.
     * @param {UsageLogCreateManyAndReturnArgs} args - Arguments to create many UsageLogs.
     * @example
     * // Create many UsageLogs
     * const usageLog = await prisma.usageLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageLogs and only return the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UsageLog.
     * @param {UsageLogDeleteArgs} args - Arguments to delete one UsageLog.
     * @example
     * // Delete one UsageLog
     * const UsageLog = await prisma.usageLog.delete({
     *   where: {
     *     // ... filter to delete one UsageLog
     *   }
     * })
     * 
     */
    delete<T extends UsageLogDeleteArgs>(args: SelectSubset<T, UsageLogDeleteArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UsageLog.
     * @param {UsageLogUpdateArgs} args - Arguments to update one UsageLog.
     * @example
     * // Update one UsageLog
     * const usageLog = await prisma.usageLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageLogUpdateArgs>(args: SelectSubset<T, UsageLogUpdateArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UsageLogs.
     * @param {UsageLogDeleteManyArgs} args - Arguments to filter UsageLogs to delete.
     * @example
     * // Delete a few UsageLogs
     * const { count } = await prisma.usageLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageLogDeleteManyArgs>(args?: SelectSubset<T, UsageLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageLogs
     * const usageLog = await prisma.usageLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageLogUpdateManyArgs>(args: SelectSubset<T, UsageLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLogs and returns the data updated in the database.
     * @param {UsageLogUpdateManyAndReturnArgs} args - Arguments to update many UsageLogs.
     * @example
     * // Update many UsageLogs
     * const usageLog = await prisma.usageLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageLogs and only return the `id`
     * const usageLogWithIdOnly = await prisma.usageLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageLogUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one UsageLog.
     * @param {UsageLogUpsertArgs} args - Arguments to update or create a UsageLog.
     * @example
     * // Update or create a UsageLog
     * const usageLog = await prisma.usageLog.upsert({
     *   create: {
     *     // ... data to create a UsageLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageLog we want to update
     *   }
     * })
     */
    upsert<T extends UsageLogUpsertArgs>(args: SelectSubset<T, UsageLogUpsertArgs<ExtArgs>>): Prisma__UsageLogClient<$Result.GetResult<Prisma.$UsageLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UsageLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogCountArgs} args - Arguments to filter UsageLogs to count.
     * @example
     * // Count the number of UsageLogs
     * const count = await prisma.usageLog.count({
     *   where: {
     *     // ... the filter for the UsageLogs we want to count
     *   }
     * })
    **/
    count<T extends UsageLogCountArgs>(
      args?: Subset<T, UsageLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageLogAggregateArgs>(args: Subset<T, UsageLogAggregateArgs>): Prisma.PrismaPromise<GetUsageLogAggregateType<T>>

    /**
     * Group by UsageLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageLogGroupByArgs['orderBy'] }
        : { orderBy?: UsageLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageLog model
   */
  readonly fields: UsageLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageLog model
   */ 
  interface UsageLogFieldRefs {
    readonly id: FieldRef<"UsageLog", 'String'>
    readonly userId: FieldRef<"UsageLog", 'String'>
    readonly service: FieldRef<"UsageLog", 'Service'>
    readonly model: FieldRef<"UsageLog", 'String'>
    readonly tokensUsed: FieldRef<"UsageLog", 'Int'>
    readonly finishReason: FieldRef<"UsageLog", 'String'>
    readonly timestamp: FieldRef<"UsageLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLog findUnique
   */
  export type UsageLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findUniqueOrThrow
   */
  export type UsageLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog findFirst
   */
  export type UsageLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findFirstOrThrow
   */
  export type UsageLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLog to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLogs.
     */
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog findMany
   */
  export type UsageLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter, which UsageLogs to fetch.
     */
    where?: UsageLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLogs to fetch.
     */
    orderBy?: UsageLogOrderByWithRelationInput | UsageLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageLogs.
     */
    cursor?: UsageLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLogs.
     */
    skip?: number
    distinct?: UsageLogScalarFieldEnum | UsageLogScalarFieldEnum[]
  }

  /**
   * UsageLog create
   */
  export type UsageLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageLog.
     */
    data: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
  }

  /**
   * UsageLog createMany
   */
  export type UsageLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageLogs.
     */
    data: UsageLogCreateManyInput | UsageLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UsageLog createManyAndReturn
   */
  export type UsageLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * The data used to create many UsageLogs.
     */
    data: UsageLogCreateManyInput | UsageLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLog update
   */
  export type UsageLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageLog.
     */
    data: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
    /**
     * Choose, which UsageLog to update.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog updateMany
   */
  export type UsageLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageLogs.
     */
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyInput>
    /**
     * Filter which UsageLogs to update
     */
    where?: UsageLogWhereInput
  }

  /**
   * UsageLog updateManyAndReturn
   */
  export type UsageLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * The data used to update UsageLogs.
     */
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyInput>
    /**
     * Filter which UsageLogs to update
     */
    where?: UsageLogWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLog upsert
   */
  export type UsageLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageLog to update in case it exists.
     */
    where: UsageLogWhereUniqueInput
    /**
     * In case the UsageLog found by the `where` argument doesn't exist, create a new UsageLog with this data.
     */
    create: XOR<UsageLogCreateInput, UsageLogUncheckedCreateInput>
    /**
     * In case the UsageLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageLogUpdateInput, UsageLogUncheckedUpdateInput>
  }

  /**
   * UsageLog delete
   */
  export type UsageLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
    /**
     * Filter which UsageLog to delete.
     */
    where: UsageLogWhereUniqueInput
  }

  /**
   * UsageLog deleteMany
   */
  export type UsageLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLogs to delete
     */
    where?: UsageLogWhereInput
  }

  /**
   * UsageLog without action
   */
  export type UsageLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLog
     */
    select?: UsageLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLog
     */
    omit?: UsageLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
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

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    role: 'role',
    content: 'content',
    timestamp: 'timestamp',
    metadata: 'metadata'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const MoodEntryScalarFieldEnum: {
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

  export type MoodEntryScalarFieldEnum = (typeof MoodEntryScalarFieldEnum)[keyof typeof MoodEntryScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    responses: 'responses',
    score: 'score',
    severity: 'severity',
    interpretation: 'interpretation',
    createdAt: 'createdAt'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const AIInteractionScalarFieldEnum: {
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

  export type AIInteractionScalarFieldEnum = (typeof AIInteractionScalarFieldEnum)[keyof typeof AIInteractionScalarFieldEnum]


  export const CrisisLogScalarFieldEnum: {
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

  export type CrisisLogScalarFieldEnum = (typeof CrisisLogScalarFieldEnum)[keyof typeof CrisisLogScalarFieldEnum]


  export const UsageLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    service: 'service',
    model: 'model',
    tokensUsed: 'tokensUsed',
    finishReason: 'finishReason',
    timestamp: 'timestamp'
  };

  export type UsageLogScalarFieldEnum = (typeof UsageLogScalarFieldEnum)[keyof typeof UsageLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'University'
   */
  export type EnumUniversityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'University'>
    


  /**
   * Reference to a field of type 'University[]'
   */
  export type ListEnumUniversityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'University[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Language'
   */
  export type EnumLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Language'>
    


  /**
   * Reference to a field of type 'Language[]'
   */
  export type ListEnumLanguageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Language[]'>
    


  /**
   * Reference to a field of type 'NotificationFrequency'
   */
  export type EnumNotificationFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationFrequency'>
    


  /**
   * Reference to a field of type 'NotificationFrequency[]'
   */
  export type ListEnumNotificationFrequencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationFrequency[]'>
    


  /**
   * Reference to a field of type 'TimeOfDay'
   */
  export type EnumTimeOfDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeOfDay'>
    


  /**
   * Reference to a field of type 'TimeOfDay[]'
   */
  export type ListEnumTimeOfDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimeOfDay[]'>
    


  /**
   * Reference to a field of type 'Concern[]'
   */
  export type ListEnumConcernFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Concern[]'>
    


  /**
   * Reference to a field of type 'Concern'
   */
  export type EnumConcernFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Concern'>
    


  /**
   * Reference to a field of type 'SupportLevel'
   */
  export type EnumSupportLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupportLevel'>
    


  /**
   * Reference to a field of type 'SupportLevel[]'
   */
  export type ListEnumSupportLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupportLevel[]'>
    


  /**
   * Reference to a field of type 'RiskLevel'
   */
  export type EnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel'>
    


  /**
   * Reference to a field of type 'RiskLevel[]'
   */
  export type ListEnumRiskLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RiskLevel[]'>
    


  /**
   * Reference to a field of type 'CopingStyle[]'
   */
  export type ListEnumCopingStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CopingStyle[]'>
    


  /**
   * Reference to a field of type 'CopingStyle'
   */
  export type EnumCopingStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CopingStyle'>
    


  /**
   * Reference to a field of type 'FaithLevel'
   */
  export type EnumFaithLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FaithLevel'>
    


  /**
   * Reference to a field of type 'FaithLevel[]'
   */
  export type ListEnumFaithLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FaithLevel[]'>
    


  /**
   * Reference to a field of type 'ApproachPreference'
   */
  export type EnumApproachPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApproachPreference'>
    


  /**
   * Reference to a field of type 'ApproachPreference[]'
   */
  export type ListEnumApproachPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApproachPreference[]'>
    


  /**
   * Reference to a field of type 'Goal[]'
   */
  export type ListEnumGoalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Goal[]'>
    


  /**
   * Reference to a field of type 'Goal'
   */
  export type EnumGoalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Goal'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ConversationStatus'
   */
  export type EnumConversationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationStatus'>
    


  /**
   * Reference to a field of type 'ConversationStatus[]'
   */
  export type ListEnumConversationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationStatus[]'>
    


  /**
   * Reference to a field of type 'MessageRole'
   */
  export type EnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole'>
    


  /**
   * Reference to a field of type 'MessageRole[]'
   */
  export type ListEnumMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageRole[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AssessmentType'
   */
  export type EnumAssessmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssessmentType'>
    


  /**
   * Reference to a field of type 'AssessmentType[]'
   */
  export type ListEnumAssessmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssessmentType[]'>
    


  /**
   * Reference to a field of type 'Severity'
   */
  export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity'>
    


  /**
   * Reference to a field of type 'Severity[]'
   */
  export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity[]'>
    


  /**
   * Reference to a field of type 'Service'
   */
  export type EnumServiceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Service'>
    


  /**
   * Reference to a field of type 'Service[]'
   */
  export type ListEnumServiceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Service[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isAnonymous?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    university?: EnumUniversityNullableFilter<"User"> | $Enums.University | null
    academicLevel?: IntNullableFilter<"User"> | number | null
    program?: StringNullableFilter<"User"> | string | null
    language?: EnumLanguageFilter<"User"> | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFilter<"User"> | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFilter<"User"> | $Enums.TimeOfDay
    concerns?: EnumConcernNullableListFilter<"User">
    supportLevel?: EnumSupportLevelFilter<"User"> | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFilter<"User"> | $Enums.RiskLevel
    copingStyles?: EnumCopingStyleNullableListFilter<"User">
    faithLevel?: EnumFaithLevelFilter<"User"> | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFilter<"User"> | $Enums.ApproachPreference
    goals?: EnumGoalNullableListFilter<"User">
    stressors?: JsonNullableFilter<"User">
    trackingPreferences?: JsonNullableFilter<"User">
    emergencyContacts?: JsonNullableFilter<"User">
    baselineMood?: IntNullableFilter<"User"> | number | null
    baseline?: JsonNullableFilter<"User">
    joinDate?: DateTimeFilter<"User"> | Date | string
    moodCheckInsCount?: IntFilter<"User"> | number
    conversationsCount?: IntFilter<"User"> | number
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    onboardingStep?: IntFilter<"User"> | number
    onboardingCompleted?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    conversations?: ConversationListRelationFilter
    moodEntries?: MoodEntryListRelationFilter
    assessments?: AssessmentListRelationFilter
    aiInteractions?: AIInteractionListRelationFilter
    crisisLogs?: CrisisLogListRelationFilter
    usageLogs?: UsageLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isAnonymous?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    academicLevel?: SortOrderInput | SortOrder
    program?: SortOrderInput | SortOrder
    language?: SortOrder
    notificationPreference?: SortOrder
    preferredCheckInTime?: SortOrder
    concerns?: SortOrder
    supportLevel?: SortOrder
    riskLevel?: SortOrder
    copingStyles?: SortOrder
    faithLevel?: SortOrder
    approachPreference?: SortOrder
    goals?: SortOrder
    stressors?: SortOrderInput | SortOrder
    trackingPreferences?: SortOrderInput | SortOrder
    emergencyContacts?: SortOrderInput | SortOrder
    baselineMood?: SortOrderInput | SortOrder
    baseline?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    lastActive?: SortOrderInput | SortOrder
    onboardingStep?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversations?: ConversationOrderByRelationAggregateInput
    moodEntries?: MoodEntryOrderByRelationAggregateInput
    assessments?: AssessmentOrderByRelationAggregateInput
    aiInteractions?: AIInteractionOrderByRelationAggregateInput
    crisisLogs?: CrisisLogOrderByRelationAggregateInput
    usageLogs?: UsageLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    isAnonymous?: BoolFilter<"User"> | boolean
    verificationToken?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    displayName?: StringNullableFilter<"User"> | string | null
    university?: EnumUniversityNullableFilter<"User"> | $Enums.University | null
    academicLevel?: IntNullableFilter<"User"> | number | null
    program?: StringNullableFilter<"User"> | string | null
    language?: EnumLanguageFilter<"User"> | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFilter<"User"> | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFilter<"User"> | $Enums.TimeOfDay
    concerns?: EnumConcernNullableListFilter<"User">
    supportLevel?: EnumSupportLevelFilter<"User"> | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFilter<"User"> | $Enums.RiskLevel
    copingStyles?: EnumCopingStyleNullableListFilter<"User">
    faithLevel?: EnumFaithLevelFilter<"User"> | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFilter<"User"> | $Enums.ApproachPreference
    goals?: EnumGoalNullableListFilter<"User">
    stressors?: JsonNullableFilter<"User">
    trackingPreferences?: JsonNullableFilter<"User">
    emergencyContacts?: JsonNullableFilter<"User">
    baselineMood?: IntNullableFilter<"User"> | number | null
    baseline?: JsonNullableFilter<"User">
    joinDate?: DateTimeFilter<"User"> | Date | string
    moodCheckInsCount?: IntFilter<"User"> | number
    conversationsCount?: IntFilter<"User"> | number
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    onboardingStep?: IntFilter<"User"> | number
    onboardingCompleted?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    conversations?: ConversationListRelationFilter
    moodEntries?: MoodEntryListRelationFilter
    assessments?: AssessmentListRelationFilter
    aiInteractions?: AIInteractionListRelationFilter
    crisisLogs?: CrisisLogListRelationFilter
    usageLogs?: UsageLogListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isAnonymous?: SortOrder
    verificationToken?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    university?: SortOrderInput | SortOrder
    academicLevel?: SortOrderInput | SortOrder
    program?: SortOrderInput | SortOrder
    language?: SortOrder
    notificationPreference?: SortOrder
    preferredCheckInTime?: SortOrder
    concerns?: SortOrder
    supportLevel?: SortOrder
    riskLevel?: SortOrder
    copingStyles?: SortOrder
    faithLevel?: SortOrder
    approachPreference?: SortOrder
    goals?: SortOrder
    stressors?: SortOrderInput | SortOrder
    trackingPreferences?: SortOrderInput | SortOrder
    emergencyContacts?: SortOrderInput | SortOrder
    baselineMood?: SortOrderInput | SortOrder
    baseline?: SortOrderInput | SortOrder
    joinDate?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    lastActive?: SortOrderInput | SortOrder
    onboardingStep?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    isAnonymous?: BoolWithAggregatesFilter<"User"> | boolean
    verificationToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    university?: EnumUniversityNullableWithAggregatesFilter<"User"> | $Enums.University | null
    academicLevel?: IntNullableWithAggregatesFilter<"User"> | number | null
    program?: StringNullableWithAggregatesFilter<"User"> | string | null
    language?: EnumLanguageWithAggregatesFilter<"User"> | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyWithAggregatesFilter<"User"> | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayWithAggregatesFilter<"User"> | $Enums.TimeOfDay
    concerns?: EnumConcernNullableListFilter<"User">
    supportLevel?: EnumSupportLevelWithAggregatesFilter<"User"> | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelWithAggregatesFilter<"User"> | $Enums.RiskLevel
    copingStyles?: EnumCopingStyleNullableListFilter<"User">
    faithLevel?: EnumFaithLevelWithAggregatesFilter<"User"> | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceWithAggregatesFilter<"User"> | $Enums.ApproachPreference
    goals?: EnumGoalNullableListFilter<"User">
    stressors?: JsonNullableWithAggregatesFilter<"User">
    trackingPreferences?: JsonNullableWithAggregatesFilter<"User">
    emergencyContacts?: JsonNullableWithAggregatesFilter<"User">
    baselineMood?: IntNullableWithAggregatesFilter<"User"> | number | null
    baseline?: JsonNullableWithAggregatesFilter<"User">
    joinDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    moodCheckInsCount?: IntWithAggregatesFilter<"User"> | number
    conversationsCount?: IntWithAggregatesFilter<"User"> | number
    lastActive?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    onboardingStep?: IntWithAggregatesFilter<"User"> | number
    onboardingCompleted?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    startedAt?: DateTimeFilter<"Conversation"> | Date | string
    lastMessageAt?: DateTimeFilter<"Conversation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    status?: EnumConversationStatusFilter<"Conversation"> | $Enums.ConversationStatus
    metadata?: JsonNullableFilter<"Conversation">
    summary?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    lastMessageAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    userId?: StringFilter<"Conversation"> | string
    startedAt?: DateTimeFilter<"Conversation"> | Date | string
    lastMessageAt?: DateTimeFilter<"Conversation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    status?: EnumConversationStatusFilter<"Conversation"> | $Enums.ConversationStatus
    metadata?: JsonNullableFilter<"Conversation">
    summary?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    messages?: MessageListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    lastMessageAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metadata?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    userId?: StringWithAggregatesFilter<"Conversation"> | string
    startedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    lastMessageAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"Conversation"> | Date | string | null
    status?: EnumConversationStatusWithAggregatesFilter<"Conversation"> | $Enums.ConversationStatus
    metadata?: JsonNullableWithAggregatesFilter<"Conversation">
    summary?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metadata?: JsonNullableFilter<"Message">
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrderInput | SortOrder
    conversation?: ConversationOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    conversationId?: StringFilter<"Message"> | string
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metadata?: JsonNullableFilter<"Message">
    conversation?: XOR<ConversationScalarRelationFilter, ConversationWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    conversationId?: StringWithAggregatesFilter<"Message"> | string
    role?: EnumMessageRoleWithAggregatesFilter<"Message"> | $Enums.MessageRole
    content?: StringWithAggregatesFilter<"Message"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    metadata?: JsonNullableWithAggregatesFilter<"Message">
  }

  export type MoodEntryWhereInput = {
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    id?: StringFilter<"MoodEntry"> | string
    userId?: StringFilter<"MoodEntry"> | string
    mood?: IntFilter<"MoodEntry"> | number
    energy?: IntNullableFilter<"MoodEntry"> | number | null
    sleep?: IntNullableFilter<"MoodEntry"> | number | null
    social?: IntNullableFilter<"MoodEntry"> | number | null
    anxiety?: IntNullableFilter<"MoodEntry"> | number | null
    notes?: StringNullableFilter<"MoodEntry"> | string | null
    tags?: StringNullableListFilter<"MoodEntry">
    sentimentScore?: FloatNullableFilter<"MoodEntry"> | number | null
    sentimentLabel?: StringNullableFilter<"MoodEntry"> | string | null
    crisisFlag?: BoolFilter<"MoodEntry"> | boolean
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MoodEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    energy?: SortOrderInput | SortOrder
    sleep?: SortOrderInput | SortOrder
    social?: SortOrderInput | SortOrder
    anxiety?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    tags?: SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    sentimentLabel?: SortOrderInput | SortOrder
    crisisFlag?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type MoodEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    userId?: StringFilter<"MoodEntry"> | string
    mood?: IntFilter<"MoodEntry"> | number
    energy?: IntNullableFilter<"MoodEntry"> | number | null
    sleep?: IntNullableFilter<"MoodEntry"> | number | null
    social?: IntNullableFilter<"MoodEntry"> | number | null
    anxiety?: IntNullableFilter<"MoodEntry"> | number | null
    notes?: StringNullableFilter<"MoodEntry"> | string | null
    tags?: StringNullableListFilter<"MoodEntry">
    sentimentScore?: FloatNullableFilter<"MoodEntry"> | number | null
    sentimentLabel?: StringNullableFilter<"MoodEntry"> | string | null
    crisisFlag?: BoolFilter<"MoodEntry"> | boolean
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MoodEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    energy?: SortOrderInput | SortOrder
    sleep?: SortOrderInput | SortOrder
    social?: SortOrderInput | SortOrder
    anxiety?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    tags?: SortOrder
    sentimentScore?: SortOrderInput | SortOrder
    sentimentLabel?: SortOrderInput | SortOrder
    crisisFlag?: SortOrder
    createdAt?: SortOrder
    _count?: MoodEntryCountOrderByAggregateInput
    _avg?: MoodEntryAvgOrderByAggregateInput
    _max?: MoodEntryMaxOrderByAggregateInput
    _min?: MoodEntryMinOrderByAggregateInput
    _sum?: MoodEntrySumOrderByAggregateInput
  }

  export type MoodEntryScalarWhereWithAggregatesInput = {
    AND?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    OR?: MoodEntryScalarWhereWithAggregatesInput[]
    NOT?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MoodEntry"> | string
    userId?: StringWithAggregatesFilter<"MoodEntry"> | string
    mood?: IntWithAggregatesFilter<"MoodEntry"> | number
    energy?: IntNullableWithAggregatesFilter<"MoodEntry"> | number | null
    sleep?: IntNullableWithAggregatesFilter<"MoodEntry"> | number | null
    social?: IntNullableWithAggregatesFilter<"MoodEntry"> | number | null
    anxiety?: IntNullableWithAggregatesFilter<"MoodEntry"> | number | null
    notes?: StringNullableWithAggregatesFilter<"MoodEntry"> | string | null
    tags?: StringNullableListFilter<"MoodEntry">
    sentimentScore?: FloatNullableWithAggregatesFilter<"MoodEntry"> | number | null
    sentimentLabel?: StringNullableWithAggregatesFilter<"MoodEntry"> | string | null
    crisisFlag?: BoolWithAggregatesFilter<"MoodEntry"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MoodEntry"> | Date | string
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: StringFilter<"Assessment"> | string
    userId?: StringFilter<"Assessment"> | string
    type?: EnumAssessmentTypeFilter<"Assessment"> | $Enums.AssessmentType
    responses?: JsonFilter<"Assessment">
    score?: IntFilter<"Assessment"> | number
    severity?: EnumSeverityNullableFilter<"Assessment"> | $Enums.Severity | null
    interpretation?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    responses?: SortOrder
    score?: SortOrder
    severity?: SortOrderInput | SortOrder
    interpretation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    userId?: StringFilter<"Assessment"> | string
    type?: EnumAssessmentTypeFilter<"Assessment"> | $Enums.AssessmentType
    responses?: JsonFilter<"Assessment">
    score?: IntFilter<"Assessment"> | number
    severity?: EnumSeverityNullableFilter<"Assessment"> | $Enums.Severity | null
    interpretation?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    responses?: SortOrder
    score?: SortOrder
    severity?: SortOrderInput | SortOrder
    interpretation?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _avg?: AssessmentAvgOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
    _sum?: AssessmentSumOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assessment"> | string
    userId?: StringWithAggregatesFilter<"Assessment"> | string
    type?: EnumAssessmentTypeWithAggregatesFilter<"Assessment"> | $Enums.AssessmentType
    responses?: JsonWithAggregatesFilter<"Assessment">
    score?: IntWithAggregatesFilter<"Assessment"> | number
    severity?: EnumSeverityNullableWithAggregatesFilter<"Assessment"> | $Enums.Severity | null
    interpretation?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
  }

  export type AIInteractionWhereInput = {
    AND?: AIInteractionWhereInput | AIInteractionWhereInput[]
    OR?: AIInteractionWhereInput[]
    NOT?: AIInteractionWhereInput | AIInteractionWhereInput[]
    id?: StringFilter<"AIInteraction"> | string
    userId?: StringFilter<"AIInteraction"> | string
    userMessage?: StringFilter<"AIInteraction"> | string
    aiResponse?: StringFilter<"AIInteraction"> | string
    model?: StringNullableFilter<"AIInteraction"> | string | null
    tokensUsed?: IntNullableFilter<"AIInteraction"> | number | null
    crisisDetected?: BoolFilter<"AIInteraction"> | boolean
    emotionalIntensity?: IntNullableFilter<"AIInteraction"> | number | null
    responseTime?: IntNullableFilter<"AIInteraction"> | number | null
    timestamp?: DateTimeFilter<"AIInteraction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AIInteractionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    userMessage?: SortOrder
    aiResponse?: SortOrder
    model?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    crisisDetected?: SortOrder
    emotionalIntensity?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AIInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIInteractionWhereInput | AIInteractionWhereInput[]
    OR?: AIInteractionWhereInput[]
    NOT?: AIInteractionWhereInput | AIInteractionWhereInput[]
    userId?: StringFilter<"AIInteraction"> | string
    userMessage?: StringFilter<"AIInteraction"> | string
    aiResponse?: StringFilter<"AIInteraction"> | string
    model?: StringNullableFilter<"AIInteraction"> | string | null
    tokensUsed?: IntNullableFilter<"AIInteraction"> | number | null
    crisisDetected?: BoolFilter<"AIInteraction"> | boolean
    emotionalIntensity?: IntNullableFilter<"AIInteraction"> | number | null
    responseTime?: IntNullableFilter<"AIInteraction"> | number | null
    timestamp?: DateTimeFilter<"AIInteraction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AIInteractionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    userMessage?: SortOrder
    aiResponse?: SortOrder
    model?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    crisisDetected?: SortOrder
    emotionalIntensity?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AIInteractionCountOrderByAggregateInput
    _avg?: AIInteractionAvgOrderByAggregateInput
    _max?: AIInteractionMaxOrderByAggregateInput
    _min?: AIInteractionMinOrderByAggregateInput
    _sum?: AIInteractionSumOrderByAggregateInput
  }

  export type AIInteractionScalarWhereWithAggregatesInput = {
    AND?: AIInteractionScalarWhereWithAggregatesInput | AIInteractionScalarWhereWithAggregatesInput[]
    OR?: AIInteractionScalarWhereWithAggregatesInput[]
    NOT?: AIInteractionScalarWhereWithAggregatesInput | AIInteractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIInteraction"> | string
    userId?: StringWithAggregatesFilter<"AIInteraction"> | string
    userMessage?: StringWithAggregatesFilter<"AIInteraction"> | string
    aiResponse?: StringWithAggregatesFilter<"AIInteraction"> | string
    model?: StringNullableWithAggregatesFilter<"AIInteraction"> | string | null
    tokensUsed?: IntNullableWithAggregatesFilter<"AIInteraction"> | number | null
    crisisDetected?: BoolWithAggregatesFilter<"AIInteraction"> | boolean
    emotionalIntensity?: IntNullableWithAggregatesFilter<"AIInteraction"> | number | null
    responseTime?: IntNullableWithAggregatesFilter<"AIInteraction"> | number | null
    timestamp?: DateTimeWithAggregatesFilter<"AIInteraction"> | Date | string
  }

  export type CrisisLogWhereInput = {
    AND?: CrisisLogWhereInput | CrisisLogWhereInput[]
    OR?: CrisisLogWhereInput[]
    NOT?: CrisisLogWhereInput | CrisisLogWhereInput[]
    id?: StringFilter<"CrisisLog"> | string
    userId?: StringFilter<"CrisisLog"> | string
    message?: StringFilter<"CrisisLog"> | string
    severity?: IntFilter<"CrisisLog"> | number
    categories?: JsonFilter<"CrisisLog">
    responseProvided?: BoolFilter<"CrisisLog"> | boolean
    resourcesShown?: BoolFilter<"CrisisLog"> | boolean
    emergencyContactCalled?: BoolFilter<"CrisisLog"> | boolean
    timestamp?: DateTimeFilter<"CrisisLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CrisisLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    categories?: SortOrder
    responseProvided?: SortOrder
    resourcesShown?: SortOrder
    emergencyContactCalled?: SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type CrisisLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CrisisLogWhereInput | CrisisLogWhereInput[]
    OR?: CrisisLogWhereInput[]
    NOT?: CrisisLogWhereInput | CrisisLogWhereInput[]
    userId?: StringFilter<"CrisisLog"> | string
    message?: StringFilter<"CrisisLog"> | string
    severity?: IntFilter<"CrisisLog"> | number
    categories?: JsonFilter<"CrisisLog">
    responseProvided?: BoolFilter<"CrisisLog"> | boolean
    resourcesShown?: BoolFilter<"CrisisLog"> | boolean
    emergencyContactCalled?: BoolFilter<"CrisisLog"> | boolean
    timestamp?: DateTimeFilter<"CrisisLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CrisisLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    categories?: SortOrder
    responseProvided?: SortOrder
    resourcesShown?: SortOrder
    emergencyContactCalled?: SortOrder
    timestamp?: SortOrder
    _count?: CrisisLogCountOrderByAggregateInput
    _avg?: CrisisLogAvgOrderByAggregateInput
    _max?: CrisisLogMaxOrderByAggregateInput
    _min?: CrisisLogMinOrderByAggregateInput
    _sum?: CrisisLogSumOrderByAggregateInput
  }

  export type CrisisLogScalarWhereWithAggregatesInput = {
    AND?: CrisisLogScalarWhereWithAggregatesInput | CrisisLogScalarWhereWithAggregatesInput[]
    OR?: CrisisLogScalarWhereWithAggregatesInput[]
    NOT?: CrisisLogScalarWhereWithAggregatesInput | CrisisLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CrisisLog"> | string
    userId?: StringWithAggregatesFilter<"CrisisLog"> | string
    message?: StringWithAggregatesFilter<"CrisisLog"> | string
    severity?: IntWithAggregatesFilter<"CrisisLog"> | number
    categories?: JsonWithAggregatesFilter<"CrisisLog">
    responseProvided?: BoolWithAggregatesFilter<"CrisisLog"> | boolean
    resourcesShown?: BoolWithAggregatesFilter<"CrisisLog"> | boolean
    emergencyContactCalled?: BoolWithAggregatesFilter<"CrisisLog"> | boolean
    timestamp?: DateTimeWithAggregatesFilter<"CrisisLog"> | Date | string
  }

  export type UsageLogWhereInput = {
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    id?: StringFilter<"UsageLog"> | string
    userId?: StringFilter<"UsageLog"> | string
    service?: EnumServiceFilter<"UsageLog"> | $Enums.Service
    model?: StringNullableFilter<"UsageLog"> | string | null
    tokensUsed?: IntNullableFilter<"UsageLog"> | number | null
    finishReason?: StringNullableFilter<"UsageLog"> | string | null
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UsageLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    service?: SortOrder
    model?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    finishReason?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UsageLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsageLogWhereInput | UsageLogWhereInput[]
    OR?: UsageLogWhereInput[]
    NOT?: UsageLogWhereInput | UsageLogWhereInput[]
    userId?: StringFilter<"UsageLog"> | string
    service?: EnumServiceFilter<"UsageLog"> | $Enums.Service
    model?: StringNullableFilter<"UsageLog"> | string | null
    tokensUsed?: IntNullableFilter<"UsageLog"> | number | null
    finishReason?: StringNullableFilter<"UsageLog"> | string | null
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UsageLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    service?: SortOrder
    model?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    finishReason?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: UsageLogCountOrderByAggregateInput
    _avg?: UsageLogAvgOrderByAggregateInput
    _max?: UsageLogMaxOrderByAggregateInput
    _min?: UsageLogMinOrderByAggregateInput
    _sum?: UsageLogSumOrderByAggregateInput
  }

  export type UsageLogScalarWhereWithAggregatesInput = {
    AND?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    OR?: UsageLogScalarWhereWithAggregatesInput[]
    NOT?: UsageLogScalarWhereWithAggregatesInput | UsageLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageLog"> | string
    userId?: StringWithAggregatesFilter<"UsageLog"> | string
    service?: EnumServiceWithAggregatesFilter<"UsageLog"> | $Enums.Service
    model?: StringNullableWithAggregatesFilter<"UsageLog"> | string | null
    tokensUsed?: IntNullableWithAggregatesFilter<"UsageLog"> | number | null
    finishReason?: StringNullableWithAggregatesFilter<"UsageLog"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"UsageLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    userId: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    userId: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    conversation: ConversationCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    conversationId: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    conversation?: ConversationUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageCreateManyInput = {
    id?: string
    conversationId: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MoodEntryCreateInput = {
    id?: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMoodEntriesInput
  }

  export type MoodEntryUncheckedCreateInput = {
    id?: string
    userId: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
  }

  export type MoodEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMoodEntriesNestedInput
  }

  export type MoodEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryCreateManyInput = {
    id?: string
    userId: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
  }

  export type MoodEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateInput = {
    id?: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAssessmentsInput
  }

  export type AssessmentUncheckedCreateInput = {
    id?: string
    userId: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAssessmentsNestedInput
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateManyInput = {
    id?: string
    userId: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionCreateInput = {
    id?: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutAiInteractionsInput
  }

  export type AIInteractionUncheckedCreateInput = {
    id?: string
    userId: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
  }

  export type AIInteractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiInteractionsNestedInput
  }

  export type AIInteractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionCreateManyInput = {
    id?: string
    userId: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
  }

  export type AIInteractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogCreateInput = {
    id?: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutCrisisLogsInput
  }

  export type CrisisLogUncheckedCreateInput = {
    id?: string
    userId: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
  }

  export type CrisisLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCrisisLogsNestedInput
  }

  export type CrisisLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogCreateManyInput = {
    id?: string
    userId: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
  }

  export type CrisisLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateInput = {
    id?: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
    user: UserCreateNestedOneWithoutUsageLogsInput
  }

  export type UsageLogUncheckedCreateInput = {
    id?: string
    userId: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
  }

  export type UsageLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUsageLogsNestedInput
  }

  export type UsageLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogCreateManyInput = {
    id?: string
    userId: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
  }

  export type UsageLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumUniversityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.University | EnumUniversityFieldRefInput<$PrismaModel> | null
    in?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUniversityNullableFilter<$PrismaModel> | $Enums.University | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageFilter<$PrismaModel> | $Enums.Language
  }

  export type EnumNotificationFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationFrequency | EnumNotificationFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationFrequencyFilter<$PrismaModel> | $Enums.NotificationFrequency
  }

  export type EnumTimeOfDayFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOfDay | EnumTimeOfDayFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOfDayFilter<$PrismaModel> | $Enums.TimeOfDay
  }

  export type EnumConcernNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Concern[] | ListEnumConcernFieldRefInput<$PrismaModel> | null
    has?: $Enums.Concern | EnumConcernFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Concern[] | ListEnumConcernFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Concern[] | ListEnumConcernFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumSupportLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportLevel | EnumSupportLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSupportLevelFilter<$PrismaModel> | $Enums.SupportLevel
  }

  export type EnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type EnumCopingStyleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.CopingStyle[] | ListEnumCopingStyleFieldRefInput<$PrismaModel> | null
    has?: $Enums.CopingStyle | EnumCopingStyleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.CopingStyle[] | ListEnumCopingStyleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.CopingStyle[] | ListEnumCopingStyleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumFaithLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.FaithLevel | EnumFaithLevelFieldRefInput<$PrismaModel>
    in?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumFaithLevelFilter<$PrismaModel> | $Enums.FaithLevel
  }

  export type EnumApproachPreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ApproachPreference | EnumApproachPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumApproachPreferenceFilter<$PrismaModel> | $Enums.ApproachPreference
  }

  export type EnumGoalNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Goal[] | ListEnumGoalFieldRefInput<$PrismaModel> | null
    has?: $Enums.Goal | EnumGoalFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Goal[] | ListEnumGoalFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Goal[] | ListEnumGoalFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type MoodEntryListRelationFilter = {
    every?: MoodEntryWhereInput
    some?: MoodEntryWhereInput
    none?: MoodEntryWhereInput
  }

  export type AssessmentListRelationFilter = {
    every?: AssessmentWhereInput
    some?: AssessmentWhereInput
    none?: AssessmentWhereInput
  }

  export type AIInteractionListRelationFilter = {
    every?: AIInteractionWhereInput
    some?: AIInteractionWhereInput
    none?: AIInteractionWhereInput
  }

  export type CrisisLogListRelationFilter = {
    every?: CrisisLogWhereInput
    some?: CrisisLogWhereInput
    none?: CrisisLogWhereInput
  }

  export type UsageLogListRelationFilter = {
    every?: UsageLogWhereInput
    some?: UsageLogWhereInput
    none?: UsageLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MoodEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssessmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIInteractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CrisisLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isVerified?: SortOrder
    isAnonymous?: SortOrder
    verificationToken?: SortOrder
    image?: SortOrder
    displayName?: SortOrder
    university?: SortOrder
    academicLevel?: SortOrder
    program?: SortOrder
    language?: SortOrder
    notificationPreference?: SortOrder
    preferredCheckInTime?: SortOrder
    concerns?: SortOrder
    supportLevel?: SortOrder
    riskLevel?: SortOrder
    copingStyles?: SortOrder
    faithLevel?: SortOrder
    approachPreference?: SortOrder
    goals?: SortOrder
    stressors?: SortOrder
    trackingPreferences?: SortOrder
    emergencyContacts?: SortOrder
    baselineMood?: SortOrder
    baseline?: SortOrder
    joinDate?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    lastActive?: SortOrder
    onboardingStep?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    academicLevel?: SortOrder
    baselineMood?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    onboardingStep?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isVerified?: SortOrder
    isAnonymous?: SortOrder
    verificationToken?: SortOrder
    image?: SortOrder
    displayName?: SortOrder
    university?: SortOrder
    academicLevel?: SortOrder
    program?: SortOrder
    language?: SortOrder
    notificationPreference?: SortOrder
    preferredCheckInTime?: SortOrder
    supportLevel?: SortOrder
    riskLevel?: SortOrder
    faithLevel?: SortOrder
    approachPreference?: SortOrder
    baselineMood?: SortOrder
    joinDate?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    lastActive?: SortOrder
    onboardingStep?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    googleId?: SortOrder
    isVerified?: SortOrder
    isAnonymous?: SortOrder
    verificationToken?: SortOrder
    image?: SortOrder
    displayName?: SortOrder
    university?: SortOrder
    academicLevel?: SortOrder
    program?: SortOrder
    language?: SortOrder
    notificationPreference?: SortOrder
    preferredCheckInTime?: SortOrder
    supportLevel?: SortOrder
    riskLevel?: SortOrder
    faithLevel?: SortOrder
    approachPreference?: SortOrder
    baselineMood?: SortOrder
    joinDate?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    lastActive?: SortOrder
    onboardingStep?: SortOrder
    onboardingCompleted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    academicLevel?: SortOrder
    baselineMood?: SortOrder
    moodCheckInsCount?: SortOrder
    conversationsCount?: SortOrder
    onboardingStep?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumUniversityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.University | EnumUniversityFieldRefInput<$PrismaModel> | null
    in?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUniversityNullableWithAggregatesFilter<$PrismaModel> | $Enums.University | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumUniversityNullableFilter<$PrismaModel>
    _max?: NestedEnumUniversityNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageWithAggregatesFilter<$PrismaModel> | $Enums.Language
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLanguageFilter<$PrismaModel>
    _max?: NestedEnumLanguageFilter<$PrismaModel>
  }

  export type EnumNotificationFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationFrequency | EnumNotificationFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.NotificationFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationFrequencyFilter<$PrismaModel>
    _max?: NestedEnumNotificationFrequencyFilter<$PrismaModel>
  }

  export type EnumTimeOfDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOfDay | EnumTimeOfDayFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOfDayWithAggregatesFilter<$PrismaModel> | $Enums.TimeOfDay
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeOfDayFilter<$PrismaModel>
    _max?: NestedEnumTimeOfDayFilter<$PrismaModel>
  }

  export type EnumSupportLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportLevel | EnumSupportLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSupportLevelWithAggregatesFilter<$PrismaModel> | $Enums.SupportLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupportLevelFilter<$PrismaModel>
    _max?: NestedEnumSupportLevelFilter<$PrismaModel>
  }

  export type EnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type EnumFaithLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaithLevel | EnumFaithLevelFieldRefInput<$PrismaModel>
    in?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumFaithLevelWithAggregatesFilter<$PrismaModel> | $Enums.FaithLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaithLevelFilter<$PrismaModel>
    _max?: NestedEnumFaithLevelFilter<$PrismaModel>
  }

  export type EnumApproachPreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApproachPreference | EnumApproachPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumApproachPreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ApproachPreference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApproachPreferenceFilter<$PrismaModel>
    _max?: NestedEnumApproachPreferenceFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumConversationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusFilter<$PrismaModel> | $Enums.ConversationStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    lastMessageAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    metadata?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    lastMessageAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    startedAt?: SortOrder
    lastMessageAt?: SortOrder
    endedAt?: SortOrder
    status?: SortOrder
    summary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumConversationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationStatusFilter<$PrismaModel>
  }

  export type EnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }

  export type ConversationScalarRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
    metadata?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    timestamp?: SortOrder
  }

  export type EnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type MoodEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    energy?: SortOrder
    sleep?: SortOrder
    social?: SortOrder
    anxiety?: SortOrder
    notes?: SortOrder
    tags?: SortOrder
    sentimentScore?: SortOrder
    sentimentLabel?: SortOrder
    crisisFlag?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntryAvgOrderByAggregateInput = {
    mood?: SortOrder
    energy?: SortOrder
    sleep?: SortOrder
    social?: SortOrder
    anxiety?: SortOrder
    sentimentScore?: SortOrder
  }

  export type MoodEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    energy?: SortOrder
    sleep?: SortOrder
    social?: SortOrder
    anxiety?: SortOrder
    notes?: SortOrder
    sentimentScore?: SortOrder
    sentimentLabel?: SortOrder
    crisisFlag?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    mood?: SortOrder
    energy?: SortOrder
    sleep?: SortOrder
    social?: SortOrder
    anxiety?: SortOrder
    notes?: SortOrder
    sentimentScore?: SortOrder
    sentimentLabel?: SortOrder
    crisisFlag?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntrySumOrderByAggregateInput = {
    mood?: SortOrder
    energy?: SortOrder
    sleep?: SortOrder
    social?: SortOrder
    anxiety?: SortOrder
    sentimentScore?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAssessmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentType | EnumAssessmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssessmentTypeFilter<$PrismaModel> | $Enums.AssessmentType
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumSeverityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeverityNullableFilter<$PrismaModel> | $Enums.Severity | null
  }

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    responses?: SortOrder
    score?: SortOrder
    severity?: SortOrder
    interpretation?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    score?: SortOrder
    severity?: SortOrder
    interpretation?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    score?: SortOrder
    severity?: SortOrder
    interpretation?: SortOrder
    createdAt?: SortOrder
  }

  export type AssessmentSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type EnumAssessmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentType | EnumAssessmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssessmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssessmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssessmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAssessmentTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumSeverityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Severity | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSeverityNullableFilter<$PrismaModel>
    _max?: NestedEnumSeverityNullableFilter<$PrismaModel>
  }

  export type AIInteractionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userMessage?: SortOrder
    aiResponse?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    crisisDetected?: SortOrder
    emotionalIntensity?: SortOrder
    responseTime?: SortOrder
    timestamp?: SortOrder
  }

  export type AIInteractionAvgOrderByAggregateInput = {
    tokensUsed?: SortOrder
    emotionalIntensity?: SortOrder
    responseTime?: SortOrder
  }

  export type AIInteractionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userMessage?: SortOrder
    aiResponse?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    crisisDetected?: SortOrder
    emotionalIntensity?: SortOrder
    responseTime?: SortOrder
    timestamp?: SortOrder
  }

  export type AIInteractionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    userMessage?: SortOrder
    aiResponse?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    crisisDetected?: SortOrder
    emotionalIntensity?: SortOrder
    responseTime?: SortOrder
    timestamp?: SortOrder
  }

  export type AIInteractionSumOrderByAggregateInput = {
    tokensUsed?: SortOrder
    emotionalIntensity?: SortOrder
    responseTime?: SortOrder
  }

  export type CrisisLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    categories?: SortOrder
    responseProvided?: SortOrder
    resourcesShown?: SortOrder
    emergencyContactCalled?: SortOrder
    timestamp?: SortOrder
  }

  export type CrisisLogAvgOrderByAggregateInput = {
    severity?: SortOrder
  }

  export type CrisisLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    responseProvided?: SortOrder
    resourcesShown?: SortOrder
    emergencyContactCalled?: SortOrder
    timestamp?: SortOrder
  }

  export type CrisisLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    message?: SortOrder
    severity?: SortOrder
    responseProvided?: SortOrder
    resourcesShown?: SortOrder
    emergencyContactCalled?: SortOrder
    timestamp?: SortOrder
  }

  export type CrisisLogSumOrderByAggregateInput = {
    severity?: SortOrder
  }

  export type EnumServiceFilter<$PrismaModel = never> = {
    equals?: $Enums.Service | EnumServiceFieldRefInput<$PrismaModel>
    in?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceFilter<$PrismaModel> | $Enums.Service
  }

  export type UsageLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    service?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    finishReason?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogAvgOrderByAggregateInput = {
    tokensUsed?: SortOrder
  }

  export type UsageLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    service?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    finishReason?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    service?: SortOrder
    model?: SortOrder
    tokensUsed?: SortOrder
    finishReason?: SortOrder
    timestamp?: SortOrder
  }

  export type UsageLogSumOrderByAggregateInput = {
    tokensUsed?: SortOrder
  }

  export type EnumServiceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Service | EnumServiceFieldRefInput<$PrismaModel>
    in?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceWithAggregatesFilter<$PrismaModel> | $Enums.Service
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceFilter<$PrismaModel>
    _max?: NestedEnumServiceFilter<$PrismaModel>
  }

  export type UserCreateconcernsInput = {
    set: $Enums.Concern[]
  }

  export type UserCreatecopingStylesInput = {
    set: $Enums.CopingStyle[]
  }

  export type UserCreategoalsInput = {
    set: $Enums.Goal[]
  }

  export type ConversationCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type MoodEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
  }

  export type AssessmentCreateNestedManyWithoutUserInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AIInteractionCreateNestedManyWithoutUserInput = {
    create?: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput> | AIInteractionCreateWithoutUserInput[] | AIInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIInteractionCreateOrConnectWithoutUserInput | AIInteractionCreateOrConnectWithoutUserInput[]
    createMany?: AIInteractionCreateManyUserInputEnvelope
    connect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
  }

  export type CrisisLogCreateNestedManyWithoutUserInput = {
    create?: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput> | CrisisLogCreateWithoutUserInput[] | CrisisLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CrisisLogCreateOrConnectWithoutUserInput | CrisisLogCreateOrConnectWithoutUserInput[]
    createMany?: CrisisLogCreateManyUserInputEnvelope
    connect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
  }

  export type UsageLogCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type MoodEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
  }

  export type AssessmentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type AIInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput> | AIInteractionCreateWithoutUserInput[] | AIInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIInteractionCreateOrConnectWithoutUserInput | AIInteractionCreateOrConnectWithoutUserInput[]
    createMany?: AIInteractionCreateManyUserInputEnvelope
    connect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
  }

  export type CrisisLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput> | CrisisLogCreateWithoutUserInput[] | CrisisLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CrisisLogCreateOrConnectWithoutUserInput | CrisisLogCreateOrConnectWithoutUserInput[]
    createMany?: CrisisLogCreateManyUserInputEnvelope
    connect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
  }

  export type UsageLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumUniversityFieldUpdateOperationsInput = {
    set?: $Enums.University | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumLanguageFieldUpdateOperationsInput = {
    set?: $Enums.Language
  }

  export type EnumNotificationFrequencyFieldUpdateOperationsInput = {
    set?: $Enums.NotificationFrequency
  }

  export type EnumTimeOfDayFieldUpdateOperationsInput = {
    set?: $Enums.TimeOfDay
  }

  export type UserUpdateconcernsInput = {
    set?: $Enums.Concern[]
    push?: $Enums.Concern | $Enums.Concern[]
  }

  export type EnumSupportLevelFieldUpdateOperationsInput = {
    set?: $Enums.SupportLevel
  }

  export type EnumRiskLevelFieldUpdateOperationsInput = {
    set?: $Enums.RiskLevel
  }

  export type UserUpdatecopingStylesInput = {
    set?: $Enums.CopingStyle[]
    push?: $Enums.CopingStyle | $Enums.CopingStyle[]
  }

  export type EnumFaithLevelFieldUpdateOperationsInput = {
    set?: $Enums.FaithLevel
  }

  export type EnumApproachPreferenceFieldUpdateOperationsInput = {
    set?: $Enums.ApproachPreference
  }

  export type UserUpdategoalsInput = {
    set?: $Enums.Goal[]
    push?: $Enums.Goal | $Enums.Goal[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type MoodEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    upsert?: MoodEntryUpsertWithWhereUniqueWithoutUserInput | MoodEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    set?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    disconnect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    delete?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    update?: MoodEntryUpdateWithWhereUniqueWithoutUserInput | MoodEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodEntryUpdateManyWithWhereWithoutUserInput | MoodEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
  }

  export type AssessmentUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutUserInput | AssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutUserInput | AssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutUserInput | AssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AIInteractionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput> | AIInteractionCreateWithoutUserInput[] | AIInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIInteractionCreateOrConnectWithoutUserInput | AIInteractionCreateOrConnectWithoutUserInput[]
    upsert?: AIInteractionUpsertWithWhereUniqueWithoutUserInput | AIInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIInteractionCreateManyUserInputEnvelope
    set?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    disconnect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    delete?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    connect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    update?: AIInteractionUpdateWithWhereUniqueWithoutUserInput | AIInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIInteractionUpdateManyWithWhereWithoutUserInput | AIInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIInteractionScalarWhereInput | AIInteractionScalarWhereInput[]
  }

  export type CrisisLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput> | CrisisLogCreateWithoutUserInput[] | CrisisLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CrisisLogCreateOrConnectWithoutUserInput | CrisisLogCreateOrConnectWithoutUserInput[]
    upsert?: CrisisLogUpsertWithWhereUniqueWithoutUserInput | CrisisLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CrisisLogCreateManyUserInputEnvelope
    set?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    disconnect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    delete?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    connect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    update?: CrisisLogUpdateWithWhereUniqueWithoutUserInput | CrisisLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CrisisLogUpdateManyWithWhereWithoutUserInput | CrisisLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CrisisLogScalarWhereInput | CrisisLogScalarWhereInput[]
  }

  export type UsageLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutUserInput | UsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutUserInput | UsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutUserInput | UsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput> | ConversationCreateWithoutUserInput[] | ConversationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutUserInput | ConversationCreateOrConnectWithoutUserInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutUserInput | ConversationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ConversationCreateManyUserInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutUserInput | ConversationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutUserInput | ConversationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type MoodEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput> | MoodEntryCreateWithoutUserInput[] | MoodEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MoodEntryCreateOrConnectWithoutUserInput | MoodEntryCreateOrConnectWithoutUserInput[]
    upsert?: MoodEntryUpsertWithWhereUniqueWithoutUserInput | MoodEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MoodEntryCreateManyUserInputEnvelope
    set?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    disconnect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    delete?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    connect?: MoodEntryWhereUniqueInput | MoodEntryWhereUniqueInput[]
    update?: MoodEntryUpdateWithWhereUniqueWithoutUserInput | MoodEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MoodEntryUpdateManyWithWhereWithoutUserInput | MoodEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
  }

  export type AssessmentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput> | AssessmentCreateWithoutUserInput[] | AssessmentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutUserInput | AssessmentCreateOrConnectWithoutUserInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutUserInput | AssessmentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AssessmentCreateManyUserInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutUserInput | AssessmentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutUserInput | AssessmentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type AIInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput> | AIInteractionCreateWithoutUserInput[] | AIInteractionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIInteractionCreateOrConnectWithoutUserInput | AIInteractionCreateOrConnectWithoutUserInput[]
    upsert?: AIInteractionUpsertWithWhereUniqueWithoutUserInput | AIInteractionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIInteractionCreateManyUserInputEnvelope
    set?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    disconnect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    delete?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    connect?: AIInteractionWhereUniqueInput | AIInteractionWhereUniqueInput[]
    update?: AIInteractionUpdateWithWhereUniqueWithoutUserInput | AIInteractionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIInteractionUpdateManyWithWhereWithoutUserInput | AIInteractionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIInteractionScalarWhereInput | AIInteractionScalarWhereInput[]
  }

  export type CrisisLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput> | CrisisLogCreateWithoutUserInput[] | CrisisLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CrisisLogCreateOrConnectWithoutUserInput | CrisisLogCreateOrConnectWithoutUserInput[]
    upsert?: CrisisLogUpsertWithWhereUniqueWithoutUserInput | CrisisLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CrisisLogCreateManyUserInputEnvelope
    set?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    disconnect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    delete?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    connect?: CrisisLogWhereUniqueInput | CrisisLogWhereUniqueInput[]
    update?: CrisisLogUpdateWithWhereUniqueWithoutUserInput | CrisisLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CrisisLogUpdateManyWithWhereWithoutUserInput | CrisisLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CrisisLogScalarWhereInput | CrisisLogScalarWhereInput[]
  }

  export type UsageLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput> | UsageLogCreateWithoutUserInput[] | UsageLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLogCreateOrConnectWithoutUserInput | UsageLogCreateOrConnectWithoutUserInput[]
    upsert?: UsageLogUpsertWithWhereUniqueWithoutUserInput | UsageLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLogCreateManyUserInputEnvelope
    set?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    disconnect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    delete?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    connect?: UsageLogWhereUniqueInput | UsageLogWhereUniqueInput[]
    update?: UsageLogUpdateWithWhereUniqueWithoutUserInput | UsageLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLogUpdateManyWithWhereWithoutUserInput | UsageLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type EnumConversationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ConversationStatus
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type MessageUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput> | MessageCreateWithoutConversationInput[] | MessageUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutConversationInput | MessageCreateOrConnectWithoutConversationInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutConversationInput | MessageUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: MessageCreateManyConversationInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutConversationInput | MessageUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutConversationInput | MessageUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ConversationCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
  }

  export type EnumMessageRoleFieldUpdateOperationsInput = {
    set?: $Enums.MessageRole
  }

  export type ConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutMessagesInput
    upsert?: ConversationUpsertWithoutMessagesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutMessagesInput, ConversationUpdateWithoutMessagesInput>, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type MoodEntryCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutMoodEntriesInput = {
    create?: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type MoodEntryUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutMoodEntriesNestedInput = {
    create?: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutMoodEntriesInput
    upsert?: UserUpsertWithoutMoodEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMoodEntriesInput, UserUpdateWithoutMoodEntriesInput>, UserUncheckedUpdateWithoutMoodEntriesInput>
  }

  export type UserCreateNestedOneWithoutAssessmentsInput = {
    create?: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssessmentsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAssessmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AssessmentType
  }

  export type NullableEnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity | null
  }

  export type UserUpdateOneRequiredWithoutAssessmentsNestedInput = {
    create?: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAssessmentsInput
    upsert?: UserUpsertWithoutAssessmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAssessmentsInput, UserUpdateWithoutAssessmentsInput>, UserUncheckedUpdateWithoutAssessmentsInput>
  }

  export type UserCreateNestedOneWithoutAiInteractionsInput = {
    create?: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiInteractionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAiInteractionsNestedInput = {
    create?: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiInteractionsInput
    upsert?: UserUpsertWithoutAiInteractionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiInteractionsInput, UserUpdateWithoutAiInteractionsInput>, UserUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type UserCreateNestedOneWithoutCrisisLogsInput = {
    create?: XOR<UserCreateWithoutCrisisLogsInput, UserUncheckedCreateWithoutCrisisLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCrisisLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCrisisLogsNestedInput = {
    create?: XOR<UserCreateWithoutCrisisLogsInput, UserUncheckedCreateWithoutCrisisLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCrisisLogsInput
    upsert?: UserUpsertWithoutCrisisLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCrisisLogsInput, UserUpdateWithoutCrisisLogsInput>, UserUncheckedUpdateWithoutCrisisLogsInput>
  }

  export type UserCreateNestedOneWithoutUsageLogsInput = {
    create?: XOR<UserCreateWithoutUsageLogsInput, UserUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageLogsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumServiceFieldUpdateOperationsInput = {
    set?: $Enums.Service
  }

  export type UserUpdateOneRequiredWithoutUsageLogsNestedInput = {
    create?: XOR<UserCreateWithoutUsageLogsInput, UserUncheckedCreateWithoutUsageLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageLogsInput
    upsert?: UserUpsertWithoutUsageLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsageLogsInput, UserUpdateWithoutUsageLogsInput>, UserUncheckedUpdateWithoutUsageLogsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumUniversityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.University | EnumUniversityFieldRefInput<$PrismaModel> | null
    in?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUniversityNullableFilter<$PrismaModel> | $Enums.University | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLanguageFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageFilter<$PrismaModel> | $Enums.Language
  }

  export type NestedEnumNotificationFrequencyFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationFrequency | EnumNotificationFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationFrequencyFilter<$PrismaModel> | $Enums.NotificationFrequency
  }

  export type NestedEnumTimeOfDayFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOfDay | EnumTimeOfDayFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOfDayFilter<$PrismaModel> | $Enums.TimeOfDay
  }

  export type NestedEnumSupportLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportLevel | EnumSupportLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSupportLevelFilter<$PrismaModel> | $Enums.SupportLevel
  }

  export type NestedEnumRiskLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelFilter<$PrismaModel> | $Enums.RiskLevel
  }

  export type NestedEnumFaithLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.FaithLevel | EnumFaithLevelFieldRefInput<$PrismaModel>
    in?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumFaithLevelFilter<$PrismaModel> | $Enums.FaithLevel
  }

  export type NestedEnumApproachPreferenceFilter<$PrismaModel = never> = {
    equals?: $Enums.ApproachPreference | EnumApproachPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumApproachPreferenceFilter<$PrismaModel> | $Enums.ApproachPreference
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumUniversityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.University | EnumUniversityFieldRefInput<$PrismaModel> | null
    in?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.University[] | ListEnumUniversityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUniversityNullableWithAggregatesFilter<$PrismaModel> | $Enums.University | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumUniversityNullableFilter<$PrismaModel>
    _max?: NestedEnumUniversityNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumLanguageWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Language | EnumLanguageFieldRefInput<$PrismaModel>
    in?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    notIn?: $Enums.Language[] | ListEnumLanguageFieldRefInput<$PrismaModel>
    not?: NestedEnumLanguageWithAggregatesFilter<$PrismaModel> | $Enums.Language
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumLanguageFilter<$PrismaModel>
    _max?: NestedEnumLanguageFilter<$PrismaModel>
  }

  export type NestedEnumNotificationFrequencyWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NotificationFrequency | EnumNotificationFrequencyFieldRefInput<$PrismaModel>
    in?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    notIn?: $Enums.NotificationFrequency[] | ListEnumNotificationFrequencyFieldRefInput<$PrismaModel>
    not?: NestedEnumNotificationFrequencyWithAggregatesFilter<$PrismaModel> | $Enums.NotificationFrequency
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNotificationFrequencyFilter<$PrismaModel>
    _max?: NestedEnumNotificationFrequencyFilter<$PrismaModel>
  }

  export type NestedEnumTimeOfDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimeOfDay | EnumTimeOfDayFieldRefInput<$PrismaModel>
    in?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimeOfDay[] | ListEnumTimeOfDayFieldRefInput<$PrismaModel>
    not?: NestedEnumTimeOfDayWithAggregatesFilter<$PrismaModel> | $Enums.TimeOfDay
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimeOfDayFilter<$PrismaModel>
    _max?: NestedEnumTimeOfDayFilter<$PrismaModel>
  }

  export type NestedEnumSupportLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SupportLevel | EnumSupportLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SupportLevel[] | ListEnumSupportLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSupportLevelWithAggregatesFilter<$PrismaModel> | $Enums.SupportLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSupportLevelFilter<$PrismaModel>
    _max?: NestedEnumSupportLevelFilter<$PrismaModel>
  }

  export type NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RiskLevel | EnumRiskLevelFieldRefInput<$PrismaModel>
    in?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.RiskLevel[] | ListEnumRiskLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumRiskLevelWithAggregatesFilter<$PrismaModel> | $Enums.RiskLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRiskLevelFilter<$PrismaModel>
    _max?: NestedEnumRiskLevelFilter<$PrismaModel>
  }

  export type NestedEnumFaithLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FaithLevel | EnumFaithLevelFieldRefInput<$PrismaModel>
    in?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.FaithLevel[] | ListEnumFaithLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumFaithLevelWithAggregatesFilter<$PrismaModel> | $Enums.FaithLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFaithLevelFilter<$PrismaModel>
    _max?: NestedEnumFaithLevelFilter<$PrismaModel>
  }

  export type NestedEnumApproachPreferenceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApproachPreference | EnumApproachPreferenceFieldRefInput<$PrismaModel>
    in?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApproachPreference[] | ListEnumApproachPreferenceFieldRefInput<$PrismaModel>
    not?: NestedEnumApproachPreferenceWithAggregatesFilter<$PrismaModel> | $Enums.ApproachPreference
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApproachPreferenceFilter<$PrismaModel>
    _max?: NestedEnumApproachPreferenceFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumConversationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusFilter<$PrismaModel> | $Enums.ConversationStatus
  }

  export type NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConversationStatus | EnumConversationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConversationStatus[] | ListEnumConversationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumConversationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ConversationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConversationStatusFilter<$PrismaModel>
    _max?: NestedEnumConversationStatusFilter<$PrismaModel>
  }

  export type NestedEnumMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleFilter<$PrismaModel> | $Enums.MessageRole
  }

  export type NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageRole | EnumMessageRoleFieldRefInput<$PrismaModel>
    in?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageRole[] | ListEnumMessageRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.MessageRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageRoleFilter<$PrismaModel>
    _max?: NestedEnumMessageRoleFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssessmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentType | EnumAssessmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssessmentTypeFilter<$PrismaModel> | $Enums.AssessmentType
  }

  export type NestedEnumSeverityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeverityNullableFilter<$PrismaModel> | $Enums.Severity | null
  }

  export type NestedEnumAssessmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssessmentType | EnumAssessmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssessmentType[] | ListEnumAssessmentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAssessmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AssessmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssessmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAssessmentTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel> | null
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumSeverityNullableWithAggregatesFilter<$PrismaModel> | $Enums.Severity | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSeverityNullableFilter<$PrismaModel>
    _max?: NestedEnumSeverityNullableFilter<$PrismaModel>
  }

  export type NestedEnumServiceFilter<$PrismaModel = never> = {
    equals?: $Enums.Service | EnumServiceFieldRefInput<$PrismaModel>
    in?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceFilter<$PrismaModel> | $Enums.Service
  }

  export type NestedEnumServiceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Service | EnumServiceFieldRefInput<$PrismaModel>
    in?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    notIn?: $Enums.Service[] | ListEnumServiceFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceWithAggregatesFilter<$PrismaModel> | $Enums.Service
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceFilter<$PrismaModel>
    _max?: NestedEnumServiceFilter<$PrismaModel>
  }

  export type ConversationCreateWithoutUserInput = {
    id?: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutUserInput = {
    id?: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutUserInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationCreateManyUserInputEnvelope = {
    data: ConversationCreateManyUserInput | ConversationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type MoodEntryCreateWithoutUserInput = {
    id?: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
  }

  export type MoodEntryUncheckedCreateWithoutUserInput = {
    id?: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
  }

  export type MoodEntryCreateOrConnectWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    create: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput>
  }

  export type MoodEntryCreateManyUserInputEnvelope = {
    data: MoodEntryCreateManyUserInput | MoodEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentCreateWithoutUserInput = {
    id?: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
  }

  export type AssessmentUncheckedCreateWithoutUserInput = {
    id?: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
  }

  export type AssessmentCreateOrConnectWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput>
  }

  export type AssessmentCreateManyUserInputEnvelope = {
    data: AssessmentCreateManyUserInput | AssessmentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AIInteractionCreateWithoutUserInput = {
    id?: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
  }

  export type AIInteractionUncheckedCreateWithoutUserInput = {
    id?: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
  }

  export type AIInteractionCreateOrConnectWithoutUserInput = {
    where: AIInteractionWhereUniqueInput
    create: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput>
  }

  export type AIInteractionCreateManyUserInputEnvelope = {
    data: AIInteractionCreateManyUserInput | AIInteractionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CrisisLogCreateWithoutUserInput = {
    id?: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
  }

  export type CrisisLogUncheckedCreateWithoutUserInput = {
    id?: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
  }

  export type CrisisLogCreateOrConnectWithoutUserInput = {
    where: CrisisLogWhereUniqueInput
    create: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput>
  }

  export type CrisisLogCreateManyUserInputEnvelope = {
    data: CrisisLogCreateManyUserInput | CrisisLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UsageLogCreateWithoutUserInput = {
    id?: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
  }

  export type UsageLogUncheckedCreateWithoutUserInput = {
    id?: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
  }

  export type UsageLogCreateOrConnectWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    create: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput>
  }

  export type UsageLogCreateManyUserInputEnvelope = {
    data: UsageLogCreateManyUserInput | UsageLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
    create: XOR<ConversationCreateWithoutUserInput, ConversationUncheckedCreateWithoutUserInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutUserInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutUserInput, ConversationUncheckedUpdateWithoutUserInput>
  }

  export type ConversationUpdateManyWithWhereWithoutUserInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutUserInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    userId?: StringFilter<"Conversation"> | string
    startedAt?: DateTimeFilter<"Conversation"> | Date | string
    lastMessageAt?: DateTimeFilter<"Conversation"> | Date | string
    endedAt?: DateTimeNullableFilter<"Conversation"> | Date | string | null
    status?: EnumConversationStatusFilter<"Conversation"> | $Enums.ConversationStatus
    metadata?: JsonNullableFilter<"Conversation">
    summary?: StringNullableFilter<"Conversation"> | string | null
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type MoodEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    update: XOR<MoodEntryUpdateWithoutUserInput, MoodEntryUncheckedUpdateWithoutUserInput>
    create: XOR<MoodEntryCreateWithoutUserInput, MoodEntryUncheckedCreateWithoutUserInput>
  }

  export type MoodEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: MoodEntryWhereUniqueInput
    data: XOR<MoodEntryUpdateWithoutUserInput, MoodEntryUncheckedUpdateWithoutUserInput>
  }

  export type MoodEntryUpdateManyWithWhereWithoutUserInput = {
    where: MoodEntryScalarWhereInput
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type MoodEntryScalarWhereInput = {
    AND?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
    OR?: MoodEntryScalarWhereInput[]
    NOT?: MoodEntryScalarWhereInput | MoodEntryScalarWhereInput[]
    id?: StringFilter<"MoodEntry"> | string
    userId?: StringFilter<"MoodEntry"> | string
    mood?: IntFilter<"MoodEntry"> | number
    energy?: IntNullableFilter<"MoodEntry"> | number | null
    sleep?: IntNullableFilter<"MoodEntry"> | number | null
    social?: IntNullableFilter<"MoodEntry"> | number | null
    anxiety?: IntNullableFilter<"MoodEntry"> | number | null
    notes?: StringNullableFilter<"MoodEntry"> | string | null
    tags?: StringNullableListFilter<"MoodEntry">
    sentimentScore?: FloatNullableFilter<"MoodEntry"> | number | null
    sentimentLabel?: StringNullableFilter<"MoodEntry"> | string | null
    crisisFlag?: BoolFilter<"MoodEntry"> | boolean
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
  }

  export type AssessmentUpsertWithWhereUniqueWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    update: XOR<AssessmentUpdateWithoutUserInput, AssessmentUncheckedUpdateWithoutUserInput>
    create: XOR<AssessmentCreateWithoutUserInput, AssessmentUncheckedCreateWithoutUserInput>
  }

  export type AssessmentUpdateWithWhereUniqueWithoutUserInput = {
    where: AssessmentWhereUniqueInput
    data: XOR<AssessmentUpdateWithoutUserInput, AssessmentUncheckedUpdateWithoutUserInput>
  }

  export type AssessmentUpdateManyWithWhereWithoutUserInput = {
    where: AssessmentScalarWhereInput
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyWithoutUserInput>
  }

  export type AssessmentScalarWhereInput = {
    AND?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    OR?: AssessmentScalarWhereInput[]
    NOT?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    id?: StringFilter<"Assessment"> | string
    userId?: StringFilter<"Assessment"> | string
    type?: EnumAssessmentTypeFilter<"Assessment"> | $Enums.AssessmentType
    responses?: JsonFilter<"Assessment">
    score?: IntFilter<"Assessment"> | number
    severity?: EnumSeverityNullableFilter<"Assessment"> | $Enums.Severity | null
    interpretation?: StringNullableFilter<"Assessment"> | string | null
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
  }

  export type AIInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: AIInteractionWhereUniqueInput
    update: XOR<AIInteractionUpdateWithoutUserInput, AIInteractionUncheckedUpdateWithoutUserInput>
    create: XOR<AIInteractionCreateWithoutUserInput, AIInteractionUncheckedCreateWithoutUserInput>
  }

  export type AIInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: AIInteractionWhereUniqueInput
    data: XOR<AIInteractionUpdateWithoutUserInput, AIInteractionUncheckedUpdateWithoutUserInput>
  }

  export type AIInteractionUpdateManyWithWhereWithoutUserInput = {
    where: AIInteractionScalarWhereInput
    data: XOR<AIInteractionUpdateManyMutationInput, AIInteractionUncheckedUpdateManyWithoutUserInput>
  }

  export type AIInteractionScalarWhereInput = {
    AND?: AIInteractionScalarWhereInput | AIInteractionScalarWhereInput[]
    OR?: AIInteractionScalarWhereInput[]
    NOT?: AIInteractionScalarWhereInput | AIInteractionScalarWhereInput[]
    id?: StringFilter<"AIInteraction"> | string
    userId?: StringFilter<"AIInteraction"> | string
    userMessage?: StringFilter<"AIInteraction"> | string
    aiResponse?: StringFilter<"AIInteraction"> | string
    model?: StringNullableFilter<"AIInteraction"> | string | null
    tokensUsed?: IntNullableFilter<"AIInteraction"> | number | null
    crisisDetected?: BoolFilter<"AIInteraction"> | boolean
    emotionalIntensity?: IntNullableFilter<"AIInteraction"> | number | null
    responseTime?: IntNullableFilter<"AIInteraction"> | number | null
    timestamp?: DateTimeFilter<"AIInteraction"> | Date | string
  }

  export type CrisisLogUpsertWithWhereUniqueWithoutUserInput = {
    where: CrisisLogWhereUniqueInput
    update: XOR<CrisisLogUpdateWithoutUserInput, CrisisLogUncheckedUpdateWithoutUserInput>
    create: XOR<CrisisLogCreateWithoutUserInput, CrisisLogUncheckedCreateWithoutUserInput>
  }

  export type CrisisLogUpdateWithWhereUniqueWithoutUserInput = {
    where: CrisisLogWhereUniqueInput
    data: XOR<CrisisLogUpdateWithoutUserInput, CrisisLogUncheckedUpdateWithoutUserInput>
  }

  export type CrisisLogUpdateManyWithWhereWithoutUserInput = {
    where: CrisisLogScalarWhereInput
    data: XOR<CrisisLogUpdateManyMutationInput, CrisisLogUncheckedUpdateManyWithoutUserInput>
  }

  export type CrisisLogScalarWhereInput = {
    AND?: CrisisLogScalarWhereInput | CrisisLogScalarWhereInput[]
    OR?: CrisisLogScalarWhereInput[]
    NOT?: CrisisLogScalarWhereInput | CrisisLogScalarWhereInput[]
    id?: StringFilter<"CrisisLog"> | string
    userId?: StringFilter<"CrisisLog"> | string
    message?: StringFilter<"CrisisLog"> | string
    severity?: IntFilter<"CrisisLog"> | number
    categories?: JsonFilter<"CrisisLog">
    responseProvided?: BoolFilter<"CrisisLog"> | boolean
    resourcesShown?: BoolFilter<"CrisisLog"> | boolean
    emergencyContactCalled?: BoolFilter<"CrisisLog"> | boolean
    timestamp?: DateTimeFilter<"CrisisLog"> | Date | string
  }

  export type UsageLogUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    update: XOR<UsageLogUpdateWithoutUserInput, UsageLogUncheckedUpdateWithoutUserInput>
    create: XOR<UsageLogCreateWithoutUserInput, UsageLogUncheckedCreateWithoutUserInput>
  }

  export type UsageLogUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageLogWhereUniqueInput
    data: XOR<UsageLogUpdateWithoutUserInput, UsageLogUncheckedUpdateWithoutUserInput>
  }

  export type UsageLogUpdateManyWithWhereWithoutUserInput = {
    where: UsageLogScalarWhereInput
    data: XOR<UsageLogUpdateManyMutationInput, UsageLogUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageLogScalarWhereInput = {
    AND?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    OR?: UsageLogScalarWhereInput[]
    NOT?: UsageLogScalarWhereInput | UsageLogScalarWhereInput[]
    id?: StringFilter<"UsageLog"> | string
    userId?: StringFilter<"UsageLog"> | string
    service?: EnumServiceFilter<"UsageLog"> | $Enums.Service
    model?: StringNullableFilter<"UsageLog"> | string | null
    tokensUsed?: IntNullableFilter<"UsageLog"> | number | null
    finishReason?: StringNullableFilter<"UsageLog"> | string | null
    timestamp?: DateTimeFilter<"UsageLog"> | Date | string
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type MessageCreateWithoutConversationInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedCreateWithoutConversationInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageCreateOrConnectWithoutConversationInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageCreateManyConversationInputEnvelope = {
    data: MessageCreateManyConversationInput | MessageCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
    create: XOR<MessageCreateWithoutConversationInput, MessageUncheckedCreateWithoutConversationInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutConversationInput, MessageUncheckedUpdateWithoutConversationInput>
  }

  export type MessageUpdateManyWithWhereWithoutConversationInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutConversationInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    conversationId?: StringFilter<"Message"> | string
    role?: EnumMessageRoleFilter<"Message"> | $Enums.MessageRole
    content?: StringFilter<"Message"> | string
    timestamp?: DateTimeFilter<"Message"> | Date | string
    metadata?: JsonNullableFilter<"Message">
  }

  export type ConversationCreateWithoutMessagesInput = {
    id?: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutConversationsInput
  }

  export type ConversationUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationCreateOrConnectWithoutMessagesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
  }

  export type ConversationUpsertWithoutMessagesInput = {
    update: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
    create: XOR<ConversationCreateWithoutMessagesInput, ConversationUncheckedCreateWithoutMessagesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutMessagesInput, ConversationUncheckedUpdateWithoutMessagesInput>
  }

  export type ConversationUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutConversationsNestedInput
  }

  export type ConversationUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutMoodEntriesInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMoodEntriesInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMoodEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
  }

  export type UserUpsertWithoutMoodEntriesInput = {
    update: XOR<UserUpdateWithoutMoodEntriesInput, UserUncheckedUpdateWithoutMoodEntriesInput>
    create: XOR<UserCreateWithoutMoodEntriesInput, UserUncheckedCreateWithoutMoodEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMoodEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMoodEntriesInput, UserUncheckedUpdateWithoutMoodEntriesInput>
  }

  export type UserUpdateWithoutMoodEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMoodEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAssessmentsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAssessmentsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAssessmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
  }

  export type UserUpsertWithoutAssessmentsInput = {
    update: XOR<UserUpdateWithoutAssessmentsInput, UserUncheckedUpdateWithoutAssessmentsInput>
    create: XOR<UserCreateWithoutAssessmentsInput, UserUncheckedCreateWithoutAssessmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAssessmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAssessmentsInput, UserUncheckedUpdateWithoutAssessmentsInput>
  }

  export type UserUpdateWithoutAssessmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAssessmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAiInteractionsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiInteractionsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiInteractionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
  }

  export type UserUpsertWithoutAiInteractionsInput = {
    update: XOR<UserUpdateWithoutAiInteractionsInput, UserUncheckedUpdateWithoutAiInteractionsInput>
    create: XOR<UserCreateWithoutAiInteractionsInput, UserUncheckedCreateWithoutAiInteractionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiInteractionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiInteractionsInput, UserUncheckedUpdateWithoutAiInteractionsInput>
  }

  export type UserUpdateWithoutAiInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiInteractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCrisisLogsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCrisisLogsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    usageLogs?: UsageLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCrisisLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCrisisLogsInput, UserUncheckedCreateWithoutCrisisLogsInput>
  }

  export type UserUpsertWithoutCrisisLogsInput = {
    update: XOR<UserUpdateWithoutCrisisLogsInput, UserUncheckedUpdateWithoutCrisisLogsInput>
    create: XOR<UserCreateWithoutCrisisLogsInput, UserUncheckedCreateWithoutCrisisLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCrisisLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCrisisLogsInput, UserUncheckedUpdateWithoutCrisisLogsInput>
  }

  export type UserUpdateWithoutCrisisLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCrisisLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    usageLogs?: UsageLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutUsageLogsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryCreateNestedManyWithoutUserInput
    assessments?: AssessmentCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUsageLogsInput = {
    id?: string
    email: string
    password?: string | null
    googleId?: string | null
    isVerified?: boolean
    isAnonymous?: boolean
    verificationToken?: string | null
    image?: string | null
    displayName?: string | null
    university?: $Enums.University | null
    academicLevel?: number | null
    program?: string | null
    language?: $Enums.Language
    notificationPreference?: $Enums.NotificationFrequency
    preferredCheckInTime?: $Enums.TimeOfDay
    concerns?: UserCreateconcernsInput | $Enums.Concern[]
    supportLevel?: $Enums.SupportLevel
    riskLevel?: $Enums.RiskLevel
    copingStyles?: UserCreatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: $Enums.FaithLevel
    approachPreference?: $Enums.ApproachPreference
    goals?: UserCreategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: Date | string
    moodCheckInsCount?: number
    conversationsCount?: number
    lastActive?: Date | string | null
    onboardingStep?: number
    onboardingCompleted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutUserInput
    moodEntries?: MoodEntryUncheckedCreateNestedManyWithoutUserInput
    assessments?: AssessmentUncheckedCreateNestedManyWithoutUserInput
    aiInteractions?: AIInteractionUncheckedCreateNestedManyWithoutUserInput
    crisisLogs?: CrisisLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUsageLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsageLogsInput, UserUncheckedCreateWithoutUsageLogsInput>
  }

  export type UserUpsertWithoutUsageLogsInput = {
    update: XOR<UserUpdateWithoutUsageLogsInput, UserUncheckedUpdateWithoutUsageLogsInput>
    create: XOR<UserCreateWithoutUsageLogsInput, UserUncheckedCreateWithoutUsageLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsageLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsageLogsInput, UserUncheckedUpdateWithoutUsageLogsInput>
  }

  export type UserUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUsageLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    verificationToken?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    university?: NullableEnumUniversityFieldUpdateOperationsInput | $Enums.University | null
    academicLevel?: NullableIntFieldUpdateOperationsInput | number | null
    program?: NullableStringFieldUpdateOperationsInput | string | null
    language?: EnumLanguageFieldUpdateOperationsInput | $Enums.Language
    notificationPreference?: EnumNotificationFrequencyFieldUpdateOperationsInput | $Enums.NotificationFrequency
    preferredCheckInTime?: EnumTimeOfDayFieldUpdateOperationsInput | $Enums.TimeOfDay
    concerns?: UserUpdateconcernsInput | $Enums.Concern[]
    supportLevel?: EnumSupportLevelFieldUpdateOperationsInput | $Enums.SupportLevel
    riskLevel?: EnumRiskLevelFieldUpdateOperationsInput | $Enums.RiskLevel
    copingStyles?: UserUpdatecopingStylesInput | $Enums.CopingStyle[]
    faithLevel?: EnumFaithLevelFieldUpdateOperationsInput | $Enums.FaithLevel
    approachPreference?: EnumApproachPreferenceFieldUpdateOperationsInput | $Enums.ApproachPreference
    goals?: UserUpdategoalsInput | $Enums.Goal[]
    stressors?: NullableJsonNullValueInput | InputJsonValue
    trackingPreferences?: NullableJsonNullValueInput | InputJsonValue
    emergencyContacts?: NullableJsonNullValueInput | InputJsonValue
    baselineMood?: NullableIntFieldUpdateOperationsInput | number | null
    baseline?: NullableJsonNullValueInput | InputJsonValue
    joinDate?: DateTimeFieldUpdateOperationsInput | Date | string
    moodCheckInsCount?: IntFieldUpdateOperationsInput | number
    conversationsCount?: IntFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    onboardingStep?: IntFieldUpdateOperationsInput | number
    onboardingCompleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutUserNestedInput
    moodEntries?: MoodEntryUncheckedUpdateManyWithoutUserNestedInput
    assessments?: AssessmentUncheckedUpdateManyWithoutUserNestedInput
    aiInteractions?: AIInteractionUncheckedUpdateManyWithoutUserNestedInput
    crisisLogs?: CrisisLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConversationCreateManyUserInput = {
    id?: string
    startedAt?: Date | string
    lastMessageAt?: Date | string
    endedAt?: Date | string | null
    status?: $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MoodEntryCreateManyUserInput = {
    id?: string
    mood: number
    energy?: number | null
    sleep?: number | null
    social?: number | null
    anxiety?: number | null
    notes?: string | null
    tags?: MoodEntryCreatetagsInput | string[]
    sentimentScore?: number | null
    sentimentLabel?: string | null
    crisisFlag?: boolean
    createdAt?: Date | string
  }

  export type AssessmentCreateManyUserInput = {
    id?: string
    type: $Enums.AssessmentType
    responses: JsonNullValueInput | InputJsonValue
    score: number
    severity?: $Enums.Severity | null
    interpretation?: string | null
    createdAt?: Date | string
  }

  export type AIInteractionCreateManyUserInput = {
    id?: string
    userMessage: string
    aiResponse: string
    model?: string | null
    tokensUsed?: number | null
    crisisDetected?: boolean
    emotionalIntensity?: number | null
    responseTime?: number | null
    timestamp?: Date | string
  }

  export type CrisisLogCreateManyUserInput = {
    id?: string
    message: string
    severity: number
    categories: JsonNullValueInput | InputJsonValue
    responseProvided?: boolean
    resourcesShown?: boolean
    emergencyContactCalled?: boolean
    timestamp?: Date | string
  }

  export type UsageLogCreateManyUserInput = {
    id?: string
    service: $Enums.Service
    model?: string | null
    tokensUsed?: number | null
    finishReason?: string | null
    timestamp?: Date | string
  }

  export type ConversationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastMessageAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumConversationStatusFieldUpdateOperationsInput | $Enums.ConversationStatus
    metadata?: NullableJsonNullValueInput | InputJsonValue
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    mood?: IntFieldUpdateOperationsInput | number
    energy?: NullableIntFieldUpdateOperationsInput | number | null
    sleep?: NullableIntFieldUpdateOperationsInput | number | null
    social?: NullableIntFieldUpdateOperationsInput | number | null
    anxiety?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: MoodEntryUpdatetagsInput | string[]
    sentimentScore?: NullableFloatFieldUpdateOperationsInput | number | null
    sentimentLabel?: NullableStringFieldUpdateOperationsInput | string | null
    crisisFlag?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumAssessmentTypeFieldUpdateOperationsInput | $Enums.AssessmentType
    responses?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    severity?: NullableEnumSeverityFieldUpdateOperationsInput | $Enums.Severity | null
    interpretation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    userMessage?: StringFieldUpdateOperationsInput | string
    aiResponse?: StringFieldUpdateOperationsInput | string
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    crisisDetected?: BoolFieldUpdateOperationsInput | boolean
    emotionalIntensity?: NullableIntFieldUpdateOperationsInput | number | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CrisisLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    severity?: IntFieldUpdateOperationsInput | number
    categories?: JsonNullValueInput | InputJsonValue
    responseProvided?: BoolFieldUpdateOperationsInput | boolean
    resourcesShown?: BoolFieldUpdateOperationsInput | boolean
    emergencyContactCalled?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: EnumServiceFieldUpdateOperationsInput | $Enums.Service
    model?: NullableStringFieldUpdateOperationsInput | string | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    finishReason?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyConversationInput = {
    id?: string
    role: $Enums.MessageRole
    content: string
    timestamp?: Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumMessageRoleFieldUpdateOperationsInput | $Enums.MessageRole
    content?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}