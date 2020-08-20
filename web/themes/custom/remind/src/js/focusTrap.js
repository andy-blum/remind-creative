const focusTrap = {
  active: false,
  trigger: false,
  container: false,
  selectables: 'a[href],area[href],input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex="0"]',
  items: [],
  init: function (container, trigger) {
    this.active = true;
    this.container = container;
    this.items = [];
    this.trigger = trigger;
    trap = this;
    Array.from(container.querySelectorAll(focusTrap.selectables)).forEach(function (el) {
      if (el.getBoundingClientRect().width > 0) {
        trap.items.push(el);
      }
    });

    if (this.container.hasAttribute('tabindex')) {
      this.container.focus();
    } else {
      this.items[0].focus();
    }
    document.addEventListener('click', this.clickListener);
    document.addEventListener('keydown', this.keyListener);
  },
  clickListener: function (e) {
    const trap = focusTrap;
    const path = getDomPath(e.target);
    if (!path.includes(trap.container)) {
      focusTrap.destroy();
    }
  },
  keyListener: function (e) {
    //handle tab
    if (e.keyCode === 9) {
      e.preventDefault();

      const i = focusTrap.items.indexOf(e.target);
      let j;

      if (e.shiftKey) {
        if (i == 0) {
          j = focusTrap.items.length - 1;
        } else {
          j = i - 1;
        }
      } else {
        if (i == (focusTrap.items.length - 1)) {
          j = 0
        } else {
          j = i + 1;
        }
      }
      focusTrap.items[j].focus();
    }

    //handle escape
    if (e.keyCode === 27) {
      trap.destroy();
    }
  },
  destroy: function () {
    if (this.active) {
      if (this.trigger) {
        this.trigger.focus();
      }
      this.container.dispatchEvent(new CustomEvent('exitfocustrap', { bubbles: true, cancelable: true }));
      this.active = false;
      this.trigger = false;
      this.container = false;
      this.items = [];
      document.removeEventListener('click', this.clickListener);
      document.removeEventListener('keydown', this.keyListener);
    } else {
      console.error('Cannot destroy inactive focus trap.')
    }
  }
};

function trapFocus(container, trigger) {
  focusTrap.init(container, trigger);
}