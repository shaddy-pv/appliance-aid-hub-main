import 'dotenv/config';
import { connectDatabase, disconnectDatabase } from './config/database';
import { Service, Product, User } from './models';
import argon2 from 'argon2';

async function seed() {
  try {
    await connectDatabase();

    console.log('🌱 Seeding database...');

    // Clear existing data
    await Service.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed Services
    const services = await Service.insertMany([
      {
        title: 'AC Service & Repair',
        description: 'Complete AC maintenance, gas refilling, and repair services for all brands',
        price: 499,
        duration: '1-2 hours',
        rating: 4.8,
        popular: true,
        imageUrl: '/assets/ac-service-icon.jpg'
      },
      {
        title: 'Washing Machine Repair',
        description: 'Expert repair services for all types of washing machines',
        price: 399,
        duration: '1 hour',
        rating: 4.7,
        popular: true,
        imageUrl: '/assets/washing-machine-icon.jpg'
      },
      {
        title: 'Microwave Repair',
        description: 'Quick and reliable microwave repair and maintenance',
        price: 349,
        duration: '45 minutes',
        rating: 4.6,
        popular: false,
        imageUrl: '/assets/microwave-icon.jpg'
      },
      {
        title: 'Electrical Repair',
        description: 'Safe and professional electrical repair services',
        price: 299,
        duration: '1 hour',
        rating: 4.9,
        popular: true,
        imageUrl: '/assets/electrical-icon.jpg'
      },
      {
        title: 'Refrigerator Service',
        description: 'Comprehensive fridge maintenance and repair',
        price: 599,
        duration: '1-2 hours',
        rating: 4.7,
        popular: false,
      },
      {
        title: 'Geyser Repair',
        description: 'Water heater repair and maintenance services',
        price: 449,
        duration: '1 hour',
        rating: 4.5,
        popular: false,
      }
    ]);

    console.log(`✅ Seeded ${services.length} services`);

    // Seed Products
    const products = await Product.insertMany([
      {
        name: 'AC Remote Control',
        brand: 'Universal',
        price: 299,
        originalPrice: 499,
        rating: 4.5,
        reviews: 128,
        imageUrl: '/assets/products/ac-remote.jpg',
        inStock: true,
        bestseller: true
      },
      {
        name: 'Washing Machine Drum',
        brand: 'LG',
        price: 3499,
        originalPrice: 4999,
        rating: 4.7,
        reviews: 89,
        imageUrl: '/assets/products/washing-drum.jpg',
        inStock: true,
        bestseller: false
      },
      {
        name: 'Microwave Turntable',
        brand: 'Samsung',
        price: 599,
        originalPrice: 899,
        rating: 4.3,
        reviews: 56,
        imageUrl: '/assets/products/microwave-turntable.jpg',
        inStock: true,
        bestseller: false
      },
      {
        name: 'Refrigerator Compressor',
        brand: 'Whirlpool',
        price: 5999,
        originalPrice: 7999,
        rating: 4.8,
        reviews: 234,
        imageUrl: '/assets/products/compressor.jpg',
        inStock: true,
        bestseller: true
      }
    ]);

    console.log(`✅ Seeded ${products.length} products`);

    // Seed Admin User
    const adminPassword = await argon2.hash('admin123');
    const admin = await User.create({
      email: 'admin@homeservices.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'admin',
      emailVerified: true
    });

    console.log(`✅ Created admin user: ${admin.email}`);
    console.log(`   Password: admin123`);

    // Seed Test User
    const userPassword = await argon2.hash('user123');
    const user = await User.create({
      email: 'user@test.com',
      name: 'Test User',
      passwordHash: userPassword,
      role: 'user',
      emailVerified: true
    });

    console.log(`✅ Created test user: ${user.email}`);
    console.log(`   Password: user123`);

    console.log('\n🎉 Database seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await disconnectDatabase();
  }
}

seed();
