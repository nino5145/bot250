/**
 * واجهة برمجة التطبيقات للتواصل مع خادم C++
 */

// الدالة الرئيسية لطلب إشارة تداول من الخادم
async function requestSignal(pair, time) {
    try {
        const response = await fetch('/api/signal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pair: pair,
                time: time
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error requesting signal:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// استبدال الوظائف القديمة بالوظائف الجديدة التي تستخدم واجهة برمجة التطبيقات
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
            
            // طلب إشارة من الخادم
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