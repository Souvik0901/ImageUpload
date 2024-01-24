const mongoose = require('mongoose');

const { Schema } = mongoose;
const courseSchema = new Schema({
  courseImage: { type: String, default: null },
  courseTitle: { type: String, default: null },
  shortDescrp: { type: String, default: null },
  longDescrp: { type: String, default: null },
  courseCategory: { type: String, default: null },
  courseLevel: { type: String, default: null },
  courseLanguage: { type: String, default: null },
  completion_status: { type: String, default: null },
  lectures: { type: Number, default: null },
  enrolled: { type: Number, default: null },
  price: { type: Number, default: null },
  sellling: { type: Number, default: null },
  amount: { type: Number, default: null },
  period: { type: Number, default: null },
  purchaseDate: { type: Date, default: Date.now },
  videoLink: { type: String, default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, },
});

module.exports = mongoose.model('courses', courseSchema);
