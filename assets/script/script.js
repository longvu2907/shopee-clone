//Search component
const searchInput = document.querySelector('.search-box__search-input');
const searchRes = document.querySelector('.search-box__search-result');
const searchPrefills = `
<a class="search-result default" href="#">
    <span>Thanh toán hóa đơn giảm 88K</span>
    <img src="https://cf.shopee.vn/file/14abbb45e405ed8cd18aa797816421ab" alt="">
</a>`;
searchRes.innerHTML = searchPrefills;
var getData;
searchInput.addEventListener('input', () => {
    let input = searchInput.value.trim();
    window.addEventListener('keyup', () => {
        clearTimeout(getData);
        getData = setTimeout(() => getKeywordSuggest(input)
            .then(data => {
                if (!data?.error_msg && data.keywords.length > 0) {
                    let htmls = data.keywords.map(keyword => 
                        `<a class="search-result" href="#">
                            <span>${keyword}</span>
                        </a>`
                    );
                    searchRes.innerHTML += htmls.join('');
                }
            })
        , 500);
    });
    window.addEventListener('keydown', () => {
        clearTimeout(getData);
    });
    if (input === '') {
        searchRes.innerHTML = searchPrefills;
        clearTimeout(getData);
        return;
    }
    else {
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
searchInput.addEventListener('focus', () => {
    searchRes.style.display = 'block';
});
searchInput.addEventListener('blur', () => {
    searchRes.style.display = 'none';
});
async function getKeywordSuggest(input) {
    var url= 'https://shopee.p.rapidapi.com/shopee.vn/keyword-suggestion?input=' + input;
    var options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '0e4475fd55msh9d3f485c76f18e1p1e3898jsn5c204e872e81',
          'x-rapidapi-host': 'shopee.p.rapidapi.com'
        }
    };
    const res = await fetch(url, options).then(response => response.json());
    return res.data;
}

//Slide by arrow function
function prevList(list, prevBtn, nextBtn, infinite = false) {
    let scrollNum = -(new WebKitCSSMatrix(getComputedStyle(list).transform)).m41,
        scrollWidth = list.scrollWidth,
        eleWidth = list.offsetWidth;
    if (!infinite){
        scrollNum -= (scrollNum >= eleWidth)
        ? eleWidth
        : scrollNum;
        if ((eleWidth + scrollNum) < scrollWidth) nextBtn.classList.add('show');
        if (scrollNum === 0) prevBtn.classList.remove('show');
    }
    else {
        scrollNum = (scrollNum < eleWidth)
        ? scrollNum = scrollWidth - eleWidth
        : scrollNum -= eleWidth;
    }
    list.style.transform = `translateX(${(-scrollNum / eleWidth).toFixed(1) * 100}%)`;
}

function nextList(list, prevBtn, nextBtn, infinite = false) {
    let scrollNum = -(new WebKitCSSMatrix(getComputedStyle(list).transform)).m41,
        scrollWidth = list.scrollWidth - scrollNum,
        eleWidth = list.offsetWidth;
    if (!infinite){
        scrollNum += (scrollWidth - eleWidth) >= eleWidth 
        ? eleWidth
        : (scrollWidth - eleWidth);
        if ((eleWidth + scrollNum) - list.scrollWidth === 0) nextBtn.classList.remove('show');
        if (scrollNum > 0) prevBtn.classList.add('show');
    }
    else {
        scrollNum = Math.round(((scrollNum + eleWidth) - list.scrollWidth) / 10) >= 0
        ? 0
        : scrollNum += eleWidth;
    }
    list.style.transform = `translateX(${(-scrollNum / eleWidth).toFixed(1) * 100}%)`;
}

//Slider Flashsale Banner
const bannerSlider = document.querySelector('.slider__items .items');
const bannerSliderPrevArrow = document.querySelector('.slider__items .items__arrow.prev');
const bannerSliderNextArrow = document.querySelector('.slider__items .items__arrow.next');
const bannerRight = document.querySelector('.slider__right');
async function getFlashsaleBanner() {
    const res = await fetch("https://shopee.p.rapidapi.com/shopee.vn/flash-sale/get-current-sessions", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0e4475fd55msh9d3f485c76f18e1p1e3898jsn5c204e872e81",
            "x-rapidapi-host": "shopee.p.rapidapi.com"
        }
        })
        .then(response => response.json())
        .catch(err => {
            console.error(err);
        });
    return res.data;
}
    //Slide by arrow
bannerSliderPrevArrow.addEventListener('click', (e) => {
    if (e.detail > 1) return;
    prevList(bannerSlider, bannerSliderPrevArrow, bannerSliderNextArrow, true)
});
bannerSliderNextArrow.addEventListener('click', (e) => {
    if (e.detail > 1) return;
    nextList(bannerSlider, bannerSliderPrevArrow, bannerSliderNextArrow, true)
});
//Main categories
const categoriesList = document.querySelector('.list-categories__items .items');
const categoriesListPrevArrow = document.querySelector('.list-categories__arrow.prev');
const categoriesListNextArrow = document.querySelector('.list-categories__arrow.next');
async function getCategories() {
    const res = await fetch("https://shopee.p.rapidapi.com/shopee.vn/list-main-categories", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "shopee.p.rapidapi.com",
            "x-rapidapi-key": "0e4475fd55msh9d3f485c76f18e1p1e3898jsn5c204e872e81"
        }
    })
    .then(response => response.json())
    .catch(err => {
        console.error(err);
    });
    return res.data.categories;
} 
    //Slide by arrow
categoriesListPrevArrow.addEventListener('click', (e) => {
    if (e.detail > 1) return;
    prevList(categoriesList, categoriesListPrevArrow, categoriesListNextArrow)
});
categoriesListNextArrow.addEventListener('click', (e) => {
    if (e.detail > 1) return;
    nextList(categoriesList, categoriesListPrevArrow, categoriesListNextArrow)
});


function main() {
    setTimeout(() => {
        getFlashsaleBanner()
            .then(data => {
                bannerSlider.innerHTML = data.map(item => `<img class='item' src='${item.banner}' loading='lazy'></img>`).join('');
                bannerRight.innerHTML += `<img src='${data[data.length - 2].banner}' loading='lazy'></img>`;
                bannerRight.innerHTML += `<img src='${data[data.length - 1].banner}' loading='lazy'></img>`;
            });
    }, 0);
    setTimeout(() => {
        getCategories()
            .then(data => {
                categoriesList.innerHTML += data.map(item => `
                <div class='item'>
                    <div class="item-image" style='background: url(${item.category_image});'></div>
                    <div class="item-name"><span>${item.category_display_name}</span></div>
                </div>`).join('');
            });
    }, 1500);
}
main();

