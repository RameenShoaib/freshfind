import { Moon, Sunrise, Sun, CloudSun, Leaf, Sunset } from "lucide-react";

const ICONS = { night: Moon, sunrise: Sunrise, morning: Sun, midday: CloudSun, afternoon: Leaf, evening: Sunset };

export default function MoodIcon({ kind, size = 16 }) {
  const Icon = ICONS[kind] || Sun;
  return <Icon size={size} aria-hidden="true" />;
}

/** Sunrise markets get an orange sun badge, everything else a green leaf badge. */
export function isSunny(kind) {
  return kind === "sunrise";
}
