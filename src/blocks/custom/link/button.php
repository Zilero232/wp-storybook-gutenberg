<?php
/**
 * Button markup
 *
 * @var array $args
 */

$text       = $args['text'] ?? esc_html__( 'Click here', 'rscm' );
$tag        = $args['tag'] ?? 'a';
$href       = $args['href'] ?? '#';
$target     = $args['target'] ?? '';
$rel        = $args['rel'] ?? '';
$markup     = $args['markup'] ?? '';

$content = '';

if ( $markup ) {
	$content = $markup;
} else {
	$content .= $text_class ? wp_sprintf( '<span class="%s">%s</span>', $text_class, $text ) : $text;
}
?>

<<?php echo wp_kses_post( $tag ); ?>
	<?php if ( $tag === 'a' ) : ?>
		href="<?php echo esc_url( $href ); ?>"
	<?php endif; ?>

	<?php if ( $target ) : ?>
		target="<?php echo esc_attr( $target ); ?>"
	<?php endif; ?>

	<?php if ( $rel ) : ?>
		rel="<?php echo esc_attr( $rel ); ?>"
	<?php endif; ?>

	<?php if ( $attrs ) : ?>
		<?php foreach ( $attrs as $key => $attr ) : ?>
			<?php echo wp_kses_post( $key ) . '="' . esc_attr( $attr ) . '"'; ?>
		<?php endforeach; ?>
	<?php endif; ?>
>
<?php echo wp_kses_post( $content ); ?>
</<?php echo wp_kses_post( $tag ); ?>>
