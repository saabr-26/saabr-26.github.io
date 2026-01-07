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

  // Simple form submit — build a mailto link so users can email directly
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (document.getElementById("name") || {}).value || "";
      const email = (document.getElementById("email") || {}).value || "";
      const message = (document.getElementById("message") || {}).value || "";

      if (!message.trim()) {
        alert("Please enter a message before sending.");
        return;
      }

      const to = "itssbn123@gmail.com"; // change to your preferred recipient
      const subject = `Portfolio message from ${
        name || email || "website visitor"
      }`;
      const bodyLines = [];
      if (name) bodyLines.push(`Name: ${name}`);
      if (email) bodyLines.push(`Email: ${email}`);
      bodyLines.push("\nMessage:\n" + message);
      const body = encodeURIComponent(bodyLines.join("\n\n"));

      // Show a small success/status UI so user gets feedback before mailto
      let statusEl = document.getElementById("contactFormStatus");
      if (!statusEl) {
        statusEl = document.createElement("div");
        statusEl.id = "contactFormStatus";
        // Minimal inline styles to avoid editing CSS file
        statusEl.style.cssText =
          "margin-top:12px;padding:10px;border-radius:6px;background:#e6ffed;border:1px solid #b7f0c7;color:#05400a;font-size:14px;";
        statusEl.setAttribute("role", "status");
        statusEl.setAttribute("aria-live", "polite");
        const formActions = form.querySelector(".form-actions") || form;
        formActions.parentNode.insertBefore(statusEl, formActions.nextSibling);
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      statusEl.textContent = "Opening mail client — preparing message...";

      // Slight delay so the status is visible before the mail client opens
      const mailto = `mailto:${to}?subject=${encodeURIComponent(
        subject
      )}&body=${body}`;
      setTimeout(() => {
        window.location.href = mailto;
      }, 250);

      // Clean up status and re-enable the button after a short while
      setTimeout(() => {
        if (statusEl && statusEl.parentNode)
          statusEl.parentNode.removeChild(statusEl);
        if (submitBtn) submitBtn.disabled = false;
      }, 4000);
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
