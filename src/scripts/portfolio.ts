import type { PortfolioWork } from "../data/portfolio";

const dataElement = document.querySelector<HTMLScriptElement>("#portfolio-data");
const works = dataElement?.textContent ? (JSON.parse(dataElement.textContent) as PortfolioWork[]) : [];
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-work-card]"));
const filterButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
const workRail = document.querySelector<HTMLElement>("[data-work-grid]");
const scrollButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-work-scroll]"));
const dialog = document.querySelector<HTMLDialogElement>("[data-work-dialog]");
const closeDialog = document.querySelector<HTMLButtonElement>("[data-close-dialog]");
const contactDialog = document.querySelector<HTMLDialogElement>("[data-contact-dialog]");
const contactForm = document.querySelector<HTMLFormElement>("[data-contact-form]");
const contactStatus = document.querySelector<HTMLElement>("[data-contact-status]");
const closeContact = document.querySelector<HTMLButtonElement>("[data-close-contact]");

function updateWorkScrollControls() {
  if (!workRail) return;

  const maxScroll = workRail.scrollWidth - workRail.clientWidth;
  const hasOverflow = maxScroll > 2;

  for (const button of scrollButtons) {
    const direction = button.dataset.workScroll;
    button.disabled =
      !hasOverflow ||
      (direction === "prev" && workRail.scrollLeft <= 2) ||
      (direction === "next" && workRail.scrollLeft >= maxScroll - 2);
  }
}

function setActiveFilter(category: string) {
  for (const button of filterButtons) {
    button.setAttribute("aria-selected", String(button.dataset.filter === category));
  }

  for (const card of cards) {
    const isVisible = category === "all" || card.dataset.category === category;
    card.toggleAttribute("hidden", !isVisible);
  }

  workRail?.scrollTo({ left: 0, behavior: "smooth" });
  window.requestAnimationFrame(updateWorkScrollControls);
}

function setText(selector: string, value: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
}

function openWork(id: string) {
  const work = works.find((item) => item.id === id);
  if (!work || !dialog) return;

  const art = dialog.querySelector<HTMLElement>("[data-dialog-art]");
  const img = dialog.querySelector<HTMLImageElement>("[data-dialog-image]");
  const tags = dialog.querySelector<HTMLElement>("[data-dialog-tags]");

  if (art) art.style.setProperty("--dialog-accent", work.palette);

  if (img) {
    if (work.image) {
      img.src = work.image;
      img.alt = work.title;
      img.style.display = "";
      art?.classList.add("has-image");
    } else {
      img.src = "";
      img.alt = "";
      img.style.display = "none";
      art?.classList.remove("has-image");
    }
  }

  if (tags) {
    tags.replaceChildren(
      ...work.tags.map((tag) => {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
      }),
    );
  }

  setText("[data-dialog-meta]", `${work.category} / ${work.year} / ${work.client}`);
  setText("[data-dialog-title]", work.title);
  setText("[data-dialog-summary]", work.summary);
  setText("[data-dialog-detail]", work.detail);
  dialog.showModal();
}

for (const button of filterButtons) {
  button.addEventListener("click", () => setActiveFilter(button.dataset.filter ?? "all"));
}

for (const button of scrollButtons) {
  button.addEventListener("click", () => {
    if (!workRail) return;

    const direction = button.dataset.workScroll === "prev" ? -1 : 1;
    workRail.scrollBy({ left: direction * workRail.clientWidth * 0.86, behavior: "smooth" });
  });
}

workRail?.addEventListener("scroll", () => window.requestAnimationFrame(updateWorkScrollControls), {
  passive: true,
});
window.addEventListener("resize", updateWorkScrollControls);
updateWorkScrollControls();

for (const trigger of document.querySelectorAll<HTMLButtonElement>("[data-open-work]")) {
  trigger.addEventListener("click", () => openWork(trigger.dataset.openWork ?? ""));
}

closeDialog?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector<HTMLButtonElement>("[data-open-contact]")?.addEventListener("click", () => {
  contactStatus?.replaceChildren();
  contactDialog?.showModal();
});

closeContact?.addEventListener("click", () => contactDialog?.close());
contactDialog?.addEventListener("click", (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submit = contactForm.querySelector<HTMLButtonElement>('button[type="submit"]');
  const endpoint = contactForm.dataset.endpoint ?? "/contact";
  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  if (contactStatus) contactStatus.textContent = "Sending...";
  submit?.setAttribute("disabled", "true");

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("send_failed");

    contactForm.reset();
    if (contactStatus) contactStatus.textContent = "Sent.";
  } catch {
    if (contactStatus) contactStatus.textContent = "Could not send. Please try again later.";
  } finally {
    submit?.removeAttribute("disabled");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (dialog?.open) dialog.close();
  if (contactDialog?.open) contactDialog.close();
});
