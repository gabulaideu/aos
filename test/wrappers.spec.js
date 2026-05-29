import AOS from '../src/js/aos';
import { useAOS } from '../src/react/index';
import { AOSPlugin } from '../src/vue/index';

describe('Framework Wrappers -> ', function() {

  describe('React Wrapper (useAOS)', function() {
    it('should initialize and destroy AOS correctly', function() {
      spyOn(AOS, 'init');
      spyOn(AOS, 'destroy');

      const options = { duration: 1000, once: true };
      useAOS(options);

      expect(AOS.init).toHaveBeenCalledWith(options);
      expect(AOS.destroy).toHaveBeenCalled();
    });
  });

  describe('Vue Wrapper (AOSPlugin)', function() {
    var dummyApp;

    beforeEach(function() {
      dummyApp = {
        directive: jasmine.createSpy('directive')
      };
    });

    it('should initialize AOS and register v-aos directive', function() {
      spyOn(AOS, 'init');

      const options = { duration: 500 };
      AOSPlugin.install(dummyApp, options);

      expect(AOS.init).toHaveBeenCalledWith(options);
      expect(dummyApp.directive).toHaveBeenCalledWith('aos', jasmine.any(Object));
    });

    it('should configure element attributes when directive binds', function() {
      AOSPlugin.install(dummyApp);
      const directiveDef = dummyApp.directive.calls.argsFor(0)[1];
      const element = document.createElement('div');
      
      spyOn(AOS, 'refresh');

      // Test string value binding: v-aos="'fade-up'"
      directiveDef.mounted(element, { value: 'fade-up' });
      expect(element.getAttribute('data-aos')).toBe('fade-up');
      expect(AOS.refresh).toHaveBeenCalled();

      // Test object configuration binding
      const configObj = { animation: 'zoom-in', delay: 100, duration: 600, offset: 120, once: true };
      directiveDef.mounted(element, { value: configObj });
      expect(element.getAttribute('data-aos')).toBe('zoom-in');
      expect(element.getAttribute('data-aos-delay')).toBe('100');
      expect(element.getAttribute('data-aos-duration')).toBe('600');
      expect(element.getAttribute('data-aos-offset')).toBe('120');
      expect(element.getAttribute('data-aos-once')).toBe('true');
    });
  });

});
