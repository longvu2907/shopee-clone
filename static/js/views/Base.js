export default class {
  constructor() {}
  setTitle(title) {
    document.title = title;
  }
  setStyle(url) {
    document.querySelector("link.customize").href = url;
  }
  header() {
    return `
            <div class="header">
                <div class="header__wrapper">
                    <nav class="header__navbar header__navbar--guest">
                        <ul class="header__navbar-list">
                            <li class="header__navbar-item">
                                <a href="./login" class="header__navbar-item-link" data-link
                                    >Kênh Người Bán</a
                                >
                            </li>
                            <li class="header__navbar-item">
                                <a href="./login" class="header__navbar-item-link" data-link
                                    >Trở thành Người bán Shopee</a
                                >
                            </li>
                            <li class="header__navbar-item">
                                <a
                                    href="./login"
                                    class="
                                        header__navbar-item-link
                                        header__navbar-item-link-download
                                    "
                                    data-link
                                >
                                    Tải ứng dụng

                                    <div
                                        class="
                                            navbar-item-link__download-wrapper
                                        "
                                    >
                                        <div class="navbar-item-link__download">
                                            <img
                                                src="./static/images/qr-download.png"
                                                alt=""
                                            />
                                            <div
                                                class="
                                                    navbar-item-link__download-app
                                                "
                                            >
                                                <img
                                                    src="./static/images/appstore-download.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="./static/images/googleplay-download.png"
                                                    alt=""
                                                />
                                                <img
                                                    src="./static/images/appgallery-download.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="header__navbar-item">
                                <span>
                                    Kết nối
                                    <a
                                        href="./login"
                                        class="header__navbar-item-link"
                                        title="Kết nối đến facebook"
                                        data-link
                                        ><i class="fab fa-facebook"></i
                                    ></a>
                                    <a
                                        href="./login"
                                        class="header__navbar-item-link"
                                        title="Kết nối đến instagram"
                                        data-link
                                        ><i class="fab fa-instagram"></i
                                    ></a>
                                </span>
                            </li>
                        </ul>
                        <ul class="header__navbar-list">
                            <li class="header__navbar-item">
                                <a href="#" class="header__navbar-item-link notification">
                                    <span><i class="far fa-bell"></i>Thông Báo</span>
                                    <div class="popup-card notify-card">
                                        <img src="./static/images/notify-icon.png"/>
                                        <span>Đăng nhập để xem Thông báo</span>
                                        <div class="notify-card__login">
                                            <span href='/signup' class="register" data-link>Đăng ký</span>
                                           <span href='/login' class="login" data-link>Đăng nhập</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li class="header__navbar-item border-none">
                                <a href="./login" class="header__navbar-item-link" data-link>
                                    <span
                                        ><i class="far fa-question-circle"></i
                                        >Hỗ Trợ</span
                                    >
                                </a>
                            </li>
                            <li class="header__navbar-item border-none">
                                <a href="./signup" class="header__navbar-item-link" data-link
                                    >Đăng Ký</a
                                >
                            </li>
                            <li class="header__navbar-item">
                                <a href="./login" class="header__navbar-item-link" data-link
                                    >Đăng Nhập</a
                                >
                            </li>
                        </ul>
                    </nav>
                    <div class="header__navbar header__navbar-search">
                        <div class="header__navbar-search-logo">
                            <img src="./static/images/shopee-logo.svg" href="/" data-link />
                        </div>
                        <div class="header__navbar-search-box">
                            <div class="search-box__search">
                                <input
                                    type="text"
                                    class="search-box__search-input"
                                    placeholder="Thanh toán hóa đơn giảm 88K"
                                />
                                <a class="search-box__search-button" data-link>
                                    <i class="fas fa-search"></i>
                                </a>
                                <div class="search-box__search-result"></div>
                            </div>
                            <div class="search-box__recent-search">
                                <ul class="recent-search__list-items">
                                    <li class="recent-search__item">
                                        <a href="./search?Váy" data-link>Váy</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Bông Tẩy Trang" data-link>Bông Tẩy Trang</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Balo" data-link>Balo</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Dép Nữ" data-link>Dép Nữ</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Quần" data-link>Quần</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Dép" data-link>Dép</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Son" data-link>Son</a>
                                    </li>
                                    <li class="recent-search__item">
                                        <a href="./search?Áo Phông" data-link>Áo Phông</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="header__navbar-search-cart">
                            <div class="shopping-cart">
                                <i class="fas fa-shopping-cart"></i>
                                <div class="popup-card cart-card">
                                    <img src="./static/images/cart-icon.png" alt="" />
                                    <span>Chưa Có Sản Phẩm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
  }
  container() {
    return "";
  }
  footer() {
    return `
            <div class="footer">
                <div class="footer__about">
                    <h3>SHOPEE - GÌ CŨNG CÓ, MUA HẾT Ở SHOPEE</h3>
                    <p>Shopee - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí! Shopee là nền tảng giao dịch trực tuyến hàng đầu ở Đông Nam Á, Việt Nam,Singapore,Malaysia,Indonesia,Thái Lan, Philipin, Đài Loan và Brazil. Với sự đảm bảo của Shopee, bạn sẽ mua hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!</p>
                </div>
            </div>
        `;
  }
  async getHtml() {
    return this.header() + this.container() + this.footer();
  }
}
