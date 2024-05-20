import { useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePathname(): ReturnType<typeof useSyncExternalStore> {
  const location = useLocation();

  const subscribe = (callback: (arg0: string) => void) => {
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const wrappedCallback = () => {
      callback(location.pathname);
    };

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      wrappedCallback();
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      wrappedCallback();
    };

    window.addEventListener('popstate', wrappedCallback);

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', wrappedCallback);
    };
  };

  const getSnapshot = () => location.pathname;
  const getServerSnapshot = () => '';

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};