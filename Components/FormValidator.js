export const enableValidationElements = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export class FormValidator {
  constructor(validationElements, elementToValidate) {
    this._validationElements = validationElements;
    this._elementToValidate = elementToValidate;
  }

  _fieldValidation() {
    const errorActive = () => {
      this._elementToValidate.classList.add(
        enableValidationElements.inputErrorClass
      );
      this._elementToValidate.nextElementSibling.classList.add(
        "form__input-error_active"
      );
      this._elementToValidate.nextElementSibling.textContent =
        this._elementToValidate.validationMessage;
    };
    const errorInactive = () => {
      this._elementToValidate.classList.remove(
        enableValidationElements.inputErrorClass
      );
      this._elementToValidate.nextElementSibling.classList.remove(
        "form__input-error_active"
      );
      this._elementToValidate.nextElementSibling.textContent = "";
    };
    this._elementToValidate.validity.valid ? errorInactive() : errorActive();
  }

  _submitButtonValidation() {
    const inputFields = Array.from(
      this._elementToValidate.parentElement.querySelectorAll(
        enableValidationElements.inputSelector
      )
    );

    const errorActive = () => {
      this._elementToValidate.parentElement
        .querySelector(enableValidationElements.submitButtonSelector)
        .setAttribute("disabled", "true");
      this._elementToValidate.parentElement
        .querySelector(enableValidationElements.submitButtonSelector)
        .classList.add(enableValidationElements.inactiveButtonClass);
    };

    const errorInactive = () => {
      this._elementToValidate.parentElement
        .querySelector(enableValidationElements.submitButtonSelector)
        .removeAttribute("disabled");
      this._elementToValidate.parentElement
        .querySelector(enableValidationElements.submitButtonSelector)
        .classList.remove(enableValidationElements.inactiveButtonClass);
    };
    inputFields.map((item) => item.validity.valid).every((i) => i === true)
      ? errorInactive()
      : errorActive();
  }

  enableValidation() {
    this._fieldValidation();
    this._submitButtonValidation();
  }
}
