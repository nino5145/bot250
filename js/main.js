const { app, BrowserWindow } = require('electron');
const path = require('path');

// حافظ على مرجع عام للنافذة، وإلا قد يتم إغلاقها تلقائيًا
// عندما يتم جمع المهملات في JavaScript.
let mainWindow;

function createWindow() {
  // إنشاء نافذة المتصفح.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'imgs/imgs/Pocket-Option-Logo.png')
  });

  // تحميل ملف index.html للتطبيق.
  mainWindow.loadFile('index.html');

  // فتح أدوات المطور (DevTools) للتصحيح إذا لزم الأمر.
  // mainWindow.webContents.openDevTools();

  // يتم تنفيذ هذا عندما يتم إغلاق النافذة.
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// يتم استدعاء هذه الطريقة عندما يكون Electron جاهزًا
// لإنشاء نوافذ المتصفح. قد تستدعي بعض واجهات برمجة التطبيقات
// فقط بعد حدوث هذا الحدث.
app.whenReady().then(createWindow);

// الخروج عند إغلاق جميع النوافذ.
app.on('window-all-closed', function () {
  // على macOS من الشائع أن تبقى التطبيقات وقائمة المهام نشطة
  // حتى يقوم المستخدم بالخروج صراحة باستخدام Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // على macOS من الشائع إعادة إنشاء نافذة في التطبيق عند
  // النقر على أيقونة الإرسال عندما لا توجد نوافذ أخرى مفتوحة.
  if (mainWindow === null) createWindow();
});