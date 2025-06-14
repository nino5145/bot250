// News Notifications System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize news notifications
    initNewsNotifications();
});

function initNewsNotifications() {
    // Create notifications container if it doesn't exist
    if (!document.getElementById('news-notifications')) {
        const notificationsContainer = document.createElement('div');
        notificationsContainer.id = 'news-notifications';
        document.body.appendChild(notificationsContainer);
    }
    
    // Start fetching news data
    fetchNewsData();
    
    // Set up auto-refresh every 30 seconds for faster news updates
    setInterval(fetchNewsData, 30000);
}

function fetchNewsData() {
    // Update last fetch time
    lastFetchTime = Date.now();
    
    // Fetch crypto news from CryptoCompare API
    const timestamp = new Date().getTime();
    fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular&_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            // Process and display news as notifications
            let newArticlesCount = 0;
            
            if (data.Data && data.Data.length > 0) {
                data.Data.slice(0, 5).forEach((article, index) => {
                    // Only show new content
                    if (isNewContent(article)) {
                        // Add delay between notifications
                        setTimeout(() => {
                            // Analyze sentiment and impact
                            const sentiment = analyzeSentiment(article.body || article.title || '');
                            const impacts = calculateCryptoImpacts(sentiment, article.categories, article.tags);
                            
                            // Create and show notification
                            showCryptoNewsNotification(article, impacts, 'crypto');
                        }, newArticlesCount * 3000); // Show each notification 3 seconds apart
                        
                        newArticlesCount++;
                    }
                });
            } else {
                // Show sample notifications if no articles
                showSampleNotifications();
            }
            
            // Also fetch additional crypto news
            fetchAdditionalCryptoNews();
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            // Show sample notifications if API fails
            showSampleNotifications();
            fetchEconomicCalendar();
        });
}

function showNewsNotification(article, impacts, type = 'news') {
    const notificationsContainer = document.getElementById('news-notifications');
    
    if (!notificationsContainer) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'news-notification';
    
    // Determine impact class
    const maxImpact = Math.max(Math.abs(impacts.usd), Math.abs(impacts.eur));
    let impactClass = 'low-impact';
    
    if (maxImpact >= 0.7) {
        impactClass = 'high-impact';
    } else if (maxImpact >= 0.3) {
        impactClass = 'medium-impact';
    }
    
    notification.classList.add(impactClass);
    
    // Create impact indicators
    const usdDirection = impacts.usd > 0 ? 'up' : 'down';
    const eurDirection = impacts.eur > 0 ? 'up' : 'down';
    
    // Format notification content
    notification.innerHTML = `
        <div class="notification-header">
            <i class="fas fa-newspaper"></i>
            <span class="notification-time">${formatNewsTime(article.publishedAt || article.publishedDate)}</span>
            <button class="close-notification">&times;</button>
        </div>
        <div class="notification-title">${article.title}</div>
        <div class="notification-impacts">
            <div class="impact-badge">
                <span>USD</span>
                <i class="fas fa-arrow-${usdDirection}" style="color: ${usdDirection === 'up' ? '#00ff88' : '#ff3366'}"></i>
                <span>${Math.abs(impacts.usd).toFixed(1)}</span>
            </div>
            <div class="impact-badge">
                <span>EUR</span>
                <i class="fas fa-arrow-${eurDirection}" style="color: ${eurDirection === 'up' ? '#00ff88' : '#ff3366'}"></i>
                <span>${Math.abs(impacts.eur).toFixed(1)}</span>
            </div>
        </div>
    `;
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 60 seconds (1 minute)
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 60000);
}

function showSampleNotifications() {
    const sampleNews = [
        {
            title: "بيتكوين يتجاوز مستوى 60,000 دولار مع زيادة الطلب المؤسسي",
            publishedAt: new Date(Date.now() - 5 * 60000).toISOString(),
            impacts: { btc: 1.2, eth: 0.8 }
        },
        {
            title: "إيثريوم يطلق تحديث جديد لتحسين رسوم المعاملات",
            publishedAt: new Date(Date.now() - 25 * 60000).toISOString(),
            impacts: { btc: 0.3, eth: 1.5 }
        },
        {
            title: "تقرير: المؤسسات تزيد استثماراتها في العملات الرقمية",
            publishedAt: new Date(Date.now() - 45 * 60000).toISOString(),
            impacts: { btc: 0.9, eth: 0.7 }
        }
    ];
    
    sampleNews.forEach((news, index) => {
        setTimeout(() => {
            showCryptoNewsNotification(news, news.impacts);
        }, index * 3000);
    });
}

// Analyze sentiment from news text
function analyzeSentiment(text) {
    // Simple sentiment analysis
    const positiveWords = ['growth', 'increase', 'positive', 'gain', 'rise', 'up', 'higher', 'profit', 'success', 'strong'];
    const negativeWords = ['decline', 'decrease', 'negative', 'loss', 'fall', 'down', 'lower', 'deficit', 'weak', 'crisis'];
    
    if (!text) return 0;
    
    text = text.toLowerCase();
    
    let score = 0;
    positiveWords.forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        const matches = text.match(regex);
        if (matches) score += matches.length * 0.2;
    });
    
    negativeWords.forEach(word => {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        const matches = text.match(regex);
        if (matches) score -= matches.length * 0.2;
    });
    
    return Math.max(-1, Math.min(1, score)); // Clamp between -1 and 1
}

// Calculate impacts on currencies
function calculateImpacts(sentiment, symbol) {
    // Default impacts
    let usdImpact = 0;
    let eurImpact = 0;
    
    // Adjust based on sentiment
    if (symbol && symbol.includes('USD')) {
        usdImpact = sentiment * (Math.random() * 0.5 + 0.5);
    } else if (symbol && symbol.includes('EUR')) {
        eurImpact = sentiment * (Math.random() * 0.5 + 0.5);
    } else {
        usdImpact = sentiment * (Math.random() * 0.8 + 0.2);
        eurImpact = sentiment * (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
    }
    
    return {
        usd: usdImpact,
        eur: eurImpact
    };
}

// Format news time
function formatNewsTime(dateString) {
    const publishDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - publishDate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
        return `منذ ${diffMins} دقيقة`;
    } else if (diffMins < 1440) {
        const hours = Math.floor(diffMins / 60);
        return `منذ ${hours} ساعة${hours > 1 ? 'ات' : ''}`;
    } else {
        const days = Math.floor(diffMins / 1440);
        return `منذ ${days} يوم${days > 1 ? '' : ''}`;
    }
}
// Function to toggle news notifications visibility
function toggleNewsNotifications() {
    // Remove notification dot when clicked
    const notificationDot = document.querySelector('#news-assistant-icon .notification-dot');
    if (notificationDot) {
        notificationDot.style.display = 'none';
    }
    
    // Show a new notification immediately
    const sampleNews = {
        title: "تم تحديث أخبار العملات الرقمية",
        publishedAt: new Date().toISOString(),
        impacts: { btc: Math.random() > 0.5 ? 0.7 : -0.7, eth: Math.random() > 0.5 ? 0.8 : -0.8 },
        url: "#",
        source: "Crypto Updates"
    };
    
    showCryptoNewsNotification(sampleNews, sampleNews.impacts);
}
// Fetch economic calendar events
function fetchAdditionalCryptoNews() {
    // Fetch additional crypto news from CoinGecko API
    const timestamp = new Date().getTime();
    fetch(`https://api.coingecko.com/api/v3/news?_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            // Process and display additional crypto news
            if (data && data.data && data.data.length > 0) {
                // Show only new articles (max 3)
                const eventsToShow = data.data.filter(article => {
                    // Create a unique ID for the article
                    const articleId = article.url;
                    
                    // Check if this is a new article
                    if (!shownNewsIds.includes(articleId)) {
                        shownNewsIds.push(articleId);
                        return true;
                    }
                    return false;
                }).slice(0, 3);
                
                eventsToShow.forEach((article, index) => {
                    // Add delay between notifications
                    setTimeout(() => {
                        // Convert article to event format
                        const event = {
                            event: article.title,
                            date: article.published_at || new Date().toISOString(),
                            country: article.author || 'عالمي',
                            impact: 'Medium',
                            url: article.url,
                            thumb: article.thumb_2x
                        };
                        
                        // Create crypto event notification
                        showCryptoEventNotification(event);
                    }, (index * 3000) + 9000); // Show after news notifications
                });
            }
        })
        .catch(error => {
            console.error('Error fetching additional crypto news:', error);
            // Show sample crypto events
            showSampleCryptoEvents();
        });
}

// Show meeting notification
function showMeetingNotification(event) {
    const notificationsContainer = document.getElementById('news-notifications');
    
    if (!notificationsContainer) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'news-notification meeting-notification';
    
    // Determine importance class based on event impact
    let importanceClass = 'low-impact';
    if (event.impact === 'High') {
        importanceClass = 'high-impact';
    } else if (event.impact === 'Medium') {
        importanceClass = 'medium-impact';
    }
    
    notification.classList.add(importanceClass);
    
    // Format event time
    const eventTime = formatEventTime(event.date);
    
    // Format notification content with source link if available
    let sourceLink = '';
    if (event.url) {
        sourceLink = `
            <div class="meeting-detail">
                <i class="fas fa-external-link-alt"></i>
                <a href="${event.url}" target="_blank" style="color: #00a8ff; text-decoration: none;">المصدر</a>
            </div>
        `;
    }
    
    notification.innerHTML = `
        <div class="notification-header">
            <i class="fas fa-calendar-alt"></i>
            <span class="notification-time">${eventTime}</span>
            <button class="close-notification">&times;</button>
        </div>
        <div class="notification-title">${event.event || 'اجتماع اقتصادي'}</div>
        <div class="notification-details">
            <div class="meeting-detail">
                <i class="fas fa-flag"></i>
                <span>${event.country || 'عالمي'}</span>
            </div>
            <div class="meeting-detail">
                <i class="fas fa-chart-line"></i>
                <span>${event.impact || 'متوسط'}</span>
            </div>
            ${sourceLink}
        </div>
    `;
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 60 seconds (1 minute)
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 60000);
}

// Format event time
function formatEventTime(dateString) {
    const eventDate = new Date(dateString);
    const now = new Date();
    
    // Check if event is today
    const isToday = eventDate.toDateString() === now.toDateString();
    
    // Format time
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    if (isToday) {
        // Check if event is in the past or future
        if (eventDate < now) {
            return `اليوم ${timeStr} (انتهى)`;
        } else {
            return `اليوم ${timeStr}`;
        }
    } else {
        // Format date
        const day = eventDate.getDate();
        const month = eventDate.getMonth() + 1;
        return `${day}/${month} - ${timeStr}`;
    }
}

// Show sample meeting notifications
function showSampleMeetings() {
    const now = new Date();
    const later = new Date(now);
    later.setHours(later.getHours() + 2);
    
    const sampleMeetings = [
        {
            event: "اجتماع البنك المركزي الأوروبي",
            date: later.toISOString(),
            country: "أوروبا",
            impact: "High"
        },
        {
            event: "بيانات التوظيف الأمريكية",
            date: now.toISOString(),
            country: "الولايات المتحدة",
            impact: "High"
        },
        {
            event: "قرار سعر الفائدة",
            date: now.toISOString(),
            country: "بريطانيا",
            impact: "Medium"
        }
    ];
    
    sampleMeetings.forEach((meeting, index) => {
        setTimeout(() => {
            showMeetingNotification(meeting);
        }, index * 3000 + 9000);
    });
}
// Track previously shown news to avoid duplicates
let shownNewsIds = [];
let lastFetchTime = 0;

// Check if news is new and should be shown
function isNewContent(article) {
    // Use URL as unique identifier for NewsAPI articles
    const articleId = article.url || article.id || article.title;
    
    // Check if we've already shown this article
    if (articleId && shownNewsIds.includes(articleId)) {
        return false;
    }
    
    // Check if article is recent (within last 15 minutes)
    const publishDate = article.publishedAt || article.publishedDate;
    if (publishDate) {
        const publishTime = new Date(publishDate).getTime();
        const fifteenMinutesAgo = Date.now() - (15 * 60 * 1000);
        
        // Always show very recent news (last 15 minutes)
        if (publishTime >= fifteenMinutesAgo) {
            // Add to shown list
            if (articleId) {
                shownNewsIds.push(articleId);
            }
            return true;
        }
        
        // For older articles, only show on first load
        if (publishTime < fifteenMinutesAgo && lastFetchTime > 0) {
            return false;
        }
    }
    
    // Add to shown list
    if (articleId) {
        shownNewsIds.push(articleId);
    }
    
    // Keep list manageable
    if (shownNewsIds.length > 50) {
        shownNewsIds = shownNewsIds.slice(-50);
    }
    
    return true;
}
// Calculate impacts on cryptocurrencies based on sentiment and categories
function calculateCryptoImpacts(sentiment, categories, tags) {
    // Default impacts
    let btcImpact = 0;
    let ethImpact = 0;
    
    // Convert categories and tags to lowercase strings for easier checking
    const categoriesStr = categories ? categories.join(' ').toLowerCase() : '';
    const tagsStr = tags ? tags.join(' ').toLowerCase() : '';
    const allText = categoriesStr + ' ' + tagsStr;
    
    // Check for specific cryptocurrencies mentioned
    if (allText.includes('bitcoin') || allText.includes('btc')) {
        btcImpact = sentiment * (Math.random() * 0.5 + 0.5);
    } else if (allText.includes('ethereum') || allText.includes('eth')) {
        ethImpact = sentiment * (Math.random() * 0.5 + 0.5);
    } else {
        // If no specific currency mentioned, affect both with different weights
        btcImpact = sentiment * (Math.random() * 0.8 + 0.2);
        ethImpact = sentiment * (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
    }
    
    return {
        btc: btcImpact,
        eth: ethImpact
    };
}

// Show crypto news notification
function showCryptoNewsNotification(article, impacts, type = 'crypto') {
    const notificationsContainer = document.getElementById('news-notifications');
    
    if (!notificationsContainer) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'news-notification crypto-notification';
    
    // Determine impact class
    const maxImpact = Math.max(Math.abs(impacts.btc), Math.abs(impacts.eth));
    let impactClass = 'low-impact';
    
    if (maxImpact >= 0.7) {
        impactClass = 'high-impact';
    } else if (maxImpact >= 0.3) {
        impactClass = 'medium-impact';
    }
    
    notification.classList.add(impactClass);
    
    // Create impact indicators
    const btcDirection = impacts.btc > 0 ? 'up' : 'down';
    const ethDirection = impacts.eth > 0 ? 'up' : 'down';
    
    // Format time based on available date format
    let timeStr;
    if (article.published_on) {
        timeStr = formatNewsTime(article.published_on * 1000);
    } else if (article.publishedAt) {
        timeStr = formatNewsTime(article.publishedAt);
    } else {
        timeStr = formatNewsTime(new Date().toISOString());
    }
    
    // Format notification content
    notification.innerHTML = `
        <div class="notification-header">
            <i class="fab fa-bitcoin"></i>
            <span class="notification-time">${timeStr}</span>
            <button class="close-notification">&times;</button>
        </div>
        <div class="notification-title">${article.title}</div>
        <div class="notification-impacts">
            <div class="impact-badge">
                <span>BTC</span>
                <i class="fas fa-arrow-${btcDirection}" style="color: ${btcDirection === 'up' ? '#00ff88' : '#ff3366'}"></i>
                <span>${Math.abs(impacts.btc).toFixed(1)}</span>
            </div>
            <div class="impact-badge">
                <span>ETH</span>
                <i class="fas fa-arrow-${ethDirection}" style="color: ${ethDirection === 'up' ? '#00ff88' : '#ff3366'}"></i>
                <span>${Math.abs(impacts.eth).toFixed(1)}</span>
            </div>
        </div>
        <div class="notification-source">
            <a href="${article.url}" target="_blank" style="color: #00a8ff; text-decoration: none; font-size: 12px;">
                <i class="fas fa-external-link-alt"></i> ${article.source || 'المصدر'}
            </a>
        </div>
    `;
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 60 seconds (1 minute)
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 60000);
}

// Show crypto event notification
function showCryptoEventNotification(event) {
    const notificationsContainer = document.getElementById('news-notifications');
    
    if (!notificationsContainer) return;
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'news-notification crypto-event-notification';
    
    // Determine importance class
    let importanceClass = 'medium-impact';
    notification.classList.add(importanceClass);
    
    // Format event time
    const eventTime = formatEventTime(event.date);
    
    // Format notification content with thumbnail if available
    let thumbImage = '';
    if (event.thumb) {
        thumbImage = `<img src="${event.thumb}" alt="Crypto news" style="width: 40px; height: 40px; border-radius: 4px; margin-right: 8px;">`;
    }
    
    notification.innerHTML = `
        <div class="notification-header">
            <i class="fas fa-chart-line"></i>
            <span class="notification-time">${eventTime}</span>
            <button class="close-notification">&times;</button>
        </div>
        <div class="notification-content">
            ${thumbImage}
            <div class="notification-title">${event.event}</div>
        </div>
        <div class="notification-details">
            <div class="meeting-detail">
                <i class="fas fa-user"></i>
                <span>${event.country}</span>
            </div>
            <div class="meeting-detail">
                <i class="fas fa-external-link-alt"></i>
                <a href="${event.url}" target="_blank" style="color: #00a8ff; text-decoration: none;">المصدر</a>
            </div>
        </div>
    `;
    
    // Add to container
    notificationsContainer.appendChild(notification);
    
    // Add animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Add event listener to close button
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove after 60 seconds (1 minute)
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 60000);
}

// Show sample crypto events
function showSampleCryptoEvents() {
    const sampleEvents = [
        {
            event: "بيتكوين يتجاوز مستوى 60,000 دولار",
            date: new Date().toISOString(),
            country: "CoinDesk",
            impact: "High",
            url: "#"
        },
        {
            event: "إيثريوم يطلق تحديث جديد لتحسين رسوم المعاملات",
            date: new Date().toISOString(),
            country: "CryptoNews",
            impact: "Medium",
            url: "#"
        },
        {
            event: "تقرير: المؤسسات تزيد استثماراتها في العملات الرقمية",
            date: new Date().toISOString(),
            country: "Bloomberg Crypto",
            impact: "Medium",
            url: "#"
        }
    ];
    
    sampleEvents.forEach((event, index) => {
        setTimeout(() => {
            showCryptoEventNotification(event);
        }, index * 3000 + 9000);
    });
}