function toggleFullscreen(element) {
    if (window.innerWidth > 768) { // Allow fullscreen only on larger screens
        if (!element.classList.contains("fullscreen")) {
            element.classList.add("fullscreen");
        } else {
            element.classList.remove("fullscreen");
        }
    }
}

// Separate function for mobile hover toggle
document.querySelectorAll(".container").forEach(container => {
    let isHoverActive = false;

    container.addEventListener("click", () => {
        if (window.innerWidth <= 768) { // Apply effect only for mobile screens
            isHoverActive = !isHoverActive; // Toggle state

            if (isHoverActive) {
                container.querySelector(".overlay").style.opacity = "1"; // Show hover effect
            } else {
                container.querySelector(".overlay").style.opacity = "0"; // Remove hover effect
            }
        }
    });
});