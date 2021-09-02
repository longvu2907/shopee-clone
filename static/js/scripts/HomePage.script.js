import ApiKeys from "../api/apiKeys.js";

export default class {
    constructor(params) {
        this.listApiKey = ApiKeys;
        this.indexApiKey = 0;
        //Slider Flashsale Banner
        this.bannerSlider = document.querySelector(".slider__items .items");
        this.bannerSliderPrevArrow = document.querySelector(".slider__items .items__arrow.prev");
        this.bannerSliderNextArrow = document.querySelector(".slider__items .items__arrow.next");
        this.bannerRight = document.querySelector(".slider__right");
        this.bannerDots = document.querySelector(".slider__items .items__dots");
        this.dotIndex = 0;
        this.currentFlashsale;
        //Main categories
        this.categoriesList = document.querySelector(".list-categories__items .items");
        this.categoriesListPrevArrow = document.querySelector(".list-categories__arrow.prev");
        this.categoriesListNextArrow = document.querySelector(".list-categories__arrow.next");
        this.mainCategories;
        //Trending keywords
        this.keywordsList = document.querySelector(".trending-keywords__list .list__items");
        this.keywordsListMore = document.querySelector(".trending-keywords__title .more");
        this.trendingKeywords;
        this.keywordsIndex = 0;
        //Flashsale item
        this.flashsaleList = document.querySelector(".flashsale__list .list__items .items");
        this.flashsaleListPrevArrow = document.querySelector(".list__items__arrow.prev");
        this.flashsaleListNextArrow = document.querySelector(".list__items__arrow.next");
        this.flashsaleItems;
        //Products list
        this.listProductCategories = document.querySelector(".homepage__products .products__title");
        this.listProducts = document.querySelector(".products__list .list__items");
        this.viewMoreBtn = document.querySelector(".products__list .list__view-more");
        this.listCategoriesID = [];
        this.offset = 0;
        this.searchSuggest();
    }
    //Search component
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
                    this.getKeywordSuggest(input, this.listApiKey[this.indexApiKey]).then(data =>
                        this.renderKeywordsSuggest(data)
                    ),
                750
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
        const res = await axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data.data);
        });
        return res;
    }
    renderKeywordsSuggest(data) {
        const searchRes = document.querySelector(".search-box__search-result");
        if (!data?.error_msg && data?.keywords.length > 0) {
            data.keywords = data.keywords.slice(0, 10);
            let htmls = data.keywords.map(
                keyword =>
                    `<a class="search-result" href="./search?${keyword}" data-link>
                ${keyword}
            </a>`
            );
            searchRes.innerHTML += htmls.join("");
        }
    }

    //Slide by arrow
    prevList(list, prevBtn, nextBtn, infinite = false) {
        let scrollNum = -new WebKitCSSMatrix(getComputedStyle(list).transform).m41,
            scrollWidth = Math.floor(list.scrollWidth / 10) * 10,
            eleWidth = list.offsetWidth;
        if (!infinite) {
            scrollNum -= scrollNum >= eleWidth ? eleWidth : scrollNum;
            if (eleWidth + scrollNum < scrollWidth) nextBtn.classList.add("show");
            if (scrollNum === 0) prevBtn.classList.remove("show");
        } else {
            scrollNum =
                scrollNum < eleWidth
                    ? (scrollNum = scrollWidth - eleWidth)
                    : (scrollNum -= eleWidth);
        }
        list.style.transform = `translateX(${-scrollNum}px)`;
    }
    nextList(list, prevBtn, nextBtn, infinite = false) {
        let scrollNum = -new WebKitCSSMatrix(getComputedStyle(list).transform).m41,
            scrollWidth = Math.floor(list.scrollWidth / 10) * 10 - scrollNum,
            eleWidth = list.offsetWidth;
        if (!infinite) {
            scrollNum += scrollWidth - eleWidth >= eleWidth ? eleWidth : scrollWidth - eleWidth;
            if (eleWidth + scrollNum - Math.floor(list.scrollWidth / 10) * 10 <= 0)
                nextBtn.classList.remove("show");
            if (scrollNum > 0) prevBtn.classList.add("show");
        } else {
            scrollNum =
                Math.round((scrollNum + eleWidth - list.scrollWidth) / 10) >= 0
                    ? 0
                    : (scrollNum += eleWidth);
        }
        list.style.transform = `translateX(${-scrollNum}px)`;
    }

    //Slider Flashsale Banner
    getFlashsale(apiKey) {
        const options = {
            method: "GET",
            url: "https://shopee.p.rapidapi.com/shopee.vn/flash-sale/get-current-sessions",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        };
        return axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data);
        });
    }

    renderFlashsaleBanner(data) {
        if (data) {
            document.querySelector(".homepage__banner .preload").remove();
            this.bannerSlider.innerHTML = data
                .map(item => `<img class='item' src='${item.banner}'></img>`)
                .join("");
            this.bannerRight.innerHTML += `<img src='${data[data.length - 2].banner}'></img>`;
            this.bannerRight.innerHTML += `<img src='${data[data.length - 1].banner}'></img>`;
            this.bannerDots.innerHTML = data.map(() => '<div class="dot"></div>').join("");
            const childs = this.bannerDots.children;
            const changeStateDot = dot => dot.classList.toggle("show");
            changeStateDot(childs[0]);
            //Auto slide
            const autoSlide = setInterval(() => {
                changeStateDot(childs[this.dotIndex]);
                this.dotIndex = this.dotIndex == childs.length - 1 ? 0 : ++this.dotIndex;
                changeStateDot(childs[this.dotIndex]);
                this.nextList(
                    this.bannerSlider,
                    this.bannerSliderPrevArrow,
                    this.bannerSliderNextArrow,
                    true
                );
            }, 5000);
            //Slide by arrow
            this.bannerSliderPrevArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.prevList(
                    this.bannerSlider,
                    this.bannerSliderPrevArrow,
                    this.bannerSliderNextArrow,
                    true
                );
                changeStateDot(childs[this.dotIndex]);
                this.dotIndex = this.dotIndex == 0 ? childs.length - 1 : --this.dotIndex;
                changeStateDot(childs[this.dotIndex]);
            });
            this.bannerSliderNextArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.nextList(
                    this.bannerSlider,
                    this.bannerSliderPrevArrow,
                    this.bannerSliderNextArrow,
                    true
                );
                changeStateDot(childs[this.dotIndex]);
                this.dotIndex = this.dotIndex == childs.length - 1 ? 0 : ++this.dotIndex;
                changeStateDot(childs[this.dotIndex]);
            });
        }
    }

    //Main categories
    getCategories(apiKey) {
        const options = {
            method: "GET",
            url: "https://shopee.p.rapidapi.com/shopee.vn/list-main-categories",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        };
        return axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data);
        });
    }
    renderMainCategories(data) {
        if (data) {
            this.categoriesList.innerHTML = data
                .map(
                    item => `
            <a class='item' href="${"./search?" + item.category_display_name}" data-link>
                <div class="item-image" style='background: url(${item.category_image});'href="${
                        "/search?" + item.category_display_name
                    }" data-link></div>
                <div class="item-name"href="${
                    "/search?" + item.category_display_name
                }" data-link><span>${item.category_display_name}</span></div>
            </a>`
                )
                .join("");
            //Slide by arrow
            this.categoriesListPrevArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.prevList(
                    this.categoriesList,
                    this.categoriesListPrevArrow,
                    this.categoriesListNextArrow
                );
            });
            this.categoriesListNextArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.nextList(
                    this.categoriesList,
                    this.categoriesListPrevArrow,
                    this.categoriesListNextArrow
                );
            });
        }
    }

    //Trending keywords
    getTrendingKeywords(apiKey) {
        const options = {
            method: "GET",
            url: "https://shopee.p.rapidapi.com/shopee.vn/trending-keywords",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        };
        return axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data);
        });
    }
    renderTrendingKeywords(data) {
        if (data) {
            let html = "";
            for (let i = 0; i < 5; i++) {
                html += `
                <a class="item" href="/search?${
                    data[i + this.keywordsIndex * 5].keyword
                }" data-link>
                    <div class='item-stat' href="/search?${
                        data[i + this.keywordsIndex * 5].keyword
                    }" data-link>
                        <span class='name' href="/search?${
                            data[i + this.keywordsIndex * 5].keyword
                        }" data-link>${data[i + this.keywordsIndex * 5].keyword}</span>
                        <span class='count' href="/search?${
                            data[i + this.keywordsIndex * 5].keyword
                        }" data-link>${(data[i + this.keywordsIndex * 5].count / 1000).toFixed(
                    0
                )}k+ sản phẩm</span>
                    </div>
                    <img src='${
                        data[i + this.keywordsIndex * 5].images[
                            Math.floor(
                                Math.random() * data[i + this.keywordsIndex * 5].images.length
                            )
                        ]
                    }' href="/search?${data[i + this.keywordsIndex * 5].keyword}" data-link></img>
                </a>`;
            }
            this.keywordsList.innerHTML = html;
        }
    }
    //Flashsale item
    getFlashsaleItem(apiKey) {
        let promotionId = this.currentFlashsale[0].promotion_id;
        const options = {
            method: "GET",
            url: "https://shopee.p.rapidapi.com/shopee.vn/flash-sale/list-items",
            params: { promotion_id: promotionId },
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        };
        return axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data);
        });
    }
    renderFlashsaleItem(data) {
        if (data) {
            this.flashsaleList.innerHTML = data
                .map(
                    item => `
                    <div class='item' href="/product?${item.shop_id}&${item.item_id}" data-link>
                        <div class="item-discount"><span class="number">${
                            item.discount
                        }</span><span class="text">GIẢM</span></div>
                        <img class='item-image' src='${
                            item.promo_overlay_image
                        }' style='background-image: url(${item.image})'></img>
                        <div class="item-price"><span class="currency">đ</span><span class="price">${new Intl.NumberFormat(
                            "de-DE"
                        ).format(item.price)}</span></div>
                        <div class="item-stock"><span>ĐÃ BÁN ${
                            item.flash_sale_stock - item.stock
                        }</span><div class="progress" style="width: ${
                        (item.stock / item.flash_sale_stock) * 100
                    }%"></div></div>
                    </div>`
                )
                .join("");
            this.flashsaleListPrevArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.prevList(
                    this.flashsaleList,
                    this.flashsaleListPrevArrow,
                    this.flashsaleListNextArrow
                );
            });
            this.flashsaleListNextArrow.addEventListener("click", e => {
                if (e.detail > 1) return;
                this.nextList(
                    this.flashsaleList,
                    this.flashsaleListPrevArrow,
                    this.flashsaleListNextArrow
                );
            });
        }
    }
    //Products list
    renderProductCategories(mainCategories, apiKey) {
        let listCategories = [];
        while (true) {
            let categoryObj =
                this.mainCategories[Math.floor(Math.random() * this.mainCategories.length)];
            let category = {
                name: categoryObj.category_display_name,
                id: categoryObj.category_id,
            };
            if (!listCategories.includes(category.name)) {
                listCategories.push(category.name);
                this.listCategoriesID.push(category.id);
            }
            if (listCategories.length == 4) break;
        }
        this.listProductCategories.innerHTML = listCategories
            .map(
                category => `
            <div class="category noselect">
                <span>${category}</span>
            </div>`
            )
            .join("");
        let childrens = Array.from(this.listProductCategories.children);
        childrens.forEach(child => {
            child.addEventListener("click", () => {
                if (child.classList.contains("active")) return;
                else {
                    childrens
                        .filter(orderChild => orderChild.classList.contains("active"))[0]
                        .classList.remove("active");
                    child.classList.add("active");
                    childrens.forEach((child, index) => {
                        if (child.classList.contains("active")) {
                            this.offset = 0;
                            this.listProducts.innerHTML = '<div class="preload"></div>';
                            this.renderProductList(apiKey, this.listCategoriesID[index]);
                        }
                    });
                }
            });
        });
        childrens[0].classList.add("active");
        childrens.forEach((child, index) => {
            if (child.classList.contains("active")) {
                this.renderProductList(apiKey, this.listCategoriesID[index]);
                this.viewMoreBtn.addEventListener("click", () => {
                    this.offset += 36;
                    this.listProducts.innerHTML += '<div class="preload"></div>';
                    this.renderProductList(apiKey, this.listCategoriesID[index], 36, this.offset);
                });
            }
        });
    }
    getProductList(apiKey, categoryId, limit = 36, offset = 0) {
        const options = {
            method: "GET",
            url: `https://shopee.p.rapidapi.com/shopee.vn/category/${categoryId}/list-items`,
            params: { limit, offset },
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        };
        return axios.request(options).then(response => {
            if (response.status != 200) return Promise.reject(response.status);
            else return Promise.resolve(response.data.data.items);
        });
    }
    renderProductList(apiKey, categoryId, limit = 36, offset = 0) {
        this.getProductList(apiKey, categoryId, limit, offset)
            .then(data => {
                document.querySelector(".products__list .list__items .preload").remove();
                let format = new Intl.NumberFormat("de-DE").format;
                this.listProducts.innerHTML += data
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
                                <div class="item__stat">
                                    <span class="price"><span class="currency">đ</span>${format(
                                        item.price
                                    )}</span>
                                    <span class="sold">Đã bán ${
                                        item.sold < 1000
                                            ? item.sold
                                            : format((item.sold / 1000).toFixed(1)) + "k"
                                    }</span>
                                </div>
                                <div class="item__relative" style="display: none">Tìm sản phẩm tương tự</div>
                            </div>
                        </div>`
                    )
                    .join("");
            })
            .catch(err => this.handleFetchErr(err));
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    handleFetchErr(err) {
        console.log(err);
        var rerun;
        err = err.message;
        if (err.includes("429")) {
            clearTimeout(rerun);
            this.changeApiKey();
            rerun = setTimeout(() => this.main(), 3000);
        } else if (err.includes("500")) {
            this.changeApiKey();
            clearTimeout(rerun);
            rerun = setTimeout(() => this.main(), 500);
        }
    }
    changeApiKey() {
        this.indexApiKey < this.listApiKey.length - 1 ? this.indexApiKey++ : (this.indexApiKey = 0);
    }
    main() {
        console.log("homepage");
        let timeout = 0;
        this.sleep(timeout)
            .then(() => {
                return this.getFlashsale(this.listApiKey[this.indexApiKey])
                    .then(data => {
                        this.currentFlashsale = data.data;
                        this.renderFlashsaleBanner(this.currentFlashsale);
                        this.changeApiKey();
                        return this.sleep(timeout);
                    })
                    .catch(err => Promise.reject(err));
            })
            .then(() => {
                return this.getCategories(this.listApiKey[this.indexApiKey])
                    .then(data => {
                        this.mainCategories = data.data.categories;
                        this.renderMainCategories(this.mainCategories);
                        this.changeApiKey();
                        return this.sleep(timeout);
                    })
                    .catch(err => Promise.reject(err));
            })
            .then(() => {
                return this.getFlashsaleItem(this.listApiKey[this.indexApiKey])
                    .then(data => {
                        this.flashsaleItems = data.data.items;
                        this.renderFlashsaleItem(this.flashsaleItems);
                        this.changeApiKey();
                        return this.sleep(timeout);
                    })
                    .catch(err => Promise.reject(err));
            })
            .then(() => {
                return this.getTrendingKeywords(this.listApiKey[this.indexApiKey])
                    .then(data => {
                        this.trendingKeywords = data.data.keywords;
                        this.renderTrendingKeywords(this.trendingKeywords);
                        this.keywordsListMore.addEventListener("click", () => {
                            this.keywordsIndex =
                                this.keywordsIndex ==
                                Math.round(this.trendingKeywords.length / 5) - 1
                                    ? 0
                                    : (this.keywordsIndex += 1);
                            this.renderTrendingKeywords(this.trendingKeywords);
                        });
                        this.changeApiKey();
                        return this.sleep(timeout);
                    })
                    .catch(err => Promise.reject(err));
            })
            .then(() => {
                this.renderProductCategories(
                    this.mainCategories,
                    this.listApiKey[this.indexApiKey]
                );
                this.changeApiKey();
            })
            .catch(err => this.handleFetchErr(err.toJSON()));
    }
}
