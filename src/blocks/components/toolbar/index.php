<?php

namespace Storybook\Blocks\Toolbar;

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

function render_block( $attributes ) {
	ob_start();
	?>

	<?php
	return ob_get_clean();
}
