import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { University } from '../generated/client';

// Define the schema for input validation
const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().optional(),
  institution: z.string().optional(),
  academicLevel: z.number().optional(),
  studentId: z.string().optional(),
  course: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Validate the incoming request body using Zod
    const validatedData = createUserSchema.safeParse(req.body);

    if (!validatedData.success) {
      res.status(400).json({
        error: 'Validation failed',
        details: validatedData.error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      });
      return;
    }

    const { email, password, name, institution, studentId, course, phoneNumber, academicLevel } = validatedData.data;

    // 2. Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ error: 'User with this email already exists' });
      return;
    }

    // 3. Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create the new user in the database via Prisma
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        displayName: name,
        university: institution ? mapInstitutionToUniversity(institution) : undefined,
        academicLevel: academicLevel,
        studentId,
        program: course,
        phoneNumber,
        isVerified: false,
      },
    });

    // 5. Exclude the hashed password from the response
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'User created successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const mapInstitutionToUniversity = (institution: string): University => {
  const inst = institution.toLowerCase();
  if (inst.includes('knust')) return University.KNUST;
  if (inst.includes('university of ghana') || inst.includes('legon')) return University.UNIVERSITY_OF_GHANA;
  if (inst.includes('cape coast') || inst.includes('ucc')) return University.UNIVERSITY_OF_CAPE_COAST;
  if (inst.includes('ashesi')) return University.ASHESI_UNIVERSITY;
  if (inst.includes('gimpa')) return University.GIMPA;
  return University.OTHER;
};
