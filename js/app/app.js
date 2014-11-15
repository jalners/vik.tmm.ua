(function (app, ko) {
	// "Примешиваем" к прототипам конструкторов строк блоков свойства из funcBox
	(function() {
		for (var i in app.iCon) {
			if (app.iCon.hasOwnProperty(i)) {
				app.funcBox.call(app.iCon[i].prototype);
			}
		}
	}());

	ko.applyBindings(new app.ViewModel());
}(app, ko));