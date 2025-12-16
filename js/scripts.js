// Minimal JS: theme toggle and smooth scrolling
(function () {
  document.getElementById("year").textContent = new Date().getFullYear();

  // Theme toggle (high contrast)
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.documentElement.classList.toggle("theme-high-contrast");
      // small visual feedback
      themeToggle.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
        { duration: 450 }
      );
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      const target = this.getAttribute("href");
      if (target && target.length > 1) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // Simple form submit (placeholder)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "Thanks! Message sending is disabled in this demo. Replace with your form backend or mailto."
      );
    });
  }

  // Typing effect for the terminal snippet in hero
  const terminalEl = document.getElementById("terminalContent");
  if (terminalEl) {
    const lines = [
      "$ sudo whoami",
      "MohdSabir",
      "$ cat /etc/issue",
      "Ubuntu 22.04 LTS",
      '$ echo "welcome"',
      "welcome",
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let current = "";

    function typeNext() {
      if (lineIndex >= lines.length) return; // stop after the demo lines
      const line = lines[lineIndex];
      if (charIndex < line.length) {
        current += line[charIndex++];
        terminalEl.textContent = current + "\n";
        setTimeout(typeNext, 40 + Math.random() * 40);
      } else {
        // finished a line, pause then move to next
        lineIndex++;
        charIndex = 0;
        current += "\n";
        terminalEl.textContent = current;
        setTimeout(typeNext, 700);
      }
    }

    // kick off typing after a moment
    setTimeout(typeNext, 600);
  }
})();
