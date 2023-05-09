import { layerStore } from "./store.js";
import { layerView } from "./view.js";

export const layerController = {
  store: layerStore,
  view: layerView,
  isModalActive: function () {
    return this.store.isOpenAddressLayer || this.store.isOpenLoginExpandLayer;
  },

  init() {
    this.renderLoginLayer();
    this.setEvent();
  },

  renderLoginLayer() {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        this.view.showLoginLayer();
      }, 1000);
    });
  },

  handleAddressMouseEnter() {
    if (!this.store.isOpenAddressLayer) {
      this.view.openLayer(this.view.addressLayer);
      this.store.setIsOpenAddressLayer(true);
    }
  },

  handleLoginMouseEnter() {
    this.view.hideLoginLayer();
    if (!this.store.isOpenLoginExpandLayer) {
      this.view.openLayer(this.view.loginExpandLayer);
      this.store.setIsOpenLoginExpandLayer(true);
    }
  },

  handleAddressMouseLeave(e) {
    this.store.setIsOpenAddressLayer(false);
    this.view.closeLayer(this.view.addressLayer, e, this.isModalActive());
  },

  handleLoginMouseLeave(e) {
    console.log("이벤트일어남");
    console.log(this.view.loginExpandLayer);
    console.log(this.isModalActive());
    this.store.setIsOpenLoginExpandLayer(false);

    this.view.closeLayer(this.view.loginExpandLayer, e, this.isModalActive());
  },

  setEvent() {
    this.view.addressArea.addEventListener("mouseenter", this.handleAddressMouseEnter.bind(this));
    this.view.addressArea.addEventListener("mouseleave", this.handleAddressMouseLeave.bind(this));
    this.view.addressLayer.addEventListener("mouseenter", this.handleAddressMouseEnter.bind(this));
    this.view.addressLayer.addEventListener("mouseleave", this.handleAddressMouseLeave.bind(this));
    this.view.loginArea.addEventListener("mouseenter", this.handleLoginMouseEnter.bind(this));
    this.view.loginArea.addEventListener("mouseleave", this.handleLoginMouseLeave.bind(this));
    this.view.loginExpandLayer.addEventListener("mouseleave", this.handleLoginMouseLeave.bind(this));
  },
};
