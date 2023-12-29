// script.js
document.addEventListener("DOMContentLoaded", function() {
  // Display the current year in the footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Simple Contact Form Validation
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if(name && email && message) {
      // Implement sending form data to a server or email here
      alert('Thank you for your message!');
      form.reset(); // Reset the form values
    } else {
      alert('Please fill out all fields.');
    }
  });
});

function openModal(serviceId) {
  const modal = document.getElementById(serviceId);
  if (modal) {
    modal.style.display = "block";
  }
}

function closeModal(serviceId) {
  const modal = document.getElementById(serviceId);
  if (modal) {
    modal.style.display = "none";
  }
}

// Close modal if the user clicks anywhere outside of it
window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}

function toggleService(detailId) {
  var detail = document.getElementById(detailId);
  var allDetails = document.querySelectorAll('.service-detail');

  // Close all open details first
  allDetails.forEach(function(item) {
    if (item.id !== detailId) {
      item.style.maxHeight = null;
      item.style.padding = '0 20px';
    }
  });

  // Toggle the clicked service's details
  if (detail.style.maxHeight && detail.style.maxHeight !== '0px') {
    // Hide if it's already shown
    detail.style.maxHeight = null;
    detail.style.padding = '0 20px';
  } else {
    // Temporarily show to measure
    detail.style.maxHeight = '1000px'; // Temporarily set to a large value
    const actualHeight = detail.scrollHeight + 'px';
    
    // Now set to actual needed height and allow transition to show this
    detail.style.maxHeight = actualHeight;
    detail.style.padding = '20px';
  } 
}

function toggleDetail(detailId) {
  var detail = document.getElementById(detailId);
  var allDetails = document.querySelectorAll('.project-detail');

  // Close all open details first
  allDetails.forEach(function(item) {
    if (item.id !== detailId) {
      item.classList.remove('expanded');
    }
  });

  // Toggle the clicked project's details
  detail.classList.toggle('expanded');
}

const projects = [
  { id: "project1", title: "Project 1", img: "pics/picture1.jpg", description: "Short description of Project 1"},
  { id: "project2", title: "Project 2", img: "pics/picture2.jpg", description: "Short description of Project 2"},
  { id: "project3", title: "Project 3", img: "pics/picture3.jpg", description: "Short description of Project 3"}
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
  }, 3000);
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