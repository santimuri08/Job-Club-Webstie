// Smooth scroll for same-page anchor links only using event delegation
// Event delegation is more efficient and works with dynamically added elements
document.addEventListener("click", (e) => {
  // Check if the clicked element is an anchor link
  const anchor = e.target.closest('a[href^="#"]:not([href="#"])');

  if (!anchor) {
    return;
  }

  const targetId = anchor.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    e.preventDefault();
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Update URL without jumping
    history.pushState(null, null, targetId);
  }
});
