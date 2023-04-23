const $ = (selector, doc = document) => doc.querySelector(selector);

export class SideBar {
  constructor(data, renderer) {
    this.data = data;
    this.renderer = renderer;
  }

  init() {
    this.initDigitalList('디지털 콘텐츠 및 기기', '.digital');
    this.initDepartmentList('부서별 쇼핑', '.department', '.open-lists');
    this.registerEventListeners();
  }

  initDigitalList(category, listSelector) {
    this.data.getMainCategoryList(category).then((items) => {
      const baseLists = $(listSelector);
      this.renderer.renderMainList(baseLists, items);
    });
  }

  initDepartmentList(category, baseListSelector, expendListSelector) {
    const SLICE_IDX = 4;
    this.data.getMainCategoryList(category).then((items) => {
      const baseLists = $(baseListSelector);
      const expendLists = $(expendListSelector);

      const baseItems = items.slice(0, SLICE_IDX);
      const addLists = items.slice(SLICE_IDX, items.length);

      this.renderer.renderMainList(baseLists, baseItems);
      this.renderer.renderMainList(expendLists, addLists);
    });
  }

  registerEventListeners() {
    $('.nav-sub__hmenu').addEventListener('click', () => this.handleSideBarToggle());
    $('.sidebar__close').addEventListener('click', () => this.handleSideBarToggle());
    $('.open-lists-btn').addEventListener('click', () => this.handleSubListOpen());
    $('.close-lists-btn').addEventListener('click', () => this.handleSubListClose());
    $('.go-main-btn').addEventListener('click', () => this.handleSubToggle());
    $('.sidebar__contents .main').addEventListener('click', (e) => this.moveSubList(e));
  }

  fetchAndRenderSubList(mainCategoryTitle, subCategoryTitle) {
    this.data.getSubCategoryItemList(mainCategoryTitle, subCategoryTitle).then((items) => {
      const subLists = $('.sub-content');
      this.renderer.renderSubList(subLists, items, subCategoryTitle);
    });
  }

  moveSubList({ target }) {
    if (!target.closest('li')) return;

    const mainCategoryTitle = target.closest('.content').querySelector('.title').innerText;
    const subCategoryTitle = target.closest('li').innerText;

    this.fetchAndRenderSubList(mainCategoryTitle, subCategoryTitle);
    this.handleSubToggle();
  }

  handleSubToggle() {
    $('.wrap').classList.toggle('translateX');
  }

  handleSubListOpen() {
    $('.sidebar__content--down').classList.add('open');
  }

  handleSubListClose() {
    $('.sidebar__content--down').classList.remove('open');
  }

  handleSideBarToggle() {
    $('.sidebar').classList.toggle('active');
    $('.sidebar__close').classList.toggle('hidden');
  }
}