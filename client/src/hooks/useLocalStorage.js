import { useState, useEffect } from "react";

/** Keeps state data synced with localStorage
 *
 * This creates `item` as state and look in localStorage for current value (defaults to `firstValue`)
 *
 * When `item` changes, effect re-runs:
 * - if new state is null, removes from localStorage
 * - else, updates localStorage
 */
function useLocalStorage(key, firstValue = null) {
  // retrieve stored key, if present.
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    // whenever the item changes, we want to update the key/item of localStorage with whatever that item is
    [key, item]
  );

  return [item, setItem];
}

export default useLocalStorage;
