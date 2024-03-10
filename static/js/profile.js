document.addEventListener('DOMContentLoaded', function() {
    
    
        // Function to make AJAX request to fetch user details
        function getUserDetails() {
            fetch('/get_user_details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                // Populate user details in the HTML
                const userDetailsContainer = document.querySelector('.user-details');
                console.log(data);
                // console.log(data.s)
                userDetailsContainer.innerHTML = `
                    <h1>User Profile</h1>
                    <p><strong>Name:</strong> ${data.name}</p>
                    <p><strong>Username:</strong> ${data.username}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Gender:</strong> ${data.gender}</p>
                    <!-- Add more user details as needed -->
                `;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

    // Populate user details
    /*const userDetailsContainer = document.querySelector('.user-details');
    userDetailsContainer.innerHTML = `
        <h1>User Profile</h1>
        <p><strong>Name:</strong> ${userDetails.name}</p>
        <p><strong>Username:</strong> ${userDetails.username}</p>
        <p><strong>Email:</strong> ${userDetails.email}</p>
    `; */

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
