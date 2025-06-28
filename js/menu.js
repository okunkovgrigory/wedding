document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.header__toggle');
    const nav = document.querySelector('.header__nav');
    const body = document.body;

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = nav.classList.toggle('open');
        toggle.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        body.classList.toggle('menu-open', isOpen);
    });

    // Закрытие меню при клике на ссылки
    document.querySelectorAll('.header__menu li a, .header__calendar-btn').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', false);
            body.classList.remove('menu-open');
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
