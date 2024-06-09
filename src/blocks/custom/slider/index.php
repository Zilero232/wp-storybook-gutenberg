<?php

namespace shiTheme\Blocks\HeroSlider;

use function shiTheme\Helpers\get_css_styles;
use function shiTheme\Helpers\trim_string;
use function shiTheme\Helpers\get_array;
use function shiTheme\Attributes\get_target_attribute;

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
	$is_editing = filter_input( INPUT_GET, 'edit', FILTER_SANITIZE_NUMBER_INT );
	$slides     = get_array( $attributes['slides'] ?? [] );
	$class_name = trim_string( $attributes['className'] ?? '' );
	$autoplay   = (bool) ( $attributes['autoplay'] ?? false );

	ob_start();

	if ( empty( $slides ) || ! is_array( $slides ) ) {
		?>
		<div class="hero-slider <?php echo esc_attr( $class_name ); ?>">
			<div class="hero-slider__empty">
				<?php esc_html_e( 'Add slides', 'shi' ); ?>
			</div>
		</div>
		<?php
		return ob_get_clean();
	}

	$override_mt = ! empty( $attributes['overrideMt'] ) ? (int) ( $attributes['marginTop'] ?? '' ) : '';
	$override_mb = ! empty( $attributes['overrideMb'] ) ? (int) ( $attributes['marginBottom'] ?? '' ) : '';
	$styles      = get_css_styles(
		[
			'margin-top'    => $override_mt ? $override_mt . 'px' : '',
			'margin-bottom' => $override_mb ? $override_mb . 'px' : '',
		]
	);
	?>
	<div class="hero-slider swiper base-font-el shi-wide-inner-paddings <?php echo esc_attr( apply_filters( 'shi_block_class', '', $attributes ) ); ?>"<?php echo wp_kses_post( $styles ?? '' ); ?> data-autoplay="<?php echo esc_attr( $autoplay ); ?>">
		<div class="hero-slider__wrapper swiper-wrapper">
			<?php
			foreach ( $slides as $slide ) :
				$slide_label        = trim( $slide['slideLabel'] ?? '' );
				$slide_image        = (int) ( $slide['slideImage'] ?? 0 );
				$slide_content_type = trim( $slide['slideContentType'] ?? '' );
				$slide_title        = trim( $slide['slideTitle'] ?? '' );
				$slide_text         = trim( $slide['slideText'] ?? '' );
				$slide_btn_text     = trim( $slide['slideBtnText'] ?? '' );
				$slide_btn_url      = trim( $slide['slideBtnLink'] ?? '' );
				$slide_new_tab_link = (bool) ( $slide['slideNewTabLink'] ?? false );
				?>
				<div class="hero-slider__item hero-slider__item_var swiper-slide" data-label="<?php echo esc_attr( $slide_label ); ?>">
					<?php if ( ! empty( $slide_image ) ) : ?>
						<div class="hero-slider__img">
							<?php
							echo wp_kses_post(
								wp_get_attachment_image(
									$slide_image,
									'shi-block-slider',
									null,
									[
										'class' => 'hero-slider__image hero-slider__image_desktop',
									]
								)
							);

							echo wp_kses_post(
								wp_get_attachment_image(
									$slide_image,
									'shi-hero-wide-mobile',
									null,
									[
										'class' => 'hero-slider__image hero-slider__image_mobile',
									]
								)
							);
							?>
						</div>
						<?php
					endif;
					if ( ! empty( $slide_title ) || ! empty( $slide_text ) ) :
						?>
						<div class='hero-slider__content-wrapper'>
							<div class="hero-slider__content">
								<?php if ( ! empty( $slide_content_type ) ) : ?>
									<span class="hero-slider__content-type"><?php echo esc_html( $slide_content_type ); ?></span>
								<?php endif; ?>
								<?php if ( ! empty( $slide_title ) ) : ?>
									<h2 class="hero-slider__title"><?php echo wp_kses_post( $slide_title ); ?></h2>
									<?php
								endif;
								if ( ! empty( $slide_text ) ) :
									?>
									<div class="hero-slider__text">
										<?php echo wp_kses_post( wpautop( $slide_text ) ); ?>
									</div>
									<?php
								endif;
								if ( ! empty( $slide_btn_text ) && ! empty( $slide_btn_url ) ) :
									?>
									<a
										href="<?php echo esc_url( $slide_btn_url ); ?>"
										class="hero-slider__btn shi-button shi-button_min-width"
										<?php echo wp_kses_post( get_target_attribute( $slide_new_tab_link ) ); ?>
									>
										<?php echo esc_html( $slide_btn_text ); ?>
									</a>
								<?php endif; ?>
							</div>
						</div>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
		<div class="hero-slider__container hero-slider__pagination swiper-pagination">
			<?php
			if ( $is_editing ) :
				foreach ( $slides as $index => $slide ) :
					$slide_label = trim( $slide['slideLabel'] ?? '' );
					?>
					<span class="swiper-pagination-bullet hero-slider__bullet" tabindex="<?php echo esc_attr( $index ); ?>>">
						<?php echo esc_html( $slide_label ); ?>
					</span>
					<?php
				endforeach;
			endif;
			?>
		</div>
	</div>

	<?php
	return ob_get_clean();
}
