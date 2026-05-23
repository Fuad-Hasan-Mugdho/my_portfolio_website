document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.getElementById("site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const filterTargets = document.querySelectorAll("[data-groups]");
const detailButtons = document.querySelectorAll(".project-detail-btn");
const projectModal = document.querySelector(".project-modal");
const modalTitle = document.getElementById("project-modal-title");
const modalSummary = document.getElementById("project-modal-summary");
const modalStack = document.getElementById("project-modal-stack");
const modalImpact = document.getElementById("project-modal-impact");
const copyUrlButton = document.getElementById("copy-url-btn");
const shareUrlLink = document.getElementById("share-url");

window.addEventListener("load", () => {
	document.body.classList.add("is-ready");
});

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = siteNav.classList.toggle("is-open");
		document.body.classList.toggle("menu-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
	});

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			siteNav.classList.remove("is-open");
			document.body.classList.remove("menu-open");
			menuToggle.setAttribute("aria-expanded", "false");
			menuToggle.setAttribute("aria-label", "Open menu");

			const targetId = link.getAttribute("href");
			if (!targetId || !targetId.startsWith("#")) {
				return;
			}

			const target = document.querySelector(targetId);
			if (!target) {
				return;
			}

			target.classList.remove("section-flash");
			window.requestAnimationFrame(() => {
				target.classList.add("section-flash");
			});
		});
	});
}

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.16,
			rootMargin: "0px 0px -30px 0px",
		},
	);

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add("is-visible"));
}

filterButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const filter = button.dataset.filter;

		filterButtons.forEach((btn) => btn.classList.remove("is-active"));
		button.classList.add("is-active");

		filterTargets.forEach((target) => {
			const groups = (target.dataset.groups || "")
				.split(",")
				.map((group) => group.trim())
				.filter(Boolean);

			const show = filter === "all" || groups.includes(filter);
			target.setAttribute("data-filter-hidden", show ? "false" : "true");
		});
	});
});

function openProjectModal(projectCard) {
	if (!projectModal || !projectCard) {
		return;
	}

	modalTitle.textContent = projectCard.dataset.projectTitle || "Project Details";
	modalSummary.textContent = projectCard.dataset.projectSummary || "Details unavailable.";
	modalStack.textContent = projectCard.dataset.projectStack || "N/A";
	modalImpact.textContent = projectCard.dataset.projectImpact || "Confidential impact details.";

	projectModal.classList.add("is-open");
	projectModal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
}

function closeProjectModal() {
	if (!projectModal) {
		return;
	}

	projectModal.classList.remove("is-open");
	projectModal.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";
}

detailButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const card = button.closest(".project");
		openProjectModal(card);
	});
});

if (projectModal) {
	projectModal.addEventListener("click", (event) => {
		const target = event.target;
		if (target instanceof HTMLElement && (target.dataset.closeModal === "true" || target.classList.contains("project-modal-close"))) {
			closeProjectModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeProjectModal();
		}
	});
}

if (copyUrlButton && shareUrlLink) {
	copyUrlButton.addEventListener("click", async () => {
		const url = shareUrlLink.getAttribute("href");
		if (!url) {
			return;
		}

		try {
			await navigator.clipboard.writeText(url);
			copyUrlButton.textContent = "Copied";
			setTimeout(() => {
				copyUrlButton.textContent = "Copy";
			}, 1400);
		} catch {
			copyUrlButton.textContent = "Failed";
			setTimeout(() => {
				copyUrlButton.textContent = "Copy";
			}, 1400);
		}
	});
}

const sections = document.querySelectorAll("main section[id]");

if (sections.length && navLinks.length) {
	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) {
					return;
				}

				const activeId = entry.target.id;
				navLinks.forEach((link) => {
					const isActive = link.getAttribute("href") === `#${activeId}`;
					link.classList.toggle("active", isActive);
				});
			});
		},
		{
			threshold: 0.45,
		},
	);

	sections.forEach((section) => sectionObserver.observe(section));
}
