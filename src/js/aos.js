// Helpers
import detect from './helpers/detector';
import prepare from './helpers/prepare';
import elements from './helpers/elements';

/**
 * Private variables
 */
let $aosElements = [];
let initialized = false;
let observers = [];
let mutationObserver = null;
let resizeListener = null;
let orientationListener = null;
let loadListener = null;
let scrollListener = null;

/**
 * Default options
 */
let options = {
  offset: 120,
  delay: 0,
  easing: 'ease',
  duration: 400,
  disable: false,
  once: false,
  startEvent: 'DOMContentLoaded',
  throttleDelay: 99,
  debounceDelay: 50,
  disableMutationObserver: false,
};

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const throttle = (fn, delay) => {
  let timer = null;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

const cleanObservers = () => {
  observers.forEach(obs => obs.disconnect());
  observers = [];
};

const checkPendingElements = () => {
  const scrollY = window.scrollY || window.pageYOffset;
  const windowHeight = window.innerHeight;

  $aosElements.forEach(el => {
    const node = el.node;
    if (node.classList.contains('aos-init') && !node.classList.contains('aos-animate')) {
      const offsetAttr = node.getAttribute('data-aos-offset');
      const offsetVal = (offsetAttr && !isNaN(offsetAttr)) ? parseInt(offsetAttr, 10) : options.offset;
      const nodeHeight = node.offsetHeight;
      
      const isInside = (scrollY + windowHeight >= el.position) &&
                       (scrollY <= el.position - offsetVal + nodeHeight);
      if (isInside) {
        node.classList.add('aos-animate');
      }
    }
  });
};

const setupObservers = (elementsList, globalOptions) => {
  cleanObservers();

  elementsList.forEach(el => {
    const node = el.node;

    // Read attributes or fallback to options
    const onceAttr = node.getAttribute('data-aos-once');
    const once = onceAttr ? (onceAttr === 'true') : globalOptions.once;

    const offsetAttr = node.getAttribute('data-aos-offset');
    const offsetVal = (offsetAttr && !isNaN(offsetAttr)) ? parseInt(offsetAttr, 10) : globalOptions.offset;

    const anchorSelector = node.getAttribute('data-aos-anchor');
    const anchorEl = anchorSelector ? (document.querySelector(anchorSelector) || node) : node;

    const placement = node.getAttribute('data-aos-anchor-placement') || globalOptions.anchorPlacement || 'top-bottom';

    // Calculate vertical offset relative to viewport bottom
    const windowHeight = window.innerHeight;
    const nodeHeight = anchorEl.offsetHeight;
    let Y = offsetVal;

    switch (placement) {
      case 'top-bottom':
        break;
      case 'center-bottom':
        Y += nodeHeight / 2;
        break;
      case 'bottom-bottom':
        Y += nodeHeight;
        break;
      case 'top-center':
        Y += windowHeight / 2;
        break;
      case 'bottom-center':
        Y += windowHeight / 2 + nodeHeight;
        break;
      case 'center-center':
        Y += windowHeight / 2 + nodeHeight / 2;
        break;
      case 'top-top':
        Y += windowHeight;
        break;
      case 'bottom-top':
        Y += nodeHeight + windowHeight;
        break;
      case 'center-top':
        Y += nodeHeight / 2 + windowHeight;
        break;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const scrollY = window.scrollY || window.pageYOffset;
        const isCurrentlyInside = (scrollY + windowHeight >= el.position) &&
                                  (scrollY <= el.position - Y + nodeHeight);

        if (entry.isIntersecting) {
          if (isCurrentlyInside) {
            node.classList.add('aos-animate');
            if (once) {
              observer.unobserve(anchorEl);
            }
          }
        } else {
          if (!once && !isCurrentlyInside) {
            node.classList.remove('aos-animate');
          }
        }
      });
    }, {
      rootMargin: `9999px 0px -${Y}px 0px`,
      threshold: 0
    });

    observer.observe(anchorEl);
    observers.push(observer);
  });
};

/**
 * Refresh AOS
 */
const refresh = (initialize = false) => {
  // Allow refresh only when it was first initialized on startEvent
  if (initialize) initialized = true;

  if (initialized) {
    $aosElements = prepare($aosElements, options);
    setupObservers($aosElements, options);
    checkPendingElements();
    return $aosElements;
  }
};

/**
 * Hard refresh
 */
const refreshHard = () => {
  $aosElements = elements();
  refresh();
};

/**
 * Disable AOS
 */
const disable = () => {
  cleanObservers();
  $aosElements.forEach(el => {
    el.node.removeAttribute('data-aos');
    el.node.removeAttribute('data-aos-easing');
    el.node.removeAttribute('data-aos-duration');
    el.node.removeAttribute('data-aos-delay');
    el.node.classList.remove('aos-animate');
  });
};

/**
 * Destroy AOS (Cleanup all listeners and observers for SPA frameworks)
 */
const destroy = () => {
  cleanObservers();

  if (resizeListener) {
    window.removeEventListener('resize', resizeListener);
    resizeListener = null;
  }
  if (orientationListener) {
    window.removeEventListener('orientationchange', orientationListener);
    orientationListener = null;
  }
  if (loadListener) {
    window.removeEventListener('load', loadListener);
    loadListener = null;
  }
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
    scrollListener = null;
  }
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }

  initialized = false;
};

/**
 * Check if AOS should be disabled
 */
const isDisabled = (optionDisable) => {
  return optionDisable === true ||
    (optionDisable === 'mobile' && detect.mobile()) ||
    (optionDisable === 'phone' && detect.phone()) ||
    (optionDisable === 'tablet' && detect.tablet()) ||
    (typeof optionDisable === 'function' && optionDisable() === true);
};

/**
 * Initializing AOS
 */
const init = (settings) => {
  options = Object.assign(options, settings);
  $aosElements = elements();

  // Detect not supported browsers (<=IE9)
  const browserNotSupported = document.all && !window.atob;

  // Disable if needed
  if (isDisabled(options.disable) || browserNotSupported) {
    disable();
    return $aosElements;
  }

  // Set global variables on body
  const body = document.querySelector('body');
  if (body) {
    body.setAttribute('data-aos-easing', options.easing);
    body.setAttribute('data-aos-duration', options.duration);
    body.setAttribute('data-aos-delay', options.delay);
  }

  // Setup startEvent
  if (options.startEvent === 'DOMContentLoaded' &&
    ['complete', 'interactive'].indexOf(document.readyState) > -1) {
    refresh(true);
  } else if (options.startEvent === 'load') {
    window.addEventListener(options.startEvent, () => {
      refresh(true);
    });
  } else {
    document.addEventListener(options.startEvent, () => {
      refresh(true);
    });
  }

  // Always register a window load event to ensure positions are recalculated after full asset loads
  if (options.startEvent !== 'load') {
    if (loadListener) {
      window.removeEventListener('load', loadListener);
    }
    loadListener = () => {
      refresh();
    };
    window.addEventListener('load', loadListener);
  }

  // Window resize listeners (cleanup if already exists)
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener);
  }
  if (orientationListener) {
    window.removeEventListener('orientationchange', orientationListener);
  }

  resizeListener = debounce(() => refresh(), options.debounceDelay);
  orientationListener = debounce(() => refresh(), options.debounceDelay);

  window.addEventListener('resize', resizeListener);
  window.addEventListener('orientationchange', orientationListener);

  if (!scrollListener) {
    scrollListener = throttle(checkPendingElements, 100);
    window.addEventListener('scroll', scrollListener);
  }

  // MutationObserver setup (cleanup if already exists)
  if (mutationObserver) {
    mutationObserver.disconnect();
    mutationObserver = null;
  }

  if (!options.disableMutationObserver) {
    const MutationObserverClass = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    if (MutationObserverClass) {
      mutationObserver = new MutationObserverClass((mutations) => {
        let shouldRefresh = false;
        mutations.forEach(mutation => {
          const allNodes = [
            ...Array.from(mutation.addedNodes),
            ...Array.from(mutation.removedNodes)
          ];
          
          const hasAosNode = allNodes.some(node => {
            if (node.nodeType !== 1) return false;
            if (node.hasAttribute('data-aos')) return true;
            if (node.querySelector('[data-aos]')) return true;
            return false;
          });

          if (hasAosNode) {
            shouldRefresh = true;
          }
        });

        if (shouldRefresh) {
          refreshHard();
        }
      });

      mutationObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
  }

  return $aosElements;
};

export default {
  init,
  refresh,
  refreshHard,
  destroy
};
