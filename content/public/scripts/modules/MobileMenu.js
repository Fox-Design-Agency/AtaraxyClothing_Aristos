import $ from "jquery";

class MobileMenu{
    constructor(){
        this.siteHeader = $(".header")
        this.menuIcon = $(".header__menu-icon");
        this.menuContent = $(".header__navbar");
        this.events();
    }

    events(){
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu(){
        this.menuContent.toggleClass("header__navbar--is-visible");
        this.siteHeader.toggleClass("header--is-expanded");
        this.menuIcon.toggleClass("header__menu-icon--close-x");
    }
}

export default MobileMenu;