/**
 * Future Hologram - تأثيرات هولوغرامية متقدمة للواجهة المستقبلية
 * يضيف تأثيرات ثلاثية الأبعاد وعناصر هولوغرامية للتطبيق
 */

class FutureHologram {
    constructor() {
        // تهيئة المتغيرات الأساسية
        this.enabled = true;
        
        // تسجيل الأحداث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    /**
     * تهيئة التأثيرات الهولوغرامية
     */
    initialize() {
        // إضافة العناصر الهولوغرامية للصفحة
        this.createHologramElements();
        
        // تحسين العناصر الموجودة بتأثيرات هولوغرامية
        this.enhanceExistingElements();
        
        // إضافة تأثيرات التفاعل
        this.addInteractionEffects();
        
        // إضافة تأثير الإطلاق المتقدم
        this.addAdvancedLaunchEffect();
    }
    
    /**
     * إنشاء العناصر الهولوغرامية الأساسية
     */
    createHologramElements() {
        // إضافة طبقة الهولوغرام
        const hologramOverlay = document.createElement('div');
        hologramOverlay.className = 'hologram-overlay';
        document.body.appendChild(hologramOverlay);
        
        // إضافة شبكة ثلاثية الأبعاد
        const grid3d = document.createElement('div');
        grid3d.className = 'grid-3d';
        document.body.appendChild(grid3d);
        
        // إضافة شعاع الضوء المتحرك
        const lightBeam = document.createElement('div');
        lightBeam.className = 'light-beam';
        document.body.appendChild(lightBeam);
        
        // إضافة خطوط هولوغرامية للحاوية الرئيسية
        const docWrapper = document.getElementById('doc__wrapper');
        if (docWrapper) {
            const hologramLines = document.createElement('div');
            hologramLines.className = 'hologram-lines';
            docWrapper.appendChild(hologramLines);
        }
    }
    
    /**
     * تحسين العناصر الموجودة بتأثيرات هولوغرامية
     */
    enhanceExistingElements() {
        // تحسين العنوان
        this.enhanceTitle();
        
        // تحسين أزرار الاختيار
        this.enhanceSelects();
        
        // تحسين زر توليد الإشارة
        this.enhanceSignalButton();
        
        // تحسين عرض النتيجة
        this.enhanceResultDisplay();
    }
    
    /**
     * تحسين العنوان بتأثيرات هولوغرامية
     */
    enhanceTitle() {
        const title = document.getElementById('title');
        if (!title) return;
        
        // إضافة تأثير النبض للعنوان
        title.style.animation = 'title-pulse 4s infinite alternate';
        
        // إضافة أنماط CSS للتأثير
        const style = document.createElement('style');
        style.textContent = `
            @keyframes title-pulse {
                0% {
                    text-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
                    letter-spacing: 2px;
                }
                100% {
                    text-shadow: 0 0 20px rgba(0, 247, 255, 0.8), 0 0 30px rgba(0, 102, 255, 0.5);
                    letter-spacing: 4px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة عنصر زخرفي للعنوان
        const titleDecoration = document.createElement('div');
        titleDecoration.className = 'title-decoration';
        titleDecoration.style.cssText = `
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 1px;
            background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.8), transparent);
            box-shadow: 0 0 15px rgba(0, 247, 255, 0.7);
        `;
        
        // تحديد موضع العنوان ليكون نسبياً
        title.style.position = 'relative';
        title.appendChild(titleDecoration);
    }
    
    /**
     * تحسين عناصر الاختيار بتأثيرات هولوغرامية
     */
    enhanceSelects() {
        const selects = document.querySelectorAll('.pair__select, .time__select');
        
        selects.forEach(select => {
            // إضافة تأثير المسح الضوئي
            select.addEventListener('focus', () => {
                this.addScanEffect(select);
            });
            
            select.addEventListener('blur', () => {
                this.removeScanEffect(select);
            });
        });
    }
    
    /**
     * إضافة تأثير المسح الضوئي للعنصر
     * @param {Element} element - العنصر المراد إضافة التأثير له
     */
    addScanEffect(element) {
        // إنشاء عنصر المسح الضوئي
        const scanEffect = document.createElement('div');
        scanEffect.className = 'scan-effect';
        scanEffect.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.8), transparent);
            box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
            z-index: 1;
            animation: scan-animation 2s linear infinite;
        `;
        
