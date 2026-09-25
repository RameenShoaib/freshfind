import { useEffect, useRef, useState } from "react";
import { bumpVisitCount } from "../utils/storage";

export default function StatusStrip() {
  const [clock, setClock] = useState("--:--");
  const [count, setCount] = useState(0);
  const targetRef = useRef(0);

  useEffect(() => {
    targetRef.current = bumpVisitCount();
    const start = performance.now();
    const duration = 800;
    let frame;
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(targetRef.current * progress));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    const visitorPulse = setInterval(() => {
      targetRef.current += Math.floor(Math.random() * 3) + 1;
      setCount(targetRef.current);
    }, 12000);
    return () => {
      cancelAnimationFrame(frame);
      clearInterval(visitorPulse);
    };
  }, []);

  useEffect(() => {
    const update = () => {
      setClock(new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true }).format(new Date()));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-strip" aria-label="Site status">
      <span>
        <strong>{clock}</strong>
        <small>Device time</small>
      </span>
      <span>
        <strong>{count.toLocaleString()}</strong>
        <small>Visitors today</small>
      </span>
    </div>
  );
}
