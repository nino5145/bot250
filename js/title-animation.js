/**
 * تأثيرات حركية مستقبلية للعنوان
 */
document.addEventListener('DOMContentLoaded', function() {
  // الحصول على عنصر العنوان
  const titleElement = document.getElementById('title');
  if (!titleElement) return;
  
  // الحصول على نص العنوان
  const titleText = titleElement.textContent;
  
  // إفراغ العنوان
  titleElement.innerHTML = '';
  
  // إضافة إطار متوهج
  const titleFrame = document.createElement('div');
  titleFrame.className = 'title-frame';
  titleElement.appendChild(titleFrame);
  
  // إضافة كل حرف كعنصر منفصل
  [...titleText].forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'title-letter';
    span.style.setProperty('--letter-index', index);
    span.textContent = letter;
    titleElement.appendChild(span);
  });
  
  // إضافة خط متوهج تحت العنوان
  const underline = document.createElement('div');
  underline.className = 'title-underline';
  titleElement.appendChild(underline);
  
  // إضافة تأثير الهولوغرام
  addHologramEffect(titleElement);
});

/**
 * إضافة تأثير الهولوغرام للعنوان
 */
function addHologramEffect(element) {
  // إضافة خطوط الهولوغرام
  const hologramLines = document.createElement('div');
  hologramLines.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 2px,
      rgba(0, 247, 255, 0.05) 2px,
      rgba(0, 247, 255, 0.05) 4px
    );
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
  `;
  element.appendChild(hologramLines);
  
  // إضافة تأثير الوميض العشوائي
  setInterval(() => {
    if (Math.random() > 0.9) {
      element.style.opacity = '0.8';
      setTimeout(() => {
        element.style.opacity = '1';
      }, 100);
    }
  }, 2000);
}