


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
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            console.log('Login successful');
            window.location.href = '/home'; // Redirect to the home page on successful login
        } else {
            console.log('Login unsuccessful');
            // Handle unsuccessful login here (e.g., show error message)
            alert('Login unsuccessful');
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
});








