import Base from "./Base.js";
export default class extends Base {
    constructor() {
        super();
        this.setTitle("Shopbe | Login");
        this.setStyle("./static/style/login.css");
    }
    header() {
        return `
            <div class="header">
                <div class="header__wrapper">
                    <div class="logo-wrapper">
                        <a href="./" data-link class="logo"></a>
                        <span class="text">Đăng nhập</span>
                    </div>
                    <a href="" data-link class="help">Cần trợ giúp?</a>
                </div>
            </div>
        `;
    }
    container() {
        return `
            <div class="container">
                <div class="container__login">
                    <div class="login-wrapper">
                        <div class="login-box">
                            <span class="title">Đăng nhập</span>
                            <input
                                type="text"
                                class="username"
                                placeholder="Email/Số điện thoại/Tên đăng nhập"
                            />
                            <div class="password-wrapper">
                                <input type="password" class="password" placeholder="Mật khẩu" />
                                <input type="checkbox" id="eye" />
                                <label for="eye">
                                    <i class="fas fa-eye-slash"></i>
                                    <i class="fas fa-eye"></i>
                                </label>
                            </div>
                            <div class="button">Đăng nhập</div>
                            <div class="forgot-password">
                                <a href="" data-link><span>Quên mật khẩu</span></a>
                                <a href="" data-link><span>Đăng nhập với SMS</span></a>
                            </div>
                            <div class="login-option">
                                <div class="button facebook">
                                    <i class="fab fa-facebook"></i>
                                    <span>Facebook</span>
                                </div>
                                <div class="button google">
                                    <i class="fab fa-google-plus-square"></i>
                                    <span>Google</span>
                                </div>
                                <div class="button apple">
                                    <i class="fab fa-apple"></i>
                                    <span>Apple</span>
                                </div>
                                <div class="or">HOẶC</div>
                            </div>
                            <span class="note"
                                >Bạn mới biết đến Shopbe? <a href="./signup" data-link><span>Đăng ký</span></a></span
                            >
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
