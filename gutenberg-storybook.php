<?php
/*
Plugin Name: Gutenberg Storybook
Description: This storybook includes a description of both basic and custom ones, you can also export the desired block to get started, enjoy coding!
Version: 1.0.0
Author: Artemev Alexandr
Author URI: https://github.com/Zilero232
Text Domain: storybook
*/

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'VERSION' ) ) {
	define( 'VERSION', '1.0.0' );
}

define('textdomain', 'storybook');

define( 'GB_SB_URL', plugin_dir_url( __FILE__ ) );
define( 'GB_SB_PATH', plugin_dir_path( __FILE__ ) );

require GB_SB_PATH . '/inc/setup.php';
require GB_SB_PATH . '/inc/blocks.php';
