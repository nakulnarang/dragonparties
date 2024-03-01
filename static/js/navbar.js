document.addEventListener('DOMContentLoaded', function () {
    var links = document.querySelectorAll('#navbar-links a');
    var currentUrl = window.location.pathname;
    console.log(currentUrl);
    links.forEach(function(link) {
      console.log(link.getAttribute('href'));
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        }
    });
  var userIcon = document.querySelector('.user-icon');
  var dropdownContent = document.querySelector('.dropdown-content');

  userIcon.addEventListener('click', function() {
      // Toggle display
      if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
      } else {
          dropdownContent.style.display = 'block';
      }
  });

  // Optional: Close the dropdown if the user clicks outside of it
  window.addEventListener('click', function(e) {
      if (!userIcon.contains(e.target) && !dropdownContent.contains(e.target)) {
          dropdownContent.style.display = 'none';
      }
  });          
});