const $contactsFlex = document.querySelector("#contacts-flex");
const $nameInput = document.querySelector("#name");
const $phoneInput = document.querySelector("#phone");
const $emailInput = document.querySelector("#email");

const clearInputs = () => {
      $nameInput.value = "";
      $phoneInput.value = "";
      $emailInput.value = "";
      document.querySelector('#imgPreview').src = "./images/not-found.png";
};

function validateSave() {
      const $inputs = document.querySelectorAll(".form__form-control[type=text]")

      let errors = [];

      $inputs.forEach(input => {
            if (input.classList.contains("form-control--error") || !input.classList.contains('form-control--success')) {
                  errors.push("Error")
            }
      });

      if (errors.length >= 1) {
            alert("Rellene bien los campos");
            return false;
      } else {
            return true
      };
};

export const saveContact = (e) => {
      e.preventDefault();

      const name = $nameInput.value;
      const phone =$phoneInput.value;
      const email = $emailInput.value;
      const urlImg = document.querySelector('#imgPreview').src;

      if (!validateSave()) {
            return;
      };

      const contact = {
            id: Date.now(),
            name,
            phone,
            email,
            urlImg
      };

      if (localStorage.getItem('contacts') == null) {
            let contacts = [];
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
      } else {
            let contacts = JSON.parse(localStorage.getItem('contacts'));
            contacts.push(contact);
            localStorage.setItem('contacts', JSON.stringify(contacts));
      }

      clearInputs();
      getContacts();
};

export const deleteContact = e => {
      const contacts = JSON.parse(localStorage.getItem('contacts'));

      let newData = contacts.filter(contact => e.target.getAttribute("data-id") != contact.id);

      localStorage.setItem('contacts', JSON.stringify(newData));
      showContacts(newData);
};

export const getContacts = () => {
      let contacts = JSON.parse(localStorage.getItem('contacts'));

      showContacts(contacts);
};

export const showContacts = (contacts) => {

      if (contacts == null || contacts == false) {
            $contactsFlex.innerHTML = "<h2 class='title'>¡No hay contactos!</h2>";

      } else {
            let html = "";

            contacts.map(contact => {

                  html += `
                        <div id="${contact.id}" class="card">
                              <img src="${contact.urlImg}" class="card__urlImg">
                              <h2 class="card__name">${contact.name}</h2>
                              <p class="card__phone">${contact.phone}</p>
                              <p class="card__email">${contact.email}</p>
                              <div class="actions">
                                    <button data-id="${contact.id}" class="actions__btn  actions__btn--delete" >Eliminar</button>
                              </div>
                        </div>
                  `;
            });

            $contactsFlex.innerHTML = html;
      };
};
