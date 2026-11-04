type ZijraProperty = string | number | boolean | null;

type ZijraCall = [name: string, properties?: Record<string, ZijraProperty>];

type ZijraTracker = {
  (...args: ZijraCall): unknown;
  q?: ZijraCall[];
};

declare global {
  interface Window {
    zijra?: ZijraTracker;
  }
}

/* Browser-only helper. Safe to call before the deferred tracker has loaded.
   Aggregate mode: this queues a named event and never identifies a visitor. */
export function trackZijra(
  name: string,
  properties?: Record<string, ZijraProperty>,
): boolean {
  if (typeof window === "undefined") return false;

  if (!window.zijra) {
    const queue: ZijraTracker = (...args) => {
      queue.q = queue.q || [];
      queue.q.push(args);
    };
    window.zijra = queue;
  }

  window.zijra(name, properties);
  return true;
}
