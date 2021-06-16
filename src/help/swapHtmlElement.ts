
function swapHtmlElement(node1: HTMLElement, node2: HTMLElement): void {
  const afterNode2 = node2.nextElementSibling || null;
  const parent = node2.parentNode || null;
  if (!parent) {
    console.error('元素节点必须要有父节点')
    return
  }
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}

export default swapHtmlElement