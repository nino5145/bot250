/**
 * تحسينات للأجهزة المحمولة
 * هذا الملف يحتوي على تحسينات خاصة بالأجهزة المحمولة وشاشات اللمس
 */

// تنفيذ فوري عند تحميل الملف
(function() {
    // تنفيذ عند اكتمال تحميل المستند
    document.addEventListener('DOMContentLoaded', function() {
        // تحسين التفاعل مع الشاشات اللمسية
        enhanceTouchInteractions();
        
        // تحسين العرض على الشاشات الصغيرة
        optimizeForSmallScreens();
        
        // إضافة دعم للتوجيه (أفقي/عمودي)
        handleOrientationChanges();
        
        // تحسين أداء الرسوم المتحركة على الأجهزة منخفضة الأداء
        optimizeAnimations();
    });
    
    /**
     * تحسين التفاعل مع الشاشات اللمسية
     */
    function enhanceTouchInteractions() {
        // تحسين أزرار الاختيار للشاشات اللمسية
        const interactiveElements = document.querySelectorAll('button, select, .platform-option');
        
        interactiveElements.forEach(element => {
            // إضافة فئة للأجهزة اللمسية
            if ('ontouchstart' in window) {
                element.classList.add('touch-device');
            }
            
            // تحسين استجابة اللمس
            element.addEventListener('touchstart', function(e) {
                // إضافة تأثير اللمس
                this.classList.add('touch-active');
                
                // منع التكبير عند النقر المزدوج على الأجهزة المحمولة
                e.preventDefault();
            }, { passive: false });
            
            element.addEventListener('touchend', function() {
                // إزالة تأثير اللمس
                this.classList.remove('touch-active');
            });
        });
        
        // تحسين التمرير على الأجهزة المحمولة
        improveScrolling();
    }
    
    /**
     * تحسين التمرير على الأجهزة المحمولة
     */
    function improveScrolling() {
        // تحسين التمرير السلس
        const scrollableElements = document.querySelectorAll('.pair__wrapper, #content__wrapper');
        
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            
            // منع التمرير المزدوج
            element.addEventListener('touchmove', function(e) {
                if (this.scrollHeight <= this.clientHeight) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    }
    
    /**
     * تحسين العرض على الشاشات الصغيرة
     */
    function optimizeForSmallScreens() {
        // التحقق من حجم الشاشة
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // تعديل حجم العناصر للشاشات الصغيرة
            adjustElementSizes();
            
            // تبسيط واجهة المستخدم للشاشات الصغيرة
            simplifyUIForMobile();
        }
    }
    
    /**
     * تعديل حجم العناصر للشاشات الصغيرة
     */
    function adjustElementSizes() {
        // تعديل حجم الخط للعناوين
        const title = document.getElementById('title');
        if (title) {
            if (window.innerWidth <= 480) {
                title.style.fontSize = '1.5rem';
            } else if (window.innerWidth <= 768) {
                title.style.fontSize = '1.8rem';
            }
        }
        
        // تعديل حجم الأزرار
        const signalBtn = document.getElementById('signal');
        if (signalBtn && window.innerWidth <= 480) {
            signalBtn.style.padding = '12px 15px';
            signalBtn.style.fontSize = '1rem';
        }
        
        // تعديل حجم نتيجة الإشارة
        const resultBtn = document.getElementById('result');
        if (resultBtn && window.innerWidth <= 480) {
            resultBtn.style.padding = '15px 30px';
            resultBtn.style.fontSize = '1.5rem';
        }
    }
    
    /**
     * تبسيط واجهة المستخدم للشاشات الصغيرة
     */
    function simplifyUIForMobile() {
        // تقليل عدد الجزيئات المتحركة لتحسين الأداء
        const particles = document.querySelectorAll('.particle');
        if (particles.length > 4) {
            for (let i = 4; i < particles.length; i++) {
                if (particles[i].parentNode) {
                    particles[i].parentNode.removeChild(particles[i]);
                }
            }
        }
        
        // تعديل موضع أيقونة الأخبار
        const newsIcon = document.getElementById('news-assistant-icon');
        if (newsIcon) {
            if (window.innerWidth <= 480) {
                newsIcon.style.bottom = '15px';
                newsIcon.style.right = '15px';
                newsIcon.style.width = '40px';
                newsIcon.style.height = '40px';
            }
        }
    }
    
    /**
     * إضافة دعم للتوجيه (أفقي/عمودي)
     */
    function handleOrientationChanges() {
        // الاستجابة لتغيير اتجاه الشاشة
        window.addEventListener('orientationchange', function() {
            // إعادة تعديل العناصر بعد تغيير الاتجاه
            setTimeout(function() {
                adjustElementSizes();
                simplifyUIForMobile();
            }, 300);
        });
        
        // تحسين العرض في الاتجاه الأفقي
        if (window.innerHeight <= 500 && window.innerWidth > window.innerHeight) {
            optimizeForLandscape();
        }
    }
    
    /**
     * تحسين العرض في الاتجاه الأفقي
     */
    function optimizeForLandscape() {
        // تعديل تخطيط العناصر للاتجاه الأفقي
        const pairWrapper = document.querySelector('.pair__wrapper');
        if (pairWrapper) {
            pairWrapper.style.display = 'grid';
            pairWrapper.style.gridTemplateColumns = '1fr 1fr';
            pairWrapper.style.gap = '10px';
        }
        
        // تقليل المسافات الداخلية
        const docWrapper = document.getElementById('doc__wrapper');
        if (docWrapper) {
            docWrapper.style.padding = '10px';
            docWrapper.style.margin = '5px auto';
        }
        
        // تقليل حجم العنوان
        const title = document.getElementById('title');
        if (title) {
            title.style.fontSize = '1.5rem';
            title.style.marginBottom = '10px';
        }
    }
    
    /**
     * تحسين أداء الرسوم المتحركة على الأجهزة منخفضة الأداء
     */
    function optimizeAnimations() {
        // التحقق من الأجهزة منخفضة الأداء
        const isLowPowerDevice = window.innerWidth <= 768 || 
                                 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isLowPowerDevice) {
            // تقليل تأثيرات الرسوم المتحركة
            reduceAnimationEffects();
        }
    }
    
    /**
     * تقليل تأثيرات الرسوم المتحركة
     */
    function reduceAnimationEffects() {
        // إضافة فئة للأجهزة منخفضة الأداء
        document.body.classList.add('reduced-motion');
        
        // تعطيل بعض الرسوم المتحركة
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion .particle {
                animation-duration: 20s !important;
            }
            
            .reduced-motion #doc__wrapper::before {
                display: none;
            }
            
            .reduced-motion .floating-arrow {
                animation-duration: 30s !important;
            }
            
            .reduced-motion #result {
                animation: none !important;
                transform: none !important;
            }
            
            .reduced-motion .holo-lines {
                display: none;
            }
        `;
        
        document.head.appendChild(style);
    }
})();