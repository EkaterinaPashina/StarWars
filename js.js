//Обозначаем переменные для быстрого доступа
const search = document.querySelector('[name=searchFor]');
const num = document.querySelector('[name=number]');
const btn = document.getElementById('submit_btn');
const form = document.querySelector('form');

//Проверяем условие введенного числа
num.addEventListener('input', () => {
    if (num.value > 10) {
        document.querySelector('.num__error').innerHTML = `Введите число не больше 10, сейчас <span class="error_red"> ${num.value} </span>`;
    } else {
        document.querySelector('.num__error').textContent = '';
    }
});

//Проверяем наличие выбранной темы поиска
search.addEventListener('change', () => {
    if (search.value === 'choise') {
        document.querySelector('.choice__error').textContent = 'Выберите тему для поиска';
    } else {
        document.querySelector('.choice__error').textContent = '';
    }
});

//Создаем запрос
function createRequest() {
    return `https://swapi.dev/api/${search.value}/${num.value}/`;
}

//Отображаем результат
function showResult(elem) {
    if (elem !== undefined) {
        document.querySelector('.answer').textContent = `Результат : ${elem}`;
    }
    return;
}

//Отправляяем запрос, получаем данные и выводим их на страницу
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (search.value === 'choise' || num.value === '') {
        document.querySelector('.choice__error').textContent = 'Укажите данные для поиска.';
    } else {
        document.querySelector('.choice__error').textContent = '';
    }

    try {
        const answer = await fetch(createRequest());
        const elem = await answer.json();
        const search = elem.name === undefined ? elem.title : elem.name;
        showResult(search);
    } catch (err) {
        showResult('Некорректно введены данные! Попробуйте еще раз.');
        throw err;
    }
});