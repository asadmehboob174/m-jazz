"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const pills = [
  "Net-metering", "Lithium", "Drag me!", "Hybrid", "LESCO file", "Elevated stand", "Wi-Fi app",
  "CCTV", "Drag me!", "Touch boards", "UPS repair", "SMD rental", "Panel cleaning", "Drag me!",
];

// Tags drop in with real physics when the card scrolls into view.
// Hover a tag to freeze it in place; grab it to drag or throw it.
export default function FallingPills() {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const root = box.current!;
    const { Engine, Bodies, Body, Composite, Constraint } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 0.16 }, enableSleeping: true }); // low gravity = slow, floaty fall
    let W = root.clientWidth;
    let H = root.clientHeight;

    const wall = (x: number, y: number, w: number, h: number) => Bodies.rectangle(x, y, w, h, { isStatic: true });
    const floor = wall(W / 2, H + 50, W * 3, 100);
    const left = wall(-50, -H / 2, 100, H * 4); // spans well above the box down past the floor
    const right = wall(W + 50, -H / 2, 100, H * 4);
    Composite.add(engine.world, [floor, left, right]);

    const bodies = els.current.map((el, i) => {
      const w = el!.offsetWidth;
      const h = el!.offsetHeight;
      const b = Bodies.rectangle(40 + ((i * 97) % Math.max(W - 80, 1)), -80 - i * 95, w, h, {
        chamfer: { radius: h / 2 },
        restitution: 0.35,
        friction: 0.3,
        frictionAir: 0.04,
        angle: (((i * 47) % 70) - 35) * (Math.PI / 180),
      });
      return { b, el: el!, w, h };
    });
    Composite.add(engine.world, bodies.map(({ b }) => b));

    // Hover freezes a tag; dragging uses a spring to the pointer.
    let grab: Matter.Constraint | null = null;
    let grabbed: Matter.Body | null = null;
    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const cleanups: (() => void)[] = [];
    bodies.forEach(({ b, el }) => {
      const enter = (e: PointerEvent) => { if (e.pointerType === "mouse" && !grab) Body.setStatic(b, true); };
      const leave = () => { if (grabbed !== b && b.isStatic) Body.setStatic(b, false); };
      const down = (e: PointerEvent) => {
        e.preventDefault();
        if (b.isStatic) Body.setStatic(b, false);
        Matter.Sleeping.set(b, false);
        const p = local(e);
        grabbed = b;
        grab = Constraint.create({ pointA: p, bodyB: b, pointB: { x: p.x - b.position.x, y: p.y - b.position.y }, stiffness: 0.12, damping: 0.1, length: 0 });
        Composite.add(engine.world, grab);
        el.setPointerCapture(e.pointerId);
      };
      const move = (e: PointerEvent) => { if (grab && grabbed === b) grab.pointA = local(e); };
      const up = () => {
        if (grab) Composite.remove(engine.world, grab);
        grab = null;
        grabbed = null;
      };
      const poke = () => wake();
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerdown", poke);
      el.addEventListener("pointerleave", poke);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      cleanups.push(() => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerdown", poke);
        el.removeEventListener("pointerleave", poke);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
      });
    });

    const draw = () => {
      for (const { b, el, w, h } of bodies) {
        el.style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
      }
    };
    draw();

    let raf = 0;
    let last = 0;
    let started = false;
    let visible = false;
    let running = false;
    const wake = () => {
      if (running || !visible) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const tick = (t: number) => {
      const dt = last ? Math.min(t - last, 1000 / 60) : 1000 / 60;
      last = t;
      Engine.update(engine, dt);
      draw();
      // Once every tag has landed and nothing is held, stop until the next interaction.
      if (!grab && bodies.every(({ b }) => b.isSleeping || b.isStatic)) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    // Start dropping when the card is on screen, pause the loop when it isn't.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!started) {
          started = true;
          bodies.forEach(({ el }) => (el.style.opacity = "1"));
        }
        visible = true;
        wake();
      } else {
        visible = false;
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { threshold: 0.3 });
    io.observe(root);

    const ro = new ResizeObserver(() => {
      W = root.clientWidth;
      H = root.clientHeight;
      Body.setPosition(floor, { x: W / 2, y: H + 50 });
      Body.setPosition(right, { x: W + 50, y: -H / 2 });
    });
    ro.observe(root);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={box} className="grid-bg relative h-[380px] overflow-hidden border-fg/[0.07] md:h-[440px] md:border-l">
      {pills.map((p, i) => {
        const hot = p === "Drag me!";
        return (
          <button
            type="button"
            key={i}
            ref={(el) => { els.current[i] = el; }}
            className={`absolute left-0 top-0 cursor-grab touch-none select-none whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-semibold opacity-0 shadow-lg transition-[opacity,box-shadow] duration-500 will-change-transform hover:shadow-[0_0_0_3px_var(--color-sun)] active:cursor-grabbing ${
              hot ? "bg-sun text-black" : "bg-warm text-sun ring-1 ring-sun/30"
            }`}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
}
