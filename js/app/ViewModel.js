(function ($, app) {
	/**
	 * Создает экземпляр ViewModel (представление модели)
	 *
	 * @constructor
	 */
	function ViewModel() {
		var self = this;
		
		// Наблюдаемое свойство (тип цены, блок радио кнопок 'Розница / Опт')
		self.radioCost = ko.observable("retail");
		
		// Наблюдаемое свойство (толщина металла, блок радио кнопок '0.55 / 0.7 / 0.8 / 1.0')
		self.radioMetal = ko.observable("0,55");
		
		// Наблюдаемое свойство (тип профиля, блок радио кнопок 'S20 / S30 / 0')
		self.radioProfile = ko.observable("S20");
		
		// Вычисляемое свойство (актуальная стоимость комплектующих фланца)
		self.costFlange = ko.computed(function() {
			var profileType = self.radioProfile();
			if (profileType === "S20") {
				return {costProfile: 6, costCorner: 1};
			} else if (profileType === "S30") {
				return {costProfile: 8.5, costCorner: 3};
			} else {
				return {costProfile: 0, costCorner: 0};
			}
		});
		
		// Вычисляемое свойство (актуальная стоимость квадратного метра изделий)
		self.costPerSquareMeter = ko.computed(function() {
			var metalType = self.radioMetal(),
				costType = self.radioCost();
			switch (metalType) {
				case '0,55':
					if (costType === 'retail') {
						return {duct: 95, shaped: 113.5};
					} else {
						return {duct: 90.5, shaped: 108};
					}
					break;
				case '0,7':
					if (costType === 'retail') {
						return {duct: 112.5, shaped: 133.5};
					} else {
						return {duct: 107, shaped: 127};
					}
					break;
				case '0,8':
					if (costType === 'retail') {
						return {duct: 124.5, shaped: 147.5};
					} else {
						return {duct: 118.5, shaped: 140.5};
					}
					break;
				case '1,0':
					if (costType === 'retail') {
						return {duct: 149.5, shaped: 177.5};
					} else {
						return {duct: 142.5, shaped: 169};
					}
					break;
			}
		});
		
		// Наблюдаемый массив (блок прямоугольных воздуховодов)
		self.blockRectangularDuct = ko.observableArray([
			new app.iCon.RectangularDuct(self)
		]);

		// Наблюдаемый массив (блок круглых воздуховодов)
		self.blockRoundDuct = ko.observableArray([
			new app.iCon.RoundDuct(self)
		]);
		
		// Наблюдаемый массив (блок прямоугольных отводов)
		self.blockRectangularBend = ko.observableArray([
			new app.iCon.RectangularBend(self)
		]);
		
		// Наблюдаемый массив (блок круглых отводов)
		self.blockRoundBend = ko.observableArray([
			new app.iCon.RoundBend(self)
		]);
		
		// Наблюдаемый массив (блок прямоугольных переходов)
		self.blockRectangularTransition = ko.observableArray([
			new app.iCon.RectangularTransition(self)
		]);
		
		// Наблюдаемый массив (блок круглых переходов)
		self.blockRoundTransition = ko.observableArray([
			new app.iCon.RoundTransition(self)
		]);
		
		// Наблюдаемый массив (блок переходов с прямоугольника на круг)
		self.blockRectangularToRoundTransition = ko.observableArray([
			new app.iCon.RectangularToRoundTransition(self)
		]);	

		// Наблюдаемый массив (блок прямоугольных тройников)
		self.blockRectangularTee = ko.observableArray([
			new app.iCon.RectangularTee(self)
		]);

		// Наблюдаемый массив (блок круглых тройников)
		self.blockRoundTee = ko.observableArray([
			new app.iCon.RoundTee(self)
		]);
		
		// Наблюдаемый массив (блок прямоугольных уток)
		self.blockRectangularOffset = ko.observableArray([
			new app.iCon.RectangularOffset(self)
		]);
		
		/**
		 * Форматирует площади и стоимости, добавляя пробел в качестве разделителя групп разрядов
	     *
		 * @param {string} value Площадь или стоимость изделия.
		 * @return {string} Отформатированное значение.
		 */
		self.formatValue = function(value) {
			if (value) {
				value = +value;
				return value.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			} else {
				return '';
			}
		};
		
			/**
		 * Добавляет строки в блоках продукции
	     *
		 * @param {object} line Объект (строка блока), в котором происходит вызов этого метода.
		 */
		self.addLine = function(line) {
			var arrName = 'block' +  line.productType;
			if (self[arrName]().length === self[arrName].indexOf(line) + 1) {
				var state = true;
				for (var i in line) {
					if (line.hasOwnProperty(i)) {
						if (i === 'productType' || i === 'area' || i === 'cost' || i === 'cnt') {
							continue;
						}
						if (!line[i]()) {
							state = false;
						}
					}
				}
				if (state) {
					self[arrName].push(new app.iCon[line.productType](self));
				}
			}
		};
				
		
		/**
		 * Очищает строки в блоках продукции
		 * Вызывается при удалении строки (метод 'removeLine'), если она является последней в блоке
	     *
		 * @param {object} line Объект (строка блока), в котором происходит вызов этого метода.
		 */
		self.clearLine = function(line) {
			for (var i in line) {
				if (line.hasOwnProperty(i)) {
					if (i === 'productType' || i === 'area' || i === 'cost') {
						continue;
					}
					line[i]('');
				}
			}
		};
		
		/**
		 * Удаляет строки в блоках продукции
	     *
		 * @param {object} line Объект (строка блока), в котором происходит вызов этого метода.
		 */
		self.removeLine = function(line) {
			var arrName = 'block' +  line.productType;
			if (self[arrName]().length === self[arrName].indexOf(line) + 1) {
				self.clearLine(line);
			} else {
				self[arrName].remove(line);
			}
		};
		
		/**
		 * Расчитывает сумму определенного столбца блока
	     *
		 * @param {array} arr Блок продукции.
		 * @param {string} type То, что нужно суммировать.
		 * @return {string} Сумма.
		 */
		// Расчет сумм
		self.calculationSum = function(arr, type) {
			var total = 0;
			$.each(arr, function() {
				var value = parseFloat(typeof(this[type]) === 'function' ? this[type]() : this[type]);
				if (value) {
					total += value;
				} else {
					total += 0;
				}
			});
			if (total == 0) {
				return '';
			} else {
				if (type === 'cnt') {
					return total;
				} else {
					return total.toFixed(4);
				}
			}
		};
		
			// Вычисляемое свойство (массив промежуточных сумм в блоках)
		self.subtotalSum= ko.computed(function() {
			var total = [];
			for (var i in app.iCon) {
				if (app.iCon.hasOwnProperty(i)) {
					var item = 'block' + i;
					total.push({
						cnt: self.calculationSum( self[item](), 'cnt' ),
						area: self.calculationSum( self[item](), 'area' ),
						cost: self.calculationSum( self[item](), 'cost' )
					});
				}
			}
			return total;
		});
		
		// Вычисляемое свойство (итоговая сумма)
		self.totalSum = ko.computed(function() {
			var total = {
				cnt: self.calculationSum( self.subtotalSum(), 'cnt' ),
				area: self.calculationSum( self.subtotalSum(), 'area' ),
				cost: self.calculationSum( self.subtotalSum(), 'cost' ) 
			};
			return total;
		});		
	};

	app.ViewModel = ViewModel;
}(jQuery, app));