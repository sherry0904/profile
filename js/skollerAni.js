skollerAni = function () {
	//private menbers

	//private methods
	function init() {
		console.log('skollerAni is loaded.');

		const scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		})

		// scrollTo(target, offset)

		gsap.registerPlugin(ScrollTrigger)

		scroller.on('scroll', ScrollTrigger.update)

		ScrollTrigger.scrollerProxy(
			'.wrapper', {
				scrollTop(value) {
					return arguments.length ?
						scroller.scrollTo(value, 0, 0) :
						scroller.scroll.instance.scroll.y
				},
				getBoundingClientRect() {
					return {
						left: 0,
						top: 0,
						width: window.innerWidth,
						height: window.innerHeight
					}
				},
				// pinType: document.querySelector(".wrapper").style.transform ? "transform" : "fixed"
			}

		)


		// ScrollTrigger.create({
		// 	trigger: '.image-mask',
		// 	scroller: '.wrapper',
		// 	start: 'top+=30% 50%',
		// 	end: 'bottom-=40% 50%',
		// 	animation: gsap.to('.image-mask', {
		// 		backgroundSize: '120%'
		// 	}),
		// 	scrub: 2,
		// 	// markers: true
		// })

		let pinWrap = document.querySelector(".pin-wrap");
		let pinWrapWidth = pinWrap.offsetWidth;
		let horizontalScrollLength = pinWrapWidth - window.innerWidth;

		// Pinning and horizontal scrolling

		gsap.to(".pin-wrap", {
			scrollTrigger: {
				scroller: ".wrapper", //locomotive-scroll
				scrub: true,
				trigger: "#sectionPin",
				pin: true,
				// anticipatePin: 1,
				start: "top top",
				end: pinWrapWidth
			},
			x: -horizontalScrollLength,
			ease: "none"
		});

		setTimeout(()=>{
			let itemW = $(".award__item").width()
			let videoW = $(".award__video video").width();
			let videoT = $(".award__video video").position().top

			gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
				console.log(videobox)
				ScrollTrigger.create({ 
					trigger: videobox,
					start: () => `${(itemW * id) - (videoT * id)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
					end: () => `${(itemW * id) - (videoT * id)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
					markers: true,
					scroller: ".wrapper",
					onEnter: () => videobox.play(),
					onEnterBack: () => videobox.play(),
					onLeave: () => videobox.pause(),
					onLeaveBack: () => videobox.pause(),
					onUpdate: ()=>{
						// console.log((videoH * (id + 1)))
					}
				});
			});
			scroller.on('scroll', () => {
				
			})
		},1000);

		// 暫 測試用
		let firstScroll = false;

		ScrollTrigger.addEventListener('refresh', () => {
			scroller.update()
			// if (!firstScroll) {
			// 	firstScroll = true
			// 	setTimeout(()=>{
			// 		scroller.scrollTo(".works", 0, 0)
			// 	},2000)
			// }
			console.log("ScrollTrigger refresh")
		})


		ScrollTrigger.refresh()

	}

	// scrollAnimate
	function scrollAnimate(el, time, top) {
		$('html,body').animate({
			scrollTop: $(el).offset().top - top
		}, time);
	}

	function intoPage() {

	}

	{
		$(document).ready(function () {
			init();
		});
	}

	//public
	return {
		intoPage: function () {
			intoPage();
		},
	};
};

var skollerAni = new skollerAni();