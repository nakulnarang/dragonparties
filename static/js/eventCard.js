export function createEventCard(event, index) {
    const card = document.createElement('div');
    card.className = 'event-card ';

    const randomImageNumber = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const imageName = `card${randomImageNumber}.png`;

    // let articleClass = ''; 
    // if ((index + 1) % 3 === 1) {
    //     articleClass = 'card__green';
    // } else if ((index + 1) % 3 === 2) {
    //     articleClass = 'card__orange';
    // }

    card.innerHTML = `
    <article class="card__article">
    <div class="card__sticker" style="display: none;">
        <img src="../static/img/balloonicon.png" alt="Attending"> <!-- Adjust the src attribute as needed -->
    </div>
    <div class="card__scale-1"></div>
    <div class="card__scale-2"></div>
    <div class="card__default-content">
        <div class="card__shape-1">
        <img src="data:image/jpeg;base64,${event.image}" alt="${event.party_name}">
        </div>
        <div class="card__data">
            <h2 class="card__title">${event.party_name}</h2>
            <p class="card__description">${event.desc}</p>
        </div>
    </div>
    <div class="card__hover-content">
        <ul>
            <li>Location: ${event.location}</li>
            <li>Entry Price: $${event.price}</li>
            <li>Date: ${event.datetime}</li>
        </ul>
        <div class="button-container">
             <button class="card__rsvp-button">RSVP</button>
        </div>

    </div>
</article>
    `;

    const rsvpButton = card.querySelector('.card__rsvp-button');
    rsvpButton.addEventListener('click', function() {
        console.log('RSVP clicked for:', event.title, 'Index:', index);
        this.classList.add('disabled');
        this.disabled = true; // Disable the button
        this.textContent = 'Attending'; // Change button text to "Attending"
        // this.style.backgroundColor = '#808080'; // Grey background
        this.style.color = '#FFFFFF'; // White text
        const sticker = card.querySelector('.card__sticker'); // Get the sticker element
        sticker.style.display = 'block'; // Show the sticker

        fetch('/home/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ party_id: event.party_id}), // Replace YOUR_PARTY_ID with the actual party ID
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('RSVP failed');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response from the server
        })
        .catch(error => {
            console.error('Error RSVPing:', error);
        });
    });

    return card;
}
