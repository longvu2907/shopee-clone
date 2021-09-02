import Base from "./Base.js";
export default class extends Base {
    constructor() {
        super();
        this.setTitle("Shopbe | Home Page");
        this.setStyle("");
    }
    container() {
        return `
            <div class="container">
                <div class="container__homepage">
                    <div class="homepage__banner">
                        <div class="preload"></div>
                        <div class="banner-slider">
                            <div class="slider__items">
                                <div class="items__arrow prev">
                                    <i class="fas fa-arrow-left"></i>
                                </div>
                                <div class="items"></div>
                                <div class="items__arrow next show">
                                    <i class="fas fa-arrow-right"></i>
                                </div>
                                <div class="items__dots noselect"></div>
                            </div>
                            <div class="slider__right"></div>
                        </div>
                    </div>
                    <div class="homepage__hotevent">
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/53d059b1f2592c05b8df8ae835950a2b_xhdpi"
                                href="/search?Yên Tâm Mua Hàng"
                                data-link
                            />
                            <span>Yên Tâm Mua Hàng</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/b3535d7e56c58c4ebe9a87672d38cc5e_xhdpi"
                                href="/search?Gì Cũng Rẻ - Từ 1K"
                                data-link
                            />
                            <span>Gì Cũng Rẻ - Từ 1K</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/9da9a3acb5520d601f86a90434f455a5_xhdpi"
                                href="/search?Hoàn Xu 20% - Đơn Từ 0Đ"
                                data-link
                            />
                            <span>Hoàn Xu 20% - Đơn Từ 0Đ</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/9df57ba80ca225e67c08a8a0d8cc7b85_xhdpi"
                                href="/search?Nạp Thẻ, Hóa Đơn & E-voucher"
                                data-link
                            />
                            <span>Nạp Thẻ, Hóa Đơn & E-voucher</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/434b568f0dea24e225114101c65e70a4_xhdpi"
                                href="/search?Shopee Số Gì Đây"
                                data-link
                            />
                            <span>Shopee Số Gì Đây</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/07ee4296b0a33885418670f2e3ffeca0_xhdpi"
                                href="/search?Freeship Xtra"
                                data-link
                            />
                            <span>Freeship Xtra</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/7971053d6c5db79f83079c7a3d7e6408_xhdpi"
                                href="/search?Hàng Hiệu -50%"
                                data-link
                            />
                            <span>Hàng Hiệu -50%</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/29961f92098bc9153b88332110a91c87_xhdpi"
                                href="/search?Hàng Quốc Tế - Deal Đồng Giá"
                                data-link
                            />
                            <span>Hàng Quốc Tế - Deal Đồng Giá</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/0a3e3aa16b083d6b7e2c25a8f2c16731_xhdpi"
                                href="/search?Shopee Premium"
                                data-link
                            />
                            <span>Shopee Premium</span>
                        </div>
                        <div class="event">
                            <img
                                src="https://cf.shopee.vn/file/4e32311e7d872547962d1867d39c9027_xhdpi"
                                href="/search?Tech Zone - Siêu Thị Điện Tử"
                                data-link
                            />
                            <span>Tech Zone - Siêu Thị Điện Tử</span>
                        </div>
                    </div>
                    <div class="homepage__news-banner">
                        <img
                            src="https://cf.shopee.vn/file/61170aedad0fb6e10037573584ab0b03_xxhdpi"
                            alt=""
                        />
                    </div>
                    <div class="homepage__main-categories">
                        <div class="main-categories__title">
                            <span>DANH MỤC</span>
                        </div>
                        <div class="main-categories__list-categories">
                            <div class="list-categories__arrow prev">
                                <i class="fas fa-arrow-left"></i>
                            </div>
                            <div class="list-categories__items">
                                <div class="items">
                                    <div class="preload"></div>
                                </div>
                            </div>
                            <div class="list-categories__arrow next show">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="homepage__flashsale">
                        <div class="flashsale__title">
                            <img
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/fb1088de81e42c4e538967ec12cb5caa.png"
                                alt=""
                            />
                            <div class="more">
                                <span>Xem Tất Cả</span>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                        <div class="flashsale__list">
                            <div class="list__items__arrow prev">
                                <i class="fas fa-arrow-left"></i>
                            </div>
                            <div class="list__items">
                                <div class="items">
                                    <div class="preload"></div>
                                </div>
                            </div>
                            <div class="list__items__arrow next show">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="homepage__news-banner">
                        <img
                            src="https://cf.shopee.vn/file/fba9346db5fdc4f598b156a16b7f2f0b"
                            alt=""
                        />
                        <img
                            src="https://cf.shopee.vn/file/45039ce16789b13b100830a4c58c6955"
                            alt=""
                        />
                        <img
                            src="https://cf.shopee.vn/file/e0ac231567e3ac6c23d047eb3744081f"
                            alt=""
                        />
                    </div>
                    <div class="homepage__trending-keywords">
                        <div class="trending-keywords__title">
                            <span>XU HƯỚNG TÌM KIẾM</span>
                            <div class="more noselect">
                                <i class="fas fa-sync-alt"></i>
                                <span>Xem Thêm</span>
                            </div>
                        </div>
                        <div class="trending-keywords__list">
                            <div class="list__items">
                                <div class="preload"></div>
                            </div>
                        </div>
                    </div>
                    <div class="homepage__products">
                        <div class="products__title">
                            <div class="preload"></div>
                        </div>
                        <div class="products__list">
                            <div class="list__items">
                                <div class="preload"></div>
                            </div>
                            <div class="list__view-more noselect">Xem Thêm</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
