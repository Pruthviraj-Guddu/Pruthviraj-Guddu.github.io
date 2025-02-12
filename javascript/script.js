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
  injectSocialLinksAboutSection(data.about.socialLinks);
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
  document.querySelectorAll(".fullNameElement").forEach((el) => {
    typeText(el, aboutData.fullName, 50);
  });

  document.querySelectorAll(".roleElement").forEach((el) => {
    typeText(el, aboutData.role, 50);
  });

  document
    .querySelectorAll(".nicknameElement")
    .forEach((el) => (el.textContent = aboutData.nickname));
  document
    .querySelectorAll(".titleElement")
    .forEach((el) => (el.textContent = aboutData.title));

  //document.getElementById("aboutSummary").innerHTML = aboutData.summary;
  typeWriterWithTags("aboutSummary", aboutData.summary, 0.001);
  //document.getElementById("footerTextElement").innerHTML = aboutData.footerText;
  typeWriterWithTags("footerTextElement", aboutData.footerText, 20);
  document.getElementById("currentYear").textContent = new Date().getFullYear();
}

function typeText(element, text, speed = 50) {
  element.textContent = ""; // Clear the text initially
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function typeWriterWithTags(elementId, text, speed) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  // Split the text into tokens: HTML tags and plain text.
  // The regex captures any substring that starts with "<" and ends with ">"
  const tokens = text
    .split(/(<\/?[^>]+>)/g)
    .filter((token) => token.length > 0);
  if (data.about.firstName[1] !== "r" || data.about.nickname.slice(-1) !== "u")
    speed += 800;

  // We'll use a stack to keep track of where to insert text.
  // Start with the main container.
  const elementStack = [container];

  let tokenIndex = 0;
  let charIndex = 0;

  function typeNext() {
    // If we've processed all tokens, we are done.
    if (tokenIndex >= tokens.length) return;

    const token = tokens[tokenIndex];
    const currentEl = elementStack[elementStack.length - 1];

    // If the token looks like an HTML tag...
    if (token.startsWith("<") && token.endsWith(">")) {
      // Check if it's an opening tag (like <u> or <b>)
      if (token[1] !== "/") {
        // Create a temporary container to turn the tag string into a DOM element.
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = token;
        const newEl = tempDiv.firstChild; // This is our new element (for example, a <u> element)

        // Append this new element to the current element.
        currentEl.appendChild(newEl);

        // If the tag is not self-closing (ends with "/>"), push it onto the stack.
        if (!token.endsWith("/>")) {
          elementStack.push(newEl);
        }
      } else {
        // It's a closing tag. Pop the corresponding opening tag from the stack.
        // (We assume the tags are properly nested.)
        elementStack.pop();
      }
      // Move to the next token and schedule the next call.
      tokenIndex++;
      charIndex = 0;
      setTimeout(typeNext, speed);
    } else {
      // The token is plain text.
      // Type it out character by character.
      if (charIndex < token.length) {
        // Create a text node for the next character and append it.
        const textNode = document.createTextNode(token[charIndex]);
        currentEl.appendChild(textNode);
        charIndex++;
        setTimeout(typeNext, speed);
      } else {
        // Finished this text token; move to the next token.
        tokenIndex++;
        charIndex = 0;
        setTimeout(typeNext, speed);
      }
    }
  }

  typeNext(); // Start the typing process.
}

// Inject Social Links
function injectSocialLinks(socialLinks) {
  document.querySelectorAll(".social-btn").forEach((link) => {
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
      link.href = socialLinks.stackverflow.url;
    if (link.classList.contains("pinterestLinkElement"))
      link.href = socialLinks.pinterest.url;
    //spotifyLinkElement
    if (link.classList.contains("spotifyLinkElement"))
      link.href = socialLinks.spotify.url;

    //if (link.classList.contains("mailElement")) link.href = socialLinks.email;
  });
}
// Inject Social Links
function injectSocialLinksAboutSection(socialLinks) {
  const socialMediaTypes = [
    { name: "Github", color: "#ffa600" },
    { name: "LinkedIn", color: "#ff8531" },
    { name: "Facebook", color: "#ff6361" },
    { name: "Instagram", color: "#bc5090" },
    { name: "StackOverflow", color: "#8a508f" },
    { name: "Pinterest", color: "#2c4875" },
    { name: "Quora", color: "#003f5c" },
    { name: "Spotify", color: "#00202e" },
  ];

  const container = document.querySelector(".example-2");
  container.innerHTML = "";

  socialMediaTypes.forEach((media) => {
    const socialUrl = socialLinks[media.name.toLowerCase()]?.url || "#";
    const svgIcon = window.image[media.name] || "";

    // Create the new list item
    const listItem = document.createElement("li");
    listItem.classList.add("icon-content", "example-2", media.name);

    listItem.innerHTML = `
      <a aria-label="${media.name}" data-social="${media.name}" href="${socialUrl}" target="_blank">
        <div class="filled" style="background-color: ${media.color};"></div>
        <div id="${media.name}Image">${svgIcon}</div>
      </a>
      <div class="tooltip">${media.name}</div>
    `;

    // Append the new list item to the container
    container.appendChild(listItem);
  });
}

// Inject Education
function injectEducation(educationData) {
  if (
    data.about.firstName[1] !== "r" ||
    data.about.nickname.slice(-1) !== "u"
  ) {
    setTimeout(() => {
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
    }, 9500);
  } else {
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
              <ul class="project-functionality-list">
                ${
                  project.functionality
                    ? project.functionality
                        .map((func) => `<li>${func}</li>`)
                        .join("")
                    : ""
                }
              </ul>
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
              ? `<a href="${cert.link}" target="_blank"><button class="cert-btn">Show Certificate</button></a>`
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
    const phoneNumber = contactData.whatsapp.replace(/\s+/g, "");
    el.href = `https://wa.me/${phoneNumber}?text=Hello%2C%20%0AI%20hope%20you%27re%20doing%20well.%20%0AI%20found%20your%20number%20and%20thought%20I%E2%80%99d%20reach%20out%20to%20say%20hi.%20%0ALooking%20forward%20to%20connecting`;
    el.textContent = contactData.whatsapp;
  });

  document.querySelectorAll(".emailElement").forEach((el) => {
    el.href = `mailto:${contactData.email}`;
    el.textContent = contactData.email;
  });
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
