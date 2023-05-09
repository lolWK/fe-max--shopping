const loginArea = document.querySelector(".header__login");
const loginLayer = document.querySelector(".header-layer__popup--login");
const loginExpandLayer = document.querySelector(".header-layer__popup--login-extend");
const addressArea = document.querySelector(".header__shipping-address");
const addressLayer = document.querySelector(".header-layer__popup--address");
const dimBackground = document.querySelector(".dim");

let isOpenAddressLayer = false;
let isOpenLoginExpandLayer = false;

function renderLoginLayer() {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      loginLayer.classList.remove("hidden");
    }, 1000);
  });
}

function handleAddressMouseEnter() {
  if (!isOpenAddressLayer) openLayer(addressLayer);
  isOpenAddressLayer = true;
}

function handleLoginMouseEnter() {
  loginLayer.classList.add("hidden");
  if (!isOpenAddressLayer) openLayer(loginExpandLayer);
  isOpenLoginExpandLayer = true;
}

function handleAddressMouseLeave(e) {
  isOpenAddressLayer = false;
  closeLayer(addressLayer, e);
}

function handleLoginMouseLeave(e) {
  isOpenLoginExpandLayer = false;
  closeLayer(loginExpandLayer, e);
}

function openLayer(modal) {
  modal.classList.remove("hidden");
  dimBackground.classList.remove("hidden");
}

function closeLayer(modal, e) {
  if (isOpenAddressLayer || isOpenLoginExpandLayer || e.relatedTarget === modal) {
    return;
  }

  modal.classList.add("hidden");
  dimBackground.classList.add("hidden");
}

export function initNavLayer() {
  renderLoginLayer();
  addressArea.addEventListener("mouseenter", handleAddressMouseEnter);
  addressArea.addEventListener("mouseleave", handleAddressMouseLeave);
  addressLayer.addEventListener("mouseenter", handleAddressMouseEnter);
  addressLayer.addEventListener("mouseleave", handleAddressMouseLeave);
  loginArea.addEventListener("mouseenter", handleLoginMouseEnter);
  loginArea.addEventListener("mouseleave", handleLoginMouseLeave);
  loginExpandLayer.addEventListener("mouseleave", handleLoginMouseLeave);
}
