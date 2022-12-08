const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log('All contacts: \n', allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(`Contact by id ${id}: \n`, contact);
      break;

    case "add":
        const newContact = await addContact(name, email, phone);
        console.log('Added new contact: \n', newContact);
      break;

    case "remove":
        const deletedContact = await removeContact(id);
        console.log('Deleted contact: \n', deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
    
  } catch (error) {
     console.log('Error: ' + error.message);
  }
  
}

invokeAction(argv);

