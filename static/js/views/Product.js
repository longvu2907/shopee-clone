import Base from "./Base.js";
export default class extends Base {
  constructor() {
    super();
    this.setTitle(`Shopee | Product `);
    this.setStyle("./static/style/product.css");
  }
  container() {
    return `
        <div class="container">
            <div class="container__product"></div>
        </div>`;
  }
}
