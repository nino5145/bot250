/**
 * نظام النطق المباشر باللغة العربية - محسن
 */

// تنفيذ فوري عند تحميل الملف
(function() {
    // التحقق من دعم النطق
    if ('speechSynthesis' in window) {
        // تهيئة النطق
        window.speechSynthesis.cancel();
        
        // تهيئة متغيرات النطق
        let voiceSettings = {
            rate: 0.9,      // سرعة أبطأ قليلاً للوضوح
            pitch: 1.1,     // نبرة أعلى قليلاً للوضوح
            volume: 1.0,    // مستوى الصوت الأقصى
            useEcho: true,  // استخدام تأثير الصدى
            useEffects: true // استخدام التأثيرات الصوتية
        };
        
        // نطق رسالة ترحيبية بعد تحميل الصفحة
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                // تشغيل تأثير صوتي قبل الترحيب
                playWelcomeEffect();
                
                // نطق رسالة الترحيب بعد التأثير الصوتي
                setTimeout(() => {
                    speakArabic('مرحباً بك في نظام التداول المتطور', { 
                        emphasis: true,
                        rate: voiceSettings.rate,
                        pitch: voiceSettings.pitch + 0.1 // زيادة النبرة للترحيب
                    });
                }, 800);
            }, 1000);
        });
        
        // إضافة أحداث للأزرار
        document.addEventListener('DOMContentLoaded', function() {
            // زر توليد الإشارة
            const signalBtn = document.getElementById('signal');
            if (signalBtn) {
                signalBtn.addEventListener('click', function() {
                    // تشغيل تأثير صوتي قبل النطق
                    playProcessingEffect();
                    
                    // نطق رسالة توليد الإشارة بعد التأثير الصوتي
                    setTimeout(() => {
                        speakArabic('جاري توليد الإشارة', { 
                            emphasis: true,
                            rate: voiceSettings.rate,
                            pitch: voiceSettings.pitch
                        });
                    }, 300);
                });
            }
            
            // خيارات المنصة
            const platformOptions = document.querySelectorAll('.platform-option');
            platformOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const platform = this.getAttribute('data-platform');
                    
                    // تشغيل تأثير صوتي عند تغيير المنصة
                    playSelectionEffect();
                    
                    // نطق اسم المنصة المختارة
                    setTimeout(() => {
                        if (platform === 'quotex') {
                            speakArabic('تم اختيار منصة كوتكس', { 
                                emphasis: true,
                                rate: voiceSettings.rate,
                                pitch: voiceSettings.pitch
                            });
                        } else if (platform === 'pocket') {
                            speakArabic('تم اختيار منصة بوكت أوبشن', { 
                                emphasis: true,
                                rate: voiceSettings.rate,
                                pitch: voiceSettings.pitch
                            });
                        }
                    }, 300);
                });
            });
            
            // إضافة زر إعدادات الصوت
            addVoiceSettingsButton();
        });
    }
    
    /**
     * تشغيل تأثير صوتي للترحيب
     */
    function playWelcomeEffect() {
        if (!voiceSettings.useEffects) return;
        
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1518/1518-preview.mp3');
        audio.volume = 0.4;
        audio.play().catch(e => console.log('تعذر تشغيل تأثير الترحيب:', e));
    }
    
    /**
     * تشغيل تأثير صوتي لتوليد الإشارة
     */
    function playProcessingEffect() {
        if (!voiceSettings.useEffects) return;
        
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('تعذر تشغيل تأثير المعالجة:', e));
    }
    
    /**
     * تشغيل تأثير صوتي للاختيار
     */
    function playSelectionEffect() {
        if (!voiceSettings.useEffects) return;
        
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        audio.volume = 0.3;
        audio.play().catch(e => console.log('تعذر تشغيل تأثير الاختيار:', e));
    }
    
    /**
     * إضافة زر إعدادات الصوت
     */
    function addVoiceSettingsButton() {
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
        
        button.addEventListener('click', function() {
            toggleVoiceSettings();
        });
        
        document.body.appendChild(button);
    }
    
    /**
     * عرض/إخفاء إعدادات الصوت
     */
    function toggleVoiceSettings() {
        let settingsPanel = document.getElementById('voice-settings-panel');
        
        if (settingsPanel) {
            // إخفاء اللوحة إذا كانت ظاهرة
            document.body.removeChild(settingsPanel);
            return;
        }
        
        // إنشاء لوحة الإعدادات
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
        
        // إضافة عناصر التحكم
        settingsPanel.innerHTML = `
            <h3 style="margin-top: 0; text-align: center;">إعدادات الصوت</h3>
            
            <div style="margin: 10px 0;">
                <label for="voice-rate">سرعة النطق:</label>
                <input type="range" id="voice-rate" min="0.5" max="1.5" step="0.1" value="${voiceSettings.rate}" style="width: 100%;">
                <span id="rate-value">${voiceSettings.rate}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <label for="voice-pitch">نبرة الصوت:</label>
                <input type="range" id="voice-pitch" min="0.5" max="2" step="0.1" value="${voiceSettings.pitch}" style="width: 100%;">
                <span id="pitch-value">${voiceSettings.pitch}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <label for="voice-volume">مستوى الصوت:</label>
                <input type="range" id="voice-volume" min="0" max="1" step="0.1" value="${voiceSettings.volume}" style="width: 100%;">
                <span id="volume-value">${voiceSettings.volume}</span>
            </div>
            
            <div style="margin: 10px 0;">
                <input type="checkbox" id="use-echo" ${voiceSettings.useEcho ? 'checked' : ''}>
                <label for="use-echo">تأثير الصدى</label>
            </div>
            
            <div style="margin: 10px 0;">
                <input type="checkbox" id="use-effects" ${voiceSettings.useEffects ? 'checked' : ''}>
                <label for="use-effects">تأثيرات صوتية</label>
            </div>
            
            <button id="test-voice-btn" style="width: 100%; padding: 8px; margin-top: 10px; background: linear-gradient(45deg, #00f7ff, #0066ff); border: none; color: #0a0e17; border-radius: 5px; cursor: pointer; font-weight: bold;">اختبار الصوت</button>
        `;
        
        document.body.appendChild(settingsPanel);
        
        // إضافة أحداث للعناصر
        document.getElementById('voice-rate').addEventListener('input', function() {
            voiceSettings.rate = parseFloat(this.value);
            document.getElementById('rate-value').textContent = this.value;
        });
        
        document.getElementById('voice-pitch').addEventListener('input', function() {
            voiceSettings.pitch = parseFloat(this.value);
            document.getElementById('pitch-value').textContent = this.value;
        });
        
        document.getElementById('voice-volume').addEventListener('input', function() {
            voiceSettings.volume = parseFloat(this.value);
            document.getElementById('volume-value').textContent = this.value;
        });
        
        document.getElementById('use-echo').addEventListener('change', function() {
            voiceSettings.useEcho = this.checked;
        });
        
        document.getElementById('use-effects').addEventListener('change', function() {
            voiceSettings.useEffects = this.checked;
        });
        
        document.getElementById('test-voice-btn').addEventListener('click', function() {
            // تشغيل تأثير صوتي للاختبار
            if (voiceSettings.useEffects) {
                playSelectionEffect();
            }
            
            // اختبار النطق بالإعدادات الجديدة
            setTimeout(() => {
                speakArabic('هذا اختبار للنطق باللغة العربية', {
                    rate: voiceSettings.rate,
                    pitch: voiceSettings.pitch,
                    volume: voiceSettings.volume,
                    echo: voiceSettings.useEcho
                });
            }, 300);
        });
    }
})();

