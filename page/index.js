import { linkedInButtonSelector } from "../utils/constants.js";
import { FormValidator } from "../Components/FormValidator.js";
import { enableValidationElements } from "../Components/FormValidator.js";
import { Api, initialInfo } from "../Components/Api.js";
(function formValidation() {
  document.addEventListener("input", (evt) => {
    if (
      evt.target.parentElement.classList.contains(
        enableValidationElements.formSelector.slice(1)
      )
    ) {
      const validator = new FormValidator(enableValidationElements, evt.target);
      validator.enableValidation();
    }
  });
})();
