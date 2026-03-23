
const observateur = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observateur.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  ".feature-card, .group-showcase-card, .popup-preview"
).forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observateur.observe(el);
});

document.head.insertAdjacentHTML("beforeend", `
  <style>
    .visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);


const fausseInput = document.querySelector(".pp-input");
const requetes    = ["react hooks", "tailwind grid", "async await", "python pandas", "css flexbox", "référencement SEO"];
let indexRequete  = 0;
let indexChar     = 0;
let enTrain       = false;

function ecrire() {
  if (enTrain) return;
  enTrain = true;

  const texte = requetes[indexRequete];

  const effacer = setInterval(() => {
    if (fausseInput.placeholder.length <= 1) {
      clearInterval(effacer);
      fausseInput.placeholder = "";
      const taper = setInterval(() => {
        indexChar++;
        fausseInput.placeholder = texte.substring(0, indexChar);
        if (indexChar >= texte.length) {
          clearInterval(taper);
          indexChar = 0;
          indexRequete = (indexRequete + 1) % requetes.length;
          enTrain = false;
        }
      }, 80);
    } else {
      fausseInput.placeholder = fausseInput.placeholder.slice(0, -1);
    }
  }, 40);
}

setTimeout(() => {
  ecrire();
  setInterval(ecrire, 3500);
}, 2000);


document.querySelectorAll('a[href^="#"]').forEach((lien) => {
  lien.addEventListener("click", (e) => {
    const cible = document.querySelector(lien.getAttribute("href"));
    if (cible) {
      e.preventDefault();
      cible.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.boxShadow = "none";
  }
});
