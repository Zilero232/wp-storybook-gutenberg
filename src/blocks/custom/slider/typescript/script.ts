import Swiper from 'swiper/bundle';

/**
 * Block type frontend script definition.
 * It will be enqueued only when viewing the content on the front of the site (Since: WordPress 5.9.0).
 */
if (window.matchMedia('(min-width: 992px)').matches) {
	const sliderContainers = document.querySelectorAll('.hero-slider');
	if (sliderContainers.length) {
		let sliders = [];
		sliderContainers.forEach((el, index) => {
			sliders[index] = null;
		});

		sliderContainers.forEach((sliderContainer, index) => {
			if (sliders[index] === null) {
				const slides = sliderContainer.querySelectorAll('.swiper-slide');
				const isAutoplay = sliderContainer.getAttribute('data-autoplay');
				sliders[index] = new Swiper(sliderContainer, {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: true,
					autoplay:
						isAutoplay && slides.length > 1
							? {
									delay: 5000,
									disableOnInteraction: false,
							  }
							: false,
					pagination: {
						el: sliderContainer.querySelector('.swiper-pagination') || null,
						clickable: true,
						renderBullet: (index, className) => {
							let slide = sliderContainer.querySelectorAll('.swiper-slide')[index + 1];
							if (slide) {
								let label = slide.getAttribute('data-label') || '';
								return `<span class="swiper-pagination-bullet hero-slider__bullet">${label}</span>`;
							}
						},
					},
				});
			}
		});
	}
}
