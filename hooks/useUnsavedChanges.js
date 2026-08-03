"use client";

import { useEffect, useCallback } from "react";

export default function useUnsavedChanges({
  isDirty,
  message = "You have unsaved changes. Are you sure you want to leave this page?",
}) {
  const confirmLeave = useCallback(() => {
    if (!isDirty) return true;

    return window.confirm(message);
  }, [isDirty, message]);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handleDocumentClick = (e) => {
      const anchor = e.target.closest("a");

      if (!anchor) return;

      if (!confirmLeave()) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [isDirty, confirmLeave]);

  return confirmLeave;
}