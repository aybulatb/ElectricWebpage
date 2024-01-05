// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Display the current year in the footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Simple Contact Form Validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      // Implement sending form data to a server or email here
      alert('Thank you for your message!');
      form.reset(); // Reset the form values
    } else {
      alert('Please fill out all fields.');
    }
  });
});

function toggleService(detailId) {
  var detail = document.getElementById(detailId);
  var allDetails = document.querySelectorAll('.service-detail');

  // Close all open details first
  allDetails.forEach(function (item) {
    if (item.id !== detailId) {
      item.style.maxHeight = null;
      item.style.padding = '0 20px';
    }
  });

  applyTransition(detail);
}

const projects = [
  { id: "project1", title: "Проект 1", img: "pics/picture1.jpg", description: "Короткое описание проекта 1" },
  { id: "project2", title: "Проект 2", img: "pics/picture2.jpg", description: "Короткое описание проекта 2" },
  { id: "project3", title: "Проект 3", img: "pics/picture3.jpg", description: "Короткое описание проекта 3" }
];


let currentIndex = 0; // Start with the first project

function loadProjects() {
  const track = document.querySelector('.carousel-track');
  track.innerHTML = ''; // Clear existing projects

  // Get the current, previous, and next projects
  let prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  let nextIndex = (currentIndex + 1) % projects.length;

  // Create an array of the three projects to be displayed
  let displayProjects = [projects[prevIndex], projects[currentIndex], projects[nextIndex]];

  // Dynamically create project elements and add to the carousel
  displayProjects.forEach((project, index) => {
    const projectDiv = document.createElement('div');
    projectDiv.className = `project ${index === 1 ? 'active' : ''}`; // Middle project is active
    projectDiv.style.transition = 'transform 0.5s ease, opacity 0.5s ease'; // Add transition styles
    projectDiv.innerHTML = `
      <img src="${project.img}" alt="${project.title}">
      <h4>${project.title}</h4>
      <p>${project.description}</p>
    `;
    projectDiv.addEventListener('click', () => {
      // Determine the direction based on clicked project's position
      if (index === 0) {
        moveCarousel(-1); // Move left if the first project is clicked
      } else if (index === 2) {
        moveCarousel(1); // Move right if the third project is clicked
      }
      // Clicking the middle (active) project could either do nothing or trigger a different action
    });
    track.appendChild(projectDiv);
  });
}

function moveCarousel(direction) {
  currentIndex = (currentIndex + direction + projects.length) % projects.length;
  loadProjects(); // Reload the projects each time the carousel is moved
}

function startAutoPlay() {
  // Change slide every 3 seconds (3000 milliseconds)
  autoPlayInterval = setInterval(() => {
    moveCarousel(1); // Move right
  }, 300000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// Initialize
loadProjects();
startAutoPlay(); // Start the auto-play

// Event listeners for pausing and resuming auto-play on hover
const carousel = document.getElementById('carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// FAQ section
function toggleAnswer(faqId) {
  var answer = document.getElementById(faqId);

  applyTransition(answer);
}

function applyTransition(htmlElement) {
  if (htmlElement.style.maxHeight && htmlElement.style.maxHeight !== '0px') {
    htmlElement.style.maxHeight = null;
    htmlElement.style.padding = '0 20px';
  } else {
    htmlElement.style.maxHeight = '1000px';
    const actualHeight = htmlElement.scrollHeight + 'px';

    htmlElement.style.maxHeight = actualHeight;
    htmlElement.style.padding = '20px';
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});