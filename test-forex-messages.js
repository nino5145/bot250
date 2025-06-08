// Test script to ensure forex messages are displayed
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testing forex messages display');
    
    // Check if elements exist
    const messagesContainer = document.getElementById('forex-messages');
    const messagesArea = document.querySelector('.forex-messages-area');
    
    if (messagesContainer && messagesArea) {
        console.log('Forex messages container found');
        
        // Force display sample messages
        const sampleNews = [
            {
                id: "test1",
                title: "الدولار يرتفع مقابل اليورو بعد بيانات التوظيف الأمريكية القوية",
                source: "Forex News",
                published_at: new Date().toISOString(),
                url: "https://www.forexlive.com/news/latest-forex-news"
            },
            {
                id: "test2",
                title: "الين الياباني يتراجع وسط مخاوف من تدخل بنك اليابان",
                source: "Market Watch",
                published_at: new Date(Date.now() - 1200000).toISOString(),
                url: "https://www.marketwatch.com/investing/currencies/usdjpy"
            }
        ];
        
        // Add messages directly
        sampleNews.forEach((item, index) => {
            setTimeout(() => {
                // Create message element
                const message = document.createElement('div');
                message.className = 'forex-message';
                message.dataset.id = item.id;
                
                // Format time
                const time = new Date(item.published_at);
                const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                // Create message content
                message.innerHTML = `
                    <div class="message-header dollar">
                        <span class="message-source">${item.source}</span>
                        <span class="message-time">${timeStr}</span>
                    </div>
                    <div class="message-content">
                        <p>${item.title}</p>
                        <a href="${item.url}" target="_blank" class="message-link">
                            <i class="fas fa-external-link-alt"></i> المزيد
                        </a>
                    </div>
                `;
                
                // Add to container
                messagesArea.appendChild(message);
                
                console.log(`Added test message ${index + 1}`);
            }, index * 500);
        });
        
        // Make sure container is visible
        messagesContainer.classList.add('show');
        
        const toggleButton = document.getElementById('forex-messages-toggle');
        if (toggleButton) {
            toggleButton.classList.add('active');
            toggleButton.classList.add('has-notification');
        }
    } else {
        console.error('Forex messages container not found');
    }
});