import { store } from "./store.js";
import { view } from "./view.js";

export const controller = {
  async init() {
    await this.fetchData();
    view.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    view.handleMoveSubSidebar = this.handleMoveSubSidebar.bind(this);
    view.handleMoveMainSidebar = this.handleMoveMainSidebar.bind(this);
    view.handleExtendArea = this.handleExtendArea.bind(this);
    view.handleAllCategories = this.handleAllCategories.bind(this);
    view.on();
  },

  async fetchData() {
    const response = await fetch("http://localhost:4000/sidebarData");
    const data = await response.json();

    store.saveData(data);

    view.renderSidebar(store);
  },

  handleHideAllCategories(e) {
    store.setIsAllCategoriesOpen(false);
    console.log("뜨긴해?");
    const contentElements = document.querySelectorAll(".main > .content");
    contentElements.forEach((element) => {
      element.remove();
    });
    view.renderSidebar(store);
    const openAllButton = document.querySelector(".open-lists-btn");
    view.toggleShowAllButton(openAllButton, store.isAllCategoriesOpen);
  },

  handleShowAllCategories(e) {
    store.setIsAllCategoriesOpen(true);
    const contentElements = document.querySelectorAll(".main > .content");
    contentElements.forEach((element) => {
      element.remove();
    });
    view.renderSidebar(store);
    const openAllButton = document.querySelector(".open-lists-btn");
    view.toggleShowAllButton(openAllButton, store.isAllCategoriesOpen);
  },

  handleAllCategories(e) {
    if (e.target.closest(".open-lists-btn")) {
      if (!store.isAllCategoriesOpen) {
        this.handleShowAllCategories(e);
      } else {
        this.handleHideAllCategories(e);
      }
    }
  },

  handleToggleSidebar() {
    view.toggleSidebar(store.isSidebarOpen);
    store.toggleSidebar();
  },

  handleMoveSubSidebar(e) {
    console.log("섭사이드도됌");
    const selectedItemInfo = view.getSelectedItemInfo(e);
    if (!selectedItemInfo) return;

    store.setSelectedCategory(selectedItemInfo);

    view.renderSubSideBar({
      title: selectedItemInfo.category,
      category: store.getSelectedCategory(),
    });
    console.log(store.isSubSidebarOpen);
    view.toggleSubSidebar(store.isSubSidebarOpen);
    store.toggleSubSidebar();
    console.log(store.isSubSidebarOpen);
  },

  handleMoveMainSidebar() {
    view.toggleSubSidebar(store.isSubSidebarOpen);
    console.log(store.isSubSidebarOpen);
    store.toggleSubSidebar();
    console.log(store.isSubSidebarOpen);
  },

  handleExtendArea() {
    view.toggleExtendArea(store.isExtendAreaOpen);
    store.toggleExtendArea();
  },
};
