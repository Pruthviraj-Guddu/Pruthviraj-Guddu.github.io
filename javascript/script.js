document.addEventListener("DOMContentLoaded", function () {
  initializeMenu();
  injectData(window.data);
  initializeAnimations();
});

// Menu item click event
function initializeMenu() {
  const menuItems = document.querySelectorAll(".menuBar ul li a");
  const menuBar = document.querySelector(".menuBar");

  if (menuBar) {
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener("click", function (event) {
        event.preventDefault();
        menuBar.classList.remove("active");
      });
    });
  }
}

// Inject all dynamic content
function injectData(data) {
  injectAbout(data.about);
  injectSocialLinks(data.about.socialLinks);
  injectEducation(data.education);
  injectWorkExperience(data.work);
  injectSkills(data.skills);
  injectProjects(data.projects);
  injectCertifications(data.certifications);
  injectContact(data.about.contact);
}

// Inject About section
function injectAbout(aboutData) {
  document.getElementById("profileImageElement").src = aboutData.profileImage;

  document
    .querySelectorAll(".firstNameElement")
    .forEach((el) => (el.textContent = aboutData.firstName));
  document
    .querySelectorAll(".fullNameElement")
    .forEach((el) => (el.textContent = aboutData.fullName));

  // // Inject role
  document
    .querySelectorAll(".roleElement")
    .forEach((el) => (el.textContent = aboutData.role));

  document
    .querySelectorAll(".nicknameElement")
    .forEach((el) => (el.textContent = aboutData.nickname));
  document
    .querySelectorAll(".titleElement")
    .forEach((el) => (el.textContent = aboutData.title));

  document.getElementById("aboutSummary").innerHTML = aboutData.summary;
  document.getElementById("footerTextElement").innerHTML = aboutData.footerText;
  document.getElementById("currentYear").textContent = new Date().getFullYear();
}

// Inject Social Links
function injectSocialLinks(socialLinks) {
  document.querySelectorAll(".socialLink").forEach((link) => {
    if (link.classList.contains("githubLinkElement"))
      link.href = socialLinks.github.url;
    if (link.classList.contains("linkedinLinkElement"))
      link.href = socialLinks.linkedin.url;
    if (link.classList.contains("digitalResumeElement"))
      link.href = socialLinks.digitalResume.url;
    //facebookLinkElement
    if (link.classList.contains("facebookLinkElement"))
      link.href = socialLinks.facebook.url;
    //instagramLinkElement
    if (link.classList.contains("instagramLinkElement"))
      link.href = socialLinks.instagram.url;
    //quoraLinkElement
    if (link.classList.contains("quoraLinkElement"))
      link.href = socialLinks.quora.url;
    if (link.classList.contains("stackoverflowLinkElement"))
      link.href = socialLinks.stackexchange.url;
    if (link.classList.contains("pinterestLinkElement"))
      link.href = socialLinks.pinterest.url;
    //spotifyLinkElement
    if (link.classList.contains("spotifyLinkElement"))
      link.href = socialLinks.spotify.url;

    //if (link.classList.contains("mailElement")) link.href = socialLinks.email;
  });
}

// Inject Education
function injectEducation(educationData) {
  const container = document.getElementById("educationInjector");
  container.innerHTML = educationData
    .map(
      (edu) => `
      <h2>${edu.studyType} in ${edu.area}, ${edu.endDate}</h2>
      <p><strong>Institution:</strong> ${edu.institution}</p>
      ${edu.gpa ? `<p><strong>GPA:</strong> ${edu.gpa}</p>` : ""}
      <p><strong>Duration:</strong> ${edu.startDate} - ${edu.endDate}</p>
      <br />
  `
    )
    .join("");
}

// Inject Work Experience
function injectWorkExperience(workData) {
  const container = document.getElementById("work-experience");
  container.innerHTML = workData
    .map(
      (job) => `
      <h2>${job.name}</h2>
      <h3><strong>${job.position}</strong></h3>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Duration:</strong> ${job.startDate} - ${job.endDate}</p>
      <ul>${job.highlights
        .map((highlight) => `<li>${highlight}</li>`)
        .join("")}</ul>
      <br />
  `
    )
    .join("");
}

// Inject Skills
function injectSkills(skillsData) {
  const container = document.getElementById("skills-container");
  container.innerHTML = skillsData
    .map((skillCategory) => {
      let categoryName = Object.keys(skillCategory)[0];
      let skillList = skillCategory[categoryName];

      return `
          <div class="col-12 col-md-6 col-lg-4 skill-card">
              <div class="featurette-icon"><i class="fab fa-###"></i></div>
              <h3 class="skill-title">${categoryName}</h3>
              <hr color="#e66060" />
              <p class="skill-text">${skillList.join("<br />")}</p>
          </div>
      `;
    })
    .join("");
}

// Inject Projects
function injectProjects(projectsData) {
  const container = document.getElementById("projects-container");
  container.innerHTML = projectsData
    .map(
      (project) => `
      <div class="project-card">
          <div class="project-img-container">
              <img src="${project.img}" alt="${
        project.name
      }" class="project-img">
          </div>
          <div class="project-info">
              <h3>${project.name}</h3>
              <p><strong>Date:</strong> ${project.date}</p>
              <p>${project.description}</p>
              <p><strong>Technologies:</strong> ${
                project.technologies ? project.technologies.join(", ") : "N/A"
              }</p>
              <ul>${
                project.functionality
                  ? project.functionality
                      .map((func) => `<li>${func}</li>`)
                      .join("")
                  : ""
              }</ul>
              <a href="${project.link}" target="_blank">
                  <button class="project-button">${project.buttonText}</button>
              </a>
          </div>
      </div>
  `
    )
    .join("");
}

// Inject Certifications
function injectCertifications(certificationsData) {
  const container = document.getElementById("certifications-container");
  container.innerHTML = certificationsData
    .map(
      (cert) => `
      <div class="cert-card">
          <h2 class="cert-title">${cert.name}</h2>
          <p><strong>Issuer:</strong> ${cert.issuer}</p>
          <p><strong>Issued:</strong> ${cert.issued}</p>
          <p><strong>Credential ID:</strong> ${cert.credentialId}</p>
          ${
            cert.link
              ? `<a href="${cert.link}" target="_blank"><button class="cert-button">Show Certificate</button></a>`
              : ""
          }
      </div>
  `
    )
    .join("");
}

// Inject Contact Info
function injectContact(contactData) {
  document.querySelectorAll(".phoneElement").forEach((el) => {
    el.href = `tel:${contactData.phone}`;
    el.textContent = contactData.phone;
  });

  document.querySelectorAll(".whatsappElement").forEach((el) => {
    el.href = `tel:${contactData.whatsapp}`;
    el.textContent = contactData.whatsapp;
  });

  document
    .querySelectorAll(".mailElement")
    .forEach((el) => (el.href = contactData.email));
}

// Initialize Animations (GSAP + AOS)
function initializeAnimations() {
  const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

  tl.from(".navBar", { y: "-10rem", duration: 1 })
    .from(".navBar .navBar__menu ul li", {
      y: "-2rem",
      opacity: 0,
      duration: 1,
      stagger: 0.25,
    })
    .to(
      ".sec1__content .sec1__contentDetail h1",
      { y: "0rem", duration: 1, stagger: 0.25 },
      "=-1"
    )
    .from(".sec1__imgBx img", { opacity: 0, x: "50%", duration: 1.5 })
    .from(".sec1__content a", { opacity: 0, duration: 1.5 }, "=-3");

  AOS.init({ duration: 1000, offset: 0 });
}

// Menu icon toggle
document
  .querySelector(".sec1__menuIcon")
  .addEventListener("click", function () {
    this.classList.toggle("active");
    document.querySelector(".menuBar").classList.toggle("active");
  });

// Scroll to top functionality
window.addEventListener("scroll", function () {
  document
    .querySelector(".fa")
    .classList.toggle("active", window.scrollY > 500);
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
