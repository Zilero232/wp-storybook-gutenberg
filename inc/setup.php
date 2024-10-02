<?php

namespace Storybook\Setup;

defined( 'ABSPATH' ) || exit;

add_action( 'block_categories_all', __NAMESPACE__ . '\\register_custom_block_categories', 10, 2 );

/**
 * Регистрация категории "storybook".
 *
 * @return void
 */
function register_custom_block_categories($categories) {
	return array_merge(
			array(
				array(
						'slug'  => 'storybook',
						'title' => __('Storybook', textdomain),
						'icon'  => 'wordpress',  // Slug of a WordPress Dashicon or custom SVG
				),
			),
			$categories,
	);
}
