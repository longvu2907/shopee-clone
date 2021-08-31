import Base from "./Base.js";
export default class extends Base {
    constructor() {
        super();
        this.setTitle(`Shopbe | Search `);
        this.setStyle("./static/style/search-result.css");
    }
    container() {
        return `
        <div class="container">
                <div class="container__search">
                    <div class="search-filter">
                        <div class="filter-title">
                            <i class="fas fa-filter"></i>
                            BỘ LỌC TÌM KIẾM
                        </div>
                        <div class="filter-list">
                            <div class="filter-group" group="category">
                                <div class="list-name">
                                    Theo Danh Mục
                                    <div class="list-more">
                                        Thêm<i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="list-items"></div>
                            </div>
                            <div class="filter-group" group="location">
                                <div class="list-name">
                                    Nơi Bán
                                    <div class="list-more">
                                        Thêm<i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="list-items"></div>
                            </div>
                            <div class="filter-group" group="shipping">
                                <div class="list-name">Vận Chuyển</div>
                                <div class="list-items"></div>
                            </div>
                            <div class="filter-group" group="brand">
                                <div class="list-name">
                                    Thương Hiệu
                                    <div class="list-more">
                                        Thêm<i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                                <div class="list-items"></div>
                            </div>
                        </div>
                    </div>
                    <div class="search-results">
                        <div class="results-title">
                            <i class="fas fa-lightbulb"></i>
                            <span class="text"></span>
                        </div>
                        <div class="results-bar">
                            <div class="bar-sort">
                                <span>Sắp xếp theo</span>
                                <div class="sort sort-relevancy active" data-sort="relevancy">
                                    Liên Quan
                                </div>
                                <div class="sort sort-newest" data-sort="newest">Mới Nhất</div>
                                <div class="sort sort-most-sales" data-sort="most_sales">
                                    Bán Chạy
                                </div>
                                <div class="sort sort-price">
                                    <span>Giá</span>
                                    <i class="fas fa-caret-down"></i>
                                    <div class="wrapper">
                                        <div
                                            class="sort price lowest-price"
                                            data-sort="lowest_price"
                                        >
                                            Giá: Thấp đến Cao
                                        </div>
                                        <div
                                            class="sort price highest-price"
                                            data-sort="highest_price"
                                        >
                                            Giá: Cao đến Thấp
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="bar-nav">
                                <span class="pages"></span>
                                <div class="nav nav-prev inactive">
                                    <i class="fas fa-caret-left"></i>
                                </div>
                                <div class="nav nav-next">
                                    <i class="fas fa-caret-right"></i>
                                </div>
                            </div>
                        </div>
                        <div class="results-list"></div>
                    </div>
                </div>
            </div>
        `;
    }
}
