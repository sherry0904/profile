skollerAni = function () {
	//private menbers
	let scroller;

	//private methods
	function init() {
		console.log('skollerAni is loaded.');

		scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
			smoothMobile: true,
			touchMultiplier: 2,
		})

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

		// 暫 測試用
		let firstScroll = false;

		ScrollTrigger.addEventListener('refresh', () => {
			scroller.update();
			// if (!firstScroll) {
			// 	firstScroll = true
			// 	setTimeout(()=>{
			// 		scroller.scrollTo(".works", 0, 0)
			// 	},2000)
			// }
			console.log("ScrollTrigger refresh")
		})

		ScrollTrigger.refresh();


		if($(window).width()>992) {
			videoPlay_pc();
			console.log("videoPlay_pc")
		}else {
			videoPlay_mb();
			console.log("videoPlay_mb")
		}

		$(window).resize(() => {
			// Kill off old ScrollTriggers
			ScrollTrigger.getAll().forEach(ST => ST.kill());
			// scrollTo(target, offset)
			if ($(window).width() > 992) {
				videoPlay_pc();
				console.log("videoPlay_pc")
			} else {
				videoPlay_mb();
				console.log("videoPlay_mb")
			}
			console.log("resize")
		});

	}

	function videoPlay_mb(){
		let windowH = $(window).height();
		let items = [];
		// console.log("windowH: "+windowH)

		for(let i=0; i<$(".award__item").length; i++) {
			items.push($(".award__item").eq(i));
		}

		// console.log(items)
		scroller.on('scroll', function (obj) {
			let scrollTop = $(window).scrollTop();
			// console.log("scrollTop: "+scrollTop)
			for (let i = 0; i < $(".award__item").length; i++) {
				// console.log("item-"+i+": "+items[i].offset().top)
				let itemH = items[i].outerHeight();
				let itemT = items[i].offset().top;
				let adjustH = (windowH - itemH) / 2;
				if (scrollTop > (itemT - adjustH) && scrollTop < (itemT + itemH)) {
					items[i].find(".award__video__box")[0].play();
					// console.log(i + " : play")
				} else {
					items[i].find(".award__video__box")[0].pause();
					// console.log(i + " : pause")
				}
			}
		})
	
	}

	// scrollAnimate
	function videoPlay_pc() {

		// Recreate the STs
		setupST();
		setVideo();

		function setupST(){
			let pinWrap = document.querySelector(".pin-wrap");
			let pinWrapWidth = pinWrap.offsetWidth;
			let horizontalScrollLength = pinWrapWidth - window.innerWidth;

			// Pinning and horizontal scrolling

			gsap.to(".pin-wrap", {
				scrollTrigger: {
					scroller: ".wrapper", //locomotive-scroll
					scrub: true,
					trigger: "#award",
					pin: true,
					// anticipatePin: 1,
					start: "top top",
					end: pinWrapWidth,
				},
				x: -horizontalScrollLength,
				ease: "none"
			});
		}

		function setVideo() {
			let windowW = $(window).width();
			let itemW = $(".award__item").width()
			let videoW = $(".award__video video").width();
			console.log("windowW: " + windowW)

			let videoT = $(".award__video .award__video__box-03").position().top

			// gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
			// 	console.log(videobox)
			// 	ScrollTrigger.create({ 
			// 		trigger: videobox,
			// 		start: () => `${(windowW * (1.5 * id))} ${videoT}`, // (物件開始位置, 卷軸開始位置)
			// 		end: () => `${(windowW * (1.5 * (id + 1)))} ${videoT}`, //(物件結束位置, 卷軸結束位置)
			// 		markers: true,
			// 		scroller: ".wrapper",
			// 		onEnter: () => videobox.play(),
			// 		onEnterBack: () => videobox.play(),
			// 		onLeave: () => videobox.pause(),
			// 		onLeaveBack: () => videobox.pause(),
			// 		onUpdate: ()=>{
			// 			// console.log((videoH * (id + 1)))
			// 		}
			// 	});
			// });


			gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
				// console.log(videobox)
				ScrollTrigger.create({
					trigger: videobox,
					start: () => `${(itemW * id) - (videoT * id)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
					end: () => `${(itemW * id) - (videoT * id)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
					// markers: true,
					scroller: ".wrapper",
					onEnter: () => videobox.play(),
					onEnterBack: () => videobox.play(),
					onLeave: () => videobox.pause(),
					onLeaveBack: () => videobox.pause(),
					onUpdate: () => {
						// console.log((videoH * (id + 1)))
					}
				});
			});
		}


		
	

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





