class SearchResult {
  constructor(params) {
    this.listApiKey = [
      "0e4475fd55msh9d3f485c76f18e1p1e3898jsn5c204e872e81",
      "04ea227f6emsh94b332b0ad73072p1df912jsnfa734bf2814b",
    ];
    this.indexApiKey = 0;
    this.shopID = params.split("&")[0];
    this.productID = params.split("&")[1];
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
      window.addEventListener("keyup", () => {
        clearTimeout(getData);
        getData = setTimeout(
          () =>
            this.getKeywordSuggest(
              input,
              this.listApiKey[this.indexApiKey],
            ).then(data => {
              if (!data?.error_msg && data?.keywords.length > 0) {
                data.keywords = data.keywords.slice(0, 10);
                let htmls = data.keywords.map(
                  keyword =>
                    `<a class="search-result" href="./search?${keyword}" data-link>
                                    <span>${keyword}</span>
                                </a>`,
                );
                searchRes.innerHTML += htmls.join("");
              }
            }),
          500,
        );
      });
      window.addEventListener("keydown", () => {
        clearTimeout(getData);
      });
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
    searchInput.addEventListener("blur", () => {
      searchRes.style.display = "none";
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
    const res = await axios.request(options).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      else return Promise.resolve(response.data.data);
    });
    return res;
  }
  async getProduct() {
    // document.querySelector(".results-list").innerHTML = `<div class="preload"></div>`;
    const options = {
      method: "GET",
      url: `https://shopee.p.rapidapi.com/shopee.vn/shop/${this.shopID}/item/${this.productID}/detail`,
      headers: {
        "x-rapidapi-host": "shopee.p.rapidapi.com",
        "x-rapidapi-key": "419a08ee88msh82bea431dcefef9p1c5230jsnfda0782cbdc4",
      },
    };
    const res = await axios.request(options).then(response => {
      if (response.status != 200) return Promise.reject(response.status);
      else return Promise.resolve(response.data.data);
    });
    return res;
  }
  renderProduct(data) {
    let format = new Intl.NumberFormat("de-DE").format;
    return `
            <div class='category'>
                <span>Shopee</span>
                ${data.categories
                  .map(
                    category =>
                      `<i class="fas fa-angle-right"></i><span>${category.category_display_name}</span>`,
                  )
                  .join("")}
                <i class="fas fa-angle-right"></i><span>${data.name}</span>
            </div>
            <div class='breif'>
				<div class="breif-left">
					<div class="image-wrapper">
						<img class="image-main" src='${data.images[0]}'/>
						<div class="image-slider-wrapper">
							<div class="image-slider">
								${data.images.map(image => `<image src="${image}"/>`).join("")}
                            </div>
                            <div class="image-slider__arrow prev">
                                <i class="fas fa-arrow-left"></i>
                            </div>
                            <div class="image-slider__arrow next show">
                                <i class="fas fa-arrow-right"></i>
                            </div>
						</div>
					</div>
				</div>
				<div class="breif-right">
					<div class="name">${data.name}</div>
                    <div class="stat">
                        <div class="rating">
                            <span class="stat-number">${Math.round(
                              data.item_rating.rating_star,
                            ).toFixed(1)}</span>
                            ${this.rating(data.item_rating.rating_star)}
                        </div>
                        <div class="rating-total">
                            <span class="stat-number">${
                              data.item_rating.rating_total
                            }</span>
                            <span class="stat-name">Đánh Giá</span>
                        </div>
                        <div class="sold">
                            <span class="stat-number">${
                              data.historical_sold
                            }</span>
                            <span class="stat-name">Đã Bán</span>
                        </div>
                    </div>
					<div class="price">
                        ${
                          data.discount == null
                            ? data.price_max == data.price_min
                              ? "₫" + format(data.price)
                              : "₫" +
                                format(data.price_min) +
                                " - " +
                                "₫" +
                                format(data.price_max)
                            : data.price_max == data.price_min
                            ? '<span class="price-before-discount">₫' +
                              format(data.price_before_discount) +
                              "</span>" +
                              "<span class='price-after-discount'>₫" +
                              format(data.price) +
                              "</span>" +
                              `<span class="discount">${data.discount} Giảm</span>`
                            : '<span class="price-before-discount">₫' +
                              format(data.price_min_before_discount) +
                              " - " +
                              "₫" +
                              format(data.price_max_before_discount) +
                              "</span>" +
                              "<span class='price-after-discount'>₫" +
                              format(data.price_min) +
                              " - " +
                              "₫" +
                              format(data.price_max) +
                              "</span>" +
                              `<span class="discount">${data.discount} Giảm</span>`
                        }
                    </div>
                    <div class="infomation">
                        <div class="shipping">
                            <span class="title">Vận Chuyển</span>
                            ${
                              data.show_free_shipping &&
                              `<div class="free-ship">
                                    <img class="icon" src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/1cdd37339544d858f4d0ade5723cd477.png"/> 
                                    Miễn Phí Vận Chuyển
                                </div>`
                            }
                        </div>
                        <div class="models">
                            <span class="title">${
                              data.tier_variations[0].name
                            }</span>
                            <div class="models-list">
                                ${data.tier_variations[0].options
                                  .map(
                                    (option, index) => `
                                    <div class="model" img-src="${data.tier_variations[0].images[index]}">
                                        ${option}
                                        <div class='check'><i class="fas fa-check"></i></div>
                                    </div>
                                `,
                                  )
                                  .join("")}
                            </div>
                        </div>
                        <div class="quantity">
                            <span class="title">Số Lượng</span>
                            <div class="add-product">
                                <div class="input">
                                    <i class="fas fa-minus"></i>
                                    <input type="number" value="1" >
                                    <i class="fas fa-plus"></i>
                                </div>
                                <span class="stock"><span class="stock-number">${
                                  data.stock
                                }</span> sản phẩm có sẵn</span>
                            </div>
                        </div>
                    </div>
				</div>
            </div>
            <div class='content'>
                <div class='detail'>
					<div class='title'>CHI TIẾT SẢN PHẨM</div>
					<div class='attributes'>
						<div class='wrapper'>
							<span class='name'>Danh Mục</span>
							<div class='category'>
								<span>Shopee</span>
								${data.categories
                  .map(
                    category =>
                      `<i class="fas fa-angle-right"></i><span>${category.category_display_name}</span>`,
                  )
                  .join("")}
							</div>
						</div>
						${data.attributes
              .map(
                attribute => `
						<div class='wrapper'>
							<span class='name'>${attribute.name}</span>
							<span class='value'>${attribute.value}</span>
						</div>`,
              )
              .join("")}
						<div class='wrapper'>
							<span class='name'>Kho hàng</span>
							<span class='value'>${data.normal_stock}</span>
						</div>
						<div class='wrapper'>
							<span class='name'>Gửi từ</span>
							<span class='value'>${data.shop_location}</span>
						</div>
					</div>
                </div>
				<div class='description'>
					<div class='title'>MÔ TẢ SẢN PHẨM</div>
					<span>${data.description}</span>
				</div>
            </div>
        `;
  }
  prevList(list, prevBtn, nextBtn) {
    let scrollNum = -new WebKitCSSMatrix(getComputedStyle(list).transform).m41,
      scrollWidth = Math.floor(list.scrollWidth / 10) * 10,
      eleWidth = list.offsetWidth;
    scrollNum -= eleWidth / 5;
    if (eleWidth + scrollNum < scrollWidth) nextBtn.classList.add("show");
    if (scrollNum === 0) prevBtn.classList.remove("show");
    list.style.transform = `translateX(${-scrollNum}px)`;
  }
  nextList(list, prevBtn, nextBtn) {
    let scrollNum = -new WebKitCSSMatrix(getComputedStyle(list).transform).m41,
      scrollWidth = Math.floor(list.scrollWidth / 10) * 10,
      eleWidth = list.offsetWidth;
    scrollNum += eleWidth / 5;
    if (eleWidth + scrollNum >= scrollWidth) nextBtn.classList.remove("show");
    if (scrollNum > 0) prevBtn.classList.add("show");
    list.style.transform = `translateX(${-scrollNum}px)`;
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
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  handleFetchErr(err) {
    console.log(err);
    switch (err) {
      case 429:
        setTimeout(() => this.main(), 4000);
        break;
      case 500:
        this.indexApiKey += 1;
        setTimeout(() => this.main(), 500);
        break;
    }
  }
  main() {
    let format = new Intl.NumberFormat("de-DE").format;
    this.searchSuggest();
    let timeout = 2000;
    this.getProduct().then(data => {
      document.querySelector(".container__product").innerHTML =
        this.renderProduct(data);
      data.models.forEach(model => {
        document.querySelectorAll(".models-list .model").forEach(child => {
          if (child.innerText === model.name) {
            child.setAttribute("model-id", model.model_id);
            if (model.stock === 0) child.classList.add("disable");
          }
        });
      });
      let mainImage = document.querySelector(".image-main");
      document.querySelector(".image-slider img").setAttribute("active", "");
      let activeImage = document.querySelector(".image-slider img[active]");
      Array.from(document.querySelector(".image-slider").children).forEach(
        child =>
          child.addEventListener("mouseover", () => {
            document
              .querySelector(".image-slider img[active]")
              .removeAttribute("active");
            if (!child.getAttribute("active")) {
              child.setAttribute("active", "");
              activeImage = child;
              mainImage.src = activeImage.src;
            }
          }),
      );
      document
        .querySelectorAll(".models-list .model")
        .forEach(child =>
          child.addEventListener(
            "mouseover",
            () => (mainImage.src = child.getAttribute("img-src")),
          ),
        );
      let quantityInput = document.querySelector(".add-product input");
      document.querySelectorAll(".models-list .model").forEach(
        child =>
          !child.classList.contains("disable") &&
          child.addEventListener("click", () => {
            if (!child.classList.contains("active")) {
              document
                .querySelector(".model.active")
                ?.classList.remove("active");
              child.classList.add("active");
              let model = data.models.filter(
                model => model.model_id == child.getAttribute("model-id"),
              )[0];
              document.querySelector(".price .price-before-discount") &&
                (document.querySelector(
                  ".price .price-before-discount",
                ).innerText = "₫" + format(model.price_before_discount));
              document.querySelector(".price .price-after-discount").innerText =
                "₫" + format(model.price);
              document.querySelector(".quantity .stock-number").innerText =
                model.stock;
              quantityInput.value = 1;
            } else {
              child.classList.remove("active");
              document.querySelector(".price .price-before-discount") &&
                (document.querySelector(
                  ".price .price-before-discount",
                ).innerText =
                  data.price_max == data.price_min
                    ? "₫" + format(data.price_before_discount)
                    : "₫" +
                      format(data.price_min_before_discount) +
                      " - ₫" +
                      format(data.price_max_before_discount));
              document.querySelector(".price .price-after-discount").innerText =
                data.price_max == data.price_min
                  ? "₫" + format(data.price)
                  : "₫" +
                    format(data.price_min) +
                    " - ₫" +
                    format(data.price_max);
              document.querySelector(".quantity .stock-number").innerText =
                data.stock;
              quantityInput.value = 1;
            }
          }),
      );
      quantityInput.addEventListener("input", () => {
        let stock = Number(
          document.querySelector(".add-product .stock-number").innerText,
        );
        if (quantityInput.value > stock) quantityInput.value = stock;
        else if (quantityInput.value <= 0) quantityInput.value = "";
      });
      quantityInput.addEventListener("change", () => {
        let stock = Number(
          document.querySelector(".add-product .stock-number").innerText,
        );
        if (quantityInput.value > stock) quantityInput.value = stock;
        else if (quantityInput.value == "") quantityInput.value = 1;
        else if (quantityInput.value <= 0) quantityInput.value = 1;
      });
      let quantityBtn = document.querySelectorAll(".add-product .input i");
      quantityBtn.forEach(btn =>
        btn.addEventListener("click", () => {
          if (btn == quantityBtn[0]) quantityInput.value--;
          else if (btn == quantityBtn[1]) quantityInput.value++;
          const e = new Event("change");
          quantityInput.dispatchEvent(e);
        }),
      );
      let list = document.querySelector(".image-slider");
      let prevBtn = document.querySelector(".image-slider__arrow.prev");
      let nextBtn = document.querySelector(".image-slider__arrow.next");
      prevBtn.addEventListener("click", () =>
        this.prevList(list, prevBtn, nextBtn),
      );
      nextBtn.addEventListener("click", () =>
        this.nextList(list, prevBtn, nextBtn),
      );
    });
  }
}

new SearchResult("49280747&2613714946").main();
