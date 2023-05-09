import { template } from "./template.js";
import { $ } from "../util.js";

export const view = {
  $sidebar: $(".sidebar"),
  $subSidebar: $(".sidebar__contents .wrap"),
  $sidebarContents: $(".sidebar .main"),
  $subSidebarContents: $(".sub-content"),
  $openSidebarButton: $(".nav-sub__hmenu"),
  $closeSidebarButton: $(".sidebar__close"),
  $moveMainButton: $(".go-main-btn"),
  $openListButton: $(".open-lists-btn"),

  on() {
    this.$sidebar.addEventListener("click", this.handleAllCategories);
    this.$openSidebarButton.addEventListener("click", this.handleToggleSidebar);
    this.$closeSidebarButton.addEventListener("click", this.handleToggleSidebar);
    this.$sidebarContents.addEventListener("click", this.handleMoveSubSidebar);
    this.$moveMainButton.addEventListener("click", this.handleMoveMainSidebar);
  },

  toggleShowAllButton(element, isAllCategoriesOpen) {
    console.log("받긴했어?");
    console.log(element);
    if (isAllCategoriesOpen) {
      element.innerHTML = `
            <div>간단히 보기</div>
            <img src="./src/assets/images/icn_chevron_top.svg" alt="" />
        `;
    } else {
      element.innerHTML = `
            <div>모두 보기</div>
            <img src="./src/assets/images/icn_chevron_down.svg" alt="" />
        `;
    }
  },

  renderSidebar(store) {
    const data = store.getCategories();
    const isAllCategoriesOpen = store.isAllCategoriesOpen;
    const MAX_SLICE = 4;
    let count = 0;
    let isLastCategory = false;

    Object.entries(data).forEach(([title, items]) => {
      const slicedItems = items.slice(0, MAX_SLICE);
      const restItems = items.slice(4);
      const content = document.createElement("div");
      content.classList.add("content");

      content.innerHTML = `
      ${this.createMainTitle(title)}
      ${this.createMainCategoryList(slicedItems, isLastCategory)}
      ${store.isAllCategoriesOpen ? this.createRestCategoryList(restItems) : ""}
      `;
      this.$sidebarContents.append(content);
      count++;

      if (count === 1) {
        isLastCategory = true;
      }
    });
    console.log(this.$subSidebarContents);

    this.$sidebarContents.addEventListener("click", this.handleMoveSubSidebar);
  },

  renderSubSideBar({ title, category }) {
    console.log(this.$subSidebarContents);
    this.$subSidebarContents.innerHTML = this.createMainTitle(title) + this.createMainCategoryList(category);
  },

  createMainTitle(title) {
    return template.mainTitle(title);
  },

  createRestCategoryList(restItems) {
    return template.mainCategoryList(restItems);
  },

  createMainCategoryList(slicedItems, isLastCategory) {
    console.log("잘 들어왓니?");
    console.log(slicedItems);
    return template.mainCategoryList(slicedItems, isLastCategory);
  },

  createMainExtendCategoryList(items) {
    return template.mainExtendCategoryList(items);
  },

  getSelectedItemInfo({ target }) {
    if (!target.closest("li")) return;
    console.log(this.selectedTitle({ target }));
    console.log(this.selectedCategory({ target }));
    const title = this.selectedTitle({ target });
    const category = this.selectedCategory({ target });
    console.log(title);
    console.log(category);
    return { title, category };
  },

  selectedTitle({ target }) {
    return target.closest(".content").querySelector(".title").innerText;
  },

  selectedCategory({ target }) {
    let category = null;
    if (target.closest("li")) {
      category = target.closest("li").innerText;
    }
    return category;
  },

  toggleSidebar(isOpen) {
    if (!isOpen) {
      this.$sidebar.dataset.state = "open";
      this.$closeSidebarButton.dataset.state = "visible";
    } else {
      this.$sidebar.dataset.state = "close";
      this.$closeSidebarButton.dataset.state = "hidden";
    }
  },

  toggleSubSidebar(isOpen) {
    if (!isOpen) {
      this.$subSidebar.dataset.state = "open";
    } else {
      this.$subSidebar.dataset.state = "close";
    }
  },

  toggleExtendArea(isOpen) {
    if (!isOpen) {
      this.$extendArea.dataset.state = "open";
    } else {
      this.$extendArea.dataset.state = "close";
    }
  },
};
