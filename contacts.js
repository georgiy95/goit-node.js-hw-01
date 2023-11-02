const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const { nanoid } = require("nanoid");

async function listContacts() {
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const dataList = await listContacts();
    return dataList.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const dataList = await listContacts();
    const delContact = await getContactById(contactId);
    if (!delContact) {
      return null;
    }
    const newDataList = dataList.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newDataList, null, 2));
    return delContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: nanoid(), name, email, phone };
    const dataList = await listContacts();
    console.log(name, email, phone);
    dataList.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(dataList, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
