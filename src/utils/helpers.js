export function setBtnText(
  btn,
  isLoading,
  defaultText = btn.dataset.defaultText,
  loadingText = btn.dataset.loadingText
) {
  if (!btn) return;

  if (isLoading) {
    btn.textContent = loadingText || "Saving...";
    btn.disabled = true;
  } else {
    btn.textContent = defaultText || "Save";
    btn.disabled = false;
  }
}
