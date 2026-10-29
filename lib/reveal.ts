// Swap something page-wide (theme, accent) and reveal the result in a circle growing from `el`.
// Falls back to an instant swap where View Transitions aren't supported or motion is reduced.
export function revealFrom(el: HTMLElement | null, swap: () => void) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!el || !document.startViewTransition || reduce) {
    swap();
    return;
  }
  const r = el.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const vt = document.startViewTransition(swap);
  vt.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  });
}

export const store = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};
