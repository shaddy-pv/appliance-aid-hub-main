import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User, Order, Booking, Service, Product } from '../models';

export const adminRouter = Router();

// Middleware to check if user is admin
const requireAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies?.aah_access;
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.sub);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply admin middleware to all routes
adminRouter.use(requireAdmin);

/**
 * Get dashboard statistics
 * GET /api/admin/dashboard
 */
adminRouter.get('/dashboard', async (req, res) => {
  try {
    const [
      totalOrders,
      totalBookings,
      totalUsers,
      revenueResult,
      recentOrders,
      recentBookings,
      pendingBookings,
      completedOrders,
    ] = await Promise.all([
      Order.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments(),
      Order.aggregate([
        { $match: { status: 'delivered' } },
        { $group: { _id: null, total: { $sum: '$subtotal' } } }
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5),
      Booking.find().sort({ createdAt: -1 }).limit(5).populate('serviceId'),
      Booking.countDocuments({ status: 'requested' }),
      Order.countDocuments({ status: 'delivered' }),
    ]);

    const totalRevenue = revenueResult[0]?.total || 0;

    res.json({
      success: true,
      data: {
        stats: {
          totalOrders,
          totalBookings,
          totalUsers,
          totalRevenue,
          pendingBookings,
          completedOrders,
        },
        recentOrders,
        recentBookings,
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ 
      error: 'Failed to fetch dashboard data',
      message: 'Please try again later'
    });
  }
});

/**
 * Get all orders with pagination and filters
 * GET /api/admin/orders
 */
adminRouter.get('/orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.$or = [
        { customerFullName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(where)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Order.countDocuments(where),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      error: 'Failed to fetch orders',
      message: 'Please try again later'
    });
  }
});

/**
 * Update order status
 * PUT /api/admin/orders/:id/status
 */
adminRouter.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      data: order,
      message: 'Order status updated successfully'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ 
      error: 'Failed to update order status',
      message: 'Please try again later'
    });
  }
});

/**
 * Get all bookings with pagination and filters
 * GET /api/admin/bookings
 */
adminRouter.get('/bookings', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.$or = [
        { customerFullName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const [bookings, total] = await Promise.all([
      Booking.find(where)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate('serviceId'),
      Booking.countDocuments(where),
    ]);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      error: 'Failed to fetch bookings',
      message: 'Please try again later'
    });
  }
});

/**
 * Update booking status
 * PUT /api/admin/bookings/:id/status
 */
adminRouter.put('/bookings/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['requested', 'confirmed', 'in-progress', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('serviceId');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      success: true,
      data: booking,
      message: 'Booking status updated successfully'
    });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ 
      error: 'Failed to update booking status',
      message: 'Please try again later'
    });
  }
});

/**
 * Get all users with pagination
 * GET /api/admin/users
 */
adminRouter.get('/users', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    const where: any = {};
    if (search) {
      where.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(where)
        .select('-passwordHash')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 }),
      User.countDocuments(where),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      error: 'Failed to fetch users',
      message: 'Please try again later'
    });
  }
});

/**
 * Update user role
 * PUT /api/admin/users/:id/role
 */
adminRouter.put('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin', 'technician'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      data: user,
      message: 'User role updated successfully'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ 
      error: 'Failed to update user role',
      message: 'Please try again later'
    });
  }
});

/**
 * Get all services
 * GET /api/admin/services
 */
adminRouter.get('/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ title: 1 });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      error: 'Failed to fetch services',
      message: 'Please try again later'
    });
  }
});

/**
 * Create new service
 * POST /api/admin/services
 */
adminRouter.post('/services', async (req, res) => {
  try {
    const { title, description, price, duration, rating, popular, imageUrl } = req.body;

    if (!title || !description || !price || !duration) {
      return res.status(400).json({ error: 'Title, description, price, and duration are required' });
    }

    const service = await Service.create({
      title,
      description,
      price,
      duration,
      rating: rating || 0,
      popular: popular || false,
      imageUrl: imageUrl || undefined,
    });

    res.status(201).json({
      success: true,
      data: service,
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ 
      error: 'Failed to create service',
      message: 'Please try again later'
    });
  }
});

/**
 * Update service
 * PUT /api/admin/services/:id
 */
adminRouter.put('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData: any = {};
    
    const { title, description, price, duration, rating, popular, imageUrl } = req.body;
    
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (price) updateData.price = price;
    if (duration) updateData.duration = duration;
    if (rating !== undefined) updateData.rating = rating;
    if (popular !== undefined) updateData.popular = popular;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const service = await Service.findByIdAndUpdate(id, updateData, { new: true });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      success: true,
      data: service,
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ 
      error: 'Failed to update service',
      message: 'Please try again later'
    });
  }
});

/**
 * Delete service
 * DELETE /api/admin/services/:id
 */
adminRouter.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ 
      error: 'Failed to delete service',
      message: 'Please try again later'
    });
  }
});

/**
 * Get all products
 * GET /api/admin/products
 */
adminRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: 'Please try again later'
    });
  }
});

/**
 * Create new product
 * POST /api/admin/products
 */
adminRouter.post('/products', async (req, res) => {
  try {
    const { name, brand, price, originalPrice, rating, reviews, imageUrl, inStock, bestseller } = req.body;

    if (!name || !brand || !price || !imageUrl) {
      return res.status(400).json({ error: 'Name, brand, price, and imageUrl are required' });
    }

    const product = await Product.create({
      name,
      brand,
      price,
      originalPrice: originalPrice || undefined,
      rating: rating || 0,
      reviews: reviews || 0,
      imageUrl,
      inStock: inStock !== undefined ? inStock : true,
      bestseller: bestseller || false,
    });

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      error: 'Failed to create product',
      message: 'Please try again later'
    });
  }
});

/**
 * Update product
 * PUT /api/admin/products/:id
 */
adminRouter.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData: any = {};
    
    const { name, brand, price, originalPrice, rating, reviews, imageUrl, inStock, bestseller } = req.body;
    
    if (name) updateData.name = name;
    if (brand) updateData.brand = brand;
    if (price) updateData.price = price;
    if (originalPrice !== undefined) updateData.originalPrice = originalPrice;
    if (rating !== undefined) updateData.rating = rating;
    if (reviews !== undefined) updateData.reviews = reviews;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (inStock !== undefined) updateData.inStock = inStock;
    if (bestseller !== undefined) updateData.bestseller = bestseller;

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      error: 'Failed to update product',
      message: 'Please try again later'
    });
  }
});

/**
 * Delete product
 * DELETE /api/admin/products/:id
 */
adminRouter.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: 'Please try again later'
    });
  }
});
