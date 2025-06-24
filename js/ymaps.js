ymaps.ready(init);

function init() {
    const coords = [55.974237, 37.711958]; // точные координаты ул. Прибрежная 19 :contentReference[oaicite:1]{index=1}

    const myMap = new ymaps.Map('yandex-map', {
        center: coords,
        zoom: 16,
        controls: ['zoomControl', 'fullscreenControl']
    });

    const placemark = new ymaps.Placemark(coords, {
        hintContent: 'Портофино – Подрезово, Прибрежная 19',
        balloonContent: 'Ресторан "Портофино"'
    }, {
        preset: 'islands#redDotIcon',
        iconColor: '#d45c7c'
    });

    myMap.geoObjects.add(placemark);
    myMap.behaviors.disable('scrollZoom');
}