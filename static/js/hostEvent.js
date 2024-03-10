document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent actual form submission

    // Simulating data collection from the form
    const formData = {
        eventName: document.getElementById('eventName').value,
        location: document.getElementById('location').value,
        dateTime: document.getElementById('eventDate').value,
        dateTime: document.getElementById('eventTime').value,
        capacity: document.getElementById('capacity').value,
        ticketPrice: document.getElementById('ticketPrice').value,
        eventDescription: document.getElementById('eventDescription').value,    
        // For the image, we'd normally handle file uploads differently,
        // but for the sake of this example, we're just acknowledging its presence.
        eventImage: document.getElementById('eventImage').files[0] ? 'Image Uploaded' : 'No Image',
    };

    console.log(formData);

    // Here you would typically send the formData to your backend using AJAX, Fetch API, or similar
    alert('Event details submitted. Check the console for the form data.');
});
document.getElementById('eventDescription').addEventListener('input', function() {
    var words = this.value.match(/\S+/g).length;

    if (words > 20) {
        // Split the string on first 30 words and rejoin
        var trimmed = this.value.split(/\s+/, 20).join(" ");
        this.value = trimmed + " ";
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('eventImage');
    const imageInfo = document.getElementById('imageInfo');
    const clearButton = document.getElementById('clearImage');

    fileInput.addEventListener('change', function() {
        const file = this.files[0]; // Get the uploaded file
        if (file) {
            // Check file type
            const fileType = file.type;
            if (fileType === 'image/jpeg' || fileType === 'image/png') {
                // Display the file name
                imageInfo.textContent = `File name: ${file.name}`;
            } else {
                alert("Please upload a JPG or PNG image.");
                this.value = ''; // Clear the input
                imageInfo.textContent = '';
            }
        }
    });

    clearButton.addEventListener('click', function() {
        fileInput.value = ''; // Clear the input
        imageInfo.textContent = ''; // Clear the file info
        console.log('File input cleared');
    });

    flatpickr("#eventTime", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true // Use this for 24-hour format
    });
});

