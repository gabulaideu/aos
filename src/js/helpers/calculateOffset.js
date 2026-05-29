import getOffset from './../libs/offset';

/**
 * Calculate offset
 * basing on element's settings like:
 * - anchor
 * - offset
 *
 * @param  {Node} el [Dom element]
 * @return {number} [Final offset that will be used to trigger animation in good position]
 */
const calculateOffset = (el, optionalOffset) => {
  let elementOffsetTop = 0;
  let additionalOffset = 0;
  const windowHeight = window.innerHeight;
  const attrs = {
    offset: el.getAttribute('data-aos-offset'),
    anchor: el.getAttribute('data-aos-anchor'),
    anchorPlacement: el.getAttribute('data-aos-anchor-placement')
  };

  if (attrs.offset && !isNaN(attrs.offset)) {
    additionalOffset = parseInt(attrs.offset, 10);
  }

  if (attrs.anchor) {
    try {
      const anchorEl = document.querySelector(attrs.anchor);
      if (anchorEl) {
        el = anchorEl;
      }
    } catch (e) {
      console.warn(`AOS: "${attrs.anchor}" is not a valid selector`, e);
    }
  }

  elementOffsetTop = getOffset(el).top;

  switch (attrs.anchorPlacement) {
    case 'top-bottom':
      // Default offset
      break;
    case 'center-bottom':
      elementOffsetTop += el.offsetHeight / 2;
      break;
    case 'bottom-bottom':
      elementOffsetTop += el.offsetHeight;
      break;
    case 'top-center':
      elementOffsetTop += windowHeight / 2;
      break;
    case 'bottom-center':
      elementOffsetTop += windowHeight / 2 + el.offsetHeight;
      break;
    case 'center-center':
      elementOffsetTop += windowHeight / 2 + el.offsetHeight / 2;
      break;
    case 'top-top':
      elementOffsetTop += windowHeight;
      break;
    case 'bottom-top':
      elementOffsetTop += el.offsetHeight + windowHeight;
      break;
    case 'center-top':
      elementOffsetTop += el.offsetHeight / 2 + windowHeight;
      break;
  }

  if (!attrs.anchorPlacement && !attrs.offset && !isNaN(optionalOffset)) {
    additionalOffset = optionalOffset;
  }

  return elementOffsetTop + additionalOffset;
};

export default calculateOffset;
