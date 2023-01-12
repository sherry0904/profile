main = function () {
	//private menbers

	//private methods
	function init() {
		console.log('main is loaded.');

		$(window).scroll(function(){
		
		});

	}

	// scrollAnimate
	function scrollAnimate(el,time,top) {
		$('html,body').animate({
			scrollTop: $(el).offset().top -top
		}, time);
	}
	function intoPage(){

	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {
		intoPage: function(){
			intoPage();
		},
	};
};

var main = new main();

// Slider
// var Swiper = new Swiper('#swiper-container名稱', {
// 	// loop: true,
// 	slidesPerView : 1,
// 	navigation: {
// 		nextEl: '.swiper-button-next',
// 		prevEl: '.swiper-button-prev',
		
// 	},
// 	breakpoints: { 
// 		768: {
// 			slidesPerView : 3,
// 			slidesPerGroup : 3,
// 		},
// 	}
// })


