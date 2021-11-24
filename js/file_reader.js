export const readFile = (input) => {
      const file = input.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load", e => {
            let $imgPreview = document.querySelector("#imgPreview");
            $imgPreview.src = e.currentTarget.result;
      });
};