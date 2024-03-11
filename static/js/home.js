import { createEventCard } from '../js/eventCard.js';


function displayFeaturedEvents() {
    // Define dummy data for three featured events
    // const featuredEvents = [
    //     { title: 'Neon Night', date: '2024-03-10', description: 'A vibrant night of colors and music.', time: '9 PM', location: 'Downtown Club', venue: 'Club Neon', guestCount: '150' },
    //     { title: 'Retro Rewind', date: '2024-03-15', description: 'Take a trip back to the 80s with classic hits.', time: '8 PM', location: 'Retro Bar', venue: 'Bar 80s', guestCount: '100' },
    //     { title: 'Acoustic Evenings', date: '2024-03-20', description: 'Unwind with soothing acoustic tunes.', time: '7 PM', location: 'The Garden', venue: 'Garden Stage', guestCount: '80' }
    // ];

    // const featuredEventsContainer = document.querySelector('.featured-events');
    // featuredEvents.forEach((event, index) => {
    //     const card = createEventCard(event, index);
    //     featuredEventsContainer.appendChild(card);
    // });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(featuredEvents);
    displayFeaturedEvents();
});
document.getElementById('scrollToFeatured').addEventListener('click', function() {
    document.querySelector('.featured-events').scrollIntoView({ 
        behavior: "smooth"
    });
});
// function isElementInViewport(el) {
//     const rect = el.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   }
  
//   function animateElements() {
//     const elements = document.querySelectorAll('.txt1, .txt2, .txt3, .txt4');
//     for (let i = 0; i < elements.length; i++) {
//       if (isElementInViewport(elements[i])) {
//         elements[i].classList.add('swoosh-in');
//       }
//     }
//   }
  
//   // Listen for scroll events
//   window.addEventListener('scroll', animateElements);
  
//   // Initial check
//   animateElements();
  
// Function to add the 'swoosh-in' class to the target element
// const swooshIn = (entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('swoosh-in');
//       observer.unobserve(entry.target); // Stop observing the target after it animates
//     }
//   });
// };

// // Set up the Intersection Observer
// const observer = new IntersectionObserver(swooshIn, {
//   root: null, // relative to the viewport
//   rootMargin: '0px',
//   threshold: 0.1 // trigger the callback when 10% of the target is visible
// });

// // Target elements to observe
// const elements = document.querySelectorAll('.txt1, .txt2, .txt3, .txt4');

// // Start observing the target elements
// elements.forEach(el => {
//   observer.observe(el);
// });

// function isElementInViewport(el) {
//     var rect = el.getBoundingClientRect();
//     return (
//       rect.top >= 0 &&
//       rect.left >= 0 &&
//       rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//       rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
//   }
  
//   function animateOnScroll() {
//     var elements = document.querySelectorAll('.txt1, .txt2, .txt3, .txt4');
  
//     for (var i = 0; i < elements.length; i++) {
//       if (isElementInViewport(elements[i]) && !elements[i].classList.contains('swoosh-in')) {
//         elements[i].classList.add('swoosh-in');
//       }
//     }
//   }
  
//   // Listen for scroll events
//   window.addEventListener('scroll', animateOnScroll);
  
//   // Run the function on load to check if any elements are already in view
//   animateOnScroll();
  