/**
 * نطق نص باللغة العربية
 * @param {string} text - النص المراد نطقه
 * @param {Object} options - خيارات إضافية للنطق
 */
function speakArabic(text, options = {}) {
    // إيقاف أي نطق سابق
    window.speechSynthesis.cancel();
    
    // إنشاء كائن النطق
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = options.rate || voiceSettings.rate || 0.9;
    utterance.pitch = options.pitch || voiceSettings.pitch || 1.1;
    utterance.volume = options.volume || voiceSettings.volume || 1.0;
    
    // إضافة تأثير نبرة للنص المهم
    if (options.emphasis) {
        // تقسيم النص إلى كلمات
        const words = text.split(' ');
        
        // إذا كان النص يحتوي على أكثر من 3 كلمات، نضيف تأثير نبرة للكلمة الأخيرة
        if (words.length > 3) {
            // إنشاء نص بدون الكلمة الأخيرة
            const firstPart = words.slice(0, -1).join(' ');
            // الكلمة الأخيرة
            const lastWord = words[words.length - 1];
            
            // نطق الجزء الأول
            const firstUtterance = new SpeechSynthesisUtterance(firstPart);
            firstUtterance.lang = 'ar-SA';
            firstUtterance.rate = utterance.rate;
            firstUtterance.pitch = utterance.pitch;
            firstUtterance.volume = utterance.volume;
            
            // نطق الكلمة الأخيرة بنبرة أعلى
            const lastUtterance = new SpeechSynthesisUtterance(lastWord);
            lastUtterance.lang = 'ar-SA';
            lastUtterance.rate = utterance.rate * 0.9; // أبطأ قليلاً
            lastUtterance.pitch = utterance.pitch * 1.2; // نبرة أعلى
            lastUtterance.volume = utterance.volume;
            
            // محاولة العثور على صوت عربي
            setTimeout(function() {
                const voices = window.speechSynthesis.getVoices();
                let arabicVoice = null;
                
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
                
                // تعيين الصوت العربي إذا وجد
                if (arabicVoice) {
                    firstUtterance.voice = arabicVoice;
                    lastUtterance.voice = arabicVoice;
                }
                
                // تشغيل النطق
                window.speechSynthesis.speak(firstUtterance);
                
                // إضافة حدث انتهاء النطق للجزء الأول
                firstUtterance.onend = function() {
                    window.speechSynthesis.speak(lastUtterance);
                    
                    // إضافة تأثير الصدى إذا كان مفعلاً
                    if (options.echo || voiceSettings.useEcho) {
                        lastUtterance.onend = function() {
                            setTimeout(() => {
                                const echoUtterance = new SpeechSynthesisUtterance(lastWord);
                                echoUtterance.lang = 'ar-SA';
                                echoUtterance.volume = 0.3;
                                echoUtterance.rate = 0.8;
                                echoUtterance.pitch = 0.9;
                                
                                if (arabicVoice) {
                                    echoUtterance.voice = arabicVoice;
                                }
                                
                                window.speechSynthesis.speak(echoUtterance);
                            }, 300);
                        };
                    }
                };
            }, 100);
            
            return;
        }
    }
    
    // محاولة العثور على صوت عربي للنطق العادي
    setTimeout(function() {
        const voices = window.speechSynthesis.getVoices();
        let arabicVoice = null;
        
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
        
        // تعيين الصوت العربي إذا وجد
        if (arabicVoice) {
            utterance.voice = arabicVoice;
        }
        
        // تشغيل النطق
        window.speechSynthesis.speak(utterance);
        
        // إضافة تأثير الصدى إذا كان مفعلاً
        if (options.echo || voiceSettings.useEcho) {
            utterance.onend = function() {
                setTimeout(() => {
                    const echoUtterance = new SpeechSynthesisUtterance(text);
                    echoUtterance.lang = 'ar-SA';
                    echoUtterance.volume = 0.3;
                    echoUtterance.rate = 0.8;
                    echoUtterance.pitch = 0.9;
                    
                    if (arabicVoice) {
                        echoUtterance.voice = arabicVoice;
                    }
                    
                    window.speechSynthesis.speak(echoUtterance);
                }, 300);
            };
        }
    }, 100);
}

// إضافة دالة عامة للنطق
window.speakArabic = speakArabic;