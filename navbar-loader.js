/**
 * Navbar Loader - Dynamically loads the shared navbar from _navbar.html
 * This ensures consistency across all pages
 */
(function () {
  // Function to load the navbar
  function loadNavbar() {
    // Only proceed if there's no existing mainNav already (to prevent duplicate loading)
    if (document.getElementById("mainNav")) {
      initializeNavbar();
      return;
    }

    // Fetch the navbar HTML file
    fetch("./_navbar.html")
      .then((response) => {
        if (!response.ok) {
          console.warn("Failed to load navbar from _navbar.html");
          return null;
        }
        return response.text();
      })
      .then((html) => {
        if (!html) return;

        // Create a container for the navbar
        const navContainer = document.createElement("div");
        navContainer.innerHTML = html;

        // Insert the navbar at the beginning of the body
        const body = document.body;
        while (navContainer.firstChild) {
          body.insertBefore(navContainer.firstChild, body.firstChild);
        }

        // Initialize navbar functionality
        initializeNavbar();
      })
      .catch((error) => {
        console.warn("Error loading navbar:", error);
      });
  }

  // Function to initialize navbar functionality (from nav.js)
  function initializeNavbar() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navCloseBtn = document.getElementById("navCloseBtn");
    const navPanel = document.getElementById("navPanel");
    const mainNav = document.getElementById("mainNav");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
    const topBar = document.querySelector(".top-bar");

    if (!hamburgerBtn || !navPanel) return;

    const menuTriggers = navPanel.querySelectorAll(".nav-link, .nav-cta-btn");

    function setMenuOpen(open) {
      hamburgerBtn.classList.toggle("active", open);
      navPanel.classList.toggle("active", open);
      if (mobileMenuOverlay) {
        mobileMenuOverlay.classList.toggle("active", open);
        mobileMenuOverlay.setAttribute("aria-hidden", open ? "false" : "true");
      }
      document.body.classList.toggle("nav-open", open);
      hamburgerBtn.setAttribute("aria-expanded", open ? "true" : "false");
      hamburgerBtn.setAttribute(
        "aria-label",
        open ? "Close menu" : "Open menu"
      );

      // Prevent body scroll when menu is open
      if (open) {
        document.body.style.overflow = "hidden";
        navPanel.scrollTop = 0;
      } else {
        document.body.style.overflow = "";
      }
    }

    function closeMenu() {
      setMenuOpen(false);
    }

    function toggleMenu() {
      setMenuOpen(!navPanel.classList.contains("active"));
    }

    hamburgerBtn.addEventListener("click", toggleMenu);
    if (navCloseBtn) navCloseBtn.addEventListener("click", closeMenu);
    if (mobileMenuOverlay)
      mobileMenuOverlay.addEventListener("click", closeMenu);

    menuTriggers.forEach((el) => el.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navPanel.classList.contains("active"))
        closeMenu();
    });

    let scrollTicking = false;

    function updateScrollUI() {
      const scrollY = window.scrollY;
      const hasScrolledNav = scrollY > 24;
      const scrollTopButton = document.getElementById("scrollToTopBtn");

      if (mainNav) mainNav.classList.toggle("scrolled", hasScrolledNav);
      if (topBar) topBar.classList.toggle("scrolled", hasScrolledNav);
      if (scrollTopButton)
        scrollTopButton.classList.toggle("show", scrollY > 300);

      scrollTicking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(updateScrollUI);
          scrollTicking = true;
        }
      },
      { passive: true }
    );
    updateScrollUI();

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link, .nav-cta-btn").forEach((el) => {
      const href = el.getAttribute("href");
      if (!href) return;
      const linkPath = href.split("/").pop();
      if (linkPath === currentPath) el.classList.add("active");
    });

    let resizeTimeout;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          if (window.innerWidth > 992 && navPanel.classList.contains("active")) {
            closeMenu();
          }
        }, 150);
      },
      { passive: true }
    );
  }

  // Load navbar when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNavbar);
  } else {
    loadNavbar();
  }
})();
