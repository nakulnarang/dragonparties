function fetchEvents() {
    // Simulating fetching events data
    const events = [
        { title: 'Event 1', date: '2024-03-01', description: 'Description of Event 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Event 2', date: '2024-03-15', description: 'Description of Event 2. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { title: 'Event 3', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 4', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        { title: 'Event 5', date: '2024-06-20', description: 'Description of Event 5. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.' },
        { title: 'Event 6', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 7', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        { title: 'Event 8', date: '2024-06-20', description: 'Description of Event 5. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.' },
        { title: 'Event 9', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
        { title: 'Event 10', date: '2024-05-05', description: 'Description of Event 4. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.' },
        
        // Add more dummy events as needed
    ];

    const eventsGrid = document.getElementById('eventsGrid');
    events.forEach((event, index) => {
        const card = createEventCard(event, index);
        eventsGrid.appendChild(card);
    });
}

function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card';

    // Define a variable for the article class
    let articleClass = 'card__orange'; // Default class

    // Adjust the articleClass based on the index
    if ((index + 1) % 3 === 1) { // First column
        articleClass = ''; // orange card
    } else if ((index + 1) % 3 === 2) { // Second column
        articleClass = 'card__green'; // green card
        
    } else { // Third column
        articleClass = 'card__orange'; // blue card
   
    }

    // Use the articleClass variable within the template literal
    card.innerHTML = `
    <article class="card__article ${articleClass}">
        <div class="card__scale-1"></div>
        <div class="card__scale-2"></div>
        <div class="card__default-content">
            <div class="card__shape-1">
                <img src="../static/img/eventcards/card1.png" alt="${event.title}">
            </div>
            <div class="card__data">
                <h2 class="card__title">${event.title}</h2>
                <p class="card__description">${event.description}</p>
            </div>
        </div>
        <div class="card__hover-content">
            <ul>
                <li>Time: event.time</li>
                <li>Location: </li>
                <li>Venue: </li>
                <li>Date:</li>
                <li>Guest Count:</li>
                <button class="card__rsvp-button">RSVP</button>
            </ul>
        </div>
    </article>
`;

    return card;
}


document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});


// <h3>${event.title}</h3>
// <p>${event.date}</p>
// <p>${event.description}</p>