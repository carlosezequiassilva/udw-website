const burgerPlus = document.querySelector('.nav-links-holder-tablet.display-nav .burger');

burgerPlus.addEventListener('click', () => {
    burgerPlus.getElementsByClassName('bx-list-plus')[0].classList.toggle('visibility');
    burgerPlus.getElementsByClassName('icon-menu-x')[0].classList.toggle('visibility');

    const asideListBar = document.querySelector('.udw-sidebar.tablet-sidebar-tags');
    const innerMargin = document.querySelector('.tags-info-header');

    asideListBar.classList.toggle('ennerside');
    innerMargin.classList.toggle('innermargin');
});