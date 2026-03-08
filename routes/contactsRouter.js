const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateOneContact,
  updateContactStatus,
} = require("../controllers/contactsControllers");

const router = express.Router();

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", createContact);
router.put("/:id", updateOneContact);
router.delete("/:id", deleteContact);
router.patch("/:contactId/favorite", updateContactStatus);

module.exports = router;
