document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navRight = document.querySelector(".nav-right");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const ctaButtons = document.querySelectorAll(".nav-cta-btn");
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // --- Navigation Logic ---

  // Hamburger Toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      hamburgerBtn.classList.toggle("active");
      navRight.classList.toggle("active");
    });
  }

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburgerBtn) hamburgerBtn.classList.remove("active");
      if (navRight) navRight.classList.remove("active");
    });
  });

  // Close menu on CTA button click
  ctaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (hamburgerBtn) hamburgerBtn.classList.remove("active");
      if (navRight) navRight.classList.remove("active");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (
      navRight &&
      hamburgerBtn &&
      !navRight.contains(e.target) &&
      !hamburgerBtn.contains(e.target)
    ) {
      hamburgerBtn.classList.remove("active");
      navRight.classList.remove("active");
    }
  });

  // --- Scroll Progress Indicator ---
  
  // Create scroll progress bar
  const scrollProgress = document.createElement("div");
  scrollProgress.className = "scroll-progress";
  document.body.prepend(scrollProgress);

  // Update scroll progress
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollProgress.style.transform = `scaleX(${scrollPercent})`;
  };

  // --- Section Reveal on Scroll ---
  
  const sections = document.querySelectorAll("section:not(.hero)");
  
  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally unobserve after revealing
        // observer.unobserve(entry.target);
      }
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  // --- Scroll to Top Logic ---

  if (scrollToTopBtn) {
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --- Combined Scroll Event Handler (Performance Optimized) ---
  
  let ticking = false;
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    
    // Update scroll progress
    updateScrollProgress();
    
    // Navbar scroll effect
    if (mainNav) {
      if (scrollY > 50) {
        mainNav.classList.add("scrolled");
      } else {
        mainNav.classList.remove("scrolled");
      }
    }
    
    // Scroll to top button visibility
    if (scrollToTopBtn) {
      if (scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    }
    
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  // --- Video Handling Logic ---
  const video = document.querySelector(".hero video");

  if (video) {
    // Remove preload attribute to avoid cache errors
    video.removeAttribute("preload");

    // Force video to load
    video.load();

    // Handle video errors
    video.addEventListener("error", function (e) {
      console.error("Video loading error:", e);
      const source = video.querySelector("source");
      if (source) {
        console.error("Failed to load:", source.src);
      }
      // Hide video if it fails to load
      video.style.display = "none";
    });

    // Ensure video plays when loaded
    video.addEventListener("loadeddata", function () {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(function () {
            console.log("Video playing successfully");
          })
          .catch(function (error) {
            console.log("Autoplay prevented:", error);
          });
      }
    });

    // Fallback: attempt to play video on first user interaction
    const tryPlayOnInteraction = function () {
      if (video.paused) {
        video.play().catch(function (error) {
          console.log("Video play failed:", error);
        });
      }
    };

    document.addEventListener("click", tryPlayOnInteraction, { once: true });
    document.addEventListener("scroll", tryPlayOnInteraction, { once: true });
  }

  // --- AOS Animation Init ---
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
      disable: false,
      throttleDelay: 99,
      anchorPlacement: "top-bottom",
    });
  }

  // --- Image Preload Optimization ---
  const imagesToPreload = [
    "./Images/exp.jpg",
    "./Images/partnership.jpg",
    "./Images/Service_Img.jpg",
  ];

  imagesToPreload.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
});
