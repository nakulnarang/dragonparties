$(document).ready(function() {
    // Function to check if an element is in the viewport
    function checkVisibility(element) {
      var windowHeight = $(window).height(),
          elementTop = element.offset().top,
          elementHeight = element.outerHeight(),
          scroll = $(window).scrollTop();
  
      // Check if the element is in the viewport
      return (elementTop + elementHeight >= scroll) && (elementTop <= scroll + windowHeight);
    }
  
    // Check visibility and add class on scroll and initial load
    function checkFadeInSection() {
      $('.fade-in-section').each(function() {
        if (checkVisibility($(this))) {
          $(this).addClass('visible');
        }
      });
    }
  
    // Initial check
    checkFadeInSection();
  
    // Check on scroll
    $(window).on('scroll', checkFadeInSection);
  });