const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: [true, 'Item type (lost/found) is required'],
    },
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['electronics', 'accessories', 'documents', 'clothing', 'other'],
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    location: {
      building: { type: String, required: [true, 'Building/area is required'] },
      floor: { type: String },
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
    },
    images: [
      {
        type: String, // filename in /uploads
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'matched', 'resolved'],
      default: 'pending',
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    notifications: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Text index for search
itemSchema.index({ name: 'text', description: 'text', 'location.building': 'text' });

module.exports = mongoose.model('Item', itemSchema);
