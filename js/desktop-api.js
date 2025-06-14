/**
 * واجهة برمجة التطبيقات للتطبيق المكتبي
 */

// الدالة الرئيسية لطلب إشارة تداول
async function requestSignal(pair, time) {
    try {
        // في تطبيق سطح المكتب، يمكننا تنفيذ المنطق مباشرة بدلاً من إرسال طلب HTTP
        
        // محاكاة تأخير الشبكة
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // توليد إشارة عشوائية (يمكن استبدال هذا بخوارزمية حقيقية)
        const isUp = Math.random() > 0.5;
        
        return {
            success: true,
            direction: isUp ? "UP" : "DOWN",
            pair: pair,
            time: time
        };
    } catch (error) {
        console.error('Error generating signal:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// استبدال الوظائف القديمة بالوظائف الجديدة
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على زر توليد الإشارة
    const signalButton = document.getElementById('signal');
    
    if (signalButton) {
        signalButton.addEventListener('click', async function() {
            // الحصول على القيم المحددة
            const pairSelect = document.getElementById('pair__box');
            const timeSelect = document.getElementById('time__box');
            
            const pair = pairSelect.value;
            const time = timeSelect.value;
            
            if (!pair || !time) {
                alert('الرجاء تحديد الزوج والوقت');
                return;
            }
            
            // عرض حالة التحميل
            const loader = document.getElementById('loader');
            const result = document.getElementById('result');
            
            if (loader) loader.style.display = 'block';
            if (result) result.style.display = 'none';
            
            // طلب إشارة
            const signal = await requestSignal(pair, time);
            
            // إخفاء حالة التحميل
            if (loader) loader.style.display = 'none';
            
            // عرض النتيجة
            if (result) {
                result.style.display = 'block';
                
                if (signal.success) {
                    result.textContent = signal.direction;
                    result.className = signal.direction === 'UP' ? 'up' : 'down';
                    
                    // تشغيل الصوت إذا كان متاحًا
                    if (typeof playDirectionSound === 'function') {
                        playDirectionSound(signal.direction);
                    }
                } else {
                    result.textContent = 'خطأ';
                    result.className = 'error';
                }
            }
        });
    }
});