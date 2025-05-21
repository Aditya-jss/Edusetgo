# Edusetgo
Abroad consultancy
# EduSetGo India Clone

A responsive website for an educational consultancy helping students study abroad with different package options.

## Features

- Responsive design that works on all devices
- Information about study abroad packages
- Testimonials section
- Interactive chatbot with predefined responses
- Contact form with form submission capabilities
- Smooth scrolling navigation

## Files Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling for the website
- `script.js` - JavaScript functionality

## Setting Up the Contact Form

The contact form is set up to use Formspree, a free service that allows you to receive form submissions directly to your email without any backend code.

To set up the form:

1. Go to [Formspree](https://formspree.io/) and create a free account
2. Create a new form and get your form ID
3. Replace `your_formspree_id` in the form action URL with your actual form ID:

```html
<form id="contactForm" action="https://formspree.io/f/your_formspree_id" method="POST">
```

After this setup, when someone submits the form, you'll receive the submission in your email.

## Chatbot Usage

The website includes a simple chatbot with predefined prompts. The chatbot appears as a chat bubble in the bottom right corner of the screen.

- Click on the "Chat with us" button to open the chatbot
- Click on one of the predefined prompts to see the answer
- You can also type your own message and get a generic response

To customize the chatbot responses, edit the `chatbotResponses` object in `script.js`.

## Image Placeholders

The website uses placeholder divs for images. To replace these with your own images:

1. Find the div with the class `image-placeholder`
2. Replace it with an image tag:

```html
<img src="path-to-your-image.jpg" alt="Description" class="about-image">
```

## Customizing Colors

You can easily change the color scheme by editing the CSS variables at the top of the `styles.css` file:

```css
:root {
    --primary-color: #0056b3;
    --secondary-color: #00a0e3;
    --accent-color: #ff6b6b;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --text-color: #212529;
}
```

## Responsive Behavior

The website is fully responsive with the following features:

- Mobile navigation toggle for smaller screens
- Responsive grid layouts for services, testimonials, and packages
- Appropriate font scaling for different device sizes
- Optimized chatbot display on mobile devices

## Browser Compatibility

The website works on all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge

## Additional Customization

The code is structured to make customization easy:

- Each section has clear comments in the HTML
- CSS classes are named intuitively
- JavaScript functions are organized by feature

Feel free to modify any part of the code to suit your specific needs.