import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const services = [
    { title: 'AC Service & Repair', description: 'Complete AC maintenance, gas refilling, and repair services', price: 499, duration: '1-2 hours', rating: 4.8, popular: true },
    { title: 'Washing Machine Repair', description: 'Expert repair for all brands of washing machines', price: 399, duration: '45 mins', rating: 4.7 },
    { title: 'Microwave Repair', description: 'Quick microwave repair and maintenance services', price: 299, duration: '30 mins', rating: 4.6 },
    { title: 'Electrical Repair', description: 'Safe and reliable electrical repair services', price: 199, duration: '1 hour', rating: 4.9 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { title: s.title },
      update: {},
      create: s,
    });
  }

  const products = [
    { name: 'AC Gas R32 (1kg)', brand: 'Genuine Parts', price: 2499, originalPrice: 2999, rating: 4.8, reviews: 156, imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop', inStock: true, bestseller: true },
    { name: 'Washing Machine Belt', brand: 'Universal', price: 299, originalPrice: 399, rating: 4.6, reviews: 89, imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=300&h=300&fit=crop', inStock: true },
    { name: 'Microwave Magnetron', brand: 'OEM Quality', price: 1899, originalPrice: 2299, rating: 4.7, reviews: 67, imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=300&h=300&fit=crop', inStock: false },
    { name: 'AC Remote Control', brand: 'Compatible', price: 599, originalPrice: 799, rating: 4.5, reviews: 234, imageUrl: 'https://images.unsplash.com/photo-1615486364173-ae0e2b8b8ba9?w=300&h=300&fit=crop', inStock: true },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


