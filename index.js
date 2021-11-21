const $nameInput = document.querySelector("#name");
const $phoneInput = document.querySelector("#phone");
const $emailInput = document.querySelector("#email");
const $inputFileReader = document.querySelector("#inputFileReader");

const $contactsFlex = document.querySelector("#contacts-flex");

const $btnSaveContact = document.querySelector("#btn-saveContact");

const clearInputs = () => {
      $nameInput.value = "";
      $phoneInput.value = "";
      $emailInput.value = "";
      document.querySelector('#imgPreview').src = "./images/not-found.png";
};

const saveContact = (e) => {
      e.preventDefault();

      const name = $nameInput.value;
      const phone =$phoneInput.value;
      const email = $emailInput.value;
      const urlImg = document.querySelector('#imgPreview').src;

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

const deleteContact = e => {
      const contacts = JSON.parse(localStorage.getItem('contacts'));

      let newData = contacts.filter(contact => e.target.getAttribute("data-id") != contact.id);

      localStorage.setItem('contacts', JSON.stringify(newData));
      showContacts(newData);
};

const getContacts = () => {
      let contacts = JSON.parse(localStorage.getItem('contacts'));

      showContacts(contacts);
};

const showContacts = (contacts) => {

      if (contacts == null || contacts == false) {
            $contactsFlex.innerHTML = "<h2>¡No hay contactos!</h2>"
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

const readFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", e => {
            let $imgPreview = document.querySelector("#imgPreview");
            $imgPreview.src = e.currentTarget.result;
      })
};


document.addEventListener("DOMContentLoaded", getContacts);

document.addEventListener("click", e => {
      if (e.target === $btnSaveContact) saveContact(e);
      if (e.target.matches(".actions__btn--delete")) deleteContact(e);
});

$inputFileReader.addEventListener("change", e => readFile($inputFileReader.files[0]));