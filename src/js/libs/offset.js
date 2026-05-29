/**
 * Get offset of DOM element Helper
 * including these with translation
 *
 * @param  {Node} el [DOM element]
 * @return {Object} [top and left offset]
 */
const offset = (el) => {
  let x = 0;
  let y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    x += el.offsetLeft - (el.tagName !== 'BODY' ? el.scrollLeft : 0);
    y += el.offsetTop - (el.tagName !== 'BODY' ? el.scrollTop : 0);
    el = el.offsetParent;
  }

  return {
    top: y,
    left: x
  };
};

export default offset;
