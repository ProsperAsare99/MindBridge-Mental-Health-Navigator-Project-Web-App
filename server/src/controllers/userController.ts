import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma';

// Define the schema for input validation
const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().optional(),
  institution: z.string().optional(),
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

    const { email, password, name, institution, studentId, course, phoneNumber } = validatedData.data;

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
        name,
        institution,
        studentId,
        course,
        phoneNumber,
        isVerified: false, // Defaulting to false, they might need email verification
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
