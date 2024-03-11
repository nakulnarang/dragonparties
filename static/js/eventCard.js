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
        showRsvpContents(this, card, event,index); // Show the sticker

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
    fetch('/profile/rsvps', {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch RSVPs');
        }
        return response.json();
    })
    .then(data => {
        // console.log('RSVPs:', data);
        // console.log('Event ID:', event.party_id);
        // console.log('---------------');
        data.forEach(data => {
            console.log("Party ID which userr rsvp'd", data.id);
            if (data.id === event.party_id) {

            //     // console.log('Party ID matches card ID:', data);
            //     // showRsvpContents(this, card, event,index);
            //     // Perform actions here if party ID matches card ID
            //     // console.log(data.id);
                showRsvpContents(rsvpButton, card, event, index);
            }
        });      
        console.log('Current Event Card Party ID:', event.party_id);  
        // Process the RSVP data here
    })
    .catch(error => {
        console.error('Error fetching RSVPs:', error);
    });
    
    

    return card;
}

export function showRsvpContents(button, card, event, index) {
   
    button.classList.add('disabled');
    button.disabled = true; // Disable the button
    button.textContent = 'Attending'; // Change button text to "Attending"

    // this.style.backgroundColor = '#808080'; // Grey background
    button.style.color = '#FFFFFF'; // White text
    const sticker = card.querySelector('.card__sticker'); // Get the sticker element
    sticker.style.display = 'block';
}