/**
 * نظام النطق العربي المباشر المحسن
 */

// تنفيذ فوري
(function() {
    // تشغيل النطق عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // إضافة زر اختبار النطق
        addTestButton();
        
        // اختبار النطق بعد تحميل الصفحة مع تأثير صوتي
        setTimeout(function() {
            playWelcomeSound();
            setTimeout(() => {
                speakArabic('مرحباً بك في نظام التداول المتطور', { emphasis: true });
            }, 800);
        }, 1000);
        
        // تعديل وظيفة توليد الإشارة
        modifySignalGeneration();
    });
    
    /**
     * تشغيل صوت الترحيب
     */
    function playWelcomeSound() {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log('تعذر تشغيل صوت الترحيب:', e));
    }
    
    /**
     * إضافة زر اختبار النطق
     */
    function addTestButton() {
        const button = document.createElement('button');
        button.textContent = 'اختبار النطق';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.left = '20px';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#00f7ff';
        button.style.color = '#0a0e17';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';
        button.style.fontWeight = 'bold';
        
        button.addEventListener('click', function() {
            speakArabic('هذا اختبار للنطق باللغة العربية');
        });
        
        document.body.appendChild(button);
    }
    
    /**
     * تعديل وظيفة توليد الإشارة
     */
    function modifySignalGeneration() {
        // انتظار تحميل العناصر
        const checkInterval = setInterval(function() {
            const signalBtn = document.getElementById('signal');
            if (signalBtn) {
                clearInterval(checkInterval);
                
                // إضافة حدث النقر
                signalBtn.addEventListener('click', function() {
                    speakArabic('جاري توليد الإشارة');
                });
                
                // تعديل وظيفة عرض النتيجة
                const originalSetTimeout = window.setTimeout;
                window.setTimeout = function(callback, timeout) {
                    if (timeout >= 2000 && timeout <= 5000 && callback.toString().includes('loader.style.display')) {
                        // تعديل الدالة لإضافة النطق
                        return originalSetTimeout(function() {
                            callback();
                            
                            // انتظار ظهور النتيجة
                            const resultCheckInterval = setInterval(function() {
                                const resultBtn = document.getElementById('result');
                                if (resultBtn && resultBtn.style.display !== 'none' && resultBtn.textContent) {
                                    clearInterval(resultCheckInterval);
                                    
                                    // تحديد نوع الإشارة
                                    const isBuy = resultBtn.classList.contains('buy');
                                    speakArabic(isBuy ? 'إشارة شراء' : 'إشارة بيع');
                                }
                            }, 500);
                        }, timeout);
                    }
                    return originalSetTimeout(callback, timeout);
                };
            }
        }, 100);
    }
})();

/**
 * نطق نص باللغة العربية
 * @param {string} text - النص المراد نطقه
 * @param {Object} options - خيارات إضافية للنطق
 */
function speakArabic(text, options = {}) {
    console.log('نطق:', text);
    
    // إيقاف أي نطق سابق
    window.speechSynthesis.cancel();
    
    // إضافة تأثير صوتي قبل النطق إذا كان مطلوباً
    if (options.effect) {
        playAudioEffect(options.effect);
    }
    
    // إنشاء كائن النطق
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = options.rate || 0.9;  // سرعة أبطأ قليلاً للوضوح
    utterance.pitch = options.emphasis ? 1.2 : 1.1;  // نبرة أعلى للتأكيد
    utterance.volume = options.volume || 1.0;
    
    // محاولة العثور على صوت عربي
    const voices = window.speechSynthesis.getVoices();
    let arabicVoice = null;
    
    // البحث عن أفضل صوت عربي
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang.includes('ar') || 
            voices[i].name.includes('Arabic') || 
            voices[i].name.includes('العربية')) {
            arabicVoice = voices[i];
            // إذا وجدنا صوت عربي من Google، نستخدمه فوراً
            if (voices[i].name.includes('Google')) {
                break;
            }
        }
    }
    
    // استخدام الصوت العربي إذا وجد
    if (arabicVoice) {
        utterance.voice = arabicVoice;
        console.log('استخدام صوت:', arabicVoice.name);
    }
    
    // إضافة تأثير الصدى إذا كان مطلوباً
    if (options.echo) {
        addEchoEffect(text);
    }
    
    // تشغيل النطق
    window.speechSynthesis.speak(utterance);
}

/**
 * إضافة تأثير صدى للنص
 * @param {string} text - النص المراد إضافة صدى له
 */
function addEchoEffect(text) {
    setTimeout(() => {
        const echoUtterance = new SpeechSynthesisUtterance(text);
        echoUtterance.lang = 'ar-SA';
        echoUtterance.volume = 0.3;  // صوت منخفض للصدى
        echoUtterance.rate = 0.8;    // أبطأ للصدى
        echoUtterance.pitch = 0.9;   // نبرة أقل للصدى
        
        window.speechSynthesis.speak(echoUtterance);
    }, 500);  // تأخير للصدى
}

/**
 * تشغيل تأثير صوتي
 * @param {string} effectType - نوع التأثير
 */
function playAudioEffect(effectType) {
    let audioUrl = '';
    
    switch (effectType) {
        case 'welcome':
            audioUrl = 'https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3';
            break;
        case 'alert':
            audioUrl = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
            break;
        case 'notification':
            audioUrl = 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3';
            break;
        default:
            return;
    }
    
    const audio = new Audio(audioUrl);
    audio.volume = 0.4;
    audio.play().catch(e => console.log('تعذر تشغيل التأثير الصوتي:', e));
}

// إضافة الدالة للنافذة
window.speakArabic = speakArabic;