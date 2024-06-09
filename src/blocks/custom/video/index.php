<?php

namespace Storybook\Custom\IframePlay;

use function Netti\Blocks\get_block_widget_id;

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 */
function register_block() {
	// Register the block by passing the location of block.json to register_block_type.
	register_block_type(
		__DIR__,
		array(
			'render_callback' => __NAMESPACE__ . '\\render_block',
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );

function render_block( $attributes, $content, $block ) {
	$src         = wp_http_validate_url( $attributes['src'] ?? '' );
	$text        = $attributes['text'] ?? '';
	$bg_img_desk = $attributes['bgImageDesktop'] ?? '';
	$bg_img_mob  = $attributes['bgImageMobile'] ?? '';

	if ( ! $src ) {
		return '';
	}

	$block_type = apply_filters( 'rgbcode_block_type', 'iframe-play', $attributes );

	ob_start();
	?>
	<div
		id="<?php echo esc_attr( get_block_widget_id( $attributes ) ); ?>"
		data-widget-type="<?php echo esc_attr( $block_type ); ?>"
	>
		<div class="iframe-play relative js-iframe-play" data-src="<?php echo esc_url( $src ); ?>">
			<?php if ( $bg_img_desk || $bg_img_mob ) : ?>
				<picture class="iframe-play__bg flex absolute">
					<?php if ( $bg_img_mob ) : ?>
						<source
							srcset="<?php echo esc_url( wp_get_attachment_image_url( $bg_img_mob, 'full' ) ); ?>"
							media="(max-width: 768px)">
					<?php endif; ?>

					<?php rgbc_the_acf_image( $bg_img_desk ? $bg_img_desk : $bg_img_mob, '', 'full' ); ?>
				</picture>
			<?php endif; ?>

			<div class="iframe-play__inner absolute js-iframe-play-inner">
				<button
					type="button"
					class="iframe-play__button flex fdc jcc aic text-center absolute js-iframe-play-btn"
					aria-label="<?php echo esc_attr__( 'Pelaa', 'rgbc' ); ?>"
				>
					<div class="iframe-play__icon relative transition">
						<svg xmlns="http://www.w3.org/2000/svg" width="50" height="55" viewBox="0 0 55.127 61.182">
							<g transform="translate(30 35)">
								<g transform="translate(-30 -35)">
									<path d="M18.095,1.349C12.579-1.815,8.107.777,8.107,7.134v46.91c0,6.363,4.472,8.952,9.988,5.791l41-23.514c5.518-3.165,5.518-8.293,0-11.457Z" transform="translate(-8.107 0)" fill="#fff"/>
								</g>
							</g>
						</svg>
					</div>
					<?php if ( ! empty( $text ) ) : ?>
						<div class="iframe-play__text"><?php echo wp_kses_post( $text ); ?></div>
					<?php endif; ?>
				</button>
			</div>
		</div>
	</div>
	<?php
	wp_enqueue_script( 'rgbc-iframe-play-view-script' );

	return ob_get_clean();
}
