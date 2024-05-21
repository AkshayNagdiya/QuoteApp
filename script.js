const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote-btn');
const shareButton = document.getElementById('share-btn');
const themeToggleButton = document.getElementById('theme-toggle-btn');

// Function to fetch a random quote from the API
async function fetchQuote() {
    quoteElement.textContent = 'Loading...';
    authorElement.textContent = '';
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        const quote = data.content;
        const author = data.author;
        quoteElement.textContent = `"${quote}"`;
        authorElement.textContent = `— ${author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteElement.textContent = 'Failed to fetch quote. Please try again later.';
    }
}

// Event listener for the "New Quote" button
newQuoteButton.addEventListener('click', fetchQuote);

// Event listener for the "Share" button
shareButton.addEventListener('click', () => {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    const shareText = `${quote} ${author}`;
    if (navigator.share) {
        navigator.share({
            title: 'Quote of the Day',
            text: shareText,
            url: document.location.href,
        }).catch(console.error);
    } else {
        alert('Sharing is not supported on this browser.');
    }
});

// Function to toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Event listener for the "Toggle Theme" button
themeToggleButton.addEventListener('click', toggleTheme);

// Fetch a quote when the page loads
fetchQuote();
