(function ($) {
  Drupal.behaviors.animsition = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $(".animsition").animsition({
          inClass: 'fade-in-down-sm',
          outClass: 'fade-out-up-sm',
          inDuration: 1500,
          outDuration: 800,
          linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([href=""])',
          onLoadEvent: true,
          browser: ['animation-duration', '-webkit-animation-duration'],
          // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
          // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
          overlay: false,
          transition: function (url) { window.location.href = url; }
        });
      });
    }
  };
})(jQuery);