const weddingDate = new Date('2025-07-19T15:00:00');

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    const weeksEl = document.getElementById('countdown-weeks');
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    const show = (sel) => {
        document.querySelectorAll(sel).forEach(el => el.classList.remove('hide'));
    };
    const hide = (sel) => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('hide'));
    };

    // Если дата свадьбы уже прошла
    if (diff <= 0) {
        if (now.toDateString() === weddingDate.toDateString()) {
            show('.now.weddatecontent');
            hide('.count.weddatecontent');
            hide('.yet.weddatecontent');
        } else {
            const daysPassed = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
            show('.yet.weddatecontent');
            hide('.count.weddatecontent');
            hide('.now.weddatecontent');
            document.querySelectorAll('.yet.weddatecontent strong').forEach(el => el.textContent = daysPassed);
        }
        return;
    }

    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const format = (num) => num < 10 ? `0${num}` : num;

    if (weeksEl && daysEl && hoursEl && minutesEl && secondsEl) {
        weeksEl.innerHTML = `<b>${format(weeks)}</b><br><week>недель</week>`;
        daysEl.innerHTML = `<b>${format(days)}</b><br><day>дней</day>`;
        hoursEl.innerHTML = `<b>${format(hours)}</b><br><hour>часов</hour>`;
        minutesEl.innerHTML = `<b>${format(minutes)}</b><br><minute>минут</minute>`;
        secondsEl.innerHTML = `<b>${format(seconds)}</b><br><second>секунд</second>`;
    }
}

// Первичный вызов и обновление каждую секунду
updateCountdown();
setInterval(updateCountdown, 1000);

// Дополнительно: при изменении размера окна — обновить выбор
window.addEventListener('resize', updateCountdown);
