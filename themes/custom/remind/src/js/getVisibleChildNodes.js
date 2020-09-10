function getVisibleChildNodes(input) {

  if (!input instanceof Node) {
    return false;
  } else {
    const filteredNodes =
      // Create array from child nodes
      Array.from(input.childNodes)

        // Remove comments
        .filter(function (node) {
          if (
            node instanceof Element &&
            node.getBoundingClientRect().width &&
            !node.classList.contains('visually-hidden')) {
            return node;
          } else if (
            node.nodeName == '#text' &&
            node.wholeText.replace(/\s*/g, "") != "") {
            return node;
          }
        });

    return filteredNodes
  }
}