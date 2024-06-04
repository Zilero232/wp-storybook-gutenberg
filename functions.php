<?php
/**
 * Gutenberg Storybook
 */

 if ( ! defined( 'VERSION' ) ) {
	define( 'VERSION', '1.0.0' );
}

define( 'THEME_PATH', get_template_directory() );
define( 'THEME_URL', get_template_directory_uri() );
define( 'SRC', get_template_directory_uri() );

// Регистрация категории "storybook"
add_filter('block_categories_all', 'register_custom_block_categories');
function register_custom_block_categories($categories) {
	return array_merge(
			$categories,
			array(
					array(
							'slug'  => 'storybook',
							'title' => __('Storybook', 'text-domain'),
							'icon'  => 'wordpress',
					),
			)
	);
}

require_once 'inc/blocks.php';