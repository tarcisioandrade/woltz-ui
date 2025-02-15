import { useEffect } from "react";

function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => void,
  ignoredRefs: React.RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (
        ignoredRefs.some((ignoredRef) =>
          ignoredRef.current?.contains(event.target as Node)
        )
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoredRefs]);
}

export { useOnClickOutside };
