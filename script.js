// ---------------------------------------------------------------------------
// All personal content lives here. Edit this object to update the site —
// nothing else in this file needs to change for content updates.
// ---------------------------------------------------------------------------
const CONFIG = {
  name: "Madiha Shaikh",
  title: "Software Developer",
  location: "Mapusa, Goa, India",
  email: "madihashaikh2245@gmail.com",
  github: "https://github.com/madiha-02",
  linkedin: "https://www.linkedin.com/in/madiha-shaikh-38b108288",
  phone: "8010964109",

  skills: [
    "React", "React Native", "Next.js", "TypeScript", "JavaScript", "Node.js",
    "Fastify", "Prisma", "PostgreSQL", "Supabase", "Stripe", "Tailwind CSS",
    "NativeWind", "GitHub Actions / CI-CD", "REST APIs", "i18n / Localization",
    "Accessibility (WCAG)"
  ],

  experience: [
    {
      type: "work",
      role: "Software Developer",
      org: "Kilowott",
      date: "Jun 2024 – Present",
      bullets: [
        "Built Next.js SSR frontend features including a Mux-powered video player and Stripe subscription billing flows",
        "Implemented WCAG AA accessibility improvements and Norwegian localization",
        "Developed a React Native / Expo mobile app sharing 98% of its code with the web app",
        "Built backend APIs with Fastify and Prisma/PostgreSQL, including Stripe webhook handling",
        "Set up and maintained GitHub Actions CI/CD pipelines"
      ]
    },
    {
      type: "work",
      org: "Remote Software Solutions",
      role: "Web Developer Intern",
      date: "Jul 2023 – Apr 2024",
      bullets: [
        "Built responsive React components in an Agile sprint cycle",
        "Took part in peer code reviews and iterative feature delivery"
      ]
    },
    {
      type: "education",
      role: "Bachelor of Computer Engineering",
      org: "Agnel Institute of Technology and Design, Goa",
      date: "May 2024",
      bullets: []
    }
  ],

  projects: [
    {
      name: "Fatal Press — News App",
      description: "A news reading application built with React, focused on clean article browsing and a fast, responsive UI.",
      tags: ["React", "JavaScript"],
      github: "https://github.com/madiha-02/Fatal-press-NewsApp-",
      live: null
    },
    {
      name: "Text Converter",
      description: "A utility web app for quick text transformations — a small, focused tool built to sharpen core JS fundamentals.",
      tags: ["JavaScript", "HTML/CSS"],
      github: "https://github.com/madiha-02/text-converter",
      live: null
    }
  ]
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
const navLinks = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".panel");
const sidebar = document.getElementById("sidebar");
const navToggle = document.getElementById("navToggle");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const navEl = document.querySelector(".nav");

// The nav starts hidden and reveals itself on the visitor's first scroll/wheel/touch
// gesture, or on Tab focus, or after a short delay so it's never permanently stuck
// hidden for someone who never scrolls (keyboard/screen-reader users, short panels, etc).
function revealNav() {
  navEl.classList.add("revealed");
  window.removeEventListener("wheel", revealNav);
  window.removeEventListener("scroll", revealNav);
  window.removeEventListener("touchmove", revealNav);
  window.removeEventListener("keydown", onKeydownReveal);
  clearTimeout(navRevealFallback);
}
function onKeydownReveal(e) {
  if (e.key === "Tab") revealNav();
}
window.addEventListener("wheel", revealNav, { passive: true });
window.addEventListener("scroll", revealNav, { passive: true });
window.addEventListener("touchmove", revealNav, { passive: true });
window.addEventListener("keydown", onKeydownReveal);
const navRevealFallback = setTimeout(revealNav, 3500);

let backdropHideTimer = null;

function setSidebarOpen(open) {
  sidebar.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  clearTimeout(backdropHideTimer);
  if (open) {
    sidebarBackdrop.classList.add("show");
    requestAnimationFrame(() => sidebarBackdrop.classList.add("in"));
  } else {
    sidebarBackdrop.classList.remove("in");
    backdropHideTimer = setTimeout(() => sidebarBackdrop.classList.remove("show"), 220);
  }
}

function showSection(id) {
  panels.forEach(p => p.classList.toggle("active", p.dataset.section === id));
  navLinks.forEach(n => n.classList.toggle("active", n.dataset.section === id));
  setSidebarOpen(false);
  // Deliberately not a real element id (avoids "#about" etc. colliding with the
  // section's own id="about" — some browsers auto-scroll to a same-named element
  // the instant replaceState sets a matching fragment, causing an unwanted jump).
  if (history.replaceState) history.replaceState(null, "", "#section-" + id);
}

navLinks.forEach(link => {
  link.addEventListener("click", () => showSection(link.dataset.section));
});

document.querySelectorAll("[data-goto]").forEach(el => {
  el.addEventListener("click", () => showSection(el.dataset.goto));
});

navToggle.addEventListener("click", () => {
  revealNav(); // opening the drawer is itself an intentional "show me the nav" gesture
  setSidebarOpen(!sidebar.classList.contains("open"));
});

sidebarBackdrop.addEventListener("click", () => setSidebarOpen(false));

const initial = (location.hash || "#section-about").replace(/^#(section-)?/, "");
const validSections = new Set(["about", "experience", "projects", "chat", "contact"]);
showSection(validSections.has(initial) ? initial : "about");

// ---------------------------------------------------------------------------
// Avatar eye tracking
// ---------------------------------------------------------------------------
const eyes = [
  { group: document.getElementById("eyeL"), pupil: document.getElementById("pupilL"), glint: document.getElementById("glintL") },
  { group: document.getElementById("eyeR"), pupil: document.getElementById("pupilR"), glint: document.getElementById("glintR") }
];
const avatarSvg = document.getElementById("heroEyesSvg");
// A static iris-colored base (r=40) sits under the moving pupil (r=27), fully covering
// the artwork's own eye at any offset up to 13px — safe margin for the pupil to travel.
const MAX_PUPIL_OFFSET = 12;

function moveEyes(clientX, clientY) {
  const svgRect = avatarSvg.getBoundingClientRect();
  const viewBoxScale = 620 / svgRect.width; // svg viewBox is 620 wide

  eyes.forEach(({ group, pupil, glint }) => {
    const cx = parseFloat(group.dataset.cx);
    const cy = parseFloat(group.dataset.cy);

    // eye center in screen coordinates
    const eyeScreenX = svgRect.left + cx / viewBoxScale;
    const eyeScreenY = svgRect.top + cy / viewBoxScale;

    const dx = clientX - eyeScreenX;
    const dy = clientY - eyeScreenY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(Math.hypot(dx, dy) / 12, MAX_PUPIL_OFFSET);

    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist;

    pupil.setAttribute("cx", px);
    pupil.setAttribute("cy", py);
    glint.setAttribute("cx", px - 4);
    glint.setAttribute("cy", py - 4.5);
  });
}

let idleAngle = 0;
let usingPointer = false;

window.addEventListener("mousemove", e => {
  usingPointer = true;
  moveEyes(e.clientX, e.clientY);
});

window.addEventListener("touchmove", e => {
  if (e.touches && e.touches[0]) {
    usingPointer = true;
    moveEyes(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

// Gentle idle drift for touch-only devices / before first pointer move
function idleLoop() {
  if (!usingPointer) {
    idleAngle += 0.015;
    eyes.forEach(({ group, pupil, glint }) => {
      const cx = parseFloat(group.dataset.cx);
      const cy = parseFloat(group.dataset.cy);
      const px = cx + Math.cos(idleAngle) * 2.6;
      const py = cy + Math.sin(idleAngle * 0.6) * 1.6;
      pupil.setAttribute("cx", px);
      pupil.setAttribute("cy", py);
      glint.setAttribute("cx", px - 4);
      glint.setAttribute("cy", py - 4.5);
    });
  }
  requestAnimationFrame(idleLoop);
}
idleLoop();

// ---------------------------------------------------------------------------
// Populate About / Skills
// ---------------------------------------------------------------------------
const skillChips = document.getElementById("skillChips");
CONFIG.skills.forEach(skill => {
  const span = document.createElement("span");
  span.className = "chip";
  span.textContent = skill;
  skillChips.appendChild(span);
});

// ---------------------------------------------------------------------------
// Populate Experience timeline
// ---------------------------------------------------------------------------
const timeline = document.getElementById("timeline");
CONFIG.experience.forEach(item => {
  const li = document.createElement("li");
  li.className = "timeline-item" + (item.type === "education" ? " education" : "");

  const bullets = item.bullets.length
    ? `<ul>${item.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`
    : "";

  li.innerHTML = `
    <div class="timeline-header">
      <h3>${item.role}</h3>
      <span class="timeline-date">${item.date}</span>
    </div>
    <div class="timeline-org">${item.org}</div>
    ${bullets}
  `;
  timeline.appendChild(li);
});

// ---------------------------------------------------------------------------
// Populate Projects
// ---------------------------------------------------------------------------
const projectGrid = document.getElementById("projectGrid");

function openProjectModal(project) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="${project.name} details">
      <button class="modal-close" aria-label="Close">&times;</button>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="chip-row project-tags">
        ${project.tags.map(t => `<span class="chip">${t}</span>`).join("")}
      </div>
      <div class="modal-preview">
        Live UI preview coming soon — for now, browse the source on GitHub.
      </div>
      <div class="modal-links">
        <a href="${project.github}" target="_blank" rel="noopener">View source on GitHub →</a>
        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener">Live demo →</a>` : ""}
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("open"));

  function close() {
    overlay.classList.remove("open");
    setTimeout(() => overlay.remove(), 200);
  }
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  overlay.querySelector(".modal-close").addEventListener("click", close);
  document.addEventListener("keydown", function esc(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", esc); }
  });
}

CONFIG.projects.forEach(project => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.innerHTML = `
    <h3>${project.name}</h3>
    <p>${project.description}</p>
    <div class="project-tags chip-row">
      ${project.tags.map(t => `<span class="chip">${t}</span>`).join("")}
    </div>
    <span class="cta">View details →</span>
  `;
  card.addEventListener("click", () => openProjectModal(project));
  projectGrid.appendChild(card);
});

const morePlaceholder = document.createElement("div");
morePlaceholder.className = "project-card placeholder";
morePlaceholder.innerHTML = `<p>More projects coming soon</p>`;
projectGrid.appendChild(morePlaceholder);

// ---------------------------------------------------------------------------
// Contact section
// ---------------------------------------------------------------------------
document.getElementById("contactEmailValue").textContent = CONFIG.email;
document.getElementById("contactEmail").href = `mailto:${CONFIG.email}`;

document.getElementById("contactPhoneValue").textContent =
  `+91 ${CONFIG.phone.slice(0, 5)} ${CONFIG.phone.slice(5)}`;
document.getElementById("contactPhone").href = `tel:+91${CONFIG.phone}`;

const linkedinLinkTop = document.getElementById("linkedinLink");
const linkedinContact = document.getElementById("contactLinkedin");
const linkedinValue = document.getElementById("linkedinValue");

if (CONFIG.linkedin) {
  linkedinLinkTop.href = CONFIG.linkedin;
  linkedinContact.href = CONFIG.linkedin;
  linkedinValue.textContent = CONFIG.linkedin.replace(/^https?:\/\//, "");
} else {
  linkedinLinkTop.style.display = "none";
  linkedinContact.style.pointerEvents = "none";
  linkedinContact.style.opacity = "0.5";
  linkedinValue.textContent = "Not linked yet";
}

document.getElementById("copyEmailBtn").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  const valueEl = btn.querySelector(".contact-value");
  const original = valueEl.textContent;
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    valueEl.textContent = "Copied!";
  } catch {
    valueEl.textContent = CONFIG.email;
  }
  setTimeout(() => { valueEl.textContent = original; }, 1600);
});

// ---------------------------------------------------------------------------
// Rule-based chatbot
// ---------------------------------------------------------------------------
const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatSuggestions = document.getElementById("chatSuggestions");

const RULES = [
  {
    keywords: ["hello", "hi", "hey"],
    reply: `Hi, I'm ${CONFIG.name.split(" ")[0]} — well, a small rule-based version of me. Ask me about my skills, experience, projects, or how to get in touch.`
  },
  {
    keywords: ["what do you do", "what does she do", "role", "job", "current job", "who are you"],
    reply: `I'm a ${CONFIG.title}, currently at Kilowott, working across React/Next.js frontend, React Native mobile, and Fastify/Prisma backend.`
  },
  {
    keywords: ["skill", "tech stack", "technologies", "stack", "language"],
    reply: `My core skills: ${CONFIG.skills.slice(0, 8).join(", ")}, and more — see the full list in the About tab.`
  },
  {
    keywords: ["experience", "work history", "career", "kilowott", "remote software"],
    reply: `I'm currently a Software Developer at Kilowott since Jun 2024 (Next.js, React Native, Fastify/Prisma). Before that, I was a Web Developer Intern at Remote Software Solutions (Jul 2023–Apr 2024). Full details are in the Experience tab.`
  },
  {
    keywords: ["education", "degree", "college", "university", "study"],
    reply: `I have a Bachelor of Computer Engineering from Agnel Institute of Technology and Design, Goa (May 2024).`
  },
  {
    keywords: ["project", "built", "portfolio", "github repo"],
    reply: `A couple of highlights: "Fatal Press" (a React news app) and "Text Converter" (a JS text-utility tool) — both mine. Check the Projects tab for details and source links, more are on the way.`
  },
  {
    keywords: ["contact", "email", "reach", "hire", "available", "linkedin"],
    reply: `Best way to reach me is email: ${CONFIG.email}, or check my GitHub profile linked in the sidebar. Full details in the Contact tab.`
  },
  {
    keywords: ["location", "based", "where", "goa", "mapusa"],
    reply: `I'm based in Mapusa, Goa, India — open to remote work.`
  },
  {
    keywords: ["cv", "resume"],
    reply: `You can view or download my CV from the button at the bottom of the sidebar.`
  },
  {
    keywords: ["react native", "mobile"],
    reply: `Yes — I built a React Native / Expo app at Kilowott that shares 98% of its code with the web app, using NativeWind for styling.`
  },
  {
    keywords: ["accessibility", "wcag", "a11y"],
    reply: `I implemented WCAG AA accessibility improvements as part of the Kilowott frontend work.`
  },
  {
    keywords: ["thank", "thanks"],
    reply: `You're welcome! Anything else you'd like to know?`
  }
];

const FALLBACKS = [
  `I don't have a hardcoded answer for that yet — try asking about my skills, experience, projects, or contact info.`,
  `I'm just a small rule-based version of ${CONFIG.name.split(" ")[0]}, so I only know a fixed set of topics: background, skills, experience, projects, and contact. Try one of those!`
];

function addBubble(text, sender) {
  const div = document.createElement("div");
  div.className = `chat-bubble ${sender}`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function respond(message) {
  const lower = message.toLowerCase();
  const match = RULES.find(rule => rule.keywords.some(k => lower.includes(k)));
  const reply = match ? match.reply : FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  setTimeout(() => addBubble(reply, "bot"), 350);
}

chatForm.addEventListener("submit", e => {
  e.preventDefault();
  const value = chatInput.value.trim();
  if (!value) return;
  addBubble(value, "user");
  respond(value);
  chatInput.value = "";
});

const SUGGESTIONS = [
  "What do you do?",
  "What are your skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "How can I contact you?"
];

SUGGESTIONS.forEach(text => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = text;
  btn.addEventListener("click", () => {
    addBubble(text, "user");
    respond(text);
  });
  chatSuggestions.appendChild(btn);
});

addBubble(`Hi, I'm ${CONFIG.name.split(" ")[0]}! Ask me anything about my background — try one of the suggestions below.`, "bot");
