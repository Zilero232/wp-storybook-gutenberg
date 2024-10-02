<?php
/**
 * Swiper Slider block.
 *
 * @package Storybook\Blocks
 */

namespace Storybook\Blocks\SwiperSlider;

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg
 * in the corresponding context.
 */
function register_block(): void {
	// Register the block by passing the location of block.json to register_block_type.
	register_block_type(
		__DIR__,
		array(
			'render_callback' => __NAMESPACE__ . '\\render_block',
		)
	);
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );

/**
 * Renders the Swiper Slider block.
 *
 * @param array  $attrs    The block attributes.
 * @param string $content  The block content.
 * @param object $block    The block object.
 *
 * @return string The rendered block markup.
 */
function render_block( $attrs, $content, $block ) {
	$is_editing = filter_input( INPUT_GET, 'edit', FILTER_SANITIZE_NUMBER_INT );

	$items = $attrs['items'] ?? [];
	if ( empty( $attrs['items'] ) ) {
		return $is_editing ? '<div class="components-placeholder is-large">' . esc_html__( 'Please add items in the sidebar', 'rgbc' ) . '</div>' : '';
	}

	ob_start();
	?>

  <div class="swiper-container">
        <div class="swiper-wrapper">
            <?php foreach ($slides as $slide) : ?>
                <div class="swiper-slide">
                    <?php if (!empty($slide['imageUrl'])) : ?>
                        <img src="<?php echo esc_url($slide['imageUrl']); ?>" alt="">
                    <?php endif; ?>
                    <p><?php echo esc_html($slide['content']); ?></p>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>

	<?php
	return ob_get_clean();
}
