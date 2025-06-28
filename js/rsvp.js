document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('rsvpForm');
    const formContainer = document.querySelector('.form-container');

    const loader = document.createElement('div');
    loader.className = 'form-loader';
    loader.style.display = 'none';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
        <p>Отправка вашего ответа...</p>
    `;

    const success = document.createElement('div');
    success.className = 'form-success';
    success.style.display = 'none';
    success.innerHTML = `
        <div class="icon">✓</div>
        <h2>Спасибо за ваш ответ!</h2>
        <p>Мы очень рады, что вы сможете разделить с нами этот особенный день!</p>
        <p>19 июля 2025 года ждем вас на нашей свадьбе!</p>
    `;

    const regret = document.createElement('div');
    regret.className = 'form-regret';
    regret.style.display = 'none';
    regret.innerHTML = `
        <div class="icon">❤</div>
        <h2>Спасибо, что сообщили!</h2>
        <p>Очень жаль, что вы не сможете быть с нами в этот день.</p>
        <p>Мы будем скучать и обязательно поделимся с вами фотографиями!</p>
    `;

    formContainer.appendChild(loader);
    formContainer.appendChild(success);
    formContainer.appendChild(regret);

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const attendance = formData.get("entry.2016496568"); // Приду / не смогу

        form.style.display = 'none';
        loader.style.display = 'block';

        scrollToRSVP();

        fetch(form.action, {
            method: 'POST',
            mode: 'no-cors', // Google Forms требует no-cors
            body: formData
        })
            .then(() => {
                loader.style.display = 'none';

                if (attendance === 'С радостью приду') {
                    success.style.display = 'block';
                } else {
                    regret.style.display = 'block';
                }

                scrollToRSVP();
            })
            .catch(() => {
                loader.style.display = 'none';
                alert("Произошла ошибка при отправке. Попробуйте позже.");
                form.style.display = 'block';
                scrollToRSVP();
            });
    });

    function scrollToRSVP() {
        document.getElementById('rsvp').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // ===== Показ опроса при выборе "Приду" =====
    const surveyQuestions = [
        {
            question: "Потребуется ли вам трансфер после торжества?",
            type: "radio",
            name: "entry.559352220",
            options: ["Да", "Нет"]
        },
        {
            question: "Есть ли у вас особые предпочтения по еде",
            type: "checkbox",
            name: "entry.877086558",
            options: ["Нет", "Не ем мясо", "Не ем рыбу", "Вегетарианец"]
        },
        {
            question: "Какой алкоголь вы предпочитаете?",
            type: "checkbox",
            name: "entry.924523986",
            options: ["Красное вино", "Белое вино", "Шампанское", "Виски/коньяк", "Водка", "Не буду пить алкоголь"]
        },
        {
            question: "Есть ли у вас аллергии?",
            type: "radioWithText",
            name: "entry.1751303409",
            options: ["Да", "Нет"]
        }
    ];

    function generateSurvey() {
        const surveyContainer = document.getElementById('surveyQuestions');
        surveyContainer.innerHTML = '';

        surveyQuestions.forEach((item) => {
            const group = document.createElement('div');
            group.className = 'form-group';

            const label = document.createElement('label');
            label.textContent = item.question;
            group.appendChild(label);

            let textArea = null;

            item.options.forEach(option => {
                const wrapper = document.createElement('label');
                wrapper.className = item.type === 'checkbox' ? 'checkbox-label' : 'radio-label';

                const input = document.createElement('input');
                input.type = item.type === 'checkbox' ? 'checkbox' : 'radio';
                input.name = item.name;
                input.value = option;

                const custom = document.createElement('span');
                custom.className = item.type === 'checkbox' ? 'checkbox-custom' : 'radio-custom';

                const spanText = document.createElement('span');
                spanText.className = 'radio-text';
                spanText.textContent = option;

                wrapper.appendChild(input);
                wrapper.appendChild(custom);
                wrapper.appendChild(spanText);
                group.appendChild(wrapper);

                // Для аллергий показать textarea
                if (item.type === 'radioWithText' && option === 'Да') {
                    textArea = document.createElement('textarea');
                    textArea.name = 'entry.1158200393';
                    textArea.placeholder = 'Пожалуйста, укажите, на что у вас аллергия';
                    textArea.rows = 2;
                    textArea.style.display = 'none';
                    textArea.style.marginTop = '10px';
                    textArea.style.width = '100%';
                    group.appendChild(textArea);

                    input.addEventListener('change', () => {
                        textArea.style.display = input.checked ? 'block' : 'none';
                    });
                }

                if (item.type === 'radioWithText' && option === 'Нет') {
                    input.addEventListener('change', () => {
                        if (textArea) textArea.style.display = 'none';
                    });
                }
            });

            document.getElementById('surveyQuestions').appendChild(group);
        });
    }

    // Отображение опроса
    document.querySelectorAll('input[name="entry.2016496568"]').forEach(input => {
        input.addEventListener('change', function () {
            const section = document.getElementById('surveySection');
            if (this.value === 'С радостью приду') {
                section.style.display = 'block';
                generateSurvey();
            } else {
                section.style.display = 'none';
                document.getElementById('surveyQuestions').innerHTML = '';
            }
        });
    });
});
