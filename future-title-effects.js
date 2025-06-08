/**
 * تأثيرات مستقبلية إضافية للعنوان
 */
class FutureTitleEffects {
    constructor() {
        // تهيئة المتغيرات
        this.titleElement = null;
        this.originalTitle = '';
        this.particles = [];
        
        // تسجيل الأحداث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    /**
     * تهيئة التأثيرات
     */
    initialize() {
        // الحصول على عنصر العنوان
        this.titleElement = document.getElementById('title');
        if (!this.titleElement) return;
        
        // حفظ النص الأصلي
        this.originalTitle = this.titleElement.textContent;
        
        // إضافة تأثير الهولوغرام ثلاثي الأبعاد
        this.add3DHologramEffect();
        
        // إضافة تأثير الجزيئات المتطايرة
        this.addFloatingParticles();
        
        // إضافة تأثير الوميض العشوائي
        this.addRandomGlitchEffect();
        
        // إضافة تأثير التفاعل عند التحويم
        this.addHoverInteraction();
    }
    
    /**
     * إضافة تأثير الهولوغرام ثلاثي الأبعاد
     */
    add3DHologramEffect() {
        // إنشاء حاوية للتأثير ثلاثي الأبعاد
        const hologramContainer = document.createElement('div');
        hologramContainer.className = 'title-3d-container';
        hologramContainer.style.cssText = `
            position: relative;
            transform-style: preserve-3d;
            perspective: 1000px;
        `;
        
        // نقل محتوى العنوان إلى الحاوية
        const titleContent = this.titleElement.innerHTML;
        this.titleElement.innerHTML = '';
        this.titleElement.appendChild(hologramContainer);
        
        // إنشاء طبقات الهولوغرام
        for (let i = 0; i < 3; i++) {
            const layer = document.createElement('div');
            layer.className = `title-3d-layer layer-${i}`;
            layer.innerHTML = titleContent;
            layer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transform: translateZ(${(i - 1) * 5}px);
                color: rgba(0, 247, 255, ${i === 1 ? 1 : 0.5});
                text-shadow: 0 0 ${5 + i * 5}px rgba(0, 247, 255, ${i === 1 ? 0.8 : 0.4});
            `;
            hologramContainer.appendChild(layer);
        }
        
        // إضافة حركة للطبقات
        this.animateHologramLayers(hologramContainer);
    }
    
    /**
     * تحريك طبقات الهولوغرام
     * @param {Element} container - حاوية الطبقات
     */
    animateHologramLayers(container) {
        let angle = 0;
        
        // تحديث موقع الطبقات بشكل دوري
        setInterval(() => {
            angle += 0.5;
            const layers = container.querySelectorAll('.title-3d-layer');
            
            layers.forEach((layer, index) => {
                const z = Math.sin(angle / 20) * 5;
                const x = Math.cos(angle / 15) * 3;
                const y = Math.sin(angle / 10) * 2;
                
                layer.style.transform = `translateX(${x * (index - 1)}px) translateY(${y * (index - 1)}px) translateZ(${z * (index - 1)}px)`;
            });
        }, 50);
    }
    
    /**
     * إضافة تأثير الجزيئات المتطايرة
     */
    addFloatingParticles() {
        // إنشاء حاوية للجزيئات
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'title-particles-container';
        particlesContainer.style.cssText = `
            position: absolute;
            top: -20px;
            left: -20px;
            right: -20px;
            bottom: -20px;
            overflow: hidden;
            pointer-events: none;
            z-index: -1;
        `;
        
        this.titleElement.style.position = 'relative';
        this.titleElement.appendChild(particlesContainer);
        
        // إنشاء الجزيئات
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'title-particle';
            
            // تحديد خصائص عشوائية للجزيئة
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(0, 247, 255, 0.8);
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                box-shadow: 0 0 ${size * 3}px rgba(0, 247, 255, 0.8);
                animation: float-up ${duration}s ${delay}s infinite linear;
            `;
            
            particlesContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    /**
     * إضافة تأثير الوميض العشوائي
     */
    addRandomGlitchEffect() {
        // إضافة تأثير الوميض بشكل عشوائي
        setInterval(() => {
            // تشغيل التأثير بنسبة 5% فقط من الوقت
            if (Math.random() > 0.95) {
                this.titleElement.classList.add('glitching');
                
                // إنشاء نسخة مشوهة من النص
                const glitchText = this.createGlitchedText(this.originalTitle);
                const layers = this.titleElement.querySelectorAll('.title-3d-layer');
                
                if (layers.length > 0) {
                    // تطبيق النص المشوه على الطبقة الوسطى فقط
                    layers[1].textContent = glitchText;
                    
                    // إعادة النص الأصلي بعد فترة قصيرة
                    setTimeout(() => {
                        layers[1].textContent = this.originalTitle;
                        this.titleElement.classList.remove('glitching');
                    }, 200);
                }
            }
        }, 500);
    }
    
    /**
     * إنشاء نص مشوه
     * @param {string} text - النص الأصلي
     * @returns {string} - النص المشوه
     */
    createGlitchedText(text) {
        // احتمالية تبديل بعض الأحرف بأحرف عشوائية
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            // تبديل بعض الأحرف بنسبة 30%
            if (Math.random() > 0.7) {
                result += chars.charAt(Math.floor(Math.random() * chars.length));
            } else {
                result += text[i];
            }
        }
        
        return result;
    }
    
    /**
     * إضافة تأثير التفاعل عند التحويم
     */
    addHoverInteraction() {
        // إضافة تأثير عند تحويم المؤشر
        this.titleElement.addEventListener('mouseenter', () => {
            // تسريع حركة الجزيئات
            this.particles.forEach(particle => {
                particle.style.animationDuration = '1s';
            });
            
            // إضافة توهج إضافي
            this.titleElement.style.textShadow = '0 0 30px rgba(0, 247, 255, 1), 0 0 50px rgba(0, 102, 255, 0.8)';
        });
        
        // إعادة التأثير الأصلي عند مغادرة المؤشر
        this.titleElement.addEventListener('mouseleave', () => {
            // إعادة سرعة الجزيئات الأصلية
            this.particles.forEach(particle => {
                const duration = Math.random() * 3 + 2;
                particle.style.animationDuration = `${duration}s`;
            });
            
            // إعادة التوهج الأصلي
            this.titleElement.style.textShadow = '';
        });
    }
}

// إنشاء كائن التأثيرات
const futureTitleEffects = new FutureTitleEffects();