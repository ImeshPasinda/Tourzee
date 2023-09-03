import EmergencyContact from '../models/EmergencyContact.js';

export const createEmergencyContact = async (req, res, next) => {
  const newEmergencyContact = new EmergencyContact(req.body);

  try {
    const savedEmergencyContact = await newEmergencyContact.save();
    res.status(200).json(savedEmergencyContact);
  } catch (err) {
    next(err);
  }
};

export const updateEmergencyContact = async (req, res, next) => {
  try {
    const updatedEmergencyContact = await EmergencyContact.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEmergencyContact);
  } catch (err) {
    next(err);
  }
};

export const deleteEmergencyContact = async (req, res, next) => {
  try {
    await EmergencyContact.findByIdAndDelete(req.params.id);
    res.status(200).json('Emergency contact has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getEmergencyContact = async (req, res, next) => {
  try {
    const emergencyContact = await EmergencyContact.findById(req.params.id);
    res.status(200).json(emergencyContact);
  } catch (err) {
    next(err);
  }
};

export const getEmergencyContacts = async (req, res, next) => {
  try {
    const emergencyContacts = await EmergencyContact.find();
    res.status(200).json(emergencyContacts);
  } catch (err) {
    next(err);
  }
};

// Additional functions specific to emergency contacts can be added here.

// Ensure you handle errors and validations as needed in your functions.
