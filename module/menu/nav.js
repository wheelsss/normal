$(function(){
mMenu('.m-btn','#m-menu');
function mMenu(a,b){
	var blackBg = document.createElement('div');
	$('body').append(blackBg);
	$('.m-menu2').hide();
	$(a).on('click',function(){
		if ($('body').is('.open')) {
			$(a).removeClass('is-active');
			$('body').removeClass('open');
			$(b).removeClass('open-menu');
			$(blackBg).removeClass('z-dark');
		} else{
			$(a).addClass('is-active');
			$('body').addClass('open');
			$(b).addClass('open-menu');
			$(blackBg).addClass('z-dark');
			$('.z-dark').on('click',function(){
				$(a).removeClass('is-active');
				$('body').removeClass('open');
				$(b).removeClass('open-menu');
				$(blackBg).removeClass('z-dark');
			})
			$('.m-drop').on('click',function(){
				$(this).toggleClass('m-active').find(".m-menu2").slideToggle(300).siblings("ul").slideUp(300);
				$(this).siblings('li').removeClass('m-active').find('.m-menu2').slideUp(300);

			})

		}

	})

}

})
