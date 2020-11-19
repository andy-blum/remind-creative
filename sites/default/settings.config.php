<?php

// For D8.8/D8.9, set $settings['config_sync_directory'] if neither
// $config_directories nor $settings['config_sync_directory is set
if (version_compare(DRUPAL::VERSION, "8.8.0", '>=') &&
  version_compare(DRUPAL::VERSION, "9.0.0", '<') &&
  empty($config_directories[CONFIG_SYNC_DIRECTORY]) &&
  empty($settings['config_sync_directory'])) {
  $settings['config_sync_directory'] = 'sites/config/sync';
}
// For Drupal9, it's always $settings['config_sync_directory']
if (version_compare(DRUPAL::VERSION, "9.0.0", '>=') &&
  empty($settings['config_sync_directory'])) {
  $settings['config_sync_directory'] = 'sites/config/sync';
}