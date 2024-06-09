import Swiper from 'swiper/bundle';

const Galleries = () => {
	const galleries = document.querySelectorAll('.shi-gallery');
	if (galleries.length) {
		let galleriesList = [];
		galleries.forEach((el, index) => {
			galleriesList[index] = null;
		});

		galleries.forEach((gallery, index) => {
			const container = gallery.closest('.shi-gallery-container');
			let slides = gallery.querySelectorAll('.swiper-slide');
			if (slides.length > 1 && galleriesList[index] === null) {
				galleriesList[index] = new Swiper(gallery, {
					slidesPerView: 1,
					autoplay: false,
					pagination: false,
					on: {
						init(swiper) {
							if (!container) {
								return null;
							}
							const totalSlidesLen = swiper.slides.length;
							let btnPrev = container.querySelector('.swiper-button-prev'),
								btnNext = container.querySelector('.swiper-button-next');
							if (btnPrev && btnNext) {
								btnPrev.addEventListener('click', () => {
									swiper.slideTo(swiper.isBeginning ? totalSlidesLen - 1 : swiper.realIndex - 1);
								});
								btnNext.addEventListener('click', () => {
									swiper.slideTo(swiper.isEnd ? 0 : swiper.realIndex + 1);
								});
							}
						},
					},
				});
			} else {
				container.classList.add('shi-gallery-container_no-slider');
			}
		});
	}
};
Galleries();

export default Galleries;
