import { useCallback } from "react";
import { useToast } from "../context/ToastContext";

export function useShare() {
  const showToast = useToast();

  return useCallback(
    async (title, path) => {
      const url = `${location.origin}${location.pathname}#${path}`;
      if (navigator.share) {
        try {
          await navigator.share({ title, text: url });
          return;
        } catch {
          return;
        }
      }
      try {
        await navigator.clipboard?.writeText(url);
        showToast("Recommendation copied for sharing.");
      } catch {
        showToast("Recommendation copied for sharing.");
      }
    },
    [showToast]
  );
}
