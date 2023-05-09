export const sidebarStore = {};

export const store = {
  data: {},
  categories: {},
  selectedCategory: null,
  restCategoriesContent: "",

  isSidebarOpen: false,
  isSubSidebarOpen: false,
  isExtendAreaOpen: false,
  isAllCategoriesOpen: false,

  saveData(data) {
    this.data = data;
    this.setCategories();
    this.setAllCategories();
  },

  setIsAllCategoriesOpen(value) {
    this.isAllCategoriesOpen = value;
  },

  setCategories() {
    this.categories = Object.entries(this.data).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value);
      return acc;
    }, {});
  },

  setSelectedCategory({ title, category }) {
    this.selectedCategory = this.data[title][category];
    
  },

  setAllCategories() {
    const restCategories = this.categories["부서별 쇼핑"].slice(4);
  },

  getCategories() {
    return this.categories;
  },

  getSelectedCategory() {
    return this.selectedCategory;
  },

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  toggleSubSidebar() {
    this.isSubSidebarOpen = !this.isSubSidebarOpen;
  },
  toggleExtendArea() {
    this.isExtendAreaOpen = !this.isExtendAreaOpen;
  },
};
