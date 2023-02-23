const express = require("express");
const router = express.Router();
const medicineController = require("../controllers/medicineController");

router.route("/").get(medicineController.getAllMedicines);

router.route("/:id").delete(medicineController.deleteMedicine);
router.route("/:id").get(medicineController.getMedicine);
router.route("/").post(medicineController.createNewMedicine);
module.exports = router;
