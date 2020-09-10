// (function () {
//   Drupal.behaviors.mobileNav = {
//     attach: function (context, settings) {
//       const navTriggers = document.querySelectorAll('.mobile-nav-toggle');

//       navTriggers.forEach(trigger => trigger.addEventListener('click', handleMobileNav, true));
//     }
//   };
// })();

// function handleMobileNav(e) {
//   const navTrigger = e.target;
//   const isOpen = navTrigger.ariaExpanded == 'true';

//   if (isOpen) {
//     navTrigger.ariaExpanded = 'false';
//   } else {
//     navTrigger.ariaExpanded = 'true';
//   }
// }