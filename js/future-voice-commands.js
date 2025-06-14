/**
 * Future Voice Commands - نظام الأوامر الصوتية المستقبلي
 * يتيح التحكم في التطبيق عبر الأوامر الصوتية
 */

class FutureVoiceCommands {
    constructor() {
        // تهيئة المتغيرات الأساسية
        this.recognition = null;
        this.isListening = false;
        this.commands = {};
        this.commandsEnabled = false;
        
        // تسجيل الأحداث عند تحميل الصفحة
        document.addEventListener('DOMContentLoaded', () => this.initialize());
    }
    
    /**
     * تهيئة نظام الأوامر الصوتية
     */
    initialize() {
        // التحقق من دعم التعرف الصوتي
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('التعرف الصوتي غير مدعوم في هذا المتصفح');
            return;
        }
        
        // إنشاء عنصر التحكم الصوتي
        this.createVoiceControl();
        
        // تعريف الأوامر الصوتية
        this.defineCommands();
        
        // إنشاء كائن التعرف الصوتي
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        // تسجيل أحداث التعرف الصوتي
        this.recognition.onresult = (event) => this.handleVoiceResult(event);
        this.recognition.onend = () => {
            if (this.isListening) {
                this.recognition.start();
            } else {
                this.updateVoiceControlStatus(false);
            }
        };
        this.recognition.onerror = (event) => {
            console.log('خطأ في التعرف الصوتي:', event.error);
            this.updateVoiceControlStatus(false);
            this.isListening = false;
        };
    }
    
    /**
     * إنشاء عنصر التحكم الصوتي
     */
    createVoiceControl() {
        // إنشاء عنصر التحكم
        const voiceControl = document.createElement('div');
        voiceControl.className = 'voice-control';
        voiceControl.innerHTML = `
            <div class="voice-button">
                <i class="fas fa-microphone"></i>
                <div class="voice-waves">
                    <div class="wave"></div>
                    <div class="wave"></div>
                    <div class="wave"></div>
                </div>
            </div>
            <div class="voice-status">Voice Control</div>
        `;
        
        // إضافة العنصر للصفحة
        document.body.appendChild(voiceControl);
        
        // تخزين مراجع العناصر
        this.voiceButton = voiceControl.querySelector('.voice-button');
        this.voiceStatus = voiceControl.querySelector('.voice-status');
        this.voiceWaves = voiceControl.querySelector('.voice-waves');
        
        // إضافة الأنماط CSS
        this.addVoiceControlStyles();
        
        // تسجيل حدث النقر
        this.voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());
    }
    
    /**
     * إضافة أنماط CSS لعنصر التحكم الصوتي
     */
    addVoiceControlStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .voice-control {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                z-index: 1000;
            }
            
            .voice-button {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: rgba(10, 14, 23, 0.8);
                border: 2px solid rgba(0, 247, 255, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
                box-shadow: 0 0 10px rgba(0, 247, 255, 0.3);
                transition: all 0.3s ease;
            }
            
            .voice-button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 15px rgba(0, 247, 255, 0.5);
            }
            
            .voice-button i {
                color: rgba(0, 247, 255, 0.8);
                font-size: 20px;
            }
            
            .voice-button.active {
                border-color: rgba(0, 255, 136, 0.8);
                box-shadow: 0 0 15px rgba(0, 255, 136, 0.5);
            }
            
            .voice-button.active i {
                color: rgba(0, 255, 136, 1);
            }
            
            .voice-status {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.8);
                background: rgba(10, 14, 23, 0.7);
                padding: 3px 10px;
                border-radius: 10px;
                border: 1px solid rgba(0, 247, 255, 0.2);
            }
            
            .voice-waves {
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .voice-button.active .voice-waves {
                opacity: 1;
            }
            
            .wave {
                position: absolute;
                border: 2px solid rgba(0, 255, 136, 0.5);
                width: 100%;
                height: 100%;
                border-radius: 50%;
                animation: wave-out 2s infinite;
                opacity: 0;
            }
            
            .wave:nth-child(2) {
                animation-delay: 0.5s;
            }
            
            .wave:nth-child(3) {
                animation-delay: 1s;
            }
            
            @keyframes wave-out {
                0% {
                    transform: scale(1);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(1.8);
                    opacity: 0;
                }
            }
            
            .voice-command-display {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(10, 14, 23, 0.8);
                border: 1px solid rgba(0, 247, 255, 0.3);
                border-radius: 8px;
                padding: 10px 20px;
                color: rgba(0, 247, 255, 0.9);
                font-size: 14px;
                box-shadow: 0 0 15px rgba(0, 247, 255, 0.2);
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            }
            
            .voice-command-display.active {
                opacity: 1;
            }
        `;
        
        document.head.appendChild(styleElement);
    }
    
    /**
     * تعريف الأوامر الصوتية
     */
    defineCommands() {
        this.commands = {
            'generate signal': () => {
                const signalBtn = document.getElementById('signal');
                if (signalBtn) {
                    signalBtn.click();
                    this.showCommandFeedback('Generating signal');
                }
            },
            'select quotex': () => {
                const quotexOption = document.querySelector('.platform-option[data-platform="quotex"]');
                if (quotexOption) {
                    quotexOption.click();
                    this.showCommandFeedback('Switching to Quotex');
                }
            },
            'select pocket': () => {
                const pocketOption = document.querySelector('.platform-option[data-platform="pocket"]');
                if (pocketOption) {
                    pocketOption.click();
                    this.showCommandFeedback('Switching to Pocket Option');
                }
            },
            'select time': (param) => {
                const timeSelect = document.getElementById('time__box');
                if (timeSelect) {
                    // تحويل النص إلى قيمة
                    let timeValue = '';
                    if (param.includes('second')) {
                        const seconds = param.match(/(\d+)\s*second/);
                        if (seconds && seconds[1]) {
                            timeValue = `${seconds[1]}s`;
                        }
                    } else if (param.includes('minute')) {
                        const minutes = param.match(/(\d+)\s*minute/);
                        if (minutes && minutes[1]) {
                            timeValue = `${minutes[1]}m`;
                        }
                    }
                    
                    // تحديد الخيار المناسب
                    if (timeValue) {
                        for (let i = 0; i < timeSelect.options.length; i++) {
                            if (timeSelect.options[i].value === timeValue) {
                                timeSelect.selectedIndex = i;
                                timeSelect.dispatchEvent(new Event('change'));
                                this.showCommandFeedback(`Time set to ${timeValue}`);
                                break;
                            }
                        }
                    }
                }
            }
        };
    }
    
    /**
     * تبديل حالة التعرف الصوتي
     */
    toggleVoiceRecognition() {
        if (this.isListening) {
            this.stopListening();
        } else {
            this.startListening();
        }
    }
    
    /**
     * بدء الاستماع للأوامر الصوتية
     */
    startListening() {
        if (!this.recognition) return;
        
        try {
            this.recognition.start();
            this.isListening = true;
            this.updateVoiceControlStatus(true);
            this.showCommandFeedback('Listening for commands');
            
            // تفعيل الأوامر الصوتية
            this.commandsEnabled = true;
        } catch (error) {
            console.log('خطأ في بدء التعرف الصوتي:', error);
        }
    }
    
    /**
     * إيقاف الاستماع للأوامر الصوتية
     */
    stopListening() {
        if (!this.recognition) return;
        
        try {
            this.recognition.stop();
            this.isListening = false;
            this.updateVoiceControlStatus(false);
            
            // تعطيل الأوامر الصوتية
            this.commandsEnabled = false;
        } catch (error) {
            console.log('خطأ في إيقاف التعرف الصوتي:', error);
        }
    }
    
    /**
     * تحديث حالة عنصر التحكم الصوتي
     * @param {boolean} isActive - حالة التنشيط
     */
    updateVoiceControlStatus(isActive) {
        if (isActive) {
            this.voiceButton.classList.add('active');
            this.voiceStatus.textContent = 'Listening...';
        } else {
            this.voiceButton.classList.remove('active');
            this.voiceStatus.textContent = 'Voice Control';
        }
    }
    
    /**
     * معالجة نتيجة التعرف الصوتي
     * @param {SpeechRecognitionEvent} event - حدث التعرف الصوتي
     */
    handleVoiceResult(event) {
        if (!this.commandsEnabled) return;
        
        const result = event.results[0][0].transcript.toLowerCase().trim();
        console.log('تم التعرف على:', result);
        
        // البحث عن الأمر المناسب
        let commandFound = false;
        
        // التحقق من الأوامر المباشرة
        Object.keys(this.commands).forEach(command => {
            if (result.includes(command)) {
                // استخراج المعلمات إذا وجدت
                const param = result.replace(command, '').trim();
                this.commands[command](param);
                commandFound = true;
            }
        });
        
        // إظهار ملاحظة إذا لم يتم التعرف على الأمر
        if (!commandFound) {
            this.showCommandFeedback('Command not recognized', true);
        }
    }
    
    /**
     * إظهار ملاحظة بالأمر المنفذ
     * @param {string} text - نص الملاحظة
     * @param {boolean} isError - هل هو خطأ
     */
    showCommandFeedback(text, isError = false) {
        // إزالة أي عنصر سابق
        const existingDisplay = document.querySelector('.voice-command-display');
        if (existingDisplay) {
            existingDisplay.remove();
        }
        
        // إنشاء عنصر جديد
        const display = document.createElement('div');
        display.className = 'voice-command-display';
        display.textContent = text;
        
        if (isError) {
            display.style.borderColor = 'rgba(255, 51, 102, 0.5)';
            display.style.color = 'rgba(255, 51, 102, 0.9)';
        }
        
        // إضافة العنصر للصفحة
        document.body.appendChild(display);
        
        // إظهار العنصر
        setTimeout(() => {
            display.classList.add('active');
            
            // إخفاء العنصر بعد فترة
            setTimeout(() => {
                display.classList.remove('active');
                setTimeout(() => {
                    if (display.parentNode === document.body) {
                        document.body.removeChild(display);
                    }
                }, 300);
            }, 3000);
        }, 10);
    }
}

// إنشاء كائن الأوامر الصوتية
const futureVoiceCommands = new FutureVoiceCommands();