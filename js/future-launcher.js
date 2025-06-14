/**
 * Future Launcher - واجهة تشغيل متطورة للتداول
 * يتفاعل مع المنصات المختلفة ويوفر تجربة مستخدم مستقبلية
 */

class FutureLauncher {
    constructor() {
        // تهيئة المتغيرات الأساسية
        this.activePlatform = null;
        this.systemReady = false;
        this.interfaceElements = {};
        
        // تسجيل الأحداث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    /**
     * تهيئة النظام وإعداد الواجهة
     */
    initialize() {
        // تحديد عناصر الواجهة
        this.interfaceElements = {
            docWrapper: document.getElementById('doc__wrapper'),
            platformOptions: document.querySelectorAll('.platform-option'),
            signalButton: document.getElementById('signal'),
            resultButton: document.getElementById('result'),
            pairSelect: document.getElementById('pair__box'),
            timeSelect: document.getElementById('time__box')
        };
        
        // إضافة عنصر الواجهة المستقبلية
        this.createFutureInterface();
        
        // تسجيل الأحداث للتفاعل مع المنصات
        this.registerPlatformEvents();
        
        // تفعيل النظام
        this.activateSystem();
    }
    
    /**
     * إنشاء واجهة المستقبل
     */
    createFutureInterface() {
        // إنشاء عنصر الواجهة الرئيسي
        const futureInterface = document.createElement('div');
        futureInterface.className = 'future-interface';
        futureInterface.innerHTML = `
            <div class="hologram-container">
                <div class="hologram-ring"></div>
                <div class="hologram-projection"></div>
                <div class="hologram-text">SYSTEM READY</div>
            </div>
            <div class="platform-status">
                <div class="status-indicator"></div>
                <div class="status-text">Initializing...</div>
            </div>
        `;
        
        // إضافة العنصر للصفحة
        document.body.appendChild(futureInterface);
        
        // تخزين مراجع العناصر الجديدة
        this.interfaceElements.futureInterface = futureInterface;
        this.interfaceElements.hologramText = futureInterface.querySelector('.hologram-text');
        this.interfaceElements.statusIndicator = futureInterface.querySelector('.status-indicator');
        this.interfaceElements.statusText = futureInterface.querySelector('.status-text');
        
        // إضافة الأنماط CSS للواجهة
        this.addFutureStyles();
    }
    
    /**
     * إضافة الأنماط CSS للواجهة المستقبلية
     */
    addFutureStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .future-interface {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 15px;
                pointer-events: none;
            }
            
            .hologram-container {
                position: relative;
                width: 120px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                perspective: 800px;
            }
            
            .hologram-ring {
                position: absolute;
                width: 100%;
                height: 100%;
                border: 2px solid rgba(0, 247, 255, 0.7);
                border-radius: 50%;
                animation: rotate3D 8s linear infinite;
                box-shadow: 0 0 15px rgba(0, 247, 255, 0.5);
            }
            
            .hologram-ring::before, .hologram-ring::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border: 1px solid rgba(0, 247, 255, 0.3);
                border-radius: 50%;
                animation: pulse 3s ease-in-out infinite alternate;
            }
            
            .hologram-ring::before {
                transform: scale(0.8);
            }
            
            .hologram-ring::after {
                transform: scale(1.2);
            }
            
            .hologram-projection {
                position: absolute;
                width: 60%;
                height: 60%;
                background: radial-gradient(circle, rgba(0, 247, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                animation: pulse 2s ease-in-out infinite alternate;
            }
            
            .hologram-text {
                color: rgba(0, 247, 255, 0.9);
                font-size: 12px;
                font-weight: bold;
                text-shadow: 0 0 5px rgba(0, 247, 255, 0.7);
                letter-spacing: 1px;
                animation: glow 2s ease-in-out infinite alternate;
            }
            
            .platform-status {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(10, 14, 23, 0.7);
                padding: 8px 15px;
                border-radius: 20px;
                border: 1px solid rgba(0, 247, 255, 0.3);
                box-shadow: 0 0 10px rgba(0, 247, 255, 0.2);
                backdrop-filter: blur(5px);
            }
            
            .status-indicator {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #ffcc00;
                box-shadow: 0 0 8px #ffcc00;
                animation: blink 2s infinite;
            }
            
            .status-indicator.active {
                background: #00ff88;
                box-shadow: 0 0 8px #00ff88;
                animation: pulse 2s infinite;
            }
            
            .status-indicator.error {
                background: #ff3366;
                box-shadow: 0 0 8px #ff3366;
                animation: blink 0.5s infinite;
            }
            
            .status-text {
                color: rgba(255, 255, 255, 0.9);
                font-size: 12px;
                font-weight: 500;
            }
            
            @keyframes rotate3D {
                0% {
                    transform: rotateX(60deg) rotateZ(0);
                }
                100% {
                    transform: rotateX(60deg) rotateZ(360deg);
                }
            }
            
            @keyframes pulse {
                0% {
                    opacity: 0.5;
                    transform: scale(0.95);
                }
                100% {
                    opacity: 1;
                    transform: scale(1.05);
                }
            }
            
            @keyframes glow {
                0% {
                    text-shadow: 0 0 5px rgba(0, 247, 255, 0.7);
                }
                100% {
                    text-shadow: 0 0 15px rgba(0, 247, 255, 1);
                }
            }
            
            @keyframes blink {
                0%, 100% {
                    opacity: 1;
                }
                50% {
                    opacity: 0.5;
                }
            }
            
            /* تأثيرات إضافية للمنصات */
            .platform-option.active::after {
                content: '';
                position: absolute;
                top: -10px;
                left: -10px;
                right: -10px;
                bottom: -10px;
                border-radius: 12px;
                background: transparent;
                border: 1px solid rgba(255, 255, 255, 0.2);
                z-index: -1;
                animation: scan-border 3s linear infinite;
                pointer-events: none;
            }
            
            @keyframes scan-border {
                0% {
                    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
                }
                25% {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }
                50% {
                    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
                }
                75% {
                    clip-path: polygon(0 0, 0 0, 100% 100%, 0 100%);
                }
                100% {
                    clip-path: polygon(0 0, 0 0, 0 0, 0 0);
                }
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * تسجيل أحداث التفاعل مع المنصات
     */
    registerPlatformEvents() {
        // تسجيل أحداث اختيار المنصة
        this.interfaceElements.platformOptions.forEach(option => {
            option.addEventListener('click', () => {
                const platform = option.getAttribute('data-platform');
                this.switchPlatform(platform);
            });
        });
        
        // تسجيل أحداث زر الإشارة
        this.interfaceElements.signalButton.addEventListener('click', () => {
            this.onSignalRequest();
        });
    }
    
    /**
     * تفعيل النظام مع تأثيرات بصرية
     */
    activateSystem() {
        // تحديث حالة النظام
        setTimeout(() => {
            this.systemReady = true;
            this.interfaceElements.statusIndicator.classList.add('active');
            this.interfaceElements.statusText.textContent = 'System Online';
            this.interfaceElements.hologramText.textContent = 'SYSTEM ACTIVE';
            
            // تحديد المنصة النشطة الافتراضية
            const activePlatformElement = document.querySelector('.platform-option.active');
            if (activePlatformElement) {
                this.activePlatform = activePlatformElement.getAttribute('data-platform');
                this.updatePlatformStatus(this.activePlatform);
            }
            
            // إضافة تأثير التفعيل
            this.playActivationEffect();
        }, 1500);
    }
    
    /**
     * تشغيل تأثير التفعيل
     */
    playActivationEffect() {
        // إنشاء عنصر التأثير
        const effect = document.createElement('div');
        effect.className = 'activation-effect';
        effect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(0, 247, 255, 0.2) 0%, transparent 70%);
            z-index: 999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(effect);
        
        // تشغيل التأثير
        setTimeout(() => {
            effect.style.opacity = '1';
            setTimeout(() => {
                effect.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(effect);
                }, 500);
            }, 500);
        }, 100);
        
        // تشغيل صوت التفعيل إذا كان متاحاً
        if (typeof robotVoice !== 'undefined') {
            robotVoice.speak('System activated', { pitch: 1.5, rate: 0.7 });
        }
    }
    
    /**
     * تبديل المنصة النشطة
     * @param {string} platform - اسم المنصة
     */
    switchPlatform(platform) {
        if (platform === this.activePlatform) return;
        
        this.activePlatform = platform;
        this.updatePlatformStatus(platform);
        
        // تشغيل تأثير التبديل
        this.playPlatformSwitchEffect(platform);
    }
    
    /**
     * تحديث حالة المنصة في الواجهة
     * @param {string} platform - اسم المنصة
     */
    updatePlatformStatus(platform) {
        // تحديث نص الحالة
        this.interfaceElements.statusText.textContent = `Platform: ${platform.toUpperCase()}`;
        
        // تحديث لون المؤشر حسب المنصة
        if (platform === 'quotex') {
            this.interfaceElements.statusIndicator.style.background = '#ff3366';
            this.interfaceElements.statusIndicator.style.boxShadow = '0 0 8px #ff3366';
        } else {
            this.interfaceElements.statusIndicator.style.background = '#0066ff';
            this.interfaceElements.statusIndicator.style.boxShadow = '0 0 8px #0066ff';
        }
    }
    
    /**
     * تشغيل تأثير تبديل المنصة
     * @param {string} platform - اسم المنصة
     */
    playPlatformSwitchEffect(platform) {
        // تحديث نص الهولوجرام
        this.interfaceElements.hologramText.textContent = `${platform.toUpperCase()} ACTIVE`;
        
        // تغيير لون الهولوجرام حسب المنصة
        const hologramColor = platform === 'quotex' ? 'rgba(255, 51, 102, 0.7)' : 'rgba(0, 102, 255, 0.7)';
        const hologramRing = this.interfaceElements.futureInterface.querySelector('.hologram-ring');
        const hologramProjection = this.interfaceElements.futureInterface.querySelector('.hologram-projection');
        
        hologramRing.style.borderColor = hologramColor;
        hologramRing.style.boxShadow = `0 0 15px ${hologramColor}`;
        hologramProjection.style.background = `radial-gradient(circle, ${hologramColor} 0%, transparent 70%)`;
        
        // تشغيل صوت التبديل إذا كان متاحاً
        if (typeof robotVoice !== 'undefined') {
            robotVoice.speak(`${platform} platform activated`, { pitch: 1.5, rate: 0.7 });
        }
    }
    
    /**
     * معالجة طلب إشارة جديدة
     */
    onSignalRequest() {
        if (!this.systemReady) return;
        
        const pairValue = this.interfaceElements.pairSelect.value;
        const timeValue = this.interfaceElements.timeSelect.value;
        
        if (!pairValue || !timeValue) return;
        
        // تحديث الهولوجرام لإظهار حالة المعالجة
        this.interfaceElements.hologramText.textContent = 'PROCESSING';
        this.interfaceElements.hologramText.style.color = 'rgba(255, 204, 0, 0.9)';
        
        // استعادة الحالة بعد المعالجة
        setTimeout(() => {
            this.interfaceElements.hologramText.textContent = `${this.activePlatform.toUpperCase()} ACTIVE`;
            this.interfaceElements.hologramText.style.color = '';
        }, 3000);
    }
}

// إنشاء كائن المشغل المستقبلي
const futureLauncher = new FutureLauncher();

// إضافة دعم للتفاعل مع نتائج الإشارة
document.addEventListener('DOMContentLoaded', function() {
    // الاستماع لظهور نتيجة الإشارة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const resultBtn = document.getElementById('result');
                if (resultBtn && resultBtn.style.display !== 'none' && resultBtn.textContent) {
                    // تحديث واجهة المستقبل عند ظهور إشارة
                    if (futureLauncher && futureLauncher.interfaceElements) {
                        const signalType = resultBtn.classList.contains('buy') ? 'BUY' : 'SELL';
                        const hologramText = futureLauncher.interfaceElements.hologramText;
                        const signalColor = signalType === 'BUY' ? 'rgba(0, 255, 136, 0.9)' : 'rgba(255, 51, 102, 0.9)';
                        
                        hologramText.textContent = `SIGNAL: ${signalType}`;
                        hologramText.style.color = signalColor;
                        
                        // إضافة تأثير الإشارة
                        const hologramRing = futureLauncher.interfaceElements.futureInterface.querySelector('.hologram-ring');
                        hologramRing.style.borderColor = signalColor;
                        hologramRing.style.boxShadow = `0 0 20px ${signalColor}`;
                        hologramRing.style.animation = 'rotate3D 4s linear infinite';
                    }
                }
            }
        });
    });
    
    // مراقبة زر النتيجة للتغييرات
    const resultBtn = document.getElementById('result');
    if (resultBtn) {
        observer.observe(resultBtn, { attributes: true });
    }
});