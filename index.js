import contactsService from "./contacts.js";
import {program} from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contactsService.listContacts();
      return console.table(contactsList);
      break;

    case "get":
      const contactById = await contactsService.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const addContact = await contactsService.addContact(name, email, phone);
      return console.log(addContact);
      break;

    case "remove":
      const deleteContact = await contactsService.removeContact(id);
      return console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
