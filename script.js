/* ==========================================================================
   Portfolio Website Interactivity - script.js
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");

  if (menuToggle && navUl) {
    menuToggle.addEventListener("click", () => {
      navUl.classList.toggle("active");
      const isExpanded = navUl.classList.contains("active");
      menuToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Smooth Scrolling & Menu Closing on Mobile
  // --------------------------------------------------------------------------
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu after clicking a link
        if (navUl && navUl.classList.contains("active")) {
          navUl.classList.remove("active");
          if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // --------------------------------------------------------------------------
  // 3. Project Filter Feature
  // --------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectArticles = document.querySelectorAll("#projects article");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active state on buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      projectArticles.forEach((article) => {
        const articleCategory = article.getAttribute("data-category");
        if (category === "all" || articleCategory === category) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 4. Lightbox Effect for Project Images
  // --------------------------------------------------------------------------
  const lightboxModal = document.createElement("div");
  lightboxModal.id = "lightbox-modal";
  lightboxModal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

  const lightboxImg = document.createElement("img");
  lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    `;

  lightboxModal.appendChild(lightboxImg);
  document.body.appendChild(lightboxModal);

  document.querySelectorAll("#projects img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxModal.style.display = "flex";
    });
  });

  lightboxModal.addEventListener("click", () => {
    lightboxModal.style.display = "none";
  });

  // --------------------------------------------------------------------------
  // 5. Contact Form Validation & Real-Time Feedback
  // --------------------------------------------------------------------------
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    function showError(input, message) {
      let errorDiv = input.parentElement.querySelector(".error-message");
      if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.cssText =
          "color: #dc2626; font-size: 0.85rem; margin-top: 0.25rem; font-weight: 500;";
        input.parentElement.appendChild(errorDiv);
      }
      errorDiv.textContent = message;
      input.style.borderColor = "#dc2626";
    }

    function clearError(input) {
      const errorDiv = input.parentElement.querySelector(".error-message");
      if (errorDiv) {
        errorDiv.remove();
      }
      input.style.borderColor = "var(--border-color, #cbd5e1)";
    }

    // Real-time validation listeners
    nameInput.addEventListener("input", () => {
      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required.");
      } else {
        clearError(nameInput);
      }
    });

    emailInput.addEventListener("input", () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
      } else {
        clearError(emailInput);
      }
    });

    messageInput.addEventListener("input", () => {
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message must be at least 10 characters long.");
      } else {
        clearError(messageInput);
      }
    });

    // Form submission handling
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      if (nameInput.value.trim() === "") {
        showError(nameInput, "Name is required.");
        isValid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
      }

      if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Message must be at least 10 characters long.");
        isValid = false;
      }

      if (isValid) {
        alert("Success! Your message has been sent.");
        contactForm.reset();
        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);
      }
    });
  }
});
