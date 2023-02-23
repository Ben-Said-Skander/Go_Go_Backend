const Medicine = require("../models/Medicine");

const getAllMedicines = async (req, res) => {
  const medicines = await Medicine.find();
  if (!medicines)
    return res.status(204).json({ message: "No Medicines found" });
  res.json(medicines);
  console.log(medicines);
};
const getMedicine = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Medicine ID required" });
  const medicine = await Medicine.findOne({ _id: req.params.id }).exec();
  if (!medicine) {
    return res
      .status(204)
      .json({ message: `Medicine ID ${req.params.id} not found` });
  }
  res.json(medicine);
  console.log(medicine);
};
const createNewMedicine = async (req, res) => {
  if (
    !req?.body?.name ||
    !req?.body?.dosage ||
    !req?.body?.type ||
    !req?.body?.interval ||
    !req?.body?.start_time
  ) {
    return res.status(400).json({ message: "Fields are empty" });
  }

  try {
    const result = await Medicine.create({
      name: req.body.name,
      dosage: req.body.dosage,
      type: req.body.type,
      interval: req.body.interval,
      start_time: req.body.start_time,
    });

    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
const deleteMedicine = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Medicine ID required" });
  const medicine = await Medicine.findOne({ _id: req.params.id }).exec();
  if (!medicine) {
    return res
      .status(204)
      .json({ message: `Medicine ID ${req.params.id} not found` });
  }
  const result = await medicine.deleteOne({ _id: req.params.id });
  res.json(result);
  // console.log(result);
};

module.exports = {
  createNewMedicine,
  getMedicine,
  getAllMedicines,
  deleteMedicine,
};
