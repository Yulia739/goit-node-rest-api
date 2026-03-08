const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateOneContact,
  updateContactStatus,
} = require("../controllers/contactsControllers");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", createContact);
router.put("/:id", updateOneContact);
router.delete("/:id", deleteContact);
router.patch("/:contactId/favorite", updateContactStatus);

module.exports = router;
