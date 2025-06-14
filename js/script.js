// Binary Trader DZ - Advanced Trading System
document.addEventListener('DOMContentLoaded', function() {
    // Get pairs dropdown element
    const pairBox = document.getElementById('pair__box');
    
    // Signal generation button
    const signalBtn = document.getElementById('signal');
    const loader = document.getElementById('loader');
    const resultBtn = document.getElementById('result');
    const remTime = document.querySelector('.rem__time');
    
    // Create block overlay element
    const blockOverlay = document.createElement('div');
    blockOverlay.id = 'block-overlay';
    document.body.appendChild(blockOverlay);
    
    // Add holographic hover effect to elements
    const interactiveElements = document.querySelectorAll('button, select');
    interactiveElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 247, 255, 0.4) 0%, transparent 50%), 
                                    ${this.tagName === 'BUTTON' ? 'linear-gradient(45deg, var(--secondary-color), var(--primary-color))' : 'rgba(10, 14, 23, 0.8)'}`;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tagName === 'BUTTON') {
                this.style.background = 'linear-gradient(45deg, var(--secondary-color), var(--primary-color))';
            } else {
                this.style.background = 'rgba(10, 14, 23, 0.8)';
            }
        });
    });
    
    // Function to create flash effect on selects
    function flashSelects() {
        const pairSelect = document.getElementById('pair__box');
        const timeSelect = document.getElementById('time__box');
        
        if (pairSelect.value && timeSelect.value) {
            pairSelect.classList.add('flash');
            timeSelect.classList.add('flash');
            
            setTimeout(() => {
                pairSelect.classList.remove('flash');
                timeSelect.classList.remove('flash');
            }, 800);
        }
    }
    
    // Add change event listeners to selects for flash effect
    document.getElementById('pair__box').addEventListener('change', flashSelects);
    document.getElementById('time__box').addEventListener('change', flashSelects);
    
    // Platform selection functionality
    const platformOptions = document.querySelectorAll('.platform-option');
    const docWrapper = document.getElementById('doc__wrapper');
    let selectedPlatform = 'quotex'; // Default platform
    
    // Apply platform-specific styles initially
    applyPlatformStyles('quotex');
    
    platformOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            platformOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Store selected platform
            selectedPlatform = this.getAttribute('data-platform');
            
            // Flash effect on platform change
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse-buy 1s';
            }, 10);
            
            // Update pairs based on selected platform
            updatePairsForPlatform(selectedPlatform);
            
            // Apply platform-specific styles
            applyPlatformStyles(selectedPlatform);
        });
    });
    
    // Function to apply platform-specific styles
    function applyPlatformStyles(platform) {
        // Change button colors based on platform
        if (platform === 'quotex') {
            signalBtn.style.background = 'linear-gradient(45deg, #cc0033, #ff3366)';
            docWrapper.style.boxShadow = '0 0 30px rgba(255, 51, 102, 0.3)';
        } else {
            signalBtn.style.background = 'linear-gradient(45deg, #0066ff, #00f7ff)';
            docWrapper.style.boxShadow = '0 0 30px rgba(0, 102, 255, 0.3)';
        }
        
        // Create flash effect
        const flashOverlay = document.createElement('div');
        flashOverlay.style.position = 'fixed';
        flashOverlay.style.top = '0';
        flashOverlay.style.left = '0';
        flashOverlay.style.width = '100%';
        flashOverlay.style.height = '100%';
        flashOverlay.style.zIndex = '999';
        flashOverlay.style.opacity = '0';
        flashOverlay.style.transition = 'opacity 0.3s ease';
        
        if (platform === 'quotex') {
            flashOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        } else {
            flashOverlay.style.backgroundColor = 'rgba(0, 102, 255, 0.1)';
        }
        
        document.body.appendChild(flashOverlay);
        
        setTimeout(() => {
            flashOverlay.style.opacity = '1';
            setTimeout(() => {
                flashOverlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(flashOverlay);
                }, 300);
            }, 300);
        }, 10);
    }
    
    // Function to update pairs based on selected platform
    function updatePairsForPlatform(platform) {
        // Clear existing pairs
        pairBox.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select pair...";
        pairBox.appendChild(defaultOption);
        
        // Define platform-specific pairs
        const platformPairs = {
            'pocket': ["AED/CNY OTC", "EUR/USD OTC"],
            'quotex': ["USD/BRL OTC", "USD/BDT OTC", "USD/INR OTC"]
        };
        
        // Add pairs for selected platform
        platformPairs[platform].forEach(pair => {
            const option = document.createElement('option');
            option.value = pair;
            option.textContent = pair;
            pairBox.appendChild(option);
        });
    }
    
    // Initialize with default platform (Quotex)
    updatePairsForPlatform('quotex');
    
    // Add futuristic typing effect to title
    const title = document.getElementById('title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
    
    // Signal generation logic
    signalBtn.addEventListener('click', function() {
        const selectedPair = pairBox.value;
        const selectedTime = document.getElementById('time__box').value;
        
        if (!selectedPair || !selectedTime) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please select both pair and time';
            notification.style.position = 'fixed';
            notification.style.top = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.padding = '12px 20px';
            notification.style.background = 'rgba(255, 51, 102, 0.9)';
            notification.style.color = '#ffffff';
            notification.style.borderRadius = '8px';
            notification.style.boxShadow = '0 0 15px rgba(255, 51, 102, 0.5)';
            notification.style.zIndex = '1000';
            
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
            
            return;
        }
        
        // Show loader and hide result
        loader.style.display = 'block';
        resultBtn.style.display = 'none';
        remTime.textContent = ''; // Clear any previous countdown
        
        // Simulate signal processing time
        const processingTime = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
        
        // Parse time value
        let seconds = 0;
        if (selectedTime.includes('s')) {
            seconds = parseInt(selectedTime);
        } else if (selectedTime.includes('m')) {
            seconds = parseInt(selectedTime) * 60;
        }
        
        // Generate signal after processing time
        setTimeout(() => {
            loader.style.display = 'none';
            
            // Random signal (BUY or SELL)
            const signal = Math.random() > 0.5 ? 'BUY' : 'SELL';
            
            // Create block overlay to prevent interactions
            const blockOverlay = document.getElementById('block-overlay') || document.createElement('div');
            if (!document.getElementById('block-overlay')) {
                blockOverlay.id = 'block-overlay';
                document.body.appendChild(blockOverlay);
            }
            blockOverlay.style.display = 'block';
            
            // Create flash effect on screen
            const flashOverlay = document.createElement('div');
            flashOverlay.style.position = 'fixed';
            flashOverlay.style.top = '0';
            flashOverlay.style.left = '0';
            flashOverlay.style.width = '100%';
            flashOverlay.style.height = '100%';
            flashOverlay.style.backgroundColor = signal === 'BUY' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(255, 51, 102, 0.2)';
            flashOverlay.style.zIndex = '999';
            flashOverlay.style.opacity = '0';
            flashOverlay.style.transition = 'opacity 0.3s ease';
            document.body.appendChild(flashOverlay);
            
            // Flash effect
            setTimeout(() => {
                flashOverlay.style.opacity = '1';
                setTimeout(() => {
                    flashOverlay.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(flashOverlay);
                    }, 300);
                }, 300);
            }, 10);
            
            // Show result with dramatic reveal
            setTimeout(() => {
                // Clear previous content and set class
                resultBtn.innerHTML = '';
                resultBtn.className = '';
                resultBtn.classList.add(signal.toLowerCase());
                
                // Create holographic container
                const holoContainer = document.createElement('div');
                holoContainer.className = 'holo-container';
                
                // Add icon to result button with enhanced styling
                const icon = document.createElement('i');
                icon.className = signal === 'BUY' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                icon.style.marginRight = '15px';
                icon.style.fontSize = '1.5em';
                icon.style.verticalAlign = 'middle';
                icon.style.color = '#ffffff';
                icon.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)';
                holoContainer.appendChild(icon);
                
                // Add text container for typewriter effect
                const textSpan = document.createElement('span');
                textSpan.className = 'signal-text';
                textSpan.style.color = '#ffffff';
                textSpan.style.fontWeight = 'bold';
                textSpan.style.fontSize = '1.5em';
                textSpan.style.verticalAlign = 'middle';
                holoContainer.appendChild(textSpan);
                
                // Add holographic lines
                const holoLines = document.createElement('div');
                holoLines.className = 'holo-lines';
                holoContainer.appendChild(holoLines);
                
                // Add the container to the result button
                resultBtn.appendChild(holoContainer);
                
                let i = 0;
                const txt = signal;
                const typeSpeed = 100;
                
                function typeWriter() {
                    if (i < txt.length) {
                        textSpan.textContent += txt.charAt(i);
                        i++;
                        setTimeout(typeWriter, typeSpeed);
                    } else {
                        // Make sure text is visible after typing is complete
                        textSpan.style.color = '#ffffff';
                        textSpan.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)';
                    }
                }
                
                // Display the button first, then start typing
                resultBtn.style.display = 'inline-block';
                resultBtn.style.color = '#ffffff';
                resultBtn.style.visibility = 'visible';
                setTimeout(typeWriter, 200);
                
                // Add sound effect with robotic voice
                const audio = new Audio();
                audio.src = signal === 'BUY' ? 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' : 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
                audio.volume = 0.5;
                
                // Play sound first, then speak with Arabic voice
                audio.onended = function() {
                    // Use direct Arabic speech function
                    if (typeof window.speakArabic === 'function') {
                        window.speakArabic(signal === 'BUY' ? 'إشارة شراء' : 'إشارة بيع');
                    } else {
                        // Direct implementation
                        const textToSpeak = signal === 'BUY' ? 'إشارة شراء' : 'إشارة بيع';
                        const utterance = new SpeechSynthesisUtterance(textToSpeak);
                        utterance.volume = 1;
                        utterance.rate = 1.0;
                        utterance.pitch = 1.0;
                        utterance.lang = 'ar-SA';
                        
                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(utterance);
                    }
                };
                
                audio.play().catch(e => {
                    console.log('Audio play prevented: ', e);
                    
                    // If audio fails, just use direct Arabic speech
                    if (typeof window.speakArabic === 'function') {
                        window.speakArabic(signal === 'BUY' ? 'إشارة شراء' : 'إشارة بيع');
                    } else {
                        // Direct implementation
                        const textToSpeak = signal === 'BUY' ? 'إشارة شراء' : 'إشارة بيع';
                        const utterance = new SpeechSynthesisUtterance(textToSpeak);
                        utterance.volume = 1;
                        utterance.rate = 1.0;
                        utterance.pitch = 1.0;
                        utterance.lang = 'ar-SA';
                        
                        window.speechSynthesis.cancel();
                        window.speechSynthesis.speak(utterance);
                    }
                });
                
                // Add vibration if supported
                if ('vibrate' in navigator) {
                    navigator.vibrate([100, 50, 100]);
                }
                
                // Change background color of doc__wrapper temporarily
                const docWrapper = document.getElementById('doc__wrapper');
                const originalBackground = getComputedStyle(docWrapper).background;
                const signalColor = signal === 'BUY' ? 'rgba(0, 170, 85, 0.1)' : 'rgba(204, 0, 51, 0.1)';
                
                docWrapper.style.transition = 'background 1s ease';
                docWrapper.style.background = signalColor;
                
                // Add repeating signal and arrows to background
                document.body.classList.add(signal.toLowerCase() + '-signal');
                document.body.setAttribute('data-signal', signal.repeat(500));
                
                // Create floating arrows
                createFloatingArrows(signal);
                
                setTimeout(() => {
                    docWrapper.style.background = originalBackground;
                }, 2000);
                
                // Start countdown timer after signal appears
                let seconds = 0;
                const selectedTime = document.getElementById('time__box').value;
                const timeSelect = document.getElementById('time__box');
                const pairSelect = document.getElementById('pair__box');
                
                // Add flash effect to selected pair and time
                pairSelect.classList.add('flash');
                timeSelect.classList.add('flash');
                
                // Remove flash class after animation completes
                setTimeout(() => {
                    pairSelect.classList.remove('flash');
                    timeSelect.classList.remove('flash');
                }, 800);
                
                if (selectedTime.includes('s')) {
                    seconds = parseInt(selectedTime);
                } else if (selectedTime.includes('m')) {
                    seconds = parseInt(selectedTime) * 60;
                }
                
                // Update countdown timer
                let countdown = seconds;
                remTime.textContent = `Time remaining: ${formatTime(countdown)}`;
                
                const countdownInterval = setInterval(() => {
                    countdown--;
                    remTime.textContent = `Time remaining: ${formatTime(countdown)}`;
                    
                    if (countdown <= 0) {
                        clearInterval(countdownInterval);
                        remTime.textContent = '';
                        
                        // Remove signal background and floating arrows
                        document.body.classList.remove('buy-signal', 'sell-signal');
                        document.body.removeAttribute('data-signal');
                        
                        // Remove block overlay to allow interactions again
                        const blockOverlay = document.getElementById('block-overlay');
                        if (blockOverlay) {
                            blockOverlay.style.display = 'none';
                        }
                        
                        // Remove floating arrows
                        const floatingArrows = document.querySelectorAll('.floating-arrow');
                        floatingArrows.forEach(arrow => arrow.remove());
                        
                        // Flash when countdown ends
                        const endFlash = document.createElement('div');
                        endFlash.style.position = 'fixed';
                        endFlash.style.top = '0';
                        endFlash.style.left = '0';
                        endFlash.style.width = '100%';
                        endFlash.style.height = '100%';
                        endFlash.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        endFlash.style.zIndex = '999';
                        endFlash.style.opacity = '0';
                        endFlash.style.transition = 'opacity 0.3s ease';
                        document.body.appendChild(endFlash);
                        
                        setTimeout(() => {
                            endFlash.style.opacity = '1';
                            setTimeout(() => {
                                endFlash.style.opacity = '0';
                                setTimeout(() => {
                                    document.body.removeChild(endFlash);
                                }, 300);
                            }, 300);
                        }, 10);
                    }
                }, 1000);
                
            }, 600);
            
        }, processingTime);
    });
    
    // Format time function (converts seconds to MM:SS format)
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    // Add dynamic background particles
    createDynamicParticles();
});

// Create additional dynamic particles
function createDynamicParticles() {
    const particlesContainer = document.body;
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle dynamic-particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size (smaller than static particles)
        const size = Math.random() * 3 + 1;
        
        // Random animation duration and delay
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.top = `${posY}%`;
        particle.style.left = `${posX}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = '0.4';
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Create floating arrows based on signal
function createFloatingArrows(signal) {
    // Remove any existing floating arrows
    const existingArrows = document.querySelectorAll('.floating-arrow');
    existingArrows.forEach(arrow => arrow.remove());
    
    const arrowsContainer = document.body;
    const arrowCount = 20;
    const iconClass = signal === 'BUY' ? 'fa-arrow-up' : 'fa-arrow-down';
    const arrowColor = signal === 'BUY' ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 51, 102, 0.3)';
    
    for (let i = 0; i < arrowCount; i++) {
        const arrow = document.createElement('i');
        arrow.className = `fas ${iconClass} floating-arrow`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size - making arrows larger
        const size = Math.random() * 3 + 1.5;
        
        // Random animation duration and delay
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const distance = Math.random() * 50 + 30;
        
        // Apply styles
        arrow.style.position = 'absolute';
        arrow.style.top = `${posY}%`;
        arrow.style.left = `${posX}%`;
        arrow.style.fontSize = `${size}rem`;
        arrow.style.color = arrowColor;
        arrow.style.opacity = '0.5';
        arrow.style.zIndex = '-1';
        arrow.style.pointerEvents = 'none';
        arrow.style.transition = 'all 0.3s ease';
        
        // Set animation
        if (signal === 'BUY') {
            arrow.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
        } else {
            arrow.style.animation = `float-down ${duration}s linear ${delay}s infinite`;
        }
        
        arrowsContainer.appendChild(arrow);
    }
}