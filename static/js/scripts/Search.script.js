import ApiKeys from "../api/apiKeys.js";

export default class {
  constructor(params) {
    this.listApiKey = ApiKeys;
    this.indexApiKey = 0;
    this.keywords = params;
    this.currentPage = 1;
    this.totalPages = 0;
    this.sortBy = "relevancy";
    this.filterLocations = [];
    this.filterCategory = [];
    this.filterBrand = [];
    this.filterShipping = [];
    this.searchSuggest();
  }
  searchSuggest() {
    const searchInput = document.querySelector(".search-box__search-input");
    const searchRes = document.querySelector(".search-box__search-result");
    const searchBtn = document.querySelector(".search-box__search-button");
    const searchPrefills = `
            <a class="search-result default" href="#">
                <span>Thanh toán hóa đơn giảm 88K</span>
                <img src="https://cf.shopee.vn/file/14abbb45e405ed8cd18aa797816421ab" alt="">
            </a>`;
    searchRes.innerHTML = searchPrefills;
    var getData;
    searchInput.addEventListener("input", () => {
      let input = searchInput.value.trim();
      clearTimeout(getData);
      getData = setTimeout(
        () =>
          this.getKeywordSuggest(input, this.listApiKey[this.indexApiKey]).then(
            data => this.renderKeywordsSuggest(data),
          ),
        750,
      );
      if (input === "") {
        searchRes.innerHTML = searchPrefills;
        clearTimeout(getData);
        return;
      } else {
        let searchShop = `
                <a class="search-result" href="#">
                    <svg enable-background="new 0 0 15 15" viewBox="0 0 15 15" x="0" y="0" stroke-width="0">
                        <path d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z">
                        </path>
                    </svg>
                    <span>Tìm Shop "${input}"</span>
                </a>`;
        searchBtn.href = `./search?${input}`;
        searchRes.innerHTML = searchShop;
      }
    });
    searchInput.addEventListener("focus", () => {
      searchRes.style.display = "block";
    });
    searchInput.addEventListener("blur", e => {
      if (!e.relatedTarget) searchRes.style.display = "none";
    });
    searchInput.addEventListener("keyup", e => {
      e.preventDefault();
      if (e.keyCode === 13) {
        searchBtn.click();
      }
    });
  }
  async getKeywordSuggest(input, apiKey) {
    const options = {
      method: "GET",
      url: "https://shopee.p.rapidapi.com/shopee.vn/keyword-suggestion",
      params: {
        input: input,
      },
      headers: {
        "x-rapidapi-host": "shopee.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };
    return await axios.request(options).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      else return Promise.resolve(response.data.data);
    });
  }
  renderKeywordsSuggest(data) {
    const searchRes = document.querySelector(".search-box__search-result");
    if (!data?.error_msg && data?.keywords.length > 0) {
      data.keywords = data.keywords.slice(0, 10);
      let htmls = data.keywords.map(
        keyword =>
          `<a class="search-result" href="./search?${keyword}" data-link>
               ${keyword}
            </a>`,
      );
      searchRes.innerHTML += htmls.join("");
    }
  }
  async search(apiKey, keywords, limit = 30, offset = 0) {
    document.querySelector(
      ".results-list",
    ).innerHTML = `<div class="preload"></div>`;
    const options = {
      method: "GET",
      url: "https://shopee.p.rapidapi.com/shopee.vn/search",
      params: {
        keyword: keywords,
        limit: limit,
        offset: offset,
        sort_by: this.sortBy,
        filter_locations: this.filterLocations.join(","),
        filter_category_ids: this.filterCategory.join(","),
        filter_brand_ids: this.filterBrand.join(","),
        filter_shipping_ids: this.filterShipping.join(","),
      },
      headers: {
        "x-rapidapi-host": "shopee.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };
    const res = await axios.request(options).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      else return Promise.resolve(response.data.data);
    });
    return res;
  }
  rating(ratingStar) {
    if (ratingStar == 0) return "";
    let html = "";
    for (let i = 0; i < 5; i++) {
      let star = ratingStar <= 0 ? 0 : ratingStar >= 1 ? 100 : ratingStar * 100;
      html += `<div class="star">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star rate" style="width: ${star}"></i>
                    </div>`;
      ratingStar--;
    }
    return html;
  }
  renderResultList(data) {
    const listProducts = document.querySelector(".results-list");
    this.totalPages = Math.floor(data.total_count / 30);
    document.querySelector(
      ".bar-nav .pages",
    ).innerHTML = `<span class="highlight">${this.currentPage}</span>/${this.totalPages}`;
    let format = new Intl.NumberFormat("de-DE").format;
    listProducts.innerHTML = data.items
      .map(
        item => `
                <div class="item-wrapper">
                    <div class="item" href="/product?${item.shop_id}&${
          item.item_id
        }" data-link>
                        <div class="item__discount" style="display:${
                          item.discount == null ? "none" : "flex"
                        }"><span class="number">${
          item.discount
        }</span><span class="text">GIẢM</span></div>
                        <img class="item__image" style="background: url(./static/images/preload.gif)" src="${
                          item.image
                        }" loading="lazy"></img>
                        <div class="item__name">
                            <span>${item.name}</span>
                        </div>
                        <span class="item__price">
                            ${
                              item.price_max == item.price_min
                                ? item.discount == null
                                  ? '<span class="currency">đ</span>' +
                                    format(item.price)
                                  : '<span class="price-before-discount"><span class="currency">đ</span>' +
                                    format(item.price_before_discount) +
                                    "</span>" +
                                    '<span class="currency">đ</span>' +
                                    format(item.price)
                                : '<span class="currency">đ</span>' +
                                  format(item.price_min) +
                                  " - " +
                                  '<span class="currency">đ</span>' +
                                  format(item.price_max)
                            }</span>
                        <div class="item__stat">
                            <i class="far fa-heart"></i>
                            <div class="wrapper">
                                <div class="rating">
                                   ${this.rating(item.item_rating.rating_star)}
                                </div>
                                <span class="sold">Đã bán ${
                                  item.sold < 1000
                                    ? item.sold
                                    : format((item.sold / 1000).toFixed(1)) +
                                      "k"
                                }</span>
                            </div>
                        </div>
                        <span class="item__location">${
                          item.shop_location
                        }</span>
                        <div class="item__relative" style="display: none">Tìm sản phẩm tương tự</div>
                    </div>
                </div>`,
      )
      .join("");
  }
  changePage(apiKey, keywords, page) {
    if (this.currentPage == 1) {
      document.querySelector(".nav.nav-prev").classList.add("inactive");
    } else if (this.currentPage == this.totalPages) {
      document.querySelector(".nav.nav-next").classList.add("inactive");
    } else {
      document.querySelector(".nav.nav-prev").classList.remove("inactive");
      document.querySelector(".nav.nav-next").classList.remove("inactive");
    }
    document.querySelector(
      ".bar-nav .pages",
    ).innerHTML = `<span class="highlight">${this.currentPage}</span>/${this.totalPages}`;
    this.search(apiKey, keywords, 30, page * 30).then(data => {
      this.changeApiKey();
      this.renderResultList(data);
    });
  }
  async filter(apiKey, keywords) {
    document.querySelector(
      ".results-list",
    ).innerHTML = `<div class="preload"></div>`;
    const options = {
      method: "GET",
      url: "https://shopee.p.rapidapi.com/shopee.vn/get-filters",
      params: { keyword: keywords },
      headers: {
        "x-rapidapi-host": "shopee.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    };
    const res = await axios.request(options).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      else return Promise.resolve(response.data.data);
    });
    return res;
  }
  renderFilterList(data) {
    const categoryGroup = document.querySelector(
      '.filter-group[group="category"] .list-items',
    );
    const locationGroup = document.querySelector(
      '.filter-group[group="location"] .list-items',
    );
    const shippingGroup = document.querySelector(
      '.filter-group[group="shipping"] .list-items',
    );
    const brandGroup = document.querySelector(
      '.filter-group[group="brand"] .list-items',
    );
    categoryGroup.innerHTML = data.category_filters
      .map?.(
        (item, index) =>
          `<div class='filters' filterID='${item.category_id}'>
                <input type="checkbox" id='${item.category_id}'/>
                <label for="${item.category_id}">
                    <i class="far fa-square" data-id="${item.category_id}"></i>
                    <i class="far fa-check-square hide check" data-id="${
                      item.category_id
                    }"></i>
                    ${item.display_name} 
                    (${
                      item.count >= 1000
                        ? Math.floor(item.count / 1000) + "k+"
                        : item.count
                    })
                </label>
            </div>`,
      )
      .join("");
    locationGroup.innerHTML = data.location_filters
      .map?.(
        (item, index) =>
          `<div class='filters' filterID='${item}'>
                <input type="checkbox" id='${item}'/>
                <label for="${item}">
                    <i class="far fa-square" data-id="${item}"></i>
                    <i class="far fa-check-square hide check" data-id="${item}"></i>
                    ${item} 
                </label>
            </div>`,
      )
      .join("");
    shippingGroup.innerHTML = data.shipping_filters
      .map?.(
        (item, index) =>
          `<div class='filters' filterID='${item.shipping_id}'>
                <input type="checkbox" id='${item.shipping_id}'/>
                <label for="${item.shipping_id}">
                    <i class="far fa-square" data-id="${item.shipping_id}"></i>
                    <i class="far fa-check-square hide check" data-id="${item.shipping_id}"></i>
                    ${item.shipping_name} 
                </label>
            </div>`,
      )
      .join("");
    brandGroup.innerHTML = data.brand_filters
      .map?.(
        (item, index) =>
          `<div class='filters' filterID='${item.brand_id}'>
                <input type="checkbox" id='${item.brand_id}'/>
                <label for="${item.brand_id}">
                    <i class="far fa-square" data-id="${item.brand_id}"></i>
                    <i class="far fa-check-square hide check" data-id="${item.brand_id}"></i>
                    ${item.brand_name} 
                </label>
            </div>`,
      )
      .join("");
  }
  getFilter(group) {
    var arrayElements = Array.from(
      document.querySelector(`[group=${group}]`).children[1].children,
    );
    arrayElements.forEach(item => {
      item.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        let input = item.children[0];
        input.checked = !input.checked;
        if (input.checked) {
          document
            .querySelectorAll(`i[data-id="${input.id}"]`)[0]
            .classList.add("hide");
          document
            .querySelectorAll(`i[data-id="${input.id}"]`)[1]
            .classList.remove("hide");
        } else {
          document
            .querySelectorAll(`i[data-id="${input.id}"]`)[0]
            .classList.remove("hide");
          document
            .querySelectorAll(`i[data-id="${input.id}"]`)[1]
            .classList.add("hide");
        }
        switch (group) {
          case "location":
            if (!input.checked)
              this.filterLocations = this.filterLocations.filter(
                id => id !== item.getAttribute("filterid"),
              );
            else this.filterLocations.push(item.getAttribute("filterid"));
            break;
          case "category":
            if (!input.checked)
              this.filterCategory = this.filterCategory.filter(
                id => id !== item.getAttribute("filterid"),
              );
            else {
              this.filterCategory.push(item.getAttribute("filterid"));
            }
            break;
          case "brand":
            if (!input.checked)
              this.filterBrand = this.filterBrand.filter(
                id => id !== item.getAttribute("filterid"),
              );
            else this.filterBrand.push(item.getAttribute("filterid"));
            break;
          case "shipping":
            if (!input.checked)
              this.filterShipping = this.filterShipping.filter(
                id => id !== item.getAttribute("filterid"),
              );
            else this.filterShipping.push(item.getAttribute("filterid"));
            break;
        }
        this.search(this.listApiKey[this.indexApiKey], this.keywords).then(
          data => {
            this.changeApiKey();
            this.renderResultList(data);
          },
        );
      });
    });
  }
  sortItem() {
    document.querySelectorAll(".sort[data-sort]").forEach(item => {
      item.addEventListener("click", () => {
        let dataSort = item.getAttribute("data-sort");
        if (dataSort === this.sortBy) return;
        let activeElement = document.querySelector(".sort[data-sort].active");
        if (!activeElement) {
          document.querySelector(".sort-price").children[0].innerText = "Giá";
          document
            .querySelector(".sort-price")
            .children[0].classList.remove("highlight");
          document
            .querySelector(`[data-sort="${this.sortBy}"]`)
            .children[0].remove();
        } else activeElement.classList.remove("active");
        if (item.classList.contains("price")) {
          document
            .querySelector(".sort-price")
            .children[0].classList.add("highlight");
          document.querySelector(".sort-price").children[0].innerText =
            document.querySelector(`[data-sort=${dataSort}]`).innerText;
          item.innerHTML += '<i class="fas fa-check highlight"></i>';
        } else item.classList.add("active");
        this.sortBy = dataSort;
        this.search(this.listApiKey[this.indexApiKey], this.keywords).then(
          data => {
            this.changeApiKey();
            this.renderResultList(data);
          },
        );
      });
    });
  }
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  handleFetchErr(err) {
    console.log(err);
    err = err.message;
    if (err.includes("429")) setTimeout(() => this.main(), 2000);
    else if (err.includes("500")) {
      changeApiKey();
      setTimeout(() => this.main(), 500);
    }
  }
  changeApiKey() {
    this.indexApiKey < this.listApiKey.length - 1
      ? this.indexApiKey++
      : (this.indexApiKey = 0);
  }
  main() {
    console.log(`search ${this.keywords}`);
    let timeout = 0;
    document.querySelector(
      ".results-title .text",
    ).innerHTML = `Kết quả tìm kiếm cho từ khóa '<span class="highlight">${this.keywords}</span>'`;
    this.sleep(timeout).then(() => {
      this.filter(this.listApiKey[this.indexApiKey], this.keywords)
        .then(data => {
          this.renderFilterList(data);
          document
            .querySelectorAll('.filters input[type="checkbox"]')
            .forEach(input => {
              input.addEventListener("change", () => {});
            });
          this.getFilter("category");
          this.getFilter("location");
          this.getFilter("brand");
          this.getFilter("shipping");
          document.querySelector(`[group=category] .list-items`).style.height =
            "95px";
          document.querySelector(`[group=location] .list-items`).style.height =
            "70px";
          document.querySelector(`[group=brand] .list-items`).style.height =
            "70px";
          document
            .querySelector(`[group=category] .list-more`)
            .addEventListener("click", () => {
              document.querySelector(
                `[group=category] .list-more`,
              ).style.display = "none";
              document.querySelector(
                `[group=category] .list-items`,
              ).style.height = "350px";
            });
          document
            .querySelector(`[group=location] .list-more`)
            .addEventListener("click", () => {
              document.querySelector(
                `[group=location] .list-more`,
              ).style.display = "none";
              document.querySelector(
                `[group=location] .list-items`,
              ).style.height = "510px";
            });
          document
            .querySelector(`[group=brand] .list-more`)
            .addEventListener("click", () => {
              document.querySelector(`[group=brand] .list-more`).style.display =
                "none";
              document.querySelector(`[group=brand] .list-items`).style.height =
                "510px";
            });
          this.sortItem();
          this.changeApiKey();
          return this.sleep(timeout);
        })
        .then(() =>
          this.search(this.listApiKey[this.indexApiKey], this.keywords)
            .then(data => {
              this.renderResultList(data);
              document
                .querySelector(".nav.nav-prev")
                .addEventListener("click", () => {
                  if (this.currentPage == 1) {
                    document
                      .querySelector(".nav.nav-prev")
                      .classList.add("inactive");
                    return;
                  }
                  this.currentPage--;
                  this.changePage(
                    this.listApiKey[this.indexApiKey],
                    this.keywords,
                    this.currentPage - 1,
                  );
                });
              document
                .querySelector(".nav.nav-next")
                .addEventListener("click", () => {
                  if (this.currentPage == this.totalPages) {
                    document
                      .querySelector(".nav.nav-next")
                      .classList.add("inactive");
                    return;
                  }
                  this.currentPage++;
                  this.changePage(
                    this.listApiKey[this.indexApiKey],
                    this.keywords,
                    this.currentPage - 1,
                  );
                });
              this.changeApiKey();
              return this.sleep(timeout);
            })
            .catch(err => Promise.reject(err)),
        )
        .catch(err => this.handleFetchErr(err));
    });
  }
}
