
import { createEventCard } from '../js/eventCard.js';
function fetchEvents() {
    // Dummy data for now later implemennt fetching from the server
    const events = [
        { title: 'Event 1', date: '2024-03-01', description: 'sdfsdafsdfsd adsf asdf asdf asfd asd asda dasd asd asdf asd asd asd asda das asd asd asda sdfasd asdasd asda sdasd asdasd asdasdasd asdasd asdasc ASD AS ASD AD ' },
        { title: 'Event 2', date: '2024-03-15', description: 'Description of Event 2. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { title: 'Event 3', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 4', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        { title: 'Event 5', date: '2024-06-20', description: 'Description of Event 5. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.' },
        { title: 'Event 6', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 7', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        { title: 'Event 8', date: '2024-06-20', description: 'Description of Event 5. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.' },
        { title: 'Event 9', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 10', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        { title: 'Event 11', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
    ];

    const eventsGrid = document.getElementById('eventsGrid');
    events.forEach((event, index) => {
        const card = createEventCard(event, index);
        eventsGrid.appendChild(card);
    });
}
document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
    // check
    console.log('Events fetched');
});

// function createEventCard(event, index) {
//     const card = document.createElement('div');
//     card.className = 'event-card';

//     const randomImageNumber = Math.floor(Math.random() * 8) + 1; // 1 to 9
//     const imageName = `card${randomImageNumber}.png`;
//     console.log(imageName);


//     let articleClass = 'card__orange'; 


//     if ((index + 1) % 3 === 1) { 
//         articleClass = '';  // no class is default blue 
//     } else if ((index + 1) % 3 === 2) {
//         articleClass = 'card__green'; 
        
//     } else { 
//         articleClass = 'card__orange'; 
   
//     }

//     // Use the articleClass variable within the template literal
//     card.innerHTML = `
//     <article class="card__article ${articleClass}">
//         <div class="card__scale-1"></div>
//         <div class="card__scale-2"></div>
//         <div class="card__default-content">
//             <div class="card__shape-1">
//                 <img src="../static/img/eventcards/${imageName}" alt="${event.title}">
//             </div>
//             <div class="card__data">
//                 <h2 class="card__title">${event.title}</h2>
//                 <p class="card__description">${event.description}</p>
//             </div>
//         </div>
//         <div class="card__hover-content">
//             <ul>
//                 <li>Time: event.time</li>
//                 <li>Location: </li>
//                 <li>Venue: </li>
//                 <li>Date:</li>
//                 <li>Guest Count:</li>
//                 <button class="card__rsvp-button" id = "rsvpbtn">RSVP</button>
//             </ul>
//         </div>
//     </article>
// `;
// const rsvpButton = card.querySelector('.card__rsvp-button');
// rsvpButton.addEventListener('click', function() {
//     console.log('RSVP clicked for:', event.title, 'Index:', index);
// });

//     return card;
// }





// <h3>${event.title}</h3>
// <p>${event.date}</p>
// <p>${event.description}</p>