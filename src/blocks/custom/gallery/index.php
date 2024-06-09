<?php

namespace shiTheme\Blocks\Gallery;

use function shiTheme\Helpers\get_css_styles;
use function shiTheme\Helpers\trim_string;

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg
 * in the corresponding context.
 */
function register_block() {
	// Register the block by passing the location of block.json to register_block_type
	register_block_type(
		__DIR__,
		array(
			'render_callback' => __NAMESPACE__ . '\\render_block',
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );

function render_block( $attributes, $content, $block ) {
	$class_name  = trim_string( $attributes['className'] ?? '' );
	$items       = ! empty( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : [];
	$override_mt = ! empty( $attributes['overrideMt'] ) ? (int) ( $attributes['marginTop'] ?? '' ) : '';
	$override_mb = ! empty( $attributes['overrideMb'] ) ? (int) ( $attributes['marginBottom'] ?? '' ) : '';
	$styles      = get_css_styles(
		[
			'margin-top'    => $override_mt ? $override_mt . 'px' : '',
			'margin-bottom' => $override_mb ? $override_mb . 'px' : '',
		]
	);

	if ( ! $items ) {
		return false;
	}

	ob_start();
	?>

	<div class="shi-gallery-container shi-wide-inner-paddings <?php echo esc_attr( $class_name ); ?>">
		<div class="shi-gallery swiper <?php echo esc_attr( apply_filters( 'shi_block_class', '', $attributes ) ); ?>"<?php echo wp_kses_post( $styles ?? '' ); ?>>
			<figure class="shi-gallery__wrapper swiper-wrapper">
				<?php
				foreach ( $items as $item ) :
					$image_id  = (int) ( $item['id'] ?? 0 );
					$label     = trim( ! empty( $item['label'] ) ? $item['label'] : wp_get_attachment_caption( $image_id ) );
					$source    = trim( $item['source'] ?? '' );
					$image_tag = $image_id ? wp_get_attachment_image(
						$image_id,
						'shi-block-gallery',
						false,
						[
							'class' => 'shi-gallery__img',
						]
					) : '';
					?>
					<figure class="shi-gallery__item swiper-slide">
						<?php if ( $image_tag ) : ?>
							<div class="shi-gallery__media">
								<?php echo wp_kses_post( $image_tag ); ?>
							</div>
							<?php
						endif;
						if ( $label ) :
							?>
							<figcaption class="shi-gallery__label"><?php echo wp_kses_post( $label ); ?></figcaption>
							<?php
						endif;
						if ( $source ) :
							?>
							<figcaption class="shi-gallery__source"><?php echo wp_kses_post( $source ); ?></figcaption>
						<?php endif; ?>
					</figure>
				<?php endforeach; ?>
			</figure>
		</div>
		<div class="shi-gallery-container__btn swiper-button-prev">
			<svg width="40" height="67" viewBox="0 0 40 67" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="32.3365" y1="62.3047" x2="5.01612" y2="34.9843" stroke="black" stroke-width="9" stroke-linecap="round"/>
				<path d="M35.1543 4.8457L4.99995 35" stroke="black" stroke-width="9" stroke-linecap="round"/>
			</svg>
		</div>
		<div class="shi-gallery-container__btn swiper-button-next">
			<svg width="40" height="67" viewBox="0 0 40 67" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="7.36396" y1="4.8457" x2="34.6843" y2="32.1661" stroke="black" stroke-width="9" stroke-linecap="round"/>
				<path d="M4.5459 62.3047L34.7002 32.1504" stroke="black" stroke-width="9" stroke-linecap="round"/>
			</svg>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
