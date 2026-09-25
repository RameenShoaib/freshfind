export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function todayName(date = new Date()) {
  return DAYS[date.getDay()];
}

export function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour < 12 ? "AM" : "PM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function minutes(time) {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

export function currentMarketSlot(market, date = new Date()) {
  const now = date.getHours() * 60 + date.getMinutes();
  const todayIndex = date.getDay();
  const todaySlot = market.schedule.find((item) => item.day === DAYS[todayIndex]);
  const previousDay = DAYS[(todayIndex + 6) % 7];
  const previousSlot = market.schedule.find((item) => item.day === previousDay);

  if (todaySlot) {
    const open = minutes(todaySlot.open);
    const close = minutes(todaySlot.close);
    if (close > open && now >= open && now <= close) return todaySlot;
    if (close <= open && now >= open) return todaySlot;
  }

  if (previousSlot && minutes(previousSlot.close) <= minutes(previousSlot.open) && now <= minutes(previousSlot.close)) {
    return previousSlot;
  }

  return null;
}

export function isMarketOpen(market, date = new Date()) {
  return Boolean(currentMarketSlot(market, date));
}

export function marketStatus(market, date = new Date()) {
  const day = todayName(date);
  const slot = market.schedule.find((item) => item.day === day);
  const openSlot = currentMarketSlot(market, date);
  if (openSlot) return { label: "Open Now", className: "open", detail: `Open until ${formatTime(openSlot.close)}` };
  if (!slot) return { label: "Closed", className: "closed", detail: "Not scheduled today" };
  const now = date.getHours() * 60 + date.getMinutes();
  const open = minutes(slot.open);
  const close = minutes(slot.close);
  if (now < open && open - now <= 120) return { label: "Opening Soon", className: "soon", detail: `Opens at ${formatTime(slot.open)}` };
  return { label: "Closed", className: "closed", detail: `Today: ${formatTime(slot.open)} to ${formatTime(slot.close)}` };
}

export function nextOpenDay(market, date = new Date()) {
  const today = date.getDay();
  for (let offset = 0; offset < 7; offset += 1) {
    const day = DAYS[(today + offset) % 7];
    const slot = market.schedule.find((item) => item.day === day);
    if (slot) return { offset, day, time: slot.open };
  }
  return { offset: 99, day: "Unavailable", time: "" };
}

export function marketMood(market) {
  const opens = market.schedule.map((slot) => minutes(slot.open));
  const closes = market.schedule.map((slot) => minutes(slot.close));
  const avgOpen = opens.reduce((a, b) => a + b, 0) / opens.length;
  const maxClose = Math.max(...closes);
  if (maxClose >= 19 * 60) return { kind: "night", icon: "\u{1F319}", label: "Night Market" };
  if (avgOpen < 7 * 60) return { kind: "sunrise", icon: "\u{1F305}", label: "Sunrise Market" };
  if (avgOpen < 10 * 60) return { kind: "morning", icon: "\u2600\uFE0F", label: "Morning Market" };
  if (avgOpen < 13 * 60) return { kind: "midday", icon: "\u{1F324}\uFE0F", label: "Midday Market" };
  if (avgOpen < 16 * 60) return { kind: "afternoon", icon: "\u{1F342}", label: "Afternoon Market" };
  return { kind: "evening", icon: "\u{1F307}", label: "Evening Market" };
}

export function iconLabel(icon) {
  return (
    {
      leaf: "\u{1F96C}",
      berry: "\u{1F353}",
      dairy: "\u{1F95B}",
      herb: "\u{1F33F}",
      round: "\u{1F345}",
      fruit: "\u{1F34E}",
      root: "\u{1F955}",
      jar: "\u{1F36F}",
      oval: "\u{1F95A}"
    }[icon] || "\u{1F957}"
  );
}

export function categorySlug(category) {
  return String(category || "other").toLowerCase().replace(/[^a-z]+/g, "-");
}

export function haversine(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const radius = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return Math.round(radius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

export function distanceFor(market) {
  return Number(market.distanceKm ?? 999);
}
