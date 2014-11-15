$(function() {
	var pageHref = window.location.pathname;
	$('ul.nav a').each(function(){
        var linkHref = $(this).attr('href');
        var linkHref = "/" + linkHref;
		if (linkHref.substring(0, 5) === '/http') {
			linkHref = '/';
		}
        if (pageHref === linkHref) {
			$(this).parent('li').addClass('active');
			return false;
		}
	})      
});