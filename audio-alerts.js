/**
 * نظام تنبيهات صوتية لإشارات التداول باللغة العربية
 */
class TradeSignalAudio {
    constructor() {
        // تهيئة النظام الصوتي
        this.initialized = false;
        this.init();
    }

    init() {
        // التحقق من دعم المتصفح للصوت والكلام
        this.speechSupported = 'speechSynthesis' in window;
        this.audioSupported = 'Audio' in window;
        this.initialized = true;
    }

    /**
     * تشغيل صوت الإشارة مع نطق النص
     * @param {string} signalType - نوع الإشارة ('BUY' أو 'SELL')
     */
    playSignalAlert(signalType) {
        if (!this.initialized) this.init();
        
        // تشغيل الصوت
        if (this.audioSupported) {
            const audio = new Audio();
            
            // تحديد مصدر الصوت حسب نوع الإشارة
            if (signalType === 'BUY') {
                audio.src = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
            } else {
                audio.src = 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3';
            }
            
            audio.volume = 0.7;
            
            // تشغيل الصوت ثم نطق الإشارة
            audio.onended = () => {
                this.speakSignal(signalType);
            };
            
            // معالجة الأخطاء في حالة فشل تشغيل الصوت
            audio.play().catch(error => {
                console.log('فشل تشغيل الصوت:', error);
                this.speakSignal(signalType);
            });
        } else {
            // إذا لم يكن الصوت مدعومًا، استخدم النطق فقط
            this.speakSignal(signalType);
        }
    }
    
    /**
     * نطق نص الإشارة باللغة العربية
     * @param {string} signalType - نوع الإشارة ('BUY' أو 'SELL')
     */
    speakSignal(signalType) {
        if (!this.speechSupported) return;
        
        // تحويل النص للغة العربية
        let textToSpeak = '';
        if (signalType === 'BUY') {
            textToSpeak = 'إشارة شراء';
        } else {
            textToSpeak = 'إشارة بيع';
        }
        
        // استخدام معالج الصوت الروبوتي إذا كان متاحاً
        if (typeof robotVoice !== 'undefined') {
            // استخدام الصوت الطبيعي باللغة العربية
            robotVoice.speak(textToSpeak, {
                volume: 1,
                rate: 1.0,    // سرعة طبيعية
                pitch: 1.0    // نبرة طبيعية
            });
        } else {
            // استخدام الطريقة التقليدية كاحتياط
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            
            // ضبط خصائص الصوت لتكون طبيعية
            utterance.volume = 1;
            utterance.rate = 1.0;    // سرعة طبيعية
            utterance.pitch = 1.0;   // نبرة طبيعية
            utterance.lang = 'ar-SA'; // تعيين اللغة العربية
            
            // تشغيل النطق
            window.speechSynthesis.cancel(); // إيقاف أي نطق سابق
            window.speechSynthesis.speak(utterance);
        }
    }
    
    /**
     * نطق رسالة ترحيبية باللغة العربية
     */
    speakWelcome() {
        if (!this.speechSupported) return;
        
        const welcomeText = 'مرحباً بك في نظام التداول المتطور';
        
        if (typeof robotVoice !== 'undefined') {
            robotVoice.speak(welcomeText, {
                volume: 1,
                rate: 1.0,
                pitch: 1.0
            });
        } else {
            const utterance = new SpeechSynthesisUtterance(welcomeText);
            utterance.volume = 1;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.lang = 'ar-SA';
            
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }
    
    /**
     * نطق رسالة عند اختيار المنصة باللغة العربية
     * @param {string} platform - اسم المنصة
     */
    speakPlatformSelected(platform) {
        if (!this.speechSupported) return;
        
        let platformText = '';
        if (platform === 'quotex') {
            platformText = 'تم اختيار منصة كوتكس';
        } else if (platform === 'pocket') {
            platformText = 'تم اختيار منصة بوكت أوبشن';
        }
        
        if (typeof robotVoice !== 'undefined') {
            robotVoice.speak(platformText, {
                volume: 1,
                rate: 1.0,
                pitch: 1.0
            });
        } else {
            const utterance = new SpeechSynthesisUtterance(platformText);
            utterance.volume = 1;
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.lang = 'ar-SA';
            
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }
}

// إنشاء كائن عام للاستخدام
const tradeAudio = new TradeSignalAudio();

// تشغيل رسالة ترحيبية عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        tradeAudio.speakWelcome();
    }, 1500);
    
    // إضافة حدث لنطق اسم المنصة عند اختيارها
    const platformOptions = document.querySelectorAll('.platform-option');
    platformOptions.forEach(option => {
        option.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            tradeAudio.speakPlatformSelected(platform);
        });
    });
});