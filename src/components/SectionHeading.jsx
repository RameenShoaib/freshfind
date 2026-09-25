export default function SectionHeading({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subtitle,
  doodle,
  art,
  variant = "pill",
  rule = variant === "pill",
  animate = false
}) {
  return (
    <div className={`section-head${art ? " has-art" : ""}`}>
      <div className="section-head-text">
        {eyebrow ? (
          <span className={`eyebrow-tag ${variant}`}>
            {EyebrowIcon ? (
              <span className="eyebrow-icon">
                <EyebrowIcon size={variant === "pill" ? 15 : 20} />
              </span>
            ) : null}
            {eyebrow}
          </span>
        ) : null}
        <h2 className={animate ? "animate__animated animate__backInLeft" : undefined}>{title}</h2>
        {rule ? <span className="head-rule" aria-hidden="true" /> : null}
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {doodle ? <p className="head-doodle">{doodle}</p> : null}
      {art ? <img className="head-art" src={art} alt="" /> : null}
    </div>
  );
}
