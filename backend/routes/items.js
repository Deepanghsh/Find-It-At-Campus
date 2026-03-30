const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const Item = require('../models/Item');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── Multer config ────────────────────────────────────────────────
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
    else cb(new Error('Only images are allowed'));
  },
});

// ─── POST /api/items  (create) ────────────────────────────────────
router.post(
  '/',
  protect,
  upload.array('images', 3),
  [
    body('type').isIn(['lost', 'found']).withMessage('Type must be lost or found'),
    body('name').trim().notEmpty().withMessage('Item name is required'),
    body('category').isIn(['electronics', 'accessories', 'documents', 'clothing', 'other']),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('building').trim().notEmpty().withMessage('Building/area is required'),
    body('date').isISO8601().withMessage('Valid date is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { type, name, category, description, building, floor, date, time,
            contactName, contactEmail, contactPhone, notifications } = req.body;

    const images = req.files ? req.files.map((f) => f.filename) : [];

    try {
      const item = await Item.create({
        type,
        name,
        category,
        description,
        location: { building, floor },
        date,
        time,
        images,
        reporter: req.user._id,
        contactName: contactName || `${req.user.firstName} ${req.user.lastName}`,
        contactEmail: contactEmail || req.user.email,
        contactPhone: contactPhone || req.user.phone,
        notifications: notifications !== 'false',
      });

      res.status(201).json({ item });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error creating item report' });
    }
  }
);

// ─── GET /api/items  (list with filters) ─────────────────────────
router.get('/', async (req, res) => {
  const { type, category, status, search, page = 1, limit = 10 } = req.query;

  const query = {};
  if (type) query.type = type;
  if (category) query.category = category;
  if (status) query.status = status;
  if (search) query.$text = { $search: search };

  try {
    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .populate('reporter', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching items' });
  }
});

// ─── GET /api/items/stats  (analytics data) ─────────────────────
router.get('/stats', protect, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - parseInt(startOfWeek.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const matchUser = req.query.global === 'true' ? {} : { reporter: req.user._id };

    const [
      totalLost,
      totalFound,
      resolvedItems,
      todayLost,
      todayFound,
      weekLost,
      weekFound
    ] = await Promise.all([
      Item.countDocuments({ ...matchUser, type: 'lost' }),
      Item.countDocuments({ ...matchUser, type: 'found' }),
      Item.countDocuments({ ...matchUser, status: 'resolved' }),
      Item.countDocuments({ ...matchUser, type: 'lost', createdAt: { $gte: today } }),
      Item.countDocuments({ ...matchUser, type: 'found', createdAt: { $gte: today } }),
      Item.countDocuments({ ...matchUser, type: 'lost', createdAt: { $gte: startOfWeek } }),
      Item.countDocuments({ ...matchUser, type: 'found', createdAt: { $gte: startOfWeek } }),
    ]);

    // Data for Donut chart (Categories)
    const categoryStatsQuery = await Item.aggregate([
      { $match: matchUser },
      { $group: { _id: '$category', value: { $sum: 1 } } }
    ]);
    const categories = categoryStatsQuery.map(c => ({ name: c._id, value: c.value }));

    // Data for Bar chart (Last 7 Days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const start = new Date(d.setHours(0,0,0,0));
      const end = new Date(d.setHours(23,59,59,999));
      
      const foundCount = await Item.countDocuments({ ...matchUser, type: 'found', createdAt: { $gte: start, $lte: end }});
      const lostCount = await Item.countDocuments({ ...matchUser, type: 'lost', createdAt: { $gte: start, $lte: end }});
      
      last7Days.push({
        date: start.toLocaleDateString('en-US', { weekday: 'short' }),
        lost: lostCount,
        found: foundCount
      });
    }

    res.json({
      summary: { totalLost, totalFound, resolvedItems, todayLost, todayFound, weekLost, weekFound },
      categories,
      last7Days
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading stats' });
  }
});

// ─── GET /api/items/my  (current user's items) ───────────────────
router.get('/my', protect, async (req, res) => {
  try {
    const items = await Item.find({ reporter: req.user._id }).sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── GET /api/items/:id ───────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('reporter', 'firstName lastName email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ item });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── PUT /api/items/:id ───────────────────────────────────────────
router.put('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.reporter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ item: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── DELETE /api/items/:id ────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.reporter.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item report deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
