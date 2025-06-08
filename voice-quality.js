/**
 * نظام تحسين جودة الصوت للروبوت
 * 
 * هذا الملف يحتوي على وظائف متقدمة لتحسين جودة الصوت والنطق
 */

// تنفيذ فوري عند تحميل الملف
(function() {
    // التحقق من دعم النطق
    if (!('speechSynthesis' in window)) {
        console.error('متصفحك لا يدعم خاصية النطق!');
        return;
    }
    
    // تهيئة معالج تحسين الصوت
    const voiceEnhancer = new VoiceEnhancer();
    
    // إضافة المعالج للنافذة
    window.voiceEnhancer = voiceEnhancer;
    
    // تحميل الأصوات عند تهيئة الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        voiceEnhancer.initialize();
    });
})();

/**
 * فئة معالج تحسين الصوت
 */
class VoiceEnhancer {
    constructor() {
        // تهيئة المتغيرات
        this.voices = [];
        this.arabicVoice = null;
        this.voicesLoaded = false;
        this.audioContext = null;
        
        // إعدادات الصوت الافتراضية
        this.settings = {
            rate: 0.9,       // سرعة النطق
            pitch: 1.1,      // نبرة الصوت
            volume: 1.0,     // مستوى الصوت
            useEcho: true,   // استخدام تأثير الصدى
            useEffects: true // استخدام التأثيرات الصوتية
        };
        
        // مسارات التأثيرات الصوتية
        this.soundEffects = {
            welcome: 'https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3',
            alert: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
            notification: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
            success: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
            error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
        };
    }
    
    /**
     * تهيئة معالج تحسين الصوت
     */
    initialize() {
        // تحميل الأصوات المتاحة
        this.loadVoices();
        
        // تهيئة سياق الصوت
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('لا يمكن تهيئة سياق الصوت:', e);
        }
        
        // تحميل التأثيرات الصوتية مسبقاً
        this.preloadSoundEffects();
    }
    
    /**
     * تحميل الأصوات المتاحة
     */
    loadVoices() {
        // الحصول على الأصوات المتاحة
        this.voices = window.speechSynthesis.getVoices();
        
        // إذا لم تكن الأصوات متاحة بعد، انتظر حتى تصبح متاحة
        if (this.voices.length === 0) {
            window.speechSynthesis.onvoiceschanged = () => {
                this.voices = window.speechSynthesis.getVoices();
                this.findBestArabicVoice();
                this.voicesLoaded = true;
            };
        } else {
            this.findBestArabicVoice();
            this.voicesLoaded = true;
        }
    }
    
    /**
     * البحث عن أفضل صوت عربي متاح
     */
    findBestArabicVoice() {
        // البحث عن صوت عربي من Google أولاً
        for (let i = 0; i < this.voices.length; i++) {
            const voice = this.voices[i];
            if ((voice.lang.includes('ar') || 
                voice.name.includes('Arabic') || 
                voice.name.includes('العربية')) && 
                voice.name.includes('Google')) {
                this.arabicVoice = voice;
                console.log('تم العثور على صوت عربي من Google:', voice.name);
                return;
            }
        }
        
        // إذا لم يتم العثور على صوت عربي من Google، ابحث عن أي صوت عربي
        for (let i = 0; i < this.voices.length; i++) {
            const voice = this.voices[i];
            if (voice.lang.includes('ar') || 
                voice.name.includes('Arabic') || 
                voice.name.includes('العربية')) {
                this.arabicVoice = voice;
                console.log('تم العثور على صوت عربي:', voice.name);
                return;
            }
        }
        
        // إذا لم يتم العثور على أي صوت عربي، استخدم أي صوت متاح
        if (this.voices.length > 0) {
            this.arabicVoice = this.voices[0];
            console.log('لم يتم العثور على صوت عربي، استخدام الصوت الافتراضي:', this.arabicVoice.name);
        }
    }
    
    /**
     * تحميل التأثيرات الصوتية مسبقاً
     */
    preloadSoundEffects() {
        // تحميل كل التأثيرات الصوتية مسبقاً
        for (const [key, url] of Object.entries(this.soundEffects)) {
            const audio = new Audio();
            audio.src = url;
            audio.preload = 'auto';
            
            // تحميل الصوت بدون تشغيله
            audio.load();
        }
    }
    
    /**
     * نطق نص باللغة العربية مع تحسينات
     * @param {string} text - النص المراد نطقه
     * @param {Object} options - خيارات إضافية للنطق
     */
    speak(text, options = {}) {
        // إيقاف أي نطق سابق
        window.speechSynthesis.cancel();
        
        // تشغيل تأثير صوتي إذا كان مطلوباً
        if (options.effect && this.settings.useEffects) {
            this.playSoundEffect(options.effect);
        }
        
        // إنشاء كائن النطق
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = options.rate || this.settings.rate;
        utterance.pitch = options.pitch || this.settings.pitch;
        utterance.volume = options.volume || this.settings.volume;
        
        // استخدام الصوت العربي إذا كان متاحاً
        if (this.arabicVoice) {
            utterance.voice = this.arabicVoice;
        }
        
        // إضافة تأثير التأكيد إذا كان مطلوباً
        if (options.emphasis) {
            this.speakWithEmphasis(text, utterance);
            return;
        }
        
        // تشغيل النطق
        window.speechSynthesis.speak(utterance);
        
        // إضافة تأثير الصدى إذا كان مفعلاً
        if (this.settings.useEcho) {
            this.addEchoEffect(utterance);
        }
    }
    
    /**
     * نطق نص مع تأكيد على الكلمات المهمة
     * @param {string} text - النص المراد نطقه
     * @param {SpeechSynthesisUtterance} baseUtterance - كائن النطق الأساسي
     */
    speakWithEmphasis(text, baseUtterance) {
        // تقسيم النص إلى كلمات
        const words = text.split(' ');
        
        // إذا كان النص قصيراً، نطقه كما هو
        if (words.length <= 3) {
            window.speechSynthesis.speak(baseUtterance);
            
            // إضافة تأثير الصدى إذا كان مفعلاً
            if (this.settings.useEcho) {
                this.addEchoEffect(baseUtterance);
            }
            return;
        }
        
        // تقسيم النص إلى جزأين
        const firstPart = words.slice(0, -1).join(' ');
        const lastWord = words[words.length - 1];
        
        // إنشاء كائن نطق للجزء الأول
        const firstUtterance = new SpeechSynthesisUtterance(firstPart);
        firstUtterance.lang = baseUtterance.lang;
        firstUtterance.rate = baseUtterance.rate;
        firstUtterance.pitch = baseUtterance.pitch;
        firstUtterance.volume = baseUtterance.volume;
        
        // إنشاء كائن نطق للكلمة الأخيرة مع تأكيد
        const lastUtterance = new SpeechSynthesisUtterance(lastWord);
        lastUtterance.lang = baseUtterance.lang;
        lastUtterance.rate = baseUtterance.rate * 0.9; // أبطأ قليلاً
        lastUtterance.pitch = baseUtterance.pitch * 1.2; // نبرة أعلى
        lastUtterance.volume = baseUtterance.volume;
        
        // استخدام الصوت العربي إذا كان متاحاً
        if (this.arabicVoice) {
            firstUtterance.voice = this.arabicVoice;
            lastUtterance.voice = this.arabicVoice;
        }
        
        // تشغيل النطق للجزء الأول
        window.speechSynthesis.speak(firstUtterance);
        
        // إضافة حدث انتهاء النطق للجزء الأول
        firstUtterance.onend = () => {
            // تشغيل النطق للكلمة الأخيرة
            window.speechSynthesis.speak(lastUtterance);
            
            // إضافة تأثير الصدى إذا كان مفعلاً
            if (this.settings.useEcho) {
                lastUtterance.onend = () => {
                    setTimeout(() => {
                        const echoUtterance = new SpeechSynthesisUtterance(lastWord);
                        echoUtterance.lang = baseUtterance.lang;
                        echoUtterance.volume = 0.3;
                        echoUtterance.rate = 0.8;
                        echoUtterance.pitch = 0.9;
                        
                        if (this.arabicVoice) {
                            echoUtterance.voice = this.arabicVoice;
                        }
                        
                        window.speechSynthesis.speak(echoUtterance);
                    }, 300);
                };
            }
        };
    }
    
    /**
     * إضافة تأثير صدى للنطق
     * @param {SpeechSynthesisUtterance} utterance - كائن النطق
     */
    addEchoEffect(utterance) {
        utterance.onend = () => {
            setTimeout(() => {
                const echoUtterance = new SpeechSynthesisUtterance(utterance.text);
                echoUtterance.lang = utterance.lang;
                echoUtterance.volume = 0.3;
                echoUtterance.rate = 0.8;
                echoUtterance.pitch = 0.9;
                
                if (this.arabicVoice) {
                    echoUtterance.voice = this.arabicVoice;
                }
                
                window.speechSynthesis.speak(echoUtterance);
            }, 300);
        };
    }
    
    /**
     * تشغيل تأثير صوتي
     * @param {string} effectType - نوع التأثير
     */
    playSoundEffect(effectType) {
        const url = this.soundEffects[effectType];
        if (!url) return;
        
        const audio = new Audio(url);
        audio.volume = 0.4;
        audio.play().catch(e => console.log('تعذر تشغيل التأثير الصوتي:', e));
    }
    
    /**
     * تحديث إعدادات الصوت
     * @param {Object} newSettings - الإعدادات الجديدة
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }
    
    /**
     * إضافة زر إعدادات الصوت
     */
    addSettingsButton() {
        const button = document.createElement('button');
        button.textContent = 'إعدادات الصوت';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 15px';
        button.style.backgroundColor = '#00f7ff';
        button.style.color = '#0a0e17';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';
        button.style.fontWeight = 'bold';
        
        button.addEventListener('click', () => {
            this.toggleSettingsPanel();
        });
        
        document.body.appendChild(button);
    }
    
    /**
     * عرض/إخفاء لوحة إعدادات الصوت
     */
    toggleSettingsPanel() {
        let settingsPanel = document.getElementById('voice-settings-panel');
        
        if (settingsPanel) {
            document.body.removeChild(settingsPanel);
            return;
        }
        
        settingsPanel = document.createElement('div');
        settingsPanel.id = 'voice-settings-panel';
        settingsPanel.style.position = 'fixed';
        settingsPanel.style.bottom = '70px';
        settingsPanel.style.right = '20px';
        settingsPanel.style.width = '250px';
        settingsPanel.style.padding = '15px';
        settingsPanel.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
        settingsPanel.style.color = '#ffffff';
        settingsPanel.style.borderRadius = '8px';
        settingsPanel.style.boxShadow = '0 0 20px rgba(0, 247, 255, 0.5)';
        settingsPanel.style.zIndex = '9998';
        
        settingsPanel.innerHTML = `
            <h3 style="margin-top: 0; text-align: center;">إعدادات الصوت</h3>
            
            <div style="margin: 10px 0;">
                <label for="voice-rate">سرعة النطق:</label>
                <input type="range" id="voice-rate" min="0.5" max="1.5" step="0.1" value="${this.settings.rate}" style="width: 100%;">
                <span id="rate-value">${this.settings.rate}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <label for="voice-pitch">نبرة الصوت:</label>
                <input type="range" id="voice-pitch" min="0.5" max="2" step="0.1" value="${this.settings.pitch}" style="width: 100%;">
                <span id="pitch-value">${this.settings.pitch}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <label for="voice-volume">مستوى الصوت:</label>
                <input type="range" id="voice-volume" min="0" max="1" step="0.1" value="${this.settings.volume}" style="width: 100%;">
                <span id="volume-value">${this.settings.volume}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <input type="checkbox" id="use-echo" ${this.settings.useEcho ? 'checked' : ''}>
                <label for="use-echo">تأثير الصدى</label>
            </div>
            
            <div style="margin: 10px 0;">
                <input type="checkbox" id="use-effects" ${this.settings.useEffects ? 'checked' : ''}>
                <label for="use-effects">تأثيرات صوتية</label>
            </div>
            
            <button id="test-voice-btn" style="width: 100%; padding: 8px; margin-top: 10px; background: linear-gradient(45deg, #00f7ff, #0066ff); border: none; color: #0a0e17; border-radius: 5px; cursor: pointer; font-weight: bold;">اختبار الصوت</button>
        `;
        
        document.body.appendChild(settingsPanel);
        
        // إضافة أحداث للعناصر
        document.getElementById('voice-rate').addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.settings.rate = value;
            document.getElementById('rate-value').textContent = value;
        });
        
        document.getElementById('voice-pitch').addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.settings.pitch = value;
            document.getElementById('pitch-value').textContent = value;
        });
        
        document.getElementById('voice-volume').addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.settings.volume = value;
            document.getElementById('volume-value').textContent = value;
        });
        
        document.getElementById('use-echo').addEventListener('change', (e) => {
            this.settings.useEcho = e.target.checked;
        });
        
        document.getElementById('use-effects').addEventListener('change', (e) => {
            this.settings.useEffects = e.target.checked;
        });
        
        document.getElementById('test-voice-btn').addEventListener('click', () => {
            // تشغيل تأثير صوتي للاختبار
            if (this.settings.useEffects) {
                this.playSoundEffect('notification');
            }
            
            // اختبار النطق بالإعدادات الجديدة
            setTimeout(() => {
                this.speak('هذا اختبار للنطق باللغة العربية', {
                    emphasis: true
                });
            }, 300);
        });
    }
}