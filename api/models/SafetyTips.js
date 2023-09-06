import mongoose from 'mongoose';

const SafetyTipsSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  advicelevel: {
    type: String,
    required: true,
  },
  timeperiod: {
    type: String,
    required: true,
  },
  // Add any other relevant fields as needed.
});

const SafetyTips = mongoose.model('DestinationSafetyTips', SafetyTipsSchema);

export default SafetyTips;
