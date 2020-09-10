<?php


/**
 * @file
 * Set up variables to be placed within the template (.html.twig) files.
 *
 * The variables set up here apply to both templates (.html.twig) files and
 * functions (theme_HOOK). These are also used for providing
 * @link https://www.drupal.org/node/2354645 Twig Template naming conventions @endlink.
 *
 * @see process.inc
 */

use Drupal\Component\Utility\Html;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;

/**
 * Implements template_preprocess().
 * Use this to set global twig variables.
 */
function remind_preprocess(&$variables)
{
  // Load the basic site settings to all twig files
  $config = \Drupal::config('system.site')->getRawData();
  $variables['site']['name'] = $config['name'];
  $variables['site']['slogan'] = $config['slogan'];
  $variables['site']['front'] = $config['page']['front'];
  $variables['site']['host'] = \Drupal::request()->getScheme() . '://' . \Drupal::request()->getHost();

  $logo = file_url_transform_relative(file_create_url(theme_get_setting('logo.url')));
  $logo_path = DRUPAL_ROOT . $logo;
  $variables['site']['logo'] = $logo;
  if (file_exists($logo_path) && (mime_content_type($logo_path) == 'image/svg')) {
    $variables['site']['logo_svg'] = file_get_contents($logo_path);
  }

  // Load path information to all twig files
  $variables['path_info']['aliased'] = \Drupal::request()->getPathInfo();;
  $variables['path_info']['args']['aliased'] = explode('/', trim($variables['path_info']['aliased'], '/'));
  $variables['path_info']['unaliased'] = \Drupal::service('path.current')->getPath();
  $variables['path_info']['args']['unaliased'] = explode('/', trim($variables['path_info']['unaliased'], '/'));

  // Load is_front boolean to all twig files
  try {
    $variables['is_front'] = \Drupal::service('path.matcher')->isFrontPage();
  } catch (Exception $e) {
    $variables['is_front'] = FALSE;
  }
}

/**
 * Prepares variables for the html.html.twig template.
 */
function remind_preprocess_html(&$variables) {

  // kint($variables);
  // exit;

  // Add body classes based on page type
  $route_params = \Drupal::routeMatch()->getParameters()->all();
  $param_keys = array_keys($route_params);

  if ($variables['is_front']) {
    $variables['html_attributes']->addClass('front-page');
  } else {
    // Add unique classes for each page and website section.
    $path = \Drupal::service('path.current')->getPath();
    $alias = \Drupal::service('path_alias.manager')->getAliasByPath($path);
    $alias = trim($alias, '/');
    if (!empty($alias)) {

      if (in_array('node', $param_keys) && is_object($route_params['node'])) {
        $type = Html::cleanCssIdentifier($route_params['node']->bundle());
        $variables['html_attributes']->addClass('node--' . $type);
      }

      if (in_array('view_id', $param_keys)) {
        $view = Html::cleanCssIdentifier($route_params['view_id']);
        $display = Html::cleanCssIdentifier($route_params['display_id']);
        $variables['html_attributes']->addClass('view--' . $view . '--' . $display);
      }

      $name = str_replace('/', '-', $alias);
      $variables['html_attributes']->addClass('page--' . $name);
    }
  }

  // Add SVG symbols to html.html.twig
  $theme = \Drupal::theme()->getActiveTheme();
  $symbols_path = DRUPAL_ROOT . '/' .$theme->getPath() . '/assets/img/svg-symbols.svg';
  $variables['symbols'] = NULL;
  if (file_exists($symbols_path)) {
    $variables['symbols'] = file_get_contents($symbols_path);
  }

}

/**
 * Implements hook_preprocess_HOOK().
 */
function remind_preprocess_menu(&$variables) {
  $name = $variables['menu_name'];
  if ($name == 'main') {
    foreach ($variables['items'] as $i => $item) {
      $item_path = $item['url']->toString();
      if (strpos($variables['path_info']['aliased'], $item_path) === 0) {
        $variables['items'][$i]['in_active_trail'] = TRUE;
      }
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 */
function remind_preprocess_node(&$variables) {
  $node = $variables['node'];
  $id = $node->id();
  $type = $node->bundle();
  $display = $variables['view_mode'];

  if ($type == 'project' && $display == 'teaser') {
    $first_image = $node->field_images->first()->getValue();
    $imageFile = File::load($first_image['target_id'])->getFileUri();
    $imgUrl = ImageStyle::load('large')->buildUrl($imageFile);
    $variables['image'] = [
      'src' => $imgUrl,
      'alt' => $first_image['alt'],
      'width' => $first_image['width'],
      'height' => $first_image['height']
    ];
  }

  if ($type == 'project' && $display == 'full') {
    $tid = $node->field_project_type->first()->getString();
    $term = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->load($tid);
    $variables['project_type'] = $term->description->first()->getValue()['value'];

    $variables['images'] = [];
    $img_count = $node->field_images->count();
    for ($i=0; $i < $img_count; $i++) {
      $img = $node->field_images->get($i)->getValue();

      $imageFile = File::load($img['target_id'])->getFileUri();
      $smallUrl = ImageStyle::load('max_size')->buildUrl($imageFile);
      $fullUrl = file_create_url($imageFile);

      $image = [
        'alt' => $img['alt'],
        'width' => $img['width'],
        'height' => $img['height'],
        'src' => [
          'small' => $smallUrl,
          'full' => $fullUrl
        ],
      ];

      $variables['images'][] = $image;
    }
    // kint($variables['images']);
    // exit;
  }
}