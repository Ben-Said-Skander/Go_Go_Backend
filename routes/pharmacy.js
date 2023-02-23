const express = require("express");
const router = express.Router();
const pharmacieController = require("../controllers/pharmacyController");

router.route("/id").delete(pharmacieController.deletePharmacy);
router.route("/").get(pharmacieController.getAllPharmacies);
router.route("/").post(pharmacieController.createNewPharmacy);
module.exports = router;
