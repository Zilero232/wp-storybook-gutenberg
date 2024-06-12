<?php
/**
 * Setup Gutenberg Blocks etc.
 *
 */

namespace Storybook\Blocks;

/**
 * Setup Gutenberg Blocks.
 *
 * @return void
 */
function setup() {
	add_action( 'init', __NAMESPACE__ . '\\register_styles' );
}

require THEME_PATH . '/build/blocks/components/button/index.php';
require THEME_PATH . '/build/blocks/custom/link/index.php';
require THEME_PATH . '/build/blocks/components/toolbar/index.php';

