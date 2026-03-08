const fs = require('fs');
const content = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id                 String       @id @default(uuid())
  email              String       @unique
  password           String?
  name               String?
  institution        String?
  studentId          String?
  course             String?
  phoneNumber        String?
  isVerified         Boolean      @default(false)
  verificationToken  String?
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt
  assessments        Assessment[]
}

model Assessment {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  type      String
  score     Int
  severity  String
  createdAt DateTime @default(now())
}
`;
fs.writeFileSync('prisma/schema.prisma', content, { encoding: 'ascii' });
console.log('Schema updated to include verification fields (SQLite)');
