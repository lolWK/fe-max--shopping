export const template = {
  mainTitle(title) {
    return `<div class="title">${title}</div>`;
  },

  mainCategoryList(items, isLastCategory) {
    return `
      <ul class="lists">
        ${items
          .map(
            (item) => `
        <li class="item">
          <a href="#">${item}</a>
          <img src="./src/assets/images/icn_chevron_right.svg" alt="" />
        </li>`
          )
          .join("")}
          ${
            isLastCategory
              ? `
              <button class="open-lists-btn">
                <div>모두 보기</div>
                <img src="./src/assets/images/icn_chevron_down.svg" alt="" />
              </button>
              `
              : ""
          }
      </ul>
    `;
  },

  mainExtendCategoryList(items) {
    return `
      <ul class="lists">
        ${items.map((item) => `<li class="item"><a href="#">${item}</a><img src="./src/assets/images/icn_chevron_right.svg" alt="" /></li>`).join("")}
      </ul>
    `;
  },

  subCategoryList(items) {
    return `
      <ul class="lists">
        ${items.map((item) => `<li class="item"><a href="#">${item}</a></li>`).join("")}
      </ul>
    `;
  },
};
