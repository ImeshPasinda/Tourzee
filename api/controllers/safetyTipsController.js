import SafetyTips from '../models/SafetyTips.js';

export const createSafetyTip = async (req, res, next) => {
  const newSafetyTip = new SafetyTips(req.body);

  try {
    const savedSafetyTip = await newSafetyTip.save();
    res.status(200).json(savedSafetyTip);
  } catch (err) {
    next(err);
  }
};

export const updateSafetyTip = async (req, res, next) => {
  try {
    const updatedSafetyTip = await SafetyTips.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSafetyTip);
  } catch (err) {
    next(err);
  }
};

export const deleteSafetyTip = async (req, res, next) => {
  try {
    await SafetyTips.findByIdAndDelete(req.params.id);
    res.status(200).json('Safety tip has been deleted.');
  } catch (err) {
    next(err);
  }
};

export const getSafetyTip = async (req, res, next) => {
  try {
    const safetyTip = await SafetyTips.findById(req.params.id);
    res.status(200).json(safetyTip);
  } catch (err) {
    next(err);
  }
};

export const getSafetyTips = async (req, res, next) => {
  try {
    const safetyTips = await SafetyTips.find();
    res.status(200).json(safetyTips);
  } catch (err) {
    next(err);
  }
};

// Additional functions specific to safety tips can be added here.

// Ensure you handle errors and validations as needed in your functions.
