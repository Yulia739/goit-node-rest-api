import { Contact } from "../db/sequelize.js";

async function listContacts(owner) {
  return Contact.findAll({ where: { owner } });
}

async function getContactById(contactId, owner) {
  return Contact.findOne({ where: { id: contactId, owner } });
}

async function removeContact(contactId, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(name, email, phone, favorite = false, owner) {
  return Contact.create({ name, email, phone, favorite, owner });
}

async function updateContact(contactId, data, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  return contact.update(data);
}

async function updateStatusContact(contactId, { favorite }, owner) {
  const contact = await Contact.findOne({ where: { id: contactId, owner } });
  if (!contact) return null;
  return contact.update({ favorite });
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
