/**
 * Generate initial array with elements as objects
 * This array will be extended later with elements attributes values
 * like 'position'
 */
const createArrayWithElements = (elements) => {
  const nodeList = elements || document.querySelectorAll('[data-aos]');
  return Array.from(nodeList, node => ({ node }));
};

export default createArrayWithElements;
