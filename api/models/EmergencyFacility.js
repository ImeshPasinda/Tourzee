import mongoose from 'mongoose';

const EmergencyFacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      type: String,
      enum: ['Point'], // Specify that this field represents a geographic point
      default: 'Point',
    },
    coordinates: [Number], // An array [longitude, latitude]
  },
  contactNumber: {
    type: String,
    required: true,
  },
  // You can add more fields like description or operating hours if needed.
});

// Create a geospatial index for efficient location-based queries
EmergencyFacilitySchema.index({ coordinates: '2dsphere' });

export default mongoose.model('EmergencyFacility', EmergencyFacilitySchema);
