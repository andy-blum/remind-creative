/*
 * Style Fix
 *
 * Special JS rules to apply styles as needed
 */


const styleFixMutationObserver = new MutationObserver(styleFix);
styleFixMutationObserver.observe(document.querySelector('body'), { childList: true, subtree: true });

function styleFix() {
  /**
  * Image Fix
  *
  * Detects elements that contain single image
  * Sets line-height to 0
  */
  const images = Array.from(document.querySelectorAll('img'));
  images.forEach(function (image) {
    const parent = image.parentElement;
    if (!parent) {
      return false;
    }
    visibleNodes = getVisibleChildNodes(parent);

    if (visibleNodes.length === 1 && parent.childElementCount === 1) {
      if (visibleNodes[0].nodeName === 'IMG') {
        parent.style.lineHeight = 0;
      }
    }
  });

  /**
  * Button Icon fix
  *
  * checks if svgs are the first or last child in buttons
  * and removes the outer margin
  */
  const icons = Array.from(document.querySelectorAll('button svg, .button svg, [class*="button--"] svg'));
  icons.forEach(function (icon) {

    if (!icon.parentElement) {
      return false;
    }
    const visibleNodes = getVisibleChildNodes(icon.parentElement);

    if (icon === visibleNodes[0]) {
      icon.style.marginLeft = 0;
    }

    if (icon == visibleNodes[(visibleNodes.length - 1)]) {
      icon.style.marginRight = 0;
    }
  });
}