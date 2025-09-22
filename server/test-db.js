import { PrismaClient } from '@prisma/client';

async function testDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('Testing database connection...');
    const users = await prisma.user.findMany();
    console.log('Users found:', users.length);
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
