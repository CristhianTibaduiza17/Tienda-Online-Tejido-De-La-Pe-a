document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simulate form submission response
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = `Gracias, ${name}. Hemos recibido tu mensaje y te contactaremos pronto.`;

    // Clear the form
    document.getElementById('contactForm').reset();
});
