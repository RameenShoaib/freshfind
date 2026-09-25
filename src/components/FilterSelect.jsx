import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function FilterSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selected = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const close = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={`filter-select${open ? " open" : ""}`} ref={containerRef}>
      <button className="filter-select-trigger" type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((current) => !current)}>
        <span className="filter-select-value">
          <span className="filter-select-label">{label}</span>
          <strong>{selected.label}</strong>
        </span>
        <ChevronDown className="filter-select-chevron" size={18} />
      </button>
      {open ? (
        <div className="filter-select-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              className={`filter-select-option${option.value === value ? " selected" : ""}`}
              key={option.value}
              type="button"
              role="option"
              aria-selected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {option.value === value ? <Check className="filter-select-check" size={16} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
