<?php

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function remind_theme_suggestions_block_alter(&$suggestions, $variables) {
  if ($variables['elements']['#configuration']['provider'] == 'layout_builder') {
    $base_plugin_id = $variables['elements']['#base_plugin_id'];
    $block_type = $variables['elements']['#derivative_plugin_id'];
    $block_name = preg_replace('/[^A-Za-z0-9\-]/', '_', strtolower($variables['elements']['#configuration']['label']));

    $suggestions = [];
    $suggestions[] = 'block__lb';
    $suggestions[] = 'block__lb__' . $base_plugin_id;
    $suggestions[] = 'block__lb__' . $block_type;
    $suggestions[] = 'block__lb__' . $block_name;
    $suggestions[] = 'block__lb__' . $block_type . '__' . $block_name;
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function remind_theme_suggestions_views_view_unformatted_alter(&$suggestions, $variables) {
  $hook = 'views_view_unformatted';
  $view = $variables['view'];
  $vid = $view->id();
  $route_params = \Drupal::routeMatch()->getParameters()->all();

  if ($vid == 'taxonomy_term' && isset($route_params['taxonomy_term'])) {
    $vocab = $route_params['taxonomy_term']->bundle();
    $suggestions[] = implode('__', [$hook, $vid, $vocab]);
  }
}