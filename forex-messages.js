// Forex Messages System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize forex messages
    initForexMessages();
    
    // Start fetching forex news
    fetchForexNews();
    
    // Set up auto-refresh every 2 minutes
    setInterval(fetchForexNews, 120000);
});

function initForexMessages() {
    // Add event listeners to existing elements
    const closeButton = document.getElementById('close-forex-chat');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            document.getElementById('forex-messages').classList.remove('show');
        });
    }
    
    const toggleButton = document.getElementById('forex-messages-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            document.getElementById('forex-messages').classList.toggle('show');
            this.classList.toggle('active');
            // Remove notification indicator when opened
            this.classList.remove('has-notification');
        });
    }
    
    // Load sample messages immediately
    showSampleForexMessages();
}
}

function fetchForexNews() {
    // Fetch forex news from API
    const timestamp = new Date().getTime();
    fetch(`https://api.marketaux.com/v1/news/all?symbols=USD,EUR,JPY,GBP,CHF,CAD,AUD,NZD&filter_entities=true&language=en&api_token=7jvAQ2LGspCdBm9sFXqgJu7BmPZgQPmIoLRVO9tJ&limit=10&published_after=${getYesterdayDate()}&_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                // Display as messages
                displayForexMessages(data.data);
            } else {
                // Try alternative API if no results
                fetchAlternativeForexNews();
            }
        })
        .catch(error => {
            console.error('Error fetching forex news:', error);
            // Try alternative API on error
            fetchAlternativeForexNews();
        });
}

function fetchAlternativeForexNews() {
    // Alternative API for forex news
    const timestamp = new Date().getTime();
    fetch(`https://finnhub.io/api/v1/news?category=forex&token=c9se1eaad3i9rj1uv0s0&_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Display as messages
                displayForexMessages(data);
            } else {
                // Show sample messages if no results
                showSampleForexMessages();
            }
        })
        .catch(error => {
            console.error('Error fetching alternative forex news:', error);
            // Show sample messages if API fails
            showSampleForexMessages();
        });
}

function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
}

function displayForexMessages(newsItems) {
    const messagesArea = document.querySelector('.forex-messages-area');
    
    if (!messagesArea) return;
    
    // Clear old messages if there are more than 10
    const existingMessages = messagesArea.querySelectorAll('.forex-message');
    if (existingMessages.length > 10) {
        // Keep only the 5 most recent messages
        for (let i = 0; i < existingMessages.length - 5; i++) {
            existingMessages[i].remove();
        }
    }
    
    // Add new messages
    newsItems.forEach((item, index) => {
        // Create unique ID for the message
        const messageId = item.id || item.uuid || (item.title && item.title.substring(0, 20));
        
        // Check if message already exists
        const existingMessage = Array.from(messagesArea.querySelectorAll('.forex-message')).find(
            msg => msg.dataset.id === messageId
        );
        
        if (!existingMessage && messageId) {
            setTimeout(() => {
                addForexMessage(item, messagesArea, messageId);
            }, index * 800);
        }
    });
}

function addForexMessage(newsItem, container, messageId) {
    // Create message element
    const message = document.createElement('div');
    message.className = 'forex-message';
    message.dataset.id = messageId;
    
    // Format time
    let timeStr;
    if (newsItem.published_at) {
        const time = new Date(newsItem.published_at);
        timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (newsItem.datetime) {
        const time = new Date(newsItem.datetime * 1000);
        timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
        timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Determine if message contains specific currency mentions
    const title = newsItem.title || '';
    const description = newsItem.description || newsItem.summary || '';
    const content = title + ' ' + description;
    
    // Check for currency mentions
    const hasDollar = /\$|USD|dollar|دولار/i.test(content);
    const hasEuro = /EUR|euro|يورو/i.test(content);
    const hasYen = /JPY|yen|ين/i.test(content);
    const hasPound = /GBP|pound|sterling|جنيه/i.test(content);
    
    let currencyClass = '';
    if (hasDollar) currencyClass = 'dollar';
    else if (hasEuro) currencyClass = 'euro';
    else if (hasYen) currencyClass = 'yen';
    else if (hasPound) currencyClass = 'pound';
    
    // Get source
    const source = newsItem.source || newsItem.source_name || 'Forex News';
    
    // Get URL
    const url = newsItem.url || newsItem.news_url || '#';
    
    // Create message content
    message.innerHTML = `
        <div class="message-header ${currencyClass}">
            <span class="message-source">${source}</span>
            <span class="message-time">${timeStr}</span>
        </div>
        <div class="message-content">
            <p>${title}</p>
            <a href="${url}" target="_blank" class="message-link" onclick="window.open('${url}', '_blank')">
                <i class="fas fa-external-link-alt"></i> المزيد
            </a>
        </div>
    `;
    
    // Add click event to ensure link opens in new tab
    const messageLink = message.querySelector('.message-link');
    if (messageLink) {
        messageLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.getAttribute('href') !== '#') {
                window.open(this.getAttribute('href'), '_blank');
            }
        });
    }
    
    // Add to container
    container.appendChild(message);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    
    // Show notification dot on toggle button
    const toggleButton = document.getElementById('forex-messages-toggle');
    if (toggleButton) {
        toggleButton.classList.add('has-notification');
    }
    
    // Play notification sound
    playMessageSound();
}

function showSampleForexMessages() {
    const sampleNews = [
        {
            id: "1",
            title: "الدولار يرتفع مقابل اليورو بعد بيانات التوظيف الأمريكية القوية",
            source: "Forex News",
            published_at: new Date().toISOString(),
            url: "https://www.forexlive.com/news/latest-forex-news"
        },
        {
            id: "2",
            title: "الين الياباني يتراجع وسط مخاوف من تدخل بنك اليابان",
            source: "Market Watch",
            published_at: new Date(Date.now() - 1200000).toISOString(),
            url: "https://www.marketwatch.com/investing/currencies/usdjpy"
        },
        {
            id: "3",
            title: "الجنيه الإسترليني يستقر بعد قرار بنك إنجلترا بشأن أسعار الفائدة",
            source: "Reuters",
            published_at: new Date(Date.now() - 2400000).toISOString(),
            url: "https://www.reuters.com/markets/currencies/"
        }
    ];
    
    const messagesArea = document.querySelector('.forex-messages-area');
    if (messagesArea) {
        displayForexMessages(sampleNews);
    }
}

function playMessageSound() {
    // Create audio element
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
}