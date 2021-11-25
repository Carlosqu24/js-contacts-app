export function validateInputs(e) {
      const nameRegExp = `[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*`;
      const phoneRegExp = `[ -]*([0-9][ -]*){8}`;
      const emailRegExp = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

      if(e.target.id == 'name') {

            validateRegExp(nameRegExp, e.target, "form-control--success", "form-control--error");

      };

      if(e.target.id == 'phone') {
            
            validateRegExp(phoneRegExp, e.target, "form-control--success", "form-control--error");

      };

      if(e.target.id == 'email') {

            validateRegExp(emailRegExp, e.target, "form-control--success", "form-control--error");

      };
};

function validateRegExp(expRegString, input, successClass, errorClass) {
      let cadena = input.value;

      let expReg = new RegExp(expRegString, "ig");

      if(!expReg.test(cadena)) validateClasses(input, successClass, errorClass);
      else validateClasses(input, successClass, errorClass, false)
};

function validateClasses(input, successClass, errorClass, isTrue = true) {
      if(isTrue) {
            if(input.classList.contains(successClass)) {
                  input.classList.replace(successClass, errorClass);
            } else {
                  input.classList.add(errorClass);
            };
      } else {
            if(input.classList.contains(errorClass)) {
                  input.classList.replace(errorClass, successClass);
            } else {
                  input.classList.add(successClass);
            };
      };
};

export function removeInputClasses() {
      const $inputs = document.querySelectorAll('input');

      $inputs.forEach(input => {
            if (input.classList.contains("form-control--success")) {
                  input.classList.remove("form-control--success");
            };

            if (input.classList.contains("form-control--error")) {
                  input.classList.remove("form-control--error");
            };
      });
};