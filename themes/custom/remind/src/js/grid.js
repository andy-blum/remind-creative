(function () {
  const gridSelector = "[grid]";

  const observer = {
    target: document.querySelector('body'),
    options: {
      attributes: true,
      childList: true,
      subtree: true
    },
    callback: function (record) {
      const mutations = Array.prototype.slice.call(record);
      mutations.forEach(function (mutation) {

        if (mutation.type === 'attributes') {
          if (!mutation.attributeType === 'class') {
            // Don't initGrid on class change or you'll loop yourself to death.
            initializeGrid();
          }
        } else {
          initializeGrid();
        }
      });


    }
  }

  const mutationObserver = new MutationObserver(observer.callback);




  mutationObserver.observe(observer.target, observer.options);

  window.addEventListener('resize', initializeGrid);

  function initializeGrid() {

    const grids = Array.prototype.slice.call(document.querySelectorAll(gridSelector));

    grids.forEach(function (grid) {
      grid.classList.add('grid');

      const cells = Array.prototype.slice.call(grid.children);
      cells.forEach(function (cell) {

        const marginTop = parseInt(getComputedStyle(cell).marginTop);
        let cellOffset;
        if (cell.offsetParent === grid) {
          cellOffset = cell.offsetTop - marginTop;
        } else {
          cellOffset = grid.offsetTop - (cell.offsetTop - marginTop);
        }

        if (cellOffset === 0) {
          cell.classList.add('grid-first-row');
        } else {
          cell.classList.remove('grid-first-row');
        }
      });
    });
  }
})();