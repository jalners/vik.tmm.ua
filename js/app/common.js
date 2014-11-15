(function (app) {
	/**
	 * Функция, содержащая общие свойства конструкторов строк блоков продукции
	 * Выполняет роль функциональной примеси
	 * Примешивается к прототипам конструкторов строк блоков продукции
	 */
	function funcBox() {
		/**
		 * Форматирует площади и стоимости, добавляя пробел в качестве разделителя групп разрядов
	     *
		 * @param {string} value Площадь или стоимость изделия.
		 * @return {string} Отформатированное значение.
		 */
		this.formatValue = function(value) {
			if (value) {
				value = +value;
				return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			} else {
				return '';
			}
		};
		
		/**
		 * Расчитывает длину профиля
	     *
		 * @param {number} a Сторона 'a' изделия.
		 * @param {number} b Сторона 'b' изделия.
		 * @param {number} cnt Количество изделий.
		 * @param {number} c Сторона 'c' изделия.
		 * @param {number} d Сторона 'd' изделия.
		 * @return {number} Длина профиля.
		 */
		this.calculateProfileLength = function(a, b, cnt, c, d) {
			if (c) {
				return ((((a + b) * 2 / 1000)  +  ((c + d) * 2 / 1000)) * cnt);
			}
			return (((a + b) * 2 / 1000) * 2 * cnt);
		};
		
		/**
		 * Расчитывает количество уголков
	     *
		 * @param {number} cnt Количество изделий.
		 * @return {number} Количество уголков.
		 */
		this.calculateNumberOfCorner = function(cnt) {
			return (cnt * 8);
		};
		
		/**
		 * Приводит строку из поля 'input' к числу
	     *
		 * @param {string} value Входящая строка.
		 * @return {number} Приведенное из строки число.
		 */
		this.getNumber = function(value) {
			return Math.abs( parseFloat(value, 10) );
		};
		
		// Коэффициент учета отхода для воздуховодов
		this.K1 = 1;
		
		// Коэффициент учета отхода для фасонных изделий
		this.K2 = 1.12;
	};

	app.funcBox = funcBox;
}(app));