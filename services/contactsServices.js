const { Contact } = require("../db/sequelize");

async function listContacts() {
  return Contact.findAll();
}

async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(name, email, phone, favorite = false) {
  return Contact.create({ name, email, phone, favorite });
}

async function updateContact(contactId, data) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return contact.update(data);
}

async function updateStatusContact(contactId, { favorite }) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  return contact.update({ favorite });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
