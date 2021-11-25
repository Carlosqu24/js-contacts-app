import { saveContact, deleteContact, getContacts } from "./js/contacts.js";
import { validateInputs, removeInputClasses } from "./js/form_validation.js";
import { readFile } from "./js/file_reader.js";

// VARIABLES
const $inputFileReader = document.querySelector("#inputFileReader");
const $btnSaveContact = document.querySelector("#btn-saveContact");


// EVENTS
document.addEventListener("DOMContentLoaded", getContacts);

document.addEventListener("click", e => {
      if (e.target === $btnSaveContact) {
            saveContact(e);
            removeInputClasses();
      };

      if (e.target.matches(".actions__btn--delete")) deleteContact(e);
});

document.addEventListener("keyup", validateInputs);

$inputFileReader.addEventListener("change", e => {
      readFile($inputFileReader);
});