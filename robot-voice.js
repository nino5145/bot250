/**
 * معالج الصوت الروبوتي المحسن بالعربية
 */
class RobotVoiceProcessor {
    constructor() {
        // تهيئة المعالج
        this.voicesLoaded = false;
        this.voices = [];
        this.arabicVoice = null;
        
        // تحميل الأصوات المتاحة
        if (window.speechSynthesis) {
            // بعض المتصفحات تحتاج إلى وقت لتحميل الأصوات
            if (window.speechSynthesis.getVoices().length > 0) {
                this.loadVoices();
            } else {
                window.speechSynthesis.onvoiceschanged = () => {
                    this.loadVoices();
                };
            }
        }
    }
    
    /**
     * تحميل الأصوات المتاحة والبحث عن صوت عربي
     */
    loadVoices() {
        this.voices = window.speechSynthesis.getVoices();
        this.voicesLoaded = true;
        
        // البحث عن صوت عربي
        for (let i = 0; i < this.voices.length; i++) {
            const voice = this.voices[i];
            if (voice.lang.includes('ar') || 
                voice.name.includes('Arabic') || 
                voice.name.includes('العربية')) {
                this.arabicVoice = voice;
                console.log('تم العثور على صوت عربي:', voice.name);
                break;
            }
        }
        
        // إذا لم يتم العثور على صوت عربي، استخدم أي صوت متاح
        if (!this.arabicVoice && this.voices.length > 0) {
            // البحث عن أصوات Google أو Microsoft
            for (let i = 0; i < this.voices.length; i++) {
                const voice = this.voices[i];
                if (voice.name.includes('Google') || voice.name.includes('Microsoft')) {
                    this.arabicVoice = voice;
                    console.log('استخدام صوت بديل:', voice.name);
                    break;
                }
            }
            
            // إذا لم يتم العثور على أي صوت مناسب، استخدم الصوت الافتراضي
            if (!this.arabicVoice) {
                this.arabicVoice = this.voices[0];
                console.log('استخدام الصوت الافتراضي:', this.arabicVoice.name);
            }
        }
    }

    /**
     * نطق النص بصوت طبيعي وسريع بالعربية
     * @param {string} text - النص المراد نطقه
     * @param {Object} options - خيارات الصوت
     */
    speak(text, options = {}) {
        // إنشاء كائن النطق
        const utterance = new SpeechSynthesisUtterance(text);
        
        // ضبط خصائص الصوت ليكون طبيعياً وواضحاً
        utterance.volume = options.volume || 1;
        utterance.rate = options.rate || 0.9;     // سرعة أبطأ قليلاً للوضوح
        utterance.pitch = options.pitch || 1.1;   // نبرة أعلى قليلاً للوضوح
        
        // تعيين اللغة العربية
        utterance.lang = 'ar-SA';
        
        // استخدام الصوت العربي إذا كان متاحاً
        if (this.arabicVoice) {
            utterance.voice = this.arabicVoice;
        }
        
        // إضافة تأثير صوتي قبل النطق
        this.addAudioEffect(options.effect);
        
        // إيقاف أي نطق سابق
        window.speechSynthesis.cancel();
        
        // تشغيل النطق
        window.speechSynthesis.speak(utterance);
    }
    
    /**
     * نطق النص بصوت روبوتي مميز
     * @param {string} text - النص المراد نطقه
     * @param {Object} options - خيارات الصوت
     */
    speakRobotic(text, options = {}) {
        // إنشاء كائن النطق
        const utterance = new SpeechSynthesisUtterance(text);
        
        // ضبط خصائص الصوت لتكون مميزة للغاية
        utterance.volume = options.volume || 1;
        utterance.rate = options.rate || 0.85;    // سرعة متوسطة للوضوح
        utterance.pitch = options.pitch || 1.4;   // نبرة أعلى لتمييز الروبوت
        
        // تعيين اللغة العربية
        utterance.lang = 'ar-SA';
        
        // استخدام الصوت العربي إذا كان متاحاً
        if (this.arabicVoice) {
            utterance.voice = this.arabicVoice;
        }
        
        // إضافة تأثير صوتي قبل النطق
        this.addAudioEffect(options.effect || 'robot');
        
        // إيقاف أي نطق سابق
        window.speechSynthesis.cancel();
        
        // تشغيل النطق مع تأثير الصدى
        this.addEchoEffect(utterance);
        
        // تشغيل النطق
        window.speechSynthesis.speak(utterance);
    }
    
    /**
     * إضافة تأثير صدى للصوت
     * @param {SpeechSynthesisUtterance} utterance - كائن النطق
     */
    addEchoEffect(utterance) {
        // إضافة حدث انتهاء النطق
        utterance.onend = () => {
            // إنشاء نسخة من النص للصدى
            if (utterance.text && utterance.text.length > 0) {
                setTimeout(() => {
                    const echoText = new SpeechSynthesisUtterance(utterance.text);
                    echoText.volume = 0.3;  // صوت منخفض للصدى
                    echoText.rate = 0.9;    // أبطأ قليلاً
                    echoText.pitch = 1.2;   // نبرة مختلفة قليلاً
                    echoText.lang = 'ar-SA';
                    
                    if (this.arabicVoice) {
                        echoText.voice = this.arabicVoice;
                    }
                    
                    window.speechSynthesis.speak(echoText);
                }, 300);  // تأخير قصير للصدى
            }
        };
    }
    
    /**
     * إضافة تأثير صوتي قبل النطق
     * @param {string} effectType - نوع التأثير
     */
    addAudioEffect(effectType) {
        if (!effectType) return;
        
        let audioUrl = '';
        
        switch (effectType) {
            case 'robot':
                audioUrl = 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3';
                break;
            case 'alert':
                audioUrl = 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3';
                break;
            case 'notification':
                audioUrl = 'https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3';
                break;
        }
        
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.volume = 0.3;
            audio.play().catch(e => console.log('تعذر تشغيل التأثير الصوتي:', e));
        }
    }
}

// إنشاء كائن عام للاستخدام
const robotVoice = new RobotVoiceProcessor();