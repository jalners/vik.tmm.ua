(function ($) {
	$(function(){
		//Событие onclick для раскрытия всех разделов
		$('p.open-all-sections').on({
			'click': function() {
				var arrayOfStates = [];
				var openAll = $('div.hidden');
				openAll.each(function(index) {
					if ($(this).css('display') === 'block') {
						arrayOfStates[index] = 1;
					}
				});
				if ($.inArray(1, arrayOfStates) != -1) {
					openAll.hide();
				} else {
					openAll.show();
				}
			},
			'mouseenter': function() {
				$(this).children('i').addClass('icon-hover');
			},
			'mouseleave': function() {
				$(this).children('i').removeClass('icon-hover');
			}
		});
		
		//Событие onclick для раскрытия отдельных разделов
		$('p.open-one-sections').on({
			'click': function() {
				var open = $(this).closest('div.row').next().find('div.hidden');
				open.slideToggle(0);
				if (open.is(':visible')) {
					setTimeout(function() {
						open.find('span#area').each(function() { // можно поменять потом на input#cost
							if ($(this).text() === '') {
								$(this).closest('tr').find('input:first').focus();
								return false;
							}
						});
					}, 300);
				}
			},
			'mouseenter': function() {
				$(this).children('i').addClass('icon-hover');
			},
			'mouseleave': function() {
				$(this).children('i').removeClass('icon-hover');
			}
		});
		
		//Событие onclick для кнопки настроек
		$('.target-setting').on('click', function() {
			$('#settings').slideToggle(0);
		});
		
		//Отмена выделения текста при клике по нему
		$('.disableSelection').each(function() {
			this.onmousedown = this.onselectstart = this.ondoubleclick = function() { return false; };
			this.unselectable = "on";
			$(this).css({'-moz-user-select': 'none', '-webkit-user-select': 'none', '-khtml-user-select': 'none'});
		});
		
		//Отмена выделения рамкой radio input в firefox
		$('input[type="radio"]').focus(function() {
			this.blur();
		});
	});
}(jQuery));