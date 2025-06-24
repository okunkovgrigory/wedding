document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('smart-calendar-btn');

    // URLs
    const googleCalendarURL = "https://www.google.com/calendar/render?action=TEMPLATE&text=Свадьба+Григория+и+Оксаны&dates=20250719T080000Z/20250719T110000Z&details=С+радостью+приглашаем+вас+разделить+этот+особенный+день!&location=Ресторан+Белый+Зал";
    const icsURL = "src/wedding.ics";

    button.addEventListener('click', function (e) {
        e.preventDefault();

        const ua = navigator.userAgent || navigator.vendor || window.opera;

        const isApple = /iPad|iPhone|iPod|Macintosh/.test(ua) && !window.MSStream;

        if (isApple) {
            window.location.href = icsURL;
        } else {
            window.open(googleCalendarURL, '_blank');
        }
    });
});