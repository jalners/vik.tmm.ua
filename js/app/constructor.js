(function (app, ko) {
	// Объект, содержащий конструкторы строк блоков продукции
	var iCon = {
		/**
		 * Создает экземпляр RectangularDuct (прямоугольный воздуховод)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularDuct: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularDuct';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (!a || !b || !l || !cnt) {
					return '';
				} else {
					result = (((a + b) * 2 * l * cnt) / 1000000) * self.K1;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().duct) + 
						(self.calculateProfileLength(a, b, cnt) * vm.costFlange().costProfile) + 
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner);
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RoundDuct (круглый воздуховод)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RoundDuct: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RoundDuct';
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø')
			self.d = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var d = self.getNumber( self.d() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (!d || !l || !cnt) {
					return '';
				} else {
					result = ((Math.PI * d * l * cnt) / 1000000) * self.K1;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					result;
				if (area) {
					result = area * vm.costPerSquareMeter().duct;
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RectangularBend (прямоугольный отвод)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularBend: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularBend';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр1')
			self.p1 = ko.observable('100');
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр2')
			self.p2 = ko.observable('100');
			
			// Наблюдаемое свойство (угол поворота изделия, поле - 'Угол')
			self.angle = ko.observable('90');
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					p1 = self.getNumber( self.p1() ),
					p2 = self.getNumber( self.p2() ),
					angle = self.getNumber( self.angle() ),
					cnt = self.getNumber( self.cnt() ),
					seam, // площадь закроя
					cheek, // площадь щеки
					sheath, // площадь обшивки
					branchPipe1, // площадь патрубка1
					branchPipe2, // площадь патрубка2
					result;
				if (!a || !b || !p1 || !p2 || !angle || !cnt) {
					return '';
				} else {
					seam = ((4 * (30 + 8) * (p1 + p2)) + ((30 + 8) * Math.PI * a * (angle / 90))) / 1000000;
					cheek = (((2 * Math.PI) / 4) * a * a * (angle / 90)) / 1000000;
					sheath = ((Math.PI / 2) * b * a * (angle / 90)) / 1000000;
					branchPipe1 = ((a + b) * 2 * p1) / 1000000;
					branchPipe2 = ((a + b) * 2 * p2) / 1000000;
					result = (seam + cheek + sheath + branchPipe1 + branchPipe2) * cnt * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().shaped) + 
						(self.calculateProfileLength(a, b, cnt) * vm.costFlange().costProfile) + 
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner);
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RoundBend (круглый отвод)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RoundBend: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RoundBend';
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø')
			self.d = ko.observable();
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр')
			self.p = ko.observable('100');
			
			// Наблюдаемое свойство (количество сегментов изделия, поле - 'Сег-ты')
			self.s = ko.observable('3');
			
			// Наблюдаемое свойство (угол поворота изделия, поле - 'Угол')
			self.angle = ko.observable('90');
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var d = self.getNumber( self.d() ),
					p = self.getNumber( self.p() ),
					s = self.getNumber( self.s() ),
					angle = self.getNumber( self.angle() ),
					cnt = self.getNumber( self.cnt() ),
					koef, // коэффициент, зависящий от количества сегментов 's'
					result;
				if (!d || !p || !s || !angle || !cnt) {
					return '';
				} else {
					switch (s) {
						case 3:
							koef = 1.063;
							break;
						case 4:
							koef = 1.033;
							break;
						case 5:
							koef = 1.025;
							break;
						case 6:
							koef = 1;
							break;
						default:
							koef = 1.1;
							break;
					}
					result = (((Math.pow(Math.PI, 2) * 2 * d * (d / (4 * (90 / angle))) * koef) +
						(2 * p * Math.PI * d)) * cnt / 1000000) * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = area * vm.costPerSquareMeter().shaped;
					if ((result / cnt) < 11.5) {
						return cnt * 11.5;
					} else {
						return result.toFixed(4);
					}
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RectangularTransition (прямоугольный переход)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularTransition: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularTransition';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'C')
			self.c = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'D')
			self.d = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					c = self.getNumber( self.c() ),
					d = self.getNumber( self.d() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					seam, // площадь закроя
					sideSurface1, // площадь боковой поверхности1
					sideSurface2, // площадь боковой поверхности1
					branchPipe1, // площадь патрубка1
					branchPipe2, // площадь патрубка2
					result;
				if (!a || !b || !c|| !d || !l || !cnt) {
					return '';
				} else {
					seam = ((30 + 8) * 4 * Math.sqrt((Math.pow((a - c), 2) / 4) + (Math.pow((b - d), 2) / 4) + (l * l))) / 1000000;
					sideSurface1 = ((2 * (a + c)) / 2 * Math.sqrt(Math.pow((l - 50), 2) + (Math.pow((b - d), 2)) / 4)) / 1000000;
					sideSurface2 = ((2 * (b + d)) / 2 * Math.sqrt(Math.pow((l - 50), 2) + (Math.pow((a - c), 2)) / 4)) / 1000000;
					branchPipe1 = ((a + b) * 2 * 25) / 1000000;
					branchPipe2 = ((c + d) * 2 * 25) / 1000000;
					result = (seam + sideSurface1 + sideSurface2 + branchPipe1 + branchPipe2) * cnt * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					c = self.getNumber( self.c() ),
					d = self.getNumber( self.d() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().shaped) + 
						(self.calculateProfileLength(a, b, cnt, c, d) * vm.costFlange().costProfile) + 
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner);
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RoundTransition (круглый переход)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RoundTransition: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RoundTransition';
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø1')
			self.d1 = ko.observable();
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø2')
			self.d2 = ko.observable();
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр1')
			self.p1 = ko.observable('50');
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр2')
			self.p2 = ko.observable('50');
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var d1 = self.getNumber( self.d1() ),
					d2 = self.getNumber( self.d2() ),
					p1 = self.getNumber( self.p1() ),
					p2 = self.getNumber( self.p2() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (!d1 || !d2 || !p1 || !p2 || !l || !cnt) {
					return '';
				} else {
					result = (((d1 + d2) * Math.PI / 2 + 12 + 12) * Math.sqrt(Math.pow((l - (p1 + p2)), 2) + Math.pow(((d2 - d1) / 2), 2)) +
						((d1 + 12 + 12) * Math.PI * p1) +
						((d2 + 12 + 12) * Math.PI * p2)) / 1000000 * cnt * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					cnt = self.getNumber( self.cnt() ),
					costType = vm.radioCost(),
					result;
				if (area) {
					result = area * vm.costPerSquareMeter().shaped;
					if ((result / cnt) < 11.5) {
						if (costType === 'retail') {
							return cnt * 11.5 * 1.11 * 1.05;
						} else {
							return cnt * 11.5 * 1.11;
						}
					} else {
						return result.toFixed(4);
					}
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RectangularToRoundTransition (переход с прямоугольникана круг)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularToRoundTransition: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularToRoundTransition';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø')
			self.d = ko.observable();
			
			// Наблюдаемое свойство (патрубок изделия, поле - 'Патр')
			self.p = ko.observable('50');
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					d = self.getNumber( self.d() ),
					p = self.getNumber( self.p() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					koef1, // коэффициент, зависящий от диаметра d
					koef2, // коэффициент, зависящий от диаметра d
					maximum, // максимальное значение двух величин 
					seam, // площадь закроя
					sideSurface1, // площадь боковой поверхности1
					sideSurface2, // площадь боковой поверхности1
					branchPipe1, // площадь патрубка1
					branchPipe2, // площадь патрубка2
					result;
				if (!a || !b || !d || !p || !l || !cnt) {
					return '';
				} else {
					if (d >= 0 && d < 400) {
						koef1 = 20;
						koef2 = 24;
					} else if (d >= 400 && d < 1100) {
						koef1 = 40;
						koef2 = 68;
					} else {
						koef1 = 40;
						koef2 = 136;
					}
					maximum = Math.max(Math.sqrt((Math.pow((b - d), 2) / 4) + Math.pow((l - p - 25) ,2)),
						Math.sqrt((Math.pow((a - d), 2) / 4) + Math.pow((l - p - 25) ,2)));
					seam = (koef2 * maximum) / 1000000;
					sideSurface1 = (((Math.PI * d / 4) + a) * Math.sqrt((Math.pow((b - d), 2) / 4) + Math.pow((l - p - 25) ,2))) / 1000000;
					sideSurface2 = (((Math.PI * d / 4) + b) * Math.sqrt((Math.pow((a - d), 2) / 4) + Math.pow((l - p - 25) ,2))) / 1000000;
					branchPipe1 = (2 * (a + b) * 25) / 1000000;
					branchPipe2 = ((((Math.PI * d) + 10) * p) + (koef1 * Math.PI * d)) / 1000000;
					result = (seam + sideSurface1 + sideSurface2 + branchPipe1 + branchPipe2) * 1.03 * cnt * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					cnt = self.getNumber( self.cnt() ),
					costType = vm.radioCost(),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().shaped) + 
						((self.calculateProfileLength(a, b, cnt) / 2) * vm.costFlange().costProfile) + 
						((self.calculateNumberOfCorner(cnt)) / 2 * vm.costFlange().costCorner);
					if ((result / cnt) < 11.5) {
						if (costType === 'retail') {
							return cnt * 11.5 * 1.11 * 1.05;
						} else {
							return cnt * 11.5 * 1.11;
						}
					} else {
						return result.toFixed(4);
					}
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RectangularTee (прямоугольный тройник)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularTee: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularTee';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'C')
			self.c = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'G')
			self.g = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					c = self.getNumber( self.c() ),
					g = self.getNumber( self.g() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					mod, // модуль разности сторон a и g
					result;
				if (!a || !b || !c || !g || !l || !cnt) {
					return '';
				} else {
					mod = Math.abs(a - g);
					result = ((2 * (((a + g) * (100 + (c / 2))) + c * (200 + mod)) + 
						(b * l) +
						(2 * b * 100) +
						((2 * b * 100) + (b * mod)) +
						(2 * 38 * (400 + mod))) * cnt / 1000000) * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					c = self.getNumber( self.c() ),
					g = self.getNumber( self.g() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().shaped) + 
						(self.calculateProfileLength(a, b, cnt) * vm.costFlange().costProfile) / 2 + 
						(self.calculateProfileLength(c, b, cnt) * vm.costFlange().costProfile) / 2 + 
						(self.calculateProfileLength(g, b, cnt) * vm.costFlange().costProfile) / 2 + 
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner) +
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner) / 2;
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RoundTee (круглый тройник)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RoundTee: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RoundTee';
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø1')
			self.d1 = ko.observable();
			
			// Наблюдаемое свойство (диаметр изделия, поле - 'Ø2')
			self.d2 = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L1')
			self.l1 = ko.observable();
			
			// Наблюдаемое свойство (длина патрубка изделия, поле - 'L2')
			self.l2 = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var d1 = self.getNumber( self.d1() ),
					d2 = self.getNumber( self.d2() ),
					l1 = self.getNumber( self.l1() ),
					l2 = self.getNumber( self.l2() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (!d1 || !d2 || !l1 || !l2 || !cnt) {
					return '';
				} else {
					result = (((((Math.PI * d1) + 34) * l1) +
						(((Math.PI * d2) + 10) * (l2 + (d1 / 4)))) * cnt / 1000000) * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					result;
				if (area) {
					result = area * vm.costPerSquareMeter().shaped;
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		},
		
		/**
		 * Создает экземпляр RectangularOffset (прямоугольная утка)
	     *
		 * @constructor 
		 * @param {object} vm Объект ViewModel.
		 */
		RectangularOffset: function(vm) {
			var self = this;
			
			// Тип продукции
			// Используется при идентификации объекта при добавлении и удалении строки из блоков продукции
			self.productType = 'RectangularOffset';
			
			// Наблюдаемое свойство (сторона изделия, поле - 'A')
			self.a = ko.observable();
			
			// Наблюдаемое свойство (сторона изделия, поле - 'B')
			self.b = ko.observable();
			
			// Наблюдаемое свойство (относ изделия, поле - 'Относ')
			self.o = ko.observable();
			
			// Наблюдаемое свойство (длина изделия, поле - 'L')
			self.l = ko.observable();
			
			// Наблюдаемое свойство (количество изделий, поле - 'Кол-во')
			self.cnt = ko.observable();
			
			// Вычисляемое свойство (площадь изделий, поле - 'Площадь')
			self.area = ko.computed(function() {
				var a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					o = self.getNumber( self.o() ),
					l = self.getNumber( self.l() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (!a || !b || !o || !l || !cnt) {
					return '';
				} else {
					result = ((a + b) * 0.002 * (l + o) * 0.001) * cnt * self.K2;
					return result.toFixed(4);
				}
			});
			
			// Вычисляемое свойство (цена изделий, поле - 'Цена')
			self.cost = ko.computed(function() {
				var area = self.getNumber( self.area() ),
					a = self.getNumber( self.a() ),
					b = self.getNumber( self.b() ),
					cnt = self.getNumber( self.cnt() ),
					result;
				if (area) {
					result = (area * vm.costPerSquareMeter().shaped) + 
						(self.calculateProfileLength(a, b, cnt) * vm.costFlange().costProfile) + 
						(self.calculateNumberOfCorner(cnt) * vm.costFlange().costCorner);
					return result.toFixed(4);
				} else {
					return '';
				}
			});
		}
	};

	app.iCon = iCon;
}(app, ko));