
function swapHtmlElement(node1: HTMLElement, node2: HTMLElement) {
  const afterNode2 = node2.nextElementSibling || null;
  const parent = node2.parentNode || null;
  if (!parent) {
    throw Error('元素必须要有父节点')
  }
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}


export default swapHtmlElement