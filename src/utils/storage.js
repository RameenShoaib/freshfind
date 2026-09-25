const VISITS_KEY = "freshfind-visits";

export function bumpVisitCount() {
  const visits = Number(localStorage.getItem(VISITS_KEY) || "0") + 1;
  localStorage.setItem(VISITS_KEY, String(visits));
  return visits;
}
