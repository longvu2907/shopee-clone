const listApiKey = [
    "0e4475fd55msh9d3f485c76f18e1p1e3898jsn5c204e872e81",
    "04ea227f6emsh94b332b0ad73072p1df912jsnfa734bf2814b",
];
var indexApiKey = 0;
//Search component
const searchInput = document.querySelector(".search-box__search-input");
const searchRes = document.querySelector(".search-box__search-result");
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
                getKeywordSuggest(input, listApiKey[indexApiKey]).then(
                    (data) => {
                        if (!data?.error_msg && data.keywords.length > 0) {
                            let htmls = data.keywords.map(
                                (keyword) =>
                                    `<a class="search-result" href="#">
                            <span>${keyword}</span>
                        </a>`
                            );
                            searchRes.innerHTML += htmls.join("");
                        }
                    }
                ),
            500
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
        searchRes.innerHTML = searchShop;
    }
});
searchInput.addEventListener("focus", () => {
    searchRes.style.display = "block";
});
searchInput.addEventListener("blur", () => {
    searchRes.style.display = "none";
});
async function getKeywordSuggest(input, apiKey) {
    var url =
        "https://shopee.p.rapidapi.com/shopee.vn/keyword-suggestion?input=" +
        input;
    var options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "shopee.p.rapidapi.com",
        },
    };
    const res = await fetch(url, options).then((response) => response.json());
    return res.data;
}

