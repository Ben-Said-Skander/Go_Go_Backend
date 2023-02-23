const Pharmacy = require("../models/Pharmacy");

const getAllPharmacies = async (req, res) => {
  const pharmacies = await Pharmacy.find();
  if (!pharmacies)
    return res.status(204).json({ message: "No Pharmacies found" });
  res.json(pharmacies);
  console.log(pharmacies);
};

const createNewPharmacy = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.latitude ||
    !req?.body?.longitude ||
    !req?.body?.drugs
  ) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const result = await Pharmacy.create({
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      drugs: req.body.drugs,
    });

    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
const deletePharmacy = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Pharmacy ID required" });
  const pharmacie = await Pharmacy.findOne({ _id: req.params.id }).exec();
  if (!pharmacie) {
    return res
      .status(204)
      .json({ message: `Pharmacy ID ${req.params.id} not found` });
  }
  const result = await pharmacie.deleteOne({ _id: req.params.id });
  res.json(result);
  console.log(result);
};

module.exports = {
  getAllPharmacies,
  createNewPharmacy,
  deletePharmacy,
};
