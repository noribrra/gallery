import mongoose from 'mongoose';

const ImagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },

  imageUrl: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ✅ خاصية ظاهرية لحساب عدد اللايكات
ImagSchema.virtual('likesCount').get(function () {
  return this.likes.length;
});

const Image= mongoose.model('Photo', ImagSchema);
export default Image;
