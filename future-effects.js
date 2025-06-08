/**
 * Future Effects - تأثيرات بصرية متقدمة للواجهة
 * يضيف تأثيرات ثلاثية الأبعاد وتفاعلات مستقبلية للتطبيق
 */

class FutureEffects {
    constructor() {
        // تهيئة المتغيرات الأساسية
        this.effectsEnabled = true;
        this.particlesEnabled = true;
        
        // تسجيل الأحداث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    /**
     * تهيئة التأثيرات
     */
    initialize() {
        // إضافة الأنماط CSS للتأثيرات
        this.addEffectStyles();
        
        // إنشاء تأثيرات الخلفية
        this.createBackgroundEffects();
        
        // إضافة تأثيرات للعناصر التفاعلية
        this.enhanceInteractiveElements();
        
        // إضافة تأثير الإطلاق
        this.addLaunchEffect();
    }
    
    /**
     * إضافة أنماط CSS للتأثيرات
     */
    addEffectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            /* تأثيرات الخلفية */
            .future-background {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -2;
                overflow: hidden;
                pointer-events: none;
            }
            
            .grid-lines {
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background-image: 
                    linear-gradient(rgba(0, 247, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0, 247, 255, 0.1) 1px, transparent 1px);
                background-size: 40px 40px;
                transform: perspective(500px) rotateX(60deg);
                animation: grid-move 20s linear infinite;
                opacity: 0.3;
            }
            
            @keyframes grid-move {
                0% {
                    transform: perspective(500px) rotateX(60deg) translateY(0);
                }
                100% {
                    transform: perspective(500px) rotateX(60deg) translateY(40px);
                }
            }
            
            .energy-field {
                position: absolute;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at bottom, rgba(0, 102, 255, 0.2) 0%, transparent 70%);
                opacity: 0.5;
                animation: pulse-field 8s ease-in-out infinite alternate;
            }
            
            @keyframes pulse-field {
                0% {
                    opacity: 0.3;
                    background-position: center bottom;
                }
                100% {
                    opacity: 0.6;
                    background-position: center center;
                }
            }
            
            /* تأثيرات العناصر التفاعلية */
            .interactive-element {
                position: relative;
                overflow: visible !important;
            }
            
            .interactive-element::before {
                content: '';
                position: absolute;
                inset: -2px;
                background: linear-gradient(45deg, transparent, rgba(0, 247, 255, 0.5), transparent);
                z-index: -1;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .interactive-element:hover::before {
                opacity: 1;
            }
            
            /* تأثير الإطلاق */
            .launch-effect {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, rgba(0, 247, 255, 0.5) 0%, transparent 70%);
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 1s ease;
            }
            
            .launch-effect.active {
                animation: launch-pulse 2s ease-out forwards;
            }
            
            @keyframes launch-pulse {
                0% {
                    opacity: 0;
                    transform: scale(0.8);
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    opacity: 0;
                    transform: scale(1.5);
                }
            }
            
            /* تأثيرات الجزيئات المتقدمة */
            .advanced-particle {
                position: absolute;
                width: 2px;
                height: 2px;
                background-color: rgba(0, 247, 255, 0.7);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
                pointer-events: none;
                z-index: -1;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * إنشاء تأثيرات الخلفية
     */
    createBackgroundEffects() {
        // إنشاء عنصر الخلفية
        const background = document.createElement('div');
        background.className = 'future-background';
        
        // إضافة خطوط الشبكة
        const gridLines = document.createElement('div');
        gridLines.className = 'grid-lines';
        background.appendChild(gridLines);
        
        // إضافة حقل الطاقة
        const energyField = document.createElement('div');
        energyField.className = 'energy-field';
        background.appendChild(energyField);
        
        // إضافة الخلفية للصفحة
        document.body.appendChild(background);
        
        // إنشاء جزيئات متقدمة
        if (this.particlesEnabled) {
            this.createAdvancedParticles();
        }
    }
    
    /**
     * إنشاء جزيئات متقدمة
     */
    createAdvancedParticles() {
        const particleCount = 20;
        const container = document.body;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'advanced-particle';
            
            // تحديد موقع وحجم عشوائي
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // تطبيق الخصائص
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.top = `${posY}%`;
            particle.style.left = `${posX}%`;
            
            // إضافة حركة عشوائية
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            
            particle.style.animation = `float-particle ${duration}s ${delay}s infinite ease-in-out`;
            
            container.appendChild(particle);
        }
    }
    
    /**
     * تحسين العناصر التفاعلية
     */
    enhanceInteractiveElements() {
        // تحديد العناصر التفاعلية
        const interactiveElements = document.querySelectorAll('button, select, .platform-option');
        
        interactiveElements.forEach(element => {
            // إضافة فئة العناصر التفاعلية
            element.classList.add('interactive-element');
            
            // إضافة تأثير صوتي عند النقر إذا كان متاحاً
            element.addEventListener('click', () => {
                this.playInteractionSound();
            });
            
            // إضافة تأثير التوهج عند التحويم
            element.addEventListener('mouseenter', () => {
                this.addGlowEffect(element);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeGlowEffect(element);
            });
        });
    }
    
    /**
     * إضافة تأثير التوهج للعنصر
     * @param {Element} element - العنصر المراد إضافة التأثير له
     */
    addGlowEffect(element) {
        // إنشاء عنصر التوهج
        const glow = document.createElement('div');
        glow.className = 'element-glow';
        glow.style.cssText = `
            position: absolute;
            inset: -5px;
            border-radius: inherit;
            background: transparent;
            box-shadow: 0 0 15px rgba(0, 247, 255, 0.7);
            opacity: 0;
            z-index: -1;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        
        // إضافة العنصر
        element.style.position = element.style.position || 'relative';
        element.appendChild(glow);
        
        // تفعيل التوهج
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 10);
    }
    
    /**
     * إزالة تأثير التوهج من العنصر
     * @param {Element} element - العنصر المراد إزالة التأثير منه
     */
    removeGlowEffect(element) {
        // البحث عن عنصر التوهج
        const glow = element.querySelector('.element-glow');
        if (glow) {
            // إخفاء التوهج ثم إزالته
            glow.style.opacity = '0';
            setTimeout(() => {
                if (glow.parentNode === element) {
                    element.removeChild(glow);
                }
            }, 300);
        }
    }
    
    /**
     * تشغيل صوت التفاعل
     */
    playInteractionSound() {
        // إنشاء عنصر صوتي
        const audio = new Audio();
        audio.volume = 0.2;
        
        // تحديد مصدر الصوت
        audio.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDAwMD//////////////////8AAAA5TEFNRTMuMTAwAZYAAAAAAAAAABQ4JAMGQgAAOAAABrCyZnO0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAAAAANIAAAAAExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDsAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
        
        // تشغيل الصوت
        audio.play().catch(e => {
            // تجاهل أخطاء تشغيل الصوت
        });
    }
    
    /**
     * إضافة تأثير الإطلاق
     */
    addLaunchEffect() {
        // إنشاء عنصر التأثير
        const effect = document.createElement('div');
        effect.className = 'launch-effect';
        document.body.appendChild(effect);
        
        // تفعيل التأثير بعد تحميل الصفحة
        setTimeout(() => {
            effect.classList.add('active');
            
            // إزالة العنصر بعد انتهاء التأثير
            setTimeout(() => {
                if (effect.parentNode === document.body) {
                    document.body.removeChild(effect);
                }
            }, 2000);
        }, 500);
    }
}

// إنشاء كائن التأثيرات
const futureEffects = new FutureEffects();