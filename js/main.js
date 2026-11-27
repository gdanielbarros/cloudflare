/**
 * SERVERWIN — Ponto de Entrada Principal (Main Application Entry)
 */

import { CONFIG } from "./config.js";
import { initAnimations } from "./animations.js";
import { initNavigation } from "./navigation.js";
import { initContact } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  // Inicialização dos ícones Lucide
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  // Preenche metadados dinâmicos (como ano e email institucional no rodapé)
  populateDynamicData();

  // Popula a grade da equipe dinamicamente
  populateTeamGrid();

  // Inicializa subsistemas
  initNavigation();
  initAnimations();
  initContact();
});

function populateDynamicData() {
  // Ano atual de direitos autorais
  const yearSpans = document.querySelectorAll("[data-bind='current-year']");
  const currentYear = new Date().getFullYear();
  yearSpans.forEach((el) => (el.textContent = currentYear));

  // Email institucional
  const emailSpans = document.querySelectorAll("[data-bind='company-email']");
  emailSpans.forEach((el) => {
    el.textContent = CONFIG.company.email;
    if (el.tagName === "A") {
      el.setAttribute("href", `mailto:${CONFIG.company.email}`);
    }
  });
}

/**
 * Popula a grade da equipe a partir do CONFIG
 */
function populateTeamGrid() {
  const grid = document.getElementById("team-grid");
  if (!grid || !CONFIG.team) return;

  grid.innerHTML = CONFIG.team.map((member) => `
    <article class="team-member-card">
      <div class="member-image-frame">
        <img src="${member.image}" alt="Retrato de ${member.name}" class="member-photo" loading="lazy">
      </div>
      <div class="member-info">
        <span class="member-role-badge">${member.role}</span>
        <h3 class="member-name">${member.name}</h3>
        <p class="member-department">${member.department}</p>
        ${member.linkedin ? `
          <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="member-linkedin" aria-label="LinkedIn de ${member.name}">
            <img src="icons8-linkedin-50.png" alt="LinkedIn" class="member-linkedin-icon" loading="lazy">
          </a>
        ` : ""}
      </div>
    </article>
  `).join("");

  // Re-inicializa ícones Lucide para os novos elementos
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}
