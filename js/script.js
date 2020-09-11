/* обьявляется функция filterByType принимает параметры type и массив values из оставшихся элементов, 
который потом фильтруется на равенство типов каждого value с type */
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

/* В функции hideAllResponseBlocks обьявляется переменная responseBlocksArray,
в которой хранится массив со всеми div класса dialog__response-block*/
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));

// Устанавливается стиль display = 'none', каждому div
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

// Функция showResponseBlock принимает параметры blockSelector, msgText, spanSelector.
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
//Вызывается функция hideAllResponseBlocks
		hideAllResponseBlocks();
// Устанавливается стиль display = 'block', переданному blockSelector
		document.querySelector(blockSelector).style.display = 'block';
// Если spanSelector передали изменить текст на текст переданный в msgText;
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
// функция showError принимает параметр msgText, вызывает функцию showResponseBlock в которую передаёт: '.dialog__response-block_error', msgText, '#error'
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
// функция showResults принимает параметр msgText, вызывает функцию showResponseBlock в которую передаёт: '.dialog__response-block_ok', msgText, '#ok'
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
// функция showNoResults вызывает функцию showResponseBlock в которую передаёт: '.dialog__response-block_no-results'
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
// функция tryFilterByType принимает параметры type и values.
	tryFilterByType = (type, values) => {

//отлавливает если будет ошибка
		try {

// Переменная valuesArray выполняет вызов функции filterByType и передаёт параметры type и values, объединяя массив через запятую в строку
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");

/* Переменная alertMsg выполняет проверку если valuesArray не пустой, то в alertMsg записывается
`Данные с типом ${type}: ${valuesArray}`, иначе `Отсутствуют данные типа ${type}` */
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;

// Вызов функции showResults и передача alertMsg
			showResults(alertMsg);
// если ошибка отловлена 
		} catch (e) {
// Вызов функции showError и передача `Ошибка: ${e}`
			showError(`Ошибка: ${e}`);
		}
	};

// обьявляется переменная filterButton. Находим кнопку с id = filter-btn
const filterButton = document.querySelector('#filter-btn');

//Навешиваем слушаетель на filterButton по которому при клике происходит проверка 
filterButton.addEventListener('click', e => {
// Обьявляется переменная typeInput. Находим select с id = type
	const typeInput = document.querySelector('#type');
// Обьявляется переменная dataInput. Находим input с id = data
	const dataInput = document.querySelector('#data');
// Если значение dataInput пустое
	if (dataInput.value === '') {
//Вылезает подсказка 'Поле не должно быть пустым!'
		dataInput.setCustomValidity('Поле не должно быть пустым!');
//Вызов функции showNoResults
		showNoResults();
	} else {
// иначе подсказка пусктая 
		dataInput.setCustomValidity('');
// задаем действия по умолчанию
		e.preventDefault();
//Вызов функции tryFilterByType и передача параметров typeInput и dataInput с очищением пробелом в начале и конце
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

