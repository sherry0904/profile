main = function () {
	//private menbers

	//private methods
	function init() {
		console.log('main is loaded.');
;

		$("#videoModal").on('hidden.bs.modal',  function(){
			$("#videoModal video").removeClass("video-h video-v");
			$("#videoModal video").attr("src", "");
		})


		$(".works__item").on("click", function(e){
			e.preventDefault();
			let type = $(this).data("type")
			let path = $(this).attr("href");
			if(type === "link") {
				window.open(path);
				console.log("excute: link")
			}else {
				let direction = $(this).data("direction");
				if(direction == "h") {
					$("#videoModal video").addClass("video-h");
				}else {
					$("#videoModal video").addClass("video-v");
				}
				path = path.replace("#","");
				$("#videoModal video").attr("src", "./video/"+path+".mp4");
				$("#videoModal").modal('show');
				$("#videoModal video")[0].play();
				console.log("excute: video")
			}
		})
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


