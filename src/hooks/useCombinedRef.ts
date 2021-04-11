import { useRef, useEffect, ForwardedRef, MutableRefObject } from 'react';

/* typed version of https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
   using this suggstion https://medium.com/@meir/thx-daniel-ostapenko-this-helps-ce530068ae97
*/

/**
 * `useCombinedRef` returns a mutable ref object which allows access to the `.current` property on a forwarded ref (`ref`).
 *
 * @see https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */
export default function useCombinedRef(ref: ForwardedRef<HTMLElement>): MutableRefObject<HTMLElement | null> {
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
}
