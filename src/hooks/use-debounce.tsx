import { useState, useEffect } from 'react';

// T is a generic type for the value being debounced
export const useDebounce = <T,>(value: T, delay: number): T => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. It runs every time the 'value' or 'delay'
    // changes, and it cancels the PREVIOUS timer. This is the key to
    // how debouncing works: it resets the timer on every change.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  // Return the debounced value
  return debouncedValue;
};