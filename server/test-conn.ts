import prisma from './src/lib/prisma';

async function main() {
  try {
    console.log('Attempting to connect to database...');
    const userCount = await prisma.user.count();
    console.log(`Connection successful! User count: ${userCount}`);
    
    // Try to find a user to see if it works
    const firstUser = await prisma.user.findFirst();
    console.log('First user found:', firstUser ? firstUser.email : 'None');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