        // إضافة أنماط CSS للتأثير
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scan-animation {
                0% {
                    top: 0;
                }
                100% {
                    top: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة العنصر
        element.style.position = element.style.position || 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(scanEffect);
    }
    
    /**
     * إزالة تأثير المسح الضوئي من العنصر
     * @param {Element} element - العنصر المراد إزالة التأثير منه
     */
    removeScanEffect(element) {
        // البحث عن عنصر المسح الضوئي
        const scanEffect = element.querySelector('.scan-effect');
        if (scanEffect) {
            element.removeChild(scanEffect);
        }
    }
    
    /**
     * تحسين زر توليد الإشارة بتأثيرات هولوغرامية
     */
    enhanceSignalButton() {
        const signalButton = document.getElementById('signal');
        if (!signalButton) return;
        
        // إضافة تأثير النبض للزر
        signalButton.addEventListener('click', () => {
            this.addPulseEffect(signalButton);
        });
        
        // إضافة تأثير الحواف المضيئة
        const glowingEdge = document.createElement('div');
        glowingEdge.className = 'glowing-edge';
        glowingEdge.style.cssText = `
            position: absolute;
            inset: -2px;
            background: transparent;
            border: 2px solid rgba(0, 247, 255, 0.5);
            clip-path: polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px));
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 0 15px rgba(0, 247, 255, 0.5);
        `;
        
        signalButton.style.position = 'relative';
        signalButton.appendChild(glowingEdge);
        
        // تفعيل الحواف المضيئة عند التحويم
        signalButton.addEventListener('mouseenter', () => {
            glowingEdge.style.opacity = '1';
        });
        
        signalButton.addEventListener('mouseleave', () => {
            glowingEdge.style.opacity = '0';
        });
    }
    
    /**
     * إضافة تأثير النبض للعنصر
     * @param {Element} element - العنصر المراد إضافة التأثير له
     */
    addPulseEffect(element) {
        // إنشاء عنصر النبض
        const pulse = document.createElement('div');
        pulse.className = 'pulse-effect';
        pulse.style.cssText = `
            position: absolute;
            inset: 0;
            background: rgba(0, 247, 255, 0.3);
            border-radius: inherit;
            z-index: 1;
            opacity: 0.8;
            animation: pulse-animation 0.8s ease-out forwards;
        `;
        
        // إضافة أنماط CSS للتأثير
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-animation {
                0% {
                    opacity: 0.8;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(1.5);
                }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة العنصر
        element.style.position = element.style.position || 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(pulse);
        
        // إزالة العنصر بعد انتهاء التأثير
        setTimeout(() => {
            if (pulse.parentNode === element) {
                element.removeChild(pulse);
            }
        }, 800);
    }
    
    /**
     * تحسين عرض النتيجة بتأثيرات هولوغرامية
     */
    enhanceResultDisplay() {
        const result = document.getElementById('result');
        if (!result) return;
        
        // إضافة تأثير الهولوغرام للنتيجة
        result.addEventListener('show', () => {
            // إضافة خطوط هولوغرامية
            const hologramLines = document.createElement('div');
            hologramLines.className = 'result-hologram-lines';
            hologramLines.style.cssText = `
                position: absolute;
                inset: 0;
                background: repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.1) 2px,
                    rgba(255, 255, 255, 0.1) 4px
                );
                opacity: 0.3;
                pointer-events: none;
                z-index: 1;
            `;
            
            result.style.position = 'relative';
            result.appendChild(hologramLines);
            
            // إضافة تأثير الإطار المضيء
            const glowingFrame = document.createElement('div');
            glowingFrame.className = 'glowing-frame';
            glowingFrame.style.cssText = `
                position: absolute;
                inset: -3px;
                border: 1px solid rgba(0, 247, 255, 0.7);
                clip-path: polygon(0 5px, 5px 0, calc(100% - 5px) 0, 100% 5px, 100% calc(100% - 5px), calc(100% - 5px) 100%, 5px 100%, 0 calc(100% - 5px));
                z-index: -1;
                box-shadow: 0 0 20px rgba(0, 247, 255, 0.7);
                animation: frame-pulse 2s infinite alternate;
            `;
            
            // إضافة أنماط CSS للتأثير
            const style = document.createElement('style');
            style.textContent = `
                @keyframes frame-pulse {
                    0% {
                        box-shadow: 0 0 15px rgba(0, 247, 255, 0.5);
                        border-color: rgba(0, 247, 255, 0.5);
                    }
                    100% {
                        box-shadow: 0 0 30px rgba(0, 247, 255, 0.8);
                        border-color: rgba(0, 247, 255, 0.8);
                    }
                }
            `;
            document.head.appendChild(style);
            
            result.appendChild(glowingFrame);
        });
    }
    
    /**
     * إضافة تأثيرات التفاعل للعناصر
     */
    addInteractionEffects() {
        // إضافة تأثير التموج عند النقر
        document.addEventListener('click', (event) => {
            this.createRippleEffect(event.clientX, event.clientY);
        });
        
        // إضافة تأثير التتبع للمؤشر
        this.addCursorTracker();
    }
    
    /**
     * إنشاء تأثير التموج عند النقر
     * @param {number} x - موقع النقر على المحور الأفقي
     * @param {number} y - موقع النقر على المحور الرأسي
     */
    createRippleEffect(x, y) {
        // إنشاء عنصر التموج
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: fixed;
            top: ${y}px;
            left: ${x}px;
            transform: translate(-50%, -50%);
            width: 5px;
            height: 5px;
            background: rgba(0, 247, 255, 0.5);
            border-radius: 50%;
            z-index: 9999;
            pointer-events: none;
            animation: ripple-animation 1s linear forwards;
        `;
        
        // إضافة أنماط CSS للتأثير
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                0% {
                    width: 5px;
                    height: 5px;
                    opacity: 0.8;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // إضافة العنصر للصفحة
        document.body.appendChild(ripple);
        
        // إزالة العنصر بعد انتهاء التأثير
        setTimeout(() => {
            if (ripple.parentNode === document.body) {
                document.body.removeChild(ripple);
            }
        }, 1000);
    }
    
    /**
     * إضافة تأثير تتبع المؤشر
     */
    addCursorTracker() {
        // إنشاء عنصر تتبع المؤشر
        const cursorTracker = document.createElement('div');
        cursorTracker.className = 'cursor-tracker';
        cursorTracker.style.cssText = `
            position: fixed;
            width: 30px;
            height: 30px;
            border: 1px solid rgba(0, 247, 255, 0.5);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(cursorTracker);
        
        // تحديث موقع العنصر مع حركة المؤشر
        document.addEventListener('mousemove', (event) => {
            cursorTracker.style.left = `${event.clientX}px`;
            cursorTracker.style.top = `${event.clientY}px`;
            cursorTracker.style.opacity = '1';
            
            // إخفاء العنصر بعد فترة من توقف حركة المؤشر
            clearTimeout(this.cursorTimeout);
            this.cursorTimeout = setTimeout(() => {
                cursorTracker.style.opacity = '0';
            }, 2000);
        });
        
        // إخفاء العنصر عند مغادرة النافذة
        document.addEventListener('mouseout', () => {
            cursorTracker.style.opacity = '0';
        });
    }
    
    /**
     * إضافة تأثير الإطلاق المتقدم
     */
    addAdvancedLaunchEffect() {
        // إنشاء عنصر تأثير الإطلاق
        const launchEffect = document.createElement('div');
        launchEffect.className = 'advanced-launch-effect';
        launchEffect.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(0, 247, 255, 0.5) 0%, transparent 70%);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(launchEffect);
        
        // إنشاء خطوط المسح
        for (let i = 0; i < 5; i++) {
            const scanLine = document.createElement('div');
            scanLine.className = 'launch-scan-line';
            scanLine.style.cssText = `
                position: absolute;
                top: ${i * 20}%;
                left: 0;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0, 247, 255, 0.8), transparent);
                box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
                opacity: 0;
                transform: translateY(${i * 50}px);
                transition: opacity 0.5s ease, transform 1s ease;
            `;
            
            launchEffect.appendChild(scanLine);
        }
        
        // تفعيل التأثير بعد تحميل الصفحة
        setTimeout(() => {
            launchEffect.style.opacity = '1';
            
            // تحريك خطوط المسح
            const scanLines = document.querySelectorAll('.launch-scan-line');
            scanLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                    
                    // إخفاء الخط بعد فترة
                    setTimeout(() => {
                        line.style.opacity = '0';
                    }, 800);
                }, index * 200);
            });
            
            // إخفاء التأثير بعد انتهائه
            setTimeout(() => {
                launchEffect.style.opacity = '0';
                
                // إزالة العنصر بعد انتهاء التأثير
                setTimeout(() => {
                    if (launchEffect.parentNode === document.body) {
                        document.body.removeChild(launchEffect);
                    }
                }, 500);
            }, 2000);
        }, 500);
    }
}

// إنشاء كائن الهولوغرام
const futureHologram = new FutureHologram();