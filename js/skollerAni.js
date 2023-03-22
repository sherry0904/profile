skollerAni = function () {
	//private menbers
	let scroller;

	//private methods
	function init() {
		console.log('skollerAni is loaded.');

		scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true
		})

		if($(window).width()>992) {
			videoPlay_pc();
		}else {
			videoPlay_mb();
		}

		$(window).scroll(()=>{
			// console.log("scroll")
		});

	}

	function videoPlay_mb(){
			let windowH = $(window).height();
			let awardTop = $(".award").offset().top;
			let awardH = $(".award").height();
			let $item01 = $(".award__item-01")
			let $item02 = $(".award__item-02")
			let $item03 = $(".award__item-03")
			let items = [];
			// console.log("windowH: "+windowH)

			for(let i=0; i<$(".award__item").length; i++) {
				items.push($(".award__item").eq(i));
			}

			console.log(items)

			$(window).scroll(()=>{
				let scrollTop = $(window).scrollTop();
				console.log("scrollTop: "+scrollTop)
				for(let i=0; i<$(".award__item").length; i++) {
					console.log("item-"+i+": "+items[i].offset().top)
					if(scrollTop > items[i].offset().top) {
						items[i].find(".award__video__box")[0].play();
						console.log(i + " : play")
						// console.log(items[i].find(".award__video__box")[0])
					}else if(scrollTop > (items[i].offset().top + items[i].outerHeight())) {
						items[i].find(".award__video__box")[0].pause();
						console.log(i + " : pause")
					}
				}
			});
	

			// gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
			// 	let $item = $(videobox).parents(".award__item");
			// 	let itemH = $item.outerHeight();
			// 	let itemTop = $item.offset().top;
			// 	let scrollTop = $(window).scrollTop();
			// 	console.log(scrollTop)
			// 	ScrollTrigger.create({ 
			// 		trigger: $item[0],
			// 		start: () => `${0} itemH`, // (物件開始位置, 卷軸開始位置)
			// 		end: () => `${itemH} ${awardTop + awardH}`, //(物件結束位置, 卷軸結束位置)
			// 		markers: true,
			// 		scroller: ".wrapper",
			// 		onEnter: () => {
			// 			videobox.play()
			// 			console.log("onEnter")
			// 		},
			// 		onEnterBack: () => videobox.play(),
			// 		onLeave: () => videobox.pause(),
			// 		onLeaveBack: () => videobox.pause(),
			// 		onUpdate: ()=>{
			// 			// console.log((videoH * (id + 1)))
			// 		}
			// 	});
			// });
	}

	// scrollAnimate
	function videoPlay_pc(e) {
		
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
				trigger: "#award",
				pin: true,
				// anticipatePin: 1,
				start: "top top",
				end: pinWrapWidth
			},
			x: -horizontalScrollLength,
			ease: "none"
		});

		setTimeout(() => {
			let windowW = $(window).width();
			let itemW = $(".award__item").width()
			let videoW = $(".award__video video").width();
			console.log("windowW: "+windowW)

			let videoT = $(".award__video video").position().top

			gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
				console.log(videobox)
				ScrollTrigger.create({ 
					trigger: videobox,
					start: () => `${(windowW * (1.5 * id))} ${videoT}`, // (物件開始位置, 卷軸開始位置)
					end: () => `${(windowW * (1.5 * (id + 1)))} ${videoT}`, //(物件結束位置, 卷軸結束位置)
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

			// gsap.utils.toArray('.award__video video').forEach(function (videobox, id) {
			// 	console.log(videobox)
			// 	ScrollTrigger.create({ 
			// 		trigger: videobox,
			// 		start: () => `${(itemW * id) - (videoT * id)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
			// 		end: () => `${(itemW * id) - (videoT * id)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
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
			scroller.on('scroll', () => {

			})
			
			// const video01 = $("#video01")[0]
			// ScrollTrigger.create({
			// 	trigger: video01,
			// 	start: () => `${(itemW * 0) - (videoT * 0)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
			// 	end: () => `${(itemW * 0) - (videoT * 0)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
			// 	markers: true,
			// 	scroller: ".wrapper",
			// 	onEnter: () => player.playVideo(),
			// 	onEnterBack: () => player.playVideo(),
			// 	onLeave: () => player.pauseVideo(),
			// 	onLeaveBack: () => player.pauseVideo(),
			// 	onUpdate: () => {
			// 		// console.log((videoH * (id + 1)))
			// 	}
			// });

			// const video02 = $("#video02")[0]
			// ScrollTrigger.create({
			// 	trigger: video02,
			// 	start: () => `${(itemW * 1) - (videoT * 1)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
			// 	end: () => `${(itemW * 1) - (videoT * 1)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
			// 	markers: true,
			// 	scroller: ".wrapper",
			// 	onEnter: () => video02.play(),
			// 	onEnterBack: () => video02.play(),
			// 	onLeave: () => video02.pause(),
			// 	onLeaveBack: () => video02.pause(),
			// 	onUpdate: () => {
			// 		// console.log((videoH * (id + 1)))
			// 	}
			// });

			// const video03 = $("#video03")[0]
			// ScrollTrigger.create({
			// 	trigger: video03,
			// 	start: () => `${(itemW * 2) - (videoT * 2)} ${videoT}`, // (物件開始位置, 卷軸開始位置)
			// 	end: () => `${(itemW * 2) - (videoT * 2)} ${videoT - videoW}`, //(物件結束位置, 卷軸結束位置)
			// 	markers: true,
			// 	scroller: ".wrapper",
			// 	onEnter: () => video03.play(),
			// 	onEnterBack: () => video03.play(),
			// 	onLeave: () => video03.pause(),
			// 	onLeaveBack: () => video03.pause(),
			// 	onUpdate: () => {
			// 		// console.log((videoH * (id + 1)))
			// 	}
			// });
		}, 1000);

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





