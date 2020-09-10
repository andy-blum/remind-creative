(function () {
  Drupal.behaviors.modals = {
    attach: function (context, settings) {
      const modals = document.querySelectorAll("[modal]");

      let modalBox = '';
      if (document.querySelector('#modal-box')) {
        modalBox = document.querySelector('#modal-box');
      } else {
        modalBox = document.createElement('div');
        modalBox.id = "modal-box";
        document.querySelector('body').insertAdjacentElement('beforeend', modalBox);
      }

      modals.forEach(modal => {
        modalBox.insertAdjacentElement('beforeend', modal);
        const modalID = modal.getAttribute('modal');
        const title = modal.querySelector(".modal-title");
        const trigger = document.querySelector(`[modal-trigger="${modalID}"]`);

        modal.setAttribute("role", "dialog");
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute("aria-labelledby", `${modalID}-title`);
        if (!modal.querySelector('button.modal-close')) {
          modal.insertAdjacentHTML("beforeend", `
          <button class='modal-close' onclick='focusTrap.destroy()'>
            <span class='visually-hidden'>Close Overlay</span>
            <svg width="30" height="30"><use xlink:href='#icon-close'></use></svg>
          </button>`);
        }
        trigger.addEventListener("click", openModal, true);
        if (title) {
          title.setAttribute("id", `${modalID}-title`);
        }
      });
    }
  };
})();

function openModal(e) {
  const modalBox = document.querySelector('#modal-box');
  const trigger = e.target.closest('button');
  const modalID = trigger.getAttribute('modal-trigger');
  const modal = document.querySelector(`[modal="${modalID}"]`);
  modal.addEventListener('exitfocustrap', closeModal);
  modalBox.style.zIndex = "998";
  modalBox.style.visibility = "visible";
  modalBox.classList.add('active');
  modal.classList.add('active');
  trigger.ariaExpanded = true;
  document.documentElement.style.overflow = 'hidden';
  setTimeout(function () {
    trapFocus(modal, trigger);
  }, 500);
}

function closeModal(e) {
  const modalBox = document.querySelector('#modal-box');
  const modal = e.target;
  const modalID = modal.getAttribute('modal');
  const trigger = document.querySelector(`[modal-trigger="${modalID}"]`);

  modal.classList.remove('active');
  modalBox.classList.remove('active');
  setTimeout(function () {
    modalBox.style.zIndex = '';
    modalBox.style.visibility = "hidden";
  }, 750);
  trigger.ariaExpanded = 'false';
  document.documentElement.style.overflow = '';


}