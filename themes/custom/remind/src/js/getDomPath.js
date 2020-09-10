function getDomPath(el) {
  const path = [];
  while (el) {
    path.unshift(el);
    el = el.parentElement;
  }
  return path;
}