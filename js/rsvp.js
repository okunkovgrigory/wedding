document.addEventListener('DOMContentLoaded', function() {
    // Вопросы для опроса (можно редактировать)
    const surveyQuestions = [
        {
            question: "Потребуется ли вам трансфер?",
            type: "checkbox",
            name: "entry.1111111111",
            options: ["Нет", "Только до торжества", "Только после торжества", "До и после торжества"]
        },
        {
            question: "Есть ли у вас особые предпочтения по еде",
            type: "checkbox",
            name: "entry.2222222222",
            options: ["Нет", "Не ем мясо", "Не ем рыбу", "Вегетарианец"]
        },
        {
            question: "Какой алкоголь вы предпочитаете?",
            type: "checkbox",
            name: "entry.3333333333",
            options: ["Красное вино", "Белое вино", "Шампанское", "Виски/коньяк", "Водка", "Не буду пить алкоголь"]
        }
    ];

    // Генерация опроса
    function generateSurvey() {
        const surveyContainer = document.getElementById('surveyQuestions');
        surveyContainer.innerHTML = '';

        surveyQuestions.forEach((item, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'form-group';

            const questionLabel = document.createElement('label');
            questionLabel.textContent = item.question;
            questionDiv.appendChild(questionLabel);

            item.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'checkbox-label';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.name = `${item.name}${item.type === 'checkbox' ? '[]' : ''}`;
                input.value = option;
                input.id = `q${index}_${option.replace(/\s+/g, '_')}`;

                const customCheckbox = document.createElement('span');
                customCheckbox.className = 'checkbox-custom';

                const label = document.createElement('label');
                label.htmlFor = input.id;
                label.textContent = option;

                optionDiv.appendChild(input);
                optionDiv.appendChild(customCheckbox);
                optionDiv.appendChild(label);
                questionDiv.appendChild(optionDiv);
            });

            surveyContainer.appendChild(questionDiv);
        });
    }

    // Показать/скрыть опрос
    document.querySelectorAll('input[name="entry.5555555555"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const surveySection = document.getElementById('surveySection');
            surveySection.style.display = this.value === "С радостью приду" ? 'block' : 'none';
            if (this.value === "С радостью приду") generateSurvey();
        });
    });

    // Добавление гостей
    let guestCount = 0;
    document.getElementById('addGuestBtn').addEventListener('click', function() {
        guestCount++;
        const guestsContainer = document.getElementById('additionalGuests');

        const guestDiv = document.createElement('div');
        guestDiv.className = 'guest-form';
        guestDiv.innerHTML = `
            <input type="text" class="guest-name" name="entry.9999999999" placeholder="Имя и Фамилия гостя" required>
            <button type="button" class="remove-guest">×</button>
        `;

        guestsContainer.appendChild(guestDiv);

        // Удаление гостя
        guestDiv.querySelector('.remove-guest').addEventListener('click', function() {
            guestDiv.remove();
        });
    });

    // Отправка формы
    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Ваш ответ сохранён.');
        this.submit();
    });
});