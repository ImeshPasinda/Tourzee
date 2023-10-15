import Place from "../models/Place.js";
import Room from "../models/Room.js";


export const updatePlace = async (req, res, next) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPlace);
  } catch (err) {
    next(err);
  }
};
export const deletePlace = async (req, res, next) => {
  try {
    await Place.findByIdAndDelete(req.params.id);
    res.status(200).json("Place has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getPlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    res.status(200).json(place);
  } catch (err) {
    next(err);
  }
};
export const getplaces = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const places = await Place.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(places);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Place.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const placeCount = await Place.countDocuments({ type: "place" });
    const apartmentCount = await Place.countDocuments({ type: "apartment" });
    const resortCount = await Place.countDocuments({ type: "resort" });
    const villaCount = await Place.countDocuments({ type: "villa" });
    const cabinCount = await Place.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "place", count: placeCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getPlaceRooms = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    const list = await Promise.all(
      place.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
