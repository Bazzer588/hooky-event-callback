import { useLayoutEffect, useMemo, useRef, useCallback } from "react"; // eslint-disable-line no-unused-vars
/*
export default function useEventCallback (fn) {
    const ref = useRef();
    useLayoutEffect(() => {
        ref.current = fn;
    });
    return useMemo(() => {
        //return (...args) => (0, ref.current)(...args);
        return (...args) => ref.current(...args);
    }, []);
}
*/

/*
    https://github.com/facebook/react/issues/14099
    ==============================================

    useLayoutEffect ... fires synchronously after all DOM mutations

    useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs)

    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

    // the magic
    return useMemo(() => (...args) => (0, ref.current)(...args), []);
*/

/** this one is the code from
 *  https://reactjs.org/docs/hooks-faq.html
 *  modified to pass args to the callback
 */

export default function useEventCallback (fn, dependencies = []) {
    const ref = useRef(() => {
        throw new Error('14099'); // if called during render
    });

    useLayoutEffect(() => {
        ref.current = fn;
    }, [fn, ...dependencies]);

    return useCallback((...args) => {
        return ref.current(...args);
    }, [ref]);
}
