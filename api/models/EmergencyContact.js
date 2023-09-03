import mongoose from 'mongoose';

const EmergencyContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  // Add any other relevant fields as needed.
});

const EmergencyContact = mongoose.model('EmergencyContact', EmergencyContactSchema);

export default EmergencyContact;
