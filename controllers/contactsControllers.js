const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactsServices");

const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
} = require("../schemas/contactsSchemas");

const getAllContacts = async (req, res) => {
  const contacts = await listContacts(req.user.id);
  res.status(200).json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user.id);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id, req.user.id);

  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(removedContact);
};

const createContact = async (req, res) => {
  const { error } = addContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { name, email, phone, favorite } = req.body;
  const newContact = await addContact(name, email, phone, favorite, req.user.id);

  res.status(201).json(newContact);
};

const updateOneContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }

  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body, req.user.id);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

const updateContactStatus = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  const { error } = updateStatusSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, req.body, req.user.id);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateOneContact,
  updateContactStatus,
};
