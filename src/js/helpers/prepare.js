import calculateOffset from './calculateOffset';

const prepare = ($elements, options) => {
  $elements.forEach((el) => {
    el.node.classList.add('aos-init');
    el.position = calculateOffset(el.node, options.offset);
  });
  return $elements;
};

export default prepare;
