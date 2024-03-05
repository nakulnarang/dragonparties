export function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card';

    const randomImageNumber = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const imageName = `card${randomImageNumber}.png`;

    let articleClass = ''; // default blue
    if ((index + 1) % 3 === 1) {
        articleClass = 'card__green';
    } else if ((index + 1) % 3 === 2) {
        articleClass = 'card__orange';
    }

    card.innerHTML = `
    <article class="card__article ${articleClass}">
    <div class="card__sticker" style="display: none;">
        <img src="../static/img/balloonicon.png" alt="Attending"> <!-- Adjust the src attribute as needed -->
    </div>
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
            <li>Time: ${event.time}</li>
            <li>Location: ${event.location}</li>
            <li>Venue: ${event.venue}</li>
            <li>Date: ${event.date}</li>
            <li>Guest Count: ${event.guestCount}</li>
        </ul>
        <button class="card__rsvp-button">RSVP</button>
    </div>
</article>
    `;

    const rsvpButton = card.querySelector('.card__rsvp-button');
    rsvpButton.addEventListener('click', function() {
        console.log('RSVP clicked for:', event.title, 'Index:', index);
        this.disabled = true; // Disable the button
        this.textContent = 'Attending'; // Change button text to "Attending"
        this.style.backgroundColor = '#808080'; // Grey background
        this.style.color = '#FFFFFF'; // White text
        const sticker = card.querySelector('.card__sticker'); // Get the sticker element
        sticker.style.display = 'block'; // Show the sticker
    });

    return card;
}
