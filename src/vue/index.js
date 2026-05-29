import AOS from '../js/aos';

/**
 * Vue Plugin and Directive for AOS.
 * Supports both Vue 2 and Vue 3.
 */
export const AOSPlugin = {
  install(app, defaultOptions = {}) {
    AOS.init(defaultOptions);

    const directiveConfig = {
      mounted(el, binding) {
        setupElement(el, binding);
      },
      unmounted() {
        AOS.refresh();
      },
      // Vue 2 fallback compatibility hooks
      inserted(el, binding) {
        setupElement(el, binding);
      },
      unbind() {
        AOS.refresh();
      }
    };

    // Register v-aos directive
    if (app.directive) {
      app.directive('aos', directiveConfig);
    }
  }
};

function setupElement(el, binding) {
  if (binding.value) {
    if (typeof binding.value === 'string') {
      el.setAttribute('data-aos', binding.value);
    } else if (typeof binding.value === 'object') {
      // Support object configuration: v-aos="{ animation: 'fade-up', delay: 100, once: true }"
      if (binding.value.animation) {
        el.setAttribute('data-aos', binding.value.animation);
      }
      if (binding.value.delay !== undefined) {
        el.setAttribute('data-aos-delay', binding.value.delay);
      }
      if (binding.value.duration !== undefined) {
        el.setAttribute('data-aos-duration', binding.value.duration);
      }
      if (binding.value.offset !== undefined) {
        el.setAttribute('data-aos-offset', binding.value.offset);
      }
      if (binding.value.once !== undefined) {
        el.setAttribute('data-aos-once', binding.value.once);
      }
    }
  }

  if (binding.arg) {
    el.setAttribute('data-aos', binding.arg);
  }

  AOS.refresh();
}

export default AOSPlugin;
