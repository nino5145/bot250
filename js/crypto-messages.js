// Crypto Messages System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize crypto messages
    initCryptoMessages();
    
    // Start fetching crypto news
    fetchCryptoNews();
    
    // Set up auto-refresh every 2 minutes
    setInterval(fetchCryptoNews, 120000);
});

function initCryptoMessages() {
    // Create messages container if it doesn't exist
    if (!document.getElementById('crypto-messages')) {
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'crypto-messages';
        document.body.appendChild(messagesContainer);
        
        // Add chat header
        const chatHeader = document.createElement('div');
        chatHeader.className = 'crypto-chat-header';
        chatHeader.innerHTML = `
            <i class="fab fa-bitcoin"></i>
            <span>أخبار العملات الرقمية</span>
            <button id="close-crypto-chat">&times;</button>
        `;
        messagesContainer.appendChild(chatHeader);
        
        // Add messages area
        const messagesArea = document.createElement('div');
        messagesArea.className = 'crypto-messages-area';
        messagesContainer.appendChild(messagesArea);
        
        // Add event listener to close button
        document.getElementById('close-crypto-chat').addEventListener('click', function() {
            document.getElementById('crypto-messages').classList.remove('show');
        });
        
        // Add toggle button to the UI
        const toggleButton = document.createElement('div');
        toggleButton.id = 'crypto-messages-toggle';
        toggleButton.innerHTML = `<i class="fab fa-bitcoin"></i>`;
        toggleButton.addEventListener('click', function() {
            document.getElementById('crypto-messages').classList.toggle('show');
            this.classList.toggle('active');
        });
        document.body.appendChild(toggleButton);
    }
}

function fetchCryptoNews() {
    // Fetch crypto news from CryptoCompare API with focus on traditional cryptocurrencies
    const timestamp = new Date().getTime();
    fetch(`https://min-api.cryptocompare.com/data/v2/news/?categories=BTC,ETH,LTC,XRP,BCH,ADA,DOT&lang=EN&sortOrder=popular&_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            if (data.Data && data.Data.length > 0) {
                // Get the latest 5 news items
                const latestNews = data.Data.slice(0, 5);
                
                // Display as messages
                displayCryptoMessages(latestNews);
            }
        })
        .catch(error => {
            console.error('Error fetching crypto news:', error);
            // Show sample messages if API fails
            showSampleCryptoMessages();
        });
}

function displayCryptoMessages(newsItems) {
    const messagesArea = document.querySelector('.crypto-messages-area');
    
    if (!messagesArea) return;
    
    // Clear old messages if there are more than 10
    const existingMessages = messagesArea.querySelectorAll('.crypto-message');
    if (existingMessages.length > 10) {
        // Keep only the 5 most recent messages
        for (let i = 0; i < existingMessages.length - 5; i++) {
            existingMessages[i].remove();
        }
    }
    
    // Add new messages
    newsItems.forEach((item, index) => {
        // Check if message already exists
        const existingMessage = Array.from(messagesArea.querySelectorAll('.crypto-message')).find(
            msg => msg.dataset.id === item.id.toString()
        );
        
        if (!existingMessage) {
            setTimeout(() => {
                addCryptoMessage(item, messagesArea);
            }, index * 800);
        }
    });
}

function addCryptoMessage(newsItem, container) {
    // Create message element
    const message = document.createElement('div');
    message.className = 'crypto-message';
    message.dataset.id = newsItem.id;
    
    // Format time
    const time = new Date(newsItem.published_on * 1000);
    const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Determine if message contains specific crypto mentions
    const body = newsItem.body || newsItem.title || '';
    const hasBitcoin = /bitcoin|btc/i.test(body);
    const hasEthereum = /ethereum|eth/i.test(body);
    
    let cryptoClass = '';
    if (hasBitcoin) cryptoClass = 'bitcoin';
    else if (hasEthereum) cryptoClass = 'ethereum';
    
    // Create message content
    message.innerHTML = `
        <div class="message-header ${cryptoClass}">
            <span class="message-source">${newsItem.source}</span>
            <span class="message-time">${timeStr}</span>
        </div>
        <div class="message-content">
            <p>${newsItem.title}</p>
            <a href="${newsItem.url}" target="_blank" class="message-link">
                <i class="fas fa-external-link-alt"></i> المزيد
            </a>
        </div>
    `;
    
    // Add to container
    container.appendChild(message);
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
    
    // Show notification dot on toggle button
    const toggleButton = document.getElementById('crypto-messages-toggle');
    if (toggleButton) {
        toggleButton.classList.add('has-notification');
    }
    
    // Play notification sound
    playMessageSound();
}

function showSampleCryptoMessages() {
    const sampleNews = [
        {
            id: 1,
            title: "بيتكوين يتجاوز مستوى 60,000 دولار مع زيادة الطلب المؤسسي",
            source: "CoinDesk",
            published_on: Math.floor(Date.now() / 1000) - 300,
            url: "#",
            body: "Bitcoin price surges past $60,000 as institutional demand increases"
        },
        {
            id: 2,
            title: "إيثريوم يطلق تحديث جديد لتحسين رسوم المعاملات",
            source: "CryptoNews",
            published_on: Math.floor(Date.now() / 1000) - 1200,
            url: "#",
            body: "Ethereum launches new update to improve transaction fees"
        },
        {
            id: 3,
            title: "تقرير: المؤسسات تزيد استثماراتها في العملات الرقمية",
            source: "Bloomberg Crypto",
            published_on: Math.floor(Date.now() / 1000) - 2400,
            url: "#",
            body: "Report shows institutions are increasing their cryptocurrency investments"
        }
    ];
    
    const messagesArea = document.querySelector('.crypto-messages-area');
    if (messagesArea) {
        displayCryptoMessages(sampleNews);
    }
}

function playMessageSound() {
    // Create audio element
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Audio play failed:', e));
}