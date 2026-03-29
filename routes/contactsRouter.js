import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateOneContact,
  updateContactStatus,
} from "../controllers/contactsControllers.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getAllContacts);
router.get("/:id", getOneContact);
router.post("/", createContact);
router.put("/:id", updateOneContact);
router.delete("/:id", deleteContact);
router.patch("/:contactId/favorite", updateContactStatus);

export default router;
