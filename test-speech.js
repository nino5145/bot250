/**
 * اختبار النطق باللغة العربية
 */
document.addEventListener('DOMContentLoaded', function() {
    // إضافة زر اختبار النطق
    const testButton = document.createElement('button');
    testButton.textContent = 'اختبار النطق';
    testButton.style.position = 'fixed';
    testButton.style.bottom = '20px';
    testButton.style.left = '20px';
    testButton.style.padding = '10px 15px';
    testButton.style.backgroundColor = '#00f7ff';
    testButton.style.color = '#0a0e17';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '5px';
    testButton.style.cursor = 'pointer';
    testButton.style.zIndex = '9999';
    testButton.style.fontWeight = 'bold';
    
    // إضافة الزر للصفحة
    document.body.appendChild(testButton);
    
    // إضافة حدث النقر
    testButton.addEventListener('click', function() {
        testSpeech();
    });
    
    // اختبار النطق
    function testSpeech() {
        const text = 'هذا اختبار للنطق باللغة العربية';
        
        // إنشاء كائن النطق
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // إيقاف أي نطق سابق
        window.speechSynthesis.cancel();
        
        // تشغيل النطق
        window.speechSynthesis.speak(utterance);
        
        // إظهار رسالة
        console.log('تم تشغيل النطق');
        
        // إظهار الأصوات المتاحة
        setTimeout(function() {
            const voices = window.speechSynthesis.getVoices();
            console.log('الأصوات المتاحة:', voices.length);
            voices.forEach(voice => {
                console.log(`- ${voice.name} (${voice.lang})`);
            });
        }, 500);
    }
    
    // اختبار النطق عند تحميل الصفحة
    setTimeout(function() {
        testSpeech();
    }, 2000);
});