// News Assistant for Binary Trader DZ
// This component displays real-time news and their effects on USD and EUR

document.addEventListener('DOMContentLoaded', function() {
    // Initialize news assistant
    initNewsAssistant();
});

function initNewsAssistant() {
    // Create news assistant container if it doesn't exist
    if (!document.getElementById('news-assistant')) {
        createNewsAssistantUI();
    }
    
    // Initialize news assistant icon
    createNewsAssistantIcon();
    
    // Start fetching news data
    fetchNewsData();
    
    // Set up auto-refresh every 30 seconds for more frequent updates
    setInterval(fetchNewsData, 30000);
}

function createNewsAssistantUI() {
    // Create main container
    const newsAssistant = document.createElement('div');
    newsAssistant.id = 'news-assistant';
    newsAssistant.className = 'news-assistant hidden';
    newsAssistant.style.opacity = '0';
    newsAssistant.style.transform = 'translateY(20px)';
    newsAssistant.style.display = 'none';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'news-header';
    header.innerHTML = `
        <i class="fas fa-newspaper"></i>
        <span>أخبار الأسواق المباشرة</span>
        <div class="news-controls">
            <button id="news-refresh" title="تحديث"><i class="fas fa-sync-alt"></i></button>
            <button id="news-toggle" title="إخفاء/إظهار"><i class="fas fa-chevron-up"></i></button>
        </div>
    `;
    
    // Create news content container
    const newsContent = document.createElement('div');
    newsContent.className = 'news-content';
    newsContent.innerHTML = `
        <div class="news-loading">
            <div class="news-loader"></div>
            <span>جاري تحميل الأخبار...</span>
        </div>
        <div class="news-items"></div>
    `;
    
    // Append elements
    newsAssistant.appendChild(header);
    newsAssistant.appendChild(newsContent);
    
    // Add to document
    document.body.appendChild(newsAssistant);
    
    // Add event listeners
    document.getElementById('news-refresh').addEventListener('click', function() {
        this.classList.add('rotating');
        fetchNewsData();
        setTimeout(() => {
            this.classList.remove('rotating');
        }, 1000);
    });
    
    document.getElementById('news-toggle').addEventListener('click', function() {
        const newsContent = document.querySelector('.news-content');
        const icon = this.querySelector('i');
        
        if (newsContent.classList.contains('collapsed')) {
            newsContent.classList.remove('collapsed');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            newsContent.classList.add('collapsed');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
}

function fetchNewsData() {
    const newsItems = document.querySelector('.news-items');
    const newsLoading = document.querySelector('.news-loading');
    
    if (newsLoading) {
        newsLoading.style.display = 'flex';
    }
    
    // Fetch crypto news from CryptoCompare API
    const timestamp = new Date().getTime();
    fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular&_t=${timestamp}`)
        .then(response => response.json())
        .then(data => {
            if (newsLoading) {
                newsLoading.style.display = 'none';
            }
            
            // Clear previous news
            if (newsItems) {
                newsItems.innerHTML = '';
                
                // Track shown news to avoid duplicates
                const shownArticleIds = [];
                
                // Process and display crypto news data
                if (data.Data && data.Data.length > 0) {
                    data.Data.slice(0, 10).forEach((article, index) => {
                        // Skip if we've already shown this article
                        const articleId = article.id;
                        if (articleId && shownArticleIds.includes(articleId)) {
                            return;
                        }
                        
                        // Add to shown list
                        if (articleId) {
                            shownArticleIds.push(articleId);
                        }
                        
                        // Analyze sentiment and impact (simplified algorithm)
                        const sentiment = analyzeSentiment(article.body || article.title || '');
                        const impacts = calculateCryptoImpacts(sentiment, article.categories, article.tags);
                        
                        const newsItem = document.createElement('div');
                        newsItem.className = `news-item ${getImportance(impacts)}`;
                        
                        // Create impact indicators
                        const btcImpact = createImpactIndicator('BTC', impacts.btc);
                        const ethImpact = createImpactIndicator('ETH', impacts.eth);
                        
                        // Format time
                        const publishedTime = formatNewsTime(article.published_on * 1000);
                        
                        // Get source info
                        const sourceInfo = article.source_info || {};
                        const sourceIcon = article.imageurl || '';
                        
                        newsItem.innerHTML = `
                            <div class="news-item-header">
                                <span class="news-time">${publishedTime}</span>
                                <span class="news-source">${article.source}</span>
                                <span class="news-importance"></span>
                            </div>
                            <div class="news-title">${article.title}</div>
                            <div class="news-impact">
                                ${btcImpact}
                                ${ethImpact}
                            </div>
                            <div class="news-link">
                                <a href="${article.url}" target="_blank" style="color: #00a8ff; text-decoration: none; font-size: 12px;">
                                    <i class="fas fa-external-link-alt"></i> المصدر
                                </a>
                            </div>
                        `;
                        
                        // Add animation
                        newsItem.style.animationDelay = `${index * 0.15}s`;
                        
                        newsItems.appendChild(newsItem);
                    });
                } else {
                    // Fallback to sample data if no articles
                    useSampleNewsData();
                }
            }
        })
        .catch(error => {
            console.error('Error fetching crypto news:', error);
            
            if (newsLoading) {
                newsLoading.style.display = 'none';
            }
            
            // Show error message
            if (newsItems) {
                newsItems.innerHTML = `
                    <div class="news-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>حدث خطأ أثناء تحميل الأخبار. يرجى المحاولة مرة أخرى.</span>
                    </div>
                `;
            }
            
            // Fallback to sample data if API fails
            useSampleNewsData();
        });
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
        .catch(error => {
            console.error('Error fetching news:', error);
            
            if (newsLoading) {
                newsLoading.style.display = 'none';
            }
            
            // Show error message
            if (newsItems) {
                newsItems.innerHTML = `
                    <div class="news-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>حدث خطأ أثناء تحميل الأخبار. يرجى المحاولة مرة أخرى.</span>
                    </div>
                `;
            }
            
            // Fallback to sample data if API fails
            useSampleNewsData();
        });
}

// Analyze sentiment from news text
function analyzeSentiment(text) {
    // Simple sentiment analysis (in production, use a more sophisticated algorithm or API)
    const positiveWords = ['growth', 'increase', 'positive', 'gain', 'rise', 'up', 'higher', 'profit', 'success', 'strong'];
    const negativeWords = ['decline', 'decrease', 'negative', 'loss', 'fall', 'down', 'lower', 'deficit', 'weak', 'crisis'];
    
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

// Calculate impacts on currencies based on sentiment and symbols
function calculateImpacts(sentiment, symbol) {
    // Default impacts
    let usdImpact = 0;
    let eurImpact = 0;
    
    // Adjust based on sentiment
    if (symbol && symbol.includes('USD')) {
        usdImpact = sentiment * (Math.random() * 0.5 + 0.5); // 0.5 to 1.0 multiplier
    } else if (symbol && symbol.includes('EUR')) {
        eurImpact = sentiment * (Math.random() * 0.5 + 0.5);
    } else {
        // If no specific currency mentioned, affect both with different weights
        usdImpact = sentiment * (Math.random() * 0.8 + 0.2);
        eurImpact = sentiment * (Math.random() * 0.8 + 0.2) * (Math.random() > 0.5 ? 1 : -1); // Sometimes opposite effect
    }
    
    return {
        usd: usdImpact,
        eur: eurImpact
    };
}

// Determine news importance based on impact
function getImportance(impacts) {
    const maxImpact = Math.max(Math.abs(impacts.usd), Math.abs(impacts.eur));
    
    if (maxImpact >= 0.7) return 'high';
    if (maxImpact >= 0.3) return 'medium';
    return 'low';
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

// Fallback to sample data if API fails
function useSampleNewsData() {
    const newsItems = document.querySelector('.news-items');
    
    // Sample crypto news data
    const newsData = [
        {
            title: "بيتكوين يتجاوز مستوى 60,000 دولار مع زيادة الطلب المؤسسي",
            time: "منذ 5 دقائق",
            impact: {
                btc: 1.2,
                eth: 0.8
            },
            importance: "high"
        },
        {
            title: "إيثريوم يطلق تحديث جديد لتحسين رسوم المعاملات",
            time: "منذ 25 دقيقة",
            impact: {
                btc: 0.3,
                eth: 1.5
            },
            importance: "high"
        },
        {
            title: "تقرير: المؤسسات تزيد استثماراتها في العملات الرقمية",
            time: "منذ 45 دقيقة",
            impact: {
                btc: 0.9,
                eth: 0.7
            },
            importance: "medium"
        },
        {
            title: "تنظيم جديد للعملات الرقمية في الاتحاد الأوروبي",
            time: "منذ ساعة",
            impact: {
                btc: -0.5,
                eth: -0.7
            },
            importance: "high"
        },
        {
            title: "كاردانو يعلن عن شراكة جديدة مع مشروع عالمي",
            time: "منذ ساعتين",
            impact: {
                btc: 0.1,
                eth: 0.2
            },
            importance: "medium"
        }
    ];
    
    // Clear previous news
    if (newsItems) {
        newsItems.innerHTML = '';
        
        // Add news items
        newsData.forEach((news, index) => {
            const newsItem = document.createElement('div');
            newsItem.className = `news-item ${news.importance}`;
            
            // Create impact indicators
            const btcImpact = createImpactIndicator('BTC', news.impact.btc);
            const ethImpact = createImpactIndicator('ETH', news.impact.eth);
            
            newsItem.innerHTML = `
                <div class="news-item-header">
                    <span class="news-time">${news.time}</span>
                    <span class="news-importance"></span>
                </div>
                <div class="news-title">${news.title}</div>
                <div class="news-impact">
                    ${btcImpact}
                    ${ethImpact}
                </div>
            `;
            
            // Add animation
            newsItem.style.animationDelay = `${index * 0.15}s`;
            
            newsItems.appendChild(newsItem);
        });
    }
}
}

function createImpactIndicator(currency, impact) {
    const direction = impact > 0 ? 'up' : 'down';
    const strength = Math.abs(impact);
    let strengthClass = '';
    
    if (strength >= 1) {
        strengthClass = 'strong';
    } else if (strength >= 0.5) {
        strengthClass = 'medium';
    } else {
        strengthClass = 'weak';
    }
    
    return `
        <div class="currency-impact ${direction} ${strengthClass}">
            <span class="currency">${currency}</span>
            <span class="impact-arrow">
                <i class="fas fa-arrow-${direction}"></i>
                ${strength.toFixed(1)}
            </span>
        </div>
    `;
}
function createNewsAssistantIcon() {
    // Get the icon element
    const icon = document.getElementById('news-assistant-icon');
    
    if (!icon) return;
    
    // Add click event to toggle news assistant
    icon.addEventListener('click', function() {
        const newsAssistant = document.getElementById('news-assistant');
        
        if (!newsAssistant) {
            console.error('News assistant element not found');
            return;
        }
        
        if (newsAssistant.classList.contains('hidden')) {
            newsAssistant.classList.remove('hidden');
            newsAssistant.style.display = 'block';
            setTimeout(() => {
                newsAssistant.style.opacity = '1';
                newsAssistant.style.transform = 'translateY(0)';
            }, 10);
        } else {
            newsAssistant.style.opacity = '0';
            newsAssistant.style.transform = 'translateY(20px)';
            setTimeout(() => {
                newsAssistant.style.display = 'none';
                newsAssistant.classList.add('hidden');
            }, 300);
        }
        
        // Remove notification dot when clicked
        const notificationDot = this.querySelector('.notification-dot');
        if (notificationDot) {
            notificationDot.style.display = 'none';
        }
    });
}
// Function to toggle news assistant visibility
function toggleNewsAssistant() {
    const newsAssistant = document.getElementById('news-assistant');
    
    if (!newsAssistant) {
        console.error('News assistant element not found');
        return;
    }
    
    if (newsAssistant.classList.contains('hidden')) {
        newsAssistant.classList.remove('hidden');
        newsAssistant.style.display = 'block';
        setTimeout(() => {
            newsAssistant.style.opacity = '1';
            newsAssistant.style.transform = 'translateY(0)';
        }, 10);
    } else {
        newsAssistant.style.opacity = '0';
        newsAssistant.style.transform = 'translateY(20px)';
        setTimeout(() => {
            newsAssistant.style.display = 'none';
            newsAssistant.classList.add('hidden');
        }, 300);
    }
    
    // Remove notification dot when clicked
    const notificationDot = document.querySelector('#news-assistant-icon .notification-dot');
    if (notificationDot) {
        notificationDot.style.display = 'none';
    }
}