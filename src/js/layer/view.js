import { $ } from "../util.js";

export const layerView = {
  loginArea: document.querySelector(".header__login"),
  loginLayer: document.querySelector(".header-layer__popup--login"),
  loginExpandLayer: document.querySelector(".header-layer__popup--login-extend"),
  addressArea: document.querySelector(".header__shipping-address"),
  addressLayer: document.querySelector(".header-layer__popup--address"),
  dimBackground: document.querySelector(".dim"),

  showLoginLayer() {
    this.loginLayer.classList.remove("hidden");
  },
  hideLoginLayer() {
    this.loginLayer.classList.add("hidden");
  },

  openLayer(modal) {
    modal.classList.remove("hidden");
    this.dimBackground.classList.remove("hidden");
  },

  closeLayer(modal, e, isModalActive) {
    if (isModalActive || e.relatedTarget === modal) {
      return;
    }
    modal.classList.add("hidden");
    this.dimBackground.classList.add("hidden");
  },
};
