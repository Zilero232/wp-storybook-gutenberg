/**
 * Block type frontend script definition.
 * It will be enqueued only when viewing the content on the front of the site (Since: WordPress 5.9.0).
 */

document.querySelectorAll('.js-iframe-play-btn').forEach(elBtn => {
	elBtn.addEventListener('click', () => {
		const elIframeBox = elBtn.closest('.js-iframe-play');
		const elIframeInner = elBtn.closest('.js-iframe-play-inner');
		const src = elIframeBox?.dataset.src;
		if (!src) return;

		const iframe = document.createElement('iframe');
		iframe.setAttribute('src', src);
		iframe.setAttribute('tabindex', '0');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('scrolling', 'no');
		iframe.setAttribute('allowfullscreen', '');
		elIframeInner.appendChild(iframe);

		elBtn.classList.add('loading');
		elBtn.setAttribute('disabled', 'true');

		iframe.onload = () => {
			iframe.classList.add('loaded');
			elBtn.remove();
		};
	});
});
