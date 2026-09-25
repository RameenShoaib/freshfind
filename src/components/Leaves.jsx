/** Decorative leaf clusters pinned to the top corners of the page. */
function Leaf({ className, fill, rotate = 0, size = 90 }) {
  return (
    <svg className={`bg-leaf ${className}`} width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true">
      <path d="M2 30 C22 -6 68 -6 98 30 C68 66 22 66 2 30Z" fill={fill} />
      <path d="M4 30 H92" stroke="rgba(255,255,255,.45)" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export default function Leaves() {
  return (
    <div className="bg-leaves" aria-hidden="true">
      <Leaf className="l1" fill="#5aa35f" rotate={-38} size={120} />
      <Leaf className="l2" fill="#88bd6b" rotate={-12} size={96} />
      <Leaf className="l3" fill="#3f8b52" rotate={-62} size={84} />
      <Leaf className="r1" fill="#6cad62" rotate={148} size={110} />
      <Leaf className="r2" fill="#93c473" rotate={122} size={90} />
      <Leaf className="r3" fill="#4a9a58" rotate={170} size={80} />
    </div>
  );
}
