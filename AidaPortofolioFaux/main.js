document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. "Lihat Portofolio" button scrolls to the Pendidikan section */
  const portfolioBtn = document.querySelector(".hero-title button");
  const education = document.querySelector("#pendidikan");

  if (portfolioBtn && education) {
    portfolioBtn.addEventListener("click", () => {
      education.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  }

  /* 2. Typing effect for the intro line (full text stays reserved so nothing jumps) */
  const msg = document.querySelector("#typed-msg");

  if (msg && !reduceMotion) {
    const fullText = msg.textContent.trim().replace(/\s+/g, " ");
    msg.setAttribute("aria-label", fullText);

    const typed = document.createElement("span");
    const caret = document.createElement("span");
    const ghost = document.createElement("span");
    typed.setAttribute("aria-hidden", "true");
    caret.className = "caret";
    caret.setAttribute("aria-hidden", "true");
    ghost.className = "ghost";
    ghost.setAttribute("aria-hidden", "true");

    msg.textContent = "";
    msg.append(typed, caret, ghost);

    let i = 0;
    const type = () => {
      typed.textContent = fullText.slice(0, i);
      ghost.textContent = fullText.slice(i);
      if (i < fullText.length) {
        i++;
        setTimeout(type, 35);
      } else {
        setTimeout(() => caret.remove(), 1500);
      }
    };
    type();
  }

  /* 3. Highlight the nav link of the section currently on screen */
  const navLinks = document.querySelectorAll("header nav a");
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && sections.length) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }
});
