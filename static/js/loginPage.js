


document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to be sent in the POST request
    const loginData = {
        email: email,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Convert the JavaScript object to a JSON string
        body: JSON.stringify(loginData)
    }).then(response => {
        if (response.ok) {
            console.log(loginData);
            return response.text(); // or response.json() if your server sends JSON
        }
        throw new Error('Network response was not ok.');
    }).then(html => {
        // Process the response (e.g., redirect or update the page content)
        window.location.href = '/home'; // Redirect to /home on successful POST
    }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});








