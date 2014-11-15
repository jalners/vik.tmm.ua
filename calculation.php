<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Расчет стоимости изготовления заготовки</title>
		<meta name="author" content="Фирма Т.М.М. - ООО">
		<meta name="title" content="Расчет стоимости изготовления заготовки">
		<meta name="keywords" content="Расчет стоимости, заготовка">
		<meta name="description" content="Расчитайте стоимость изготовления заготовки у нас на сайте">
		<meta name="robots" content="index,follow">
		<link href="css/main.css" rel="stylesheet">
		<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<!--[if IE 9]><link href="css/ie9.css" rel="stylesheet"><![endif]-->
		<!--[if IE 8]><link href="css/ie8.css" rel="stylesheet"><![endif]-->
		<!--[if IE 7]><link href="css/ie7.css" rel="stylesheet"><![endif]-->
	</head>
	<body>
		<div class="navbar navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container">
					<a class="brand" href="http://vik.tmm.ua">ТММ - ВиК</a>
					<ul class="nav">
						<li><a href="http://vik.tmm.ua">Главная</a></li>
						<li><a href="proektirovanie_montaj_puskonaladka.php">Что мы можем</a></li>
						<li><a href="vozdyhovodi.php">Продукция</a></li>
						<li><a href="plazmennaya_rezka.php">Плазменная резка</a></li>
						<li><a href="price.php">Прайс</a></li>
						<li><a href="object.php">Наши объекты</a></li>
						<li><a href="contacts.php">Контакты</a></li>
						<li><a href="calculation.php">Расчет стоимости</a></li>
					</ul>
				</div>
			</div>
		</div>
	
		<div class="container">		
			
			<div class="row">
				<div class="span6">
					<h1>Расчет стоимости изготовления заготовки:</h1>
				</div>
				<div class="span2 offset3">
					<span class="label label-info target-print disableSelection">Распечатать:</span>
				</div>
				<div class="span1">
					<span class="label label-info target-setting disableSelection">Настройки:</span>
				</div>
			</div>
			
			<div class="row ie7">
				<div class="span5 offset7 well hide" id="settings">
					<div class="controls">
						<div class="left">
							<span class="title disableSelection">Цена:</span>
							<label class="radio disableSelection">
								<input type="radio" name="priceType" value="retail" data-bind="checked: radioCost">
									Розница
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="priceType" value="wholesale" data-bind="checked: radioCost">
									Опт
							</label>
						</div>
						<div class="left">
							<span class="title disableSelection">Металл:</span>
							<label class="radio disableSelection">
								<input type="radio" name="metal" value="0,55" data-bind="checked: radioMetal">
									0,55
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="metal" value="0,7" data-bind="checked: radioMetal">
									0,7
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="metal" value="0,8" data-bind="checked: radioMetal">
									0,8
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="metal" value="1,0" data-bind="checked: radioMetal">
									1,0
							</label>
						</div>
						<div class="right">
							<span class="title disableSelection">Фланец:</span>
							<label class="radio disableSelection">
								<input type="radio" name="profile" value="S20" data-bind="checked: radioProfile">
									S20
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="profile" value="S30" data-bind="checked: radioProfile">
									S30
							</label>
							<label class="radio disableSelection">
								<input type="radio" name="profile" value="0" data-bind="checked: radioProfile">
									Без&nbsp;фланца
							</label>
						</div>
					</div>
				</div>
			</div>	
					
				
					
		
			<div class="row">
				<div class="span5">
					<p class="lead p-hover open-all-sections disableSelection"><i class="icon-plus open icon-margin"></i><small>(cкрыть/открыть все разделы)</small></p>
				</div>
				<div class="span2">
					<span class="label xlabel" id="total">Сумма:</i></span>
				</div>
				<div class="span5">
					<form class="form-inline input-append small">
						<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: totalSum().cnt"></span><span class="add-on withm">шт</span></p>
						<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(totalSum().area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
						<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(totalSum().cost)"></span><span class="add-on withm">грн</span></p>
					</form>
				</div>
			</div>
						
			<!-- Блок прямоугольных воздуховодов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Воздуховод прямоугольный:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[0].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[0].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[0].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>В, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularDuct">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>	
					
				</div>
			</div>
						
			<!-- Блок круглых воздуховодов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Воздуховод круглый:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[1].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[1].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[1].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>Ø, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRoundDuct">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок прямоугольных отводов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Отвод прямоугольный:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[2].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[2].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[2].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>B, мм</th>
											<th>Патр1, мм</th>
											<th>Патр2, мм</th>
											<th>Угол, град</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularBend">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p1, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p2, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: angle, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок круглых отводов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Отвод круглый:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[3].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[3].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[3].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>Ø, мм</th>
											<th>Патр, мм</th>
											<th>Сег-ты, шт</th>
											<th>Угол, град</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRoundBend">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: s, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: angle, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок прямоугольных переходов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Переход прямоугольный:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[4].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[4].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[4].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>B, мм</th>
											<th>C, мм</th>
											<th>D, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularTransition">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: c, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок круглых переходов -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Переход круглый:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[5].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[5].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[5].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>Ø1, мм</th>
											<th>Ø2, мм</th>
											<th>Патр1, мм</th>
											<th>Патр2, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRoundTransition">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d1, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d2, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p1, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p2, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок переходов с прямоугольника на круг -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Переход прямоугольник/круг:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[6].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[6].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[6].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>B, мм</th>
											<th>Ø, мм</th>
											<th>Патр, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularToRoundTransition">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: p, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок прямоугольных тройников -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Тройник прямоугольный:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[7].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[7].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[7].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>B, мм</th>
											<th>C, мм</th>
											<th>G, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularTee">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: c, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: g, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок круглых тройников -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Тройник круглый:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[8].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[8].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[8].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>Ø1, мм</th>
											<th>Ø2, мм</th>
											<th>L1, мм</th>
											<th>L2, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRoundTee">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d1, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: d2, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l1, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l2, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
			
			<!-- Блок прямоугольных уток -->
			<div class="row">
				<div class="span11 offset1">
					
					<div class="row">
						<div class="span4">
							<p class="lead p-hover open-one-sections disableSelection"><i class="icon-plus open"></i>Утка прямоугольная:</p>
						</div>
						<div class="span2">
							<span class="label xlabel" id="total">Итого:</span>
						</div>
						<div class="span5">
							<form class="form-inline input-append small">
								<p class="p-inline"><span class="input-xmini uneditable-input" id="count-all" data-bind="text: subtotalSum()[9].cnt"></span><span class="add-on withm">шт</span></p>
								<p class="p-inline"><span class="input-xsmall uneditable-input" id="area-all" data-bind="text: formatValue(subtotalSum()[9].area)"></span><span class="add-on withm">м<sup>2</sup></span></p>
								<p class="p-inline"><span class="input-small uneditable-input" id="cost-all" data-bind="text: formatValue(subtotalSum()[9].cost)"></span><span class="add-on withm">грн</span></p>
							</form>
						</div>
					</div>
					
					<div class="row">
						<div class="span10 offset1 hidden">
							<form class="well">
								<table class="table">
									<thead>
										<tr>
											<th>A, мм</th>
											<th>B, мм</th>
											<th>Относ, мм</th>
											<th>L, мм</th>
											<th>Кол-во, шт</th>
											<th>Площадь, м<sup>2</sup></th>
											<th>Цена, грн</th>											
											<th></th>
										</tr>
									</thead>
									<tbody data-bind="foreach: blockRectangularOffset">
										<tr>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: a, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: b, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: o, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: l, event: {blur: $root.addLine}"></td>
											<td><input type="text" class="input-xmini" maxlength="4" data-bind="value: cnt, event: {focus: $root.addLine}"></td>
											<td><span class="input-xsmall uneditable-input" id="area" data-bind="text: formatValue(area())"></span></td>
											<td><span class="input-small uneditable-input" id="cost" data-bind="text: formatValue(cost())"></span></td>											
											<td class="disableSelection"><i class="close" data-bind="click: $root.removeLine">&times;</i></td>
										</tr>
										</tr>
									</tbody>
								</table>
							</form>
						</div>
					</div>
					
				</div>				
			</div>
					
		</div>
			
		<script src="js/vendor/jquery-1.8.3.min.js"></script>
		<script src="js/vendor/knockout-2.2.0.js"></script>
		<script src="js/menu.js"></script>
		<script src="js/app.js"></script>
		<script src="js/print.js"></script>		
	</body>
</html>