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
 
  contactNumber: {
    type: String,
    required: true,
  },
});


export default mongoose.model('EmergencyFacility', EmergencyFacilitySchema);
