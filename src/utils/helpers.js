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

export function handleSubmit(request, evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;

  // show loading state using your existing helper
  setBtnText(submitBtn, true);

  request()
    .then(() => {
      // reset the form on success
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      // restore button text / state
      setBtnText(submitBtn, false);
    });
}
