const navDropdownContainer = document.querySelectorAll('.n-dropdown-toggle');

for (let i = 0; i < navDropdownContainer.length; i++){
    const navButtons = navDropdownContainer[i];

    navButtons.addEventListener('click', () => {
        const navBlock = navButtons.parentElement.getElementsByClassName('dropdown-list-nav')[0];
        navButtons.getElementsByClassName('bx-chevron-down')[0].classList.toggle('visibility');
        navButtons.getElementsByClassName('bx-chevron-up')[0].classList.toggle('visibility');
        navBlock.classList.toggle('visibility')
        navBlock.classList.toggle('w--open')
    });
}

for (let i = 0; i < navDropdownContainer.length; i++){
    const navButton = navDropdownContainer[i];
    navButton.addEventListener('click', () => {
        const tabletSidebar = document.querySelector('.tablet-sidebar');
        tabletSidebar.classList.toggle('udw-sidebar')
    });
}

const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
    burger.getElementsByClassName('icon-menu-burger')[0].classList.toggle('visibility');
    burger.getElementsByClassName('icon-menu-x')[0].classList.toggle('visibility');

    const navBlockMobile = document.querySelector('.nav-links-holder-mobile');

    navBlockMobile.classList.toggle('visibility');
    const searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('search_mobile');
});

const searchIcon = document.querySelector('.search_icon');

searchIcon.addEventListener('click', () => {
    const searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('search_show');
    searchIcon.classList.toggle('search_show');
});