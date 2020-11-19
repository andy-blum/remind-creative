(function(){
  Drupal.behaviors.pageTransition= {
    attach: function (context, settings) {

      window.addEventListener('load', function(e) {
        const body = document.querySelector('body');
        body.style.transition = 'all 0.5s ease-in-out';
        setTimeout(function(){
          document.querySelector('body').classList.add('visible');
        }, 500);
      });

      const linksOut = Array.prototype.slice.call(
        context.querySelectorAll(
          'a:not([target="_blank"]):not([href^="#"]):not([href=""])'
        )
      );

      linksOut.forEach(function(link) {
        link.addEventListener('click', function(e){
          e.preventDefault();

          document.querySelector('body').classList.remove('visible');

          setTimeout(function() {
            window.location = link.href;
          }, 500);
        });
      });
    }
  };
})();