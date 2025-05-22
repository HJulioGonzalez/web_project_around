import { PopUp } from "../Components/Popup.js";
export class PopupWithImage extends PopUp {
  constructor({ popup }) {
    super({ popup });
  }

  open() {
    super.open();
    return this;
  }

  close() {
    super.close();
    return this;
  }
}