//Slide by arrow function
function prevList(list, prevBtn, nextBtn, infinite = false) {
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

function nextList(list, prevBtn, nextBtn, infinite = false) {
    let scrollNum = -new WebKitCSSMatrix(getComputedStyle(list).transform).m41,
        scrollWidth = Math.floor(list.scrollWidth / 10) * 10 - scrollNum,
        eleWidth = list.offsetWidth;
    if (!infinite) {
        scrollNum +=
            scrollWidth - eleWidth >= eleWidth
                ? eleWidth
                : scrollWidth - eleWidth;
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
const bannerSlider = document.querySelector(".slider__items .items");
const bannerSliderPrevArrow = document.querySelector(
    ".slider__items .items__arrow.prev"
);
const bannerSliderNextArrow = document.querySelector(
    ".slider__items .items__arrow.next"
);
const bannerRight = document.querySelector(".slider__right");
const bannerDots = document.querySelector(".slider__items .items__dots");
var dotIndex = 0;
var currentFlashsale;
function getFlashsale(apiKey) {
    return fetch(
        "https://shopee.p.rapidapi.com/shopee.vn/flash-sale/get-current-sessions",
        {
            method: "GET",
            headers: {
                "x-rapidapi-key": apiKey,
                "x-rapidapi-host": "shopee.p.rapidapi.com",
            },
        }
    ).then((response) => {
        if (response.status != 200) return Promise.reject(response.status);
        else return response.json();
    });
}

function renderFlashsaleBanner(data) {
    if (data) {
        document.querySelector(".homepage__banner .preload").remove();
        bannerSlider.innerHTML = data
            .map((item) => `<img class='item' src='${item.banner}'></img>`)
            .join("");
        bannerRight.innerHTML += `<img src='${
            data[data.length - 2].banner
        }'></img>`;
        bannerRight.innerHTML += `<img src='${
            data[data.length - 1].banner
        }'></img>`;
        bannerDots.innerHTML = data
            .map(() => '<div class="dot"></div>')
            .join("");
        const childs = bannerDots.children;
        const changeStateDot = (dot) => dot.classList.toggle("show");
        changeStateDot(childs[0]);
        //Auto slide
        const autoSlide = setInterval(() => {
            changeStateDot(childs[dotIndex]);
            dotIndex = dotIndex == childs.length - 1 ? 0 : ++dotIndex;
            changeStateDot(childs[dotIndex]);
            nextList(
                bannerSlider,
                bannerSliderPrevArrow,
                bannerSliderNextArrow,
                true
            );
        }, 5000);
        //Slide by arrow
        bannerSliderPrevArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            prevList(
                bannerSlider,
                bannerSliderPrevArrow,
                bannerSliderNextArrow,
                true
            );
            changeStateDot(childs[dotIndex]);
            dotIndex = dotIndex == 0 ? childs.length - 1 : --dotIndex;
            changeStateDot(childs[dotIndex]);
        });
        bannerSliderNextArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            nextList(
                bannerSlider,
                bannerSliderPrevArrow,
                bannerSliderNextArrow,
                true
            );
            changeStateDot(childs[dotIndex]);
            dotIndex = dotIndex == childs.length - 1 ? 0 : ++dotIndex;
            changeStateDot(childs[dotIndex]);
        });
    }
}
//Main categories
const categoriesList = document.querySelector(".list-categories__items .items");
const categoriesListPrevArrow = document.querySelector(
    ".list-categories__arrow.prev"
);
const categoriesListNextArrow = document.querySelector(
    ".list-categories__arrow.next"
);
var mainCategories;
function getCategories(apiKey) {
    return fetch(
        "https://shopee.p.rapidapi.com/shopee.vn/list-main-categories",
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }
    ).then((response) => {
        if (response.status != 200) return Promise.reject(response.status);
        else return response.json();
    });
}
function renderMainCategories(data) {
    if (data) {
        categoriesList.innerHTML = data
            .map(
                (item) => `
        <div class='item'>
            <div class="item-image" style='background: url(${item.category_image});'></div>
            <div class="item-name"><span>${item.category_display_name}</span></div>
        </div>`
            )
            .join("");
        //Slide by arrow
        categoriesListPrevArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            prevList(
                categoriesList,
                categoriesListPrevArrow,
                categoriesListNextArrow
            );
        });
        categoriesListNextArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            nextList(
                categoriesList,
                categoriesListPrevArrow,
                categoriesListNextArrow
            );
        });
    }
}
//Trending keywords
const keywordsList = document.querySelector(
    ".trending-keywords__list .list__items"
);
const keywordsListMore = document.querySelector(
    ".trending-keywords__title .more"
);
var trendingKeywords;
var keywordsIndex = 0;
function getTrendingKeywords(apiKey) {
    return fetch("https://shopee.p.rapidapi.com/shopee.vn/trending-keywords", {
        method: "GET",
        headers: {
            "x-rapidapi-host": "shopee.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
        },
    }).then((response) => {
        if (response.status != 200) return Promise.reject(response.status);
        else return response.json();
    });
}
function renderTrendingKeywords(data) {
    if (data) {
        let html = "";
        for (let i = 0; i < 5; i++) {
            html += `
            <div class="item">
                <div class='item-stat'>
                    <span class='name'>${
                        data[i + keywordsIndex * 5].keyword
                    }</span>
                    <span class='count'>${(
                        data[i + keywordsIndex * 5].count / 1000
                    ).toFixed(0)}k+ sản phẩm</span>
                </div>
                <img src='${
                    data[i + keywordsIndex * 5].images[
                        Math.floor(
                            Math.random() *
                                data[i + keywordsIndex * 5].images.length
                        )
                    ]
                }'></img>
            </div>`;
        }
        keywordsList.innerHTML = html;
    }
}
//Flashsale item
const flashsaleList = document.querySelector(
    ".flashsale__list .list__items .items"
);
const flashsaleListPrevArrow = document.querySelector(
    ".list__items__arrow.prev"
);
const flashsaleListNextArrow = document.querySelector(
    ".list__items__arrow.next"
);
var flashsaleItems;
function getFlashsaleItem(apiKey) {
    let promotionId = currentFlashsale[0].promotion_id;
    return fetch(
        "https://shopee.p.rapidapi.com/shopee.vn/flash-sale/list-items?promotion_id=" +
            promotionId,
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }
    ).then((response) => {
        if (response.status != 200) return Promise.reject(response.status);
        else return response.json();
    });
}
function renderFlashsaleItem(data) {
    if (data) {
        flashsaleList.innerHTML = data
            .map(
                (item) => `
            <div class='item'>
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
        flashsaleListPrevArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            prevList(
                flashsaleList,
                flashsaleListPrevArrow,
                flashsaleListNextArrow
            );
        });
        flashsaleListNextArrow.addEventListener("click", (e) => {
            if (e.detail > 1) return;
            nextList(
                flashsaleList,
                flashsaleListPrevArrow,
                flashsaleListNextArrow
            );
        });
    }
}
//Products list
const listProductCategories = document.querySelector(
    ".homepage__products .products__title"
);
const listProducts = document.querySelector(".products__list .list__items");
const viewMoreBtn = document.querySelector(".products__list .list__view-more");
const listCategoriesID = [];
var offset = 0;
function renderProductCategories(mainCategories, apiKey) {
    let listCategories = [];
    while (true) {
        let categoryObj =
            mainCategories[Math.floor(Math.random() * mainCategories.length)];
        let category = {
            name: categoryObj.category_display_name,
            id: categoryObj.category_id,
        };
        if (!listCategories.includes(category.name)) {
            listCategories.push(category.name);
            listCategoriesID.push(category.id);
        }
        if (listCategories.length == 4) break;
    }
    listProductCategories.innerHTML = listCategories
        .map(
            (category) => `
        <div class="category noselect">
            <span>${category}</span>
        </div>`
        )
        .join("");
    let childrens = Array.from(listProductCategories.children);
    childrens.forEach((child) => {
        child.addEventListener("click", () => {
            if (child.classList.contains("active")) return;
            else {
                childrens
                    .filter((orderChild) =>
                        orderChild.classList.contains("active")
                    )[0]
                    .classList.remove("active");
                child.classList.add("active");
                childrens.forEach((child, index) => {
                    if (child.classList.contains("active")) {
                        offset = 0;
                        listProducts.innerHTML = '<div class="preload"></div>';
                        renderProductList(apiKey, listCategoriesID[index]);
                    }
                });
            }
        });
    });
    childrens[0].classList.add("active");
    childrens.forEach((child, index) => {
        if (child.classList.contains("active")) {
            renderProductList(apiKey, listCategoriesID[index]);
            viewMoreBtn.addEventListener("click", () => {
                offset += 36;
                listProducts.innerHTML += '<div class="preload"></div>';
                renderProductList(apiKey, listCategoriesID[index], 36, offset);
            });
        }
    });
}
async function getProductList(apiKey, categoryId, limit = 36, offset = 0) {
    const res = await fetch(
        `https://shopee.p.rapidapi.com/shopee.vn/category/${categoryId}/list-items?limit=${limit}&offset=${offset}`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "shopee.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
            },
        }
    ).then((response) => {
        if (response.status != 200) return Promise.reject(response.status);
        else return response.json();
    });
    return res.data.items;
}
function renderProductList(apiKey, categoryId, limit = 36, offset = 0) {
    getProductList(apiKey, categoryId, limit, offset)
        .then((data) => {
            document
                .querySelector(".products__list .list__items .preload")
                .remove();
            let format = new Intl.NumberFormat("de-DE").format;
            listProducts.innerHTML += data
                .map(
                    (item) => `
            <div class="item-wrapper">
                <div class="item">
                    <div class="item__discount" style="display:${
                        item.discount == null ? "none" : "flex"
                    }"><span class="number">${
                        item.discount
                    }</span><span class="text">GIẢM</span></div>
                    <img class="item__image" style="background: url(./images/preload.gif)" src="${
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
        .catch((err) => handleFetchErr(err));
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function main() {
    let timeout = 2000;
    sleep(500)
        .then(() => {
            return getFlashsale(listApiKey[indexApiKey])
                .then((data) => {
                    currentFlashsale = data.data;
                    renderFlashsaleBanner(currentFlashsale);
                    return sleep(timeout);
                })
                .catch((err) => Promise.reject(err));
        })
        .then(() => {
            return getCategories(listApiKey[indexApiKey])
                .then((data) => {
                    mainCategories = data.data.categories;
                    renderMainCategories(mainCategories);
                    return sleep(timeout);
                })
                .catch((err) => Promise.reject(err));
        })
        .then(() => {
            return getFlashsaleItem(listApiKey[indexApiKey])
                .then((data) => {
                    flashsaleItems = data.data.items;
                    renderFlashsaleItem(flashsaleItems);
                    return sleep(timeout);
                })
                .catch((err) => Promise.reject(err));
        })
        .then(() => {
            return getTrendingKeywords(listApiKey[indexApiKey])
                .then((data) => {
                    trendingKeywords = data.data.keywords;
                    renderTrendingKeywords(trendingKeywords);
                    keywordsListMore.addEventListener("click", () => {
                        console.log(keywordsIndex);
                        keywordsIndex =
                            keywordsIndex ==
                            Math.round(trendingKeywords.length / 5) - 1
                                ? 0
                                : (keywordsIndex += 1);
                        renderTrendingKeywords(trendingKeywords);
                    });
                    return sleep(timeout);
                })
                .catch((err) => Promise.reject(err));
        })
        .then(() => {
            renderProductCategories(mainCategories, listApiKey[indexApiKey]);
        })
        .catch((err) => handleFetchErr(err));
}
function handleFetchErr(err) {
    console.log(err);
    switch (err) {
        case 429:
            setTimeout(() => main(), 4000);
            break;
        case 500:
            indexApiKey += 1;
            setTimeout(() => main(), 500);
            break;
    }
}
main();
