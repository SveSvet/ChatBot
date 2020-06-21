const doc = document;
let oneNumber, twoNumber;
const button = doc.querySelector('button');
const inputText = doc.querySelector('input');

/*вывод погоды*/
const addWeather = () => {
    addBotMessage(`<a target="_blank" href="https://nochi.com/weather/moscow-18171">
                            <img src="https://w.bookcdn.com/weather/picture/26_18171_1_20_34495e_250_2c3e50_ffffff_ffffff_1_2071c9_ffffff_0_6.png?scode=124&domid=589&anc_id=73979" 
                            alt="booked.net"
                            class="add-weather"/>
                        </a>`)
};

/*вывод сбщ бота*/
addBotMessage = (reply) => {
    setTimeout(() => {
        const screen = doc.querySelector('.window');
        screen.insertAdjacentHTML('beforebegin',
            `<div class="message-wrap">
                    <img src="./assets/img/bot.svg" alt="BOT">
                    <div class="bot-block">${reply}</div>
                  </div>`);
    }, 800);
};

/*элемент печатания текста*/
const loader = () => {
    const loadWrap = doc.querySelector('.add-message');
    const loaderElem = document.createElement('div');
    loaderElem.className = 'loading';
    loadWrap.append(loaderElem);

    setTimeout(() => {
        loaderElem.className = 'hidden';
    }, 800);
};

/*вывод сбщ юзера*/
const userMessage = (text) => {
    const screen = doc.querySelector('.window');
    screen.insertAdjacentHTML('beforebegin',
        `<div class="user-wrap">
                <img src="./assets/img/user.svg" alt="USER">
                <div class="user-block"><p class="user-text">${text}</p></div>
             </div>`);
    loader();
};

/*блок получения сбщ юзера из инпута и выводы н экран*/
const getInputText = () => {
    return inputText.value;
};

/*очищение поля ввода*/
clearInput = () => {
    inputText.value = "";
};

/*добавление сбщ в окошко*/
const addTextsAfterClick = () => {
    const text = getInputText();
    const regExp = text.match(/[0-9,\s0-9]/);
    userMessage(text);

    if (text === '/start') {
        addBotMessage('Привет, меня зовут Чат-бот, а как зовут тебя? Введи команду <b>/name</b> перед своим именем');
    } else if (text === '/stop') {
        addBotMessage('Ну, пока! Если хочешь поговорить, пиши <b>/start</b>');
    } else if (text === '?') {
        addBotMessage(` <b>/start</b> начало общения с чат ботом;
                             <b>/name your name</b> команда для введения имени;
                             <b>/calc</b> калькулятор;
                             <b>/weather</b> погода;
                             <b>/stop</b> завершение работы`);
    } else if ((text[0] === '/') && (text[1] === 'n')) {
        const name = text.slice(6);
        addBotMessage(`Привет, ${name}, приятно познакомиться. Я умею считать. Введи числа, которые надо посчитать.`);
    } else if (text === '/calc') {
        addBotMessage('Сейчас все посчитаем! Введи числа в формате \'<b>число 1, число 2</b>\'')
    } else if (regExp) {
            const numbers = (regExp.input);
            oneNumber = +(parseFloat(numbers));
            twoNumber = +numbers.replace(oneNumber + ',', '');
            addBotMessage(`Твои цифры: ${oneNumber},${twoNumber}. Выбери действие: -, +, *, /`);
    } else if (text === '-') {
        addBotMessage(`${oneNumber - twoNumber}`)
    } else if (text === '+') {
        addBotMessage(`${oneNumber + twoNumber}`)
    } else if (text === '*') {
        addBotMessage(`${oneNumber * twoNumber}`)
    } else if (text === '/') {
        addBotMessage(`${oneNumber / twoNumber}`)
    } else if (text === '/weather') {
        addWeather()
    } else {
        addBotMessage('Не знаю такую команду. Введи <b>?</b> для вывода списка команд.')
    }
};

button.addEventListener("click", (event) => {
    event.preventDefault();
    let inputValue = inputText.value;

    if (inputValue.length === 0) {
        button.classList.add('opacity');
    } else {
        button.classList.remove('opacity');
        addTextsAfterClick();
    }
    clearInput();
});









