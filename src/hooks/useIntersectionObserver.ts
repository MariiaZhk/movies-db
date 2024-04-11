import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
  onIntersection?(): void;
}

type HookReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];

export function useIntersectionObserver(options: Options = {}): HookReturnType {
  const targetRef = useRef(null);
  const {
    threshold = 1.0,
    root = null,
    rootMargin = "0px",
    onIntersection,
  } = options;

  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onIntersection?.();
        }
        setEntry(entry);
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return function () {
      if (currentRef) observer.disconnect();
    };
  }, [onIntersection, root, rootMargin, threshold]);

  return [targetRef, entry];
}

