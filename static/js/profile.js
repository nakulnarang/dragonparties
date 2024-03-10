document.addEventListener('DOMContentLoaded', function() {
    // This is where you would fetch the RSVP'd events from your backend
    // For this example, we're just creating dummy content
    const eventsGrid = document.querySelector('.events-grid');

    // Dummy RSVP'd events
    const events = [
        { title: 'Event 1', date: '2024-03-01', description: 'sdfsdafsdfsd adsf asdf asdf asfd asd asda dasd asd asdf asd asd asd asda das asd asd asda sdfasd asdasd asda sdasd asdasd asdasdasd asdasd asdasc ASD AS ASD AD ' },
        { title: 'Event 2', date: '2024-03-15', description: 'Description of Event 2. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.' },
        { title: 'Event 3', date: '2024-04-10', description: 'Description of Event 3. Sed nisi. Nulla quis sem at nibh elementum imperdiet.' },
    ];

    events.forEach(event => {
            const randomImageNumber = Math.floor(Math.random() * 8) + 1; // 1 to 9
    const imageName = `card${randomImageNumber}.png`;
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
        <article class="card__article">
        <div class="card__scale-1"></div>
        <div class="card__scale-2"></div>
        <div class="card__default-content">
            <div class="card__shape-1">
                <img src="../static/img/eventcards/${imageName}" alt="${event.title}">
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
            </ul>
        </div>
    </article>
        `;

        eventsGrid.appendChild(eventCard);
    });
});
