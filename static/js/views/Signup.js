import Base from "./Base.js";
export default class extends Base {
  constructor() {
    super();
    this.setTitle("Shopee | Signup");
    this.setStyle("./static/style/signup.css");
  }
  header() {
    return `
            <div class="header">
                <div class="header__wrapper">
                    <div class="logo-wrapper">
                        <a href="./" data-link class="logo"></a>
                        <span class="text">Đăng ký</span>
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
                        <span class="title">Đăng ký</span>
                        <input type="text" class="phone-number" placeholder="Số điện thoại" />
                        <div class="button">Đăng ký</div>
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
                        <div class="lience">
                            <span
                                >Bằng việc đăng kí, bạn đã đồng ý với Shopee về
                                <a href="" data-link>Điều khoản dịch vụ</a> &
                                <a href="" data-link>Chính sách bảo mật</a></span
                            >
                        </div>
                        <span class="note"
                            >Bạn đã có tài khoản? <a href="/login" data-link><span>Đăng nhập</span></a></span
                        >
                    </div>
                </div>
            </div>
        </div>
        `;
  }
}
