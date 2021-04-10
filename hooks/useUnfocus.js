/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect } from 'react';

// Improved version of https://codesandbox.io/s/opmco?file=/src/useClickOutside.js
const useUnfocus = (ref, handler) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) return;

      handler(event);
    };

    const keyboardListener = (event) => {
      if (event.code !== 'Escape') return;
      handler(event);
    };

    const validateEventStart = (event) => {
      startedWhenMounted = ref.current;
      startedInside = ref.current && ref.current.contains(event.target);
    };

    document.addEventListener('mousedown', validateEventStart);
    document.addEventListener('touchstart', validateEventStart);
    document.addEventListener('click', listener);
    document.addEventListener('keydown', keyboardListener);

    return () => {
      document.removeEventListener('mousedown', validateEventStart);
      document.removeEventListener('touchstart', validateEventStart);
      document.removeEventListener('click', listener);
      document.removeEventListener('keydown', keyboardListener);
    };
  }, [ref, handler]);
};

export default useUnfocus;
