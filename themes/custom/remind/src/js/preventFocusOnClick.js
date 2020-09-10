document.addEventListener('mousedown', handleSafeFocus);
document.addEventListener('keydown', handleSafeFocus);

function handleSafeFocus(e) {
  switch (e.type) {
    case 'mousedown':
      document.documentElement.classList.add('disable-focus');
      break;

    default:
      document.documentElement.classList.remove('disable-focus');
      break;
  }
}