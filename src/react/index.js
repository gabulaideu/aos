import { useEffect } from 'react';
import AOS from '../js/aos';

/**
 * React Hook to initialize and manage AOS lifecycle.
 *
 * @param {Object} options - AOS initialization options
 */
export function useAOS(options) {
  useEffect(() => {
    AOS.init(options);
    return () => {
      AOS.destroy();
    };
  }, [options]);
}

export default useAOS;
