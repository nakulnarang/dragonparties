import { createEventCard } from '../js/eventCard.js';


function displayFeaturedEvents() {
    // Define dummy data for three featured events
    const featuredEvents = [
        { title: 'Neon Night', date: '2024-03-10', description: 'A vibrant night of colors and music.', time: '9 PM', location: 'Downtown Club', venue: 'Club Neon', guestCount: '150' },
        { title: 'Retro Rewind', date: '2024-03-15', description: 'Take a trip back to the 80s with classic hits.', time: '8 PM', location: 'Retro Bar', venue: 'Bar 80s', guestCount: '100' },
        { title: 'Acoustic Evenings', date: '2024-03-20', description: 'Unwind with soothing acoustic tunes.', time: '7 PM', location: 'The Garden', venue: 'Garden Stage', guestCount: '80' }
    ];

    const featuredEventsContainer = document.querySelector('.featured-events');
    featuredEvents.forEach((event, index) => {
        const card = createEventCard(event, index);
        featuredEventsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedEvents();
});