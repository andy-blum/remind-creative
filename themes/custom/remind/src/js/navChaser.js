window.addEventListener('DOMContentLoaded', (e) => {
  const nav = document.querySelector('#block-mainnavigation');
  const navChaser = '<span class="chaser" aria-hidden="true"></span>';
  if (!!nav) {
    nav.querySelector('.chaser-wrapper').insertAdjacentHTML('beforeend', navChaser);

    const menu = nav.querySelector('ul.menu-level-0');
    const chaser = nav.querySelector('.chaser');
    const activeItem = nav.querySelector('ul.menu-level-0 > li.active-trail');
    if (!!activeItem) {
      chaser.style.bottom = '0';
      chaser.style.left = activeItem.offsetLeft + 'px';
      chaser.style.width = activeItem.offsetWidth + 'px';
    }

    nav.querySelectorAll('ul.menu-level-0 > li').forEach(item => {
      item.addEventListener('mouseover', handleNavChaser);
      item.addEventListener('focusin', handleNavChaser);
    });
    menu.addEventListener('mouseleave', handleNavChaser);
    menu.addEventListener('focusout', handleNavChaser);
  }
});

function handleNavChaser(e) {
  debugger;
  const nav = document.querySelector('#block-mainnavigation');
  const activeItem = nav.querySelector('ul.menu-level-0 > li.active-trail');
  const chaser = nav.querySelector('#block-mainnavigation .chaser');
  const item = e.target.closest('li');
  const action = e.type;

  if (action == 'mouseover' || action == 'focusin') {
    if (activeItem) {
      chaser.style.left = item.offsetLeft + 'px';
      chaser.style.width = item.offsetWidth + 'px';
    } else {
      chaser.style.left = item.offsetLeft + 'px';
      chaser.style.width = item.offsetWidth + 'px';
      chaser.style.bottom = '0';
    }
  }

  if (action == 'mouseleave' || action == 'focusout') {

    if (activeItem) {
      chaser.style.left = activeItem.offsetLeft + 'px';
      chaser.style.width = activeItem.offsetWidth + 'px';
    } else {
      chaser.style.bottom = '-5px';
    }
  }
}