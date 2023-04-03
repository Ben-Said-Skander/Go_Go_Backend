const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router.route("/").get(userController.getAllUsers);

router.route("/:id").delete(userController.deleteUser);
router.route("/:id").get(userController.getUser);
router.route("/updateName/:id").put(userController.updateName);
router.route("/updateEmail/:id").put(userController.updateEmail);
router.route("/updatePhone/:id").put(userController.updatePhone);
router.route("/updatePassword/:id").put(userController.updatePassword);
module.exports = router;
/*
La méthode PATCH d'une requête HTTP applique des modifications partielles à une ressource. La méthode HTTP PUT est déjà définie
 pour écraser une ressource avec un nouveau corps complet de message
 */
