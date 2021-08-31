export default class {
    constructor(params) {
        this.hiddenCheckbox = document.querySelector("input[type=checkbox]");
        this.passwordInput = document.querySelector("input.password");
    }
    showPassword() {
        this.passwordInput.type = "text";
    }
    hidePassword() {
        this.passwordInput.type = "password";
    }
    main() {
        console.log("login");
        this.hiddenCheckbox.addEventListener("change", () => {
            if (this.passwordInput.type == "text") {
                this.hidePassword();
            } else this.showPassword();
        });
    }
}
