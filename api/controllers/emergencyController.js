import EmergencyFacility from '../models/EmergencyFacility.js';

export const createEmergencyFacility = async (req, res, next) => {
  const newEmergencyFacility = new EmergencyFacility(req.body);

  try {
    const savedEmergencyFacility = await newEmergencyFacility.save();
    res.status(200).json(savedEmergencyFacility);
  } catch (err) {
    next(err);
  }
};

export const updateEmergencyFacility = async (req, res, next) => {
  try {
    const updatedEmergencyFacility = await EmergencyFacility.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEmergencyFacility);
  } catch (err) {
    next(err);
  }
};

export const deleteEmergencyFacility = async (req, res, next) => {
  try {
    await EmergencyFacility.findByIdAndDelete(req.params.id);
    res.status(200).json('Emergency facility has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getEmergencyFacility = async (req, res, next) => {
  try {
    const emergencyFacility = await EmergencyFacility.findById(req.params.id);
    res.status(200).json(emergencyFacility);
  } catch (err) {
    next(err);
  }
};

export const getEmergencyFacilities = async (req, res, next) => {
  try {
    const emergencyFacilities = await EmergencyFacility.find();
    res.status(200).json(emergencyFacilities);
  } catch (err) {
    next(err);
  }
};

// Additional functions specific to emergency facilities can be added here.

// Ensure you handle errors and validations as needed in your functions.
