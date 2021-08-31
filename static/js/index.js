import HomePage from "./views/HomePage.js";
import HomepageScript from "./scripts/HomePage.script.js";
import Login from "./views/Login.js";
import LoginScript from "./scripts/Login.script.js";
import Signup from "./views/Signup.js";
import SignupScript from "./scripts/Signup.script.js";
import Search from "./views/Search.js";
import SearchScript from "./scripts/Search.script.js";

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: HomePage, script: HomepageScript },
        { path: "/login", view: Login, script: LoginScript },
        { path: "/signup", view: Signup, script: SignupScript },
        { path: "/search", view: Search, script: SearchScript },
    ];

    const page = routes.find(route => location.pathname == route.path) || routes[0];
    const view = new page.view();
    document.querySelector(".main").innerHTML = await view.getHtml();
    const script = new page.script(decodeURI(location.search.substr(1)));
    script.main();
    document.addEventListener("DOMContentLoaded", () => {
        document.body.addEventListener("click", e => {
            e.preventDefault();
            if (e.target.matches("[data-link]")) {
                navigateTo(e.target.href ?? location.origin + e.target.getAttribute("href"));
            }
        });
    });
};
window.addEventListener("popstate", router);

router();
