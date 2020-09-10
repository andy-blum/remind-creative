(function () {
  const vh = window.innerHeight;

  const body = document.querySelector('body');
  const bodyHeight = body.offsetHeight;

  const header = document.querySelector('#region-header');
  const content = document.querySelector('#main-content');
  const contentPadding = parseInt(window.getComputedStyle(content).paddingTop) + parseInt(window.getComputedStyle(content).paddingBottom);
  const footer = document.querySelector('#region-footer');

  if (bodyHeight < vh) {
    content.style.minHeight = (vh - (header.offsetHeight + footer.offsetHeight + contentPadding)) + 'px';
  }

})();

