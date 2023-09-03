import mongoose from 'mongoose';

const SafetyTipsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // Add any other relevant fields as needed.
});

const SafetyTips = mongoose.model('SafetyTips', SafetyTipsSchema);

export default SafetyTips;
