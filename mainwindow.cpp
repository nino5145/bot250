#include "mainwindow.h"
#include <QVBoxLayout>
#include <QWidget>
#include <QFileInfo>
#include <QDir>
#include <QApplication>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    setupUI();
    loadLocalHtml();
}

MainWindow::~MainWindow()
{
}

void MainWindow::setupUI()
{
    // إنشاء عنصر واجهة المستخدم الرئيسي
    QWidget *centralWidget = new QWidget(this);
    setCentralWidget(centralWidget);
    
    // إنشاء تخطيط رأسي
    QVBoxLayout *layout = new QVBoxLayout(centralWidget);
    layout->setContentsMargins(0, 0, 0, 0);
    
    // إنشاء عرض محرك الويب
    webView = new QWebEngineView(this);
    layout->addWidget(webView);
}

void MainWindow::loadLocalHtml()
{
    // الحصول على المسار المطلق لمجلد الموارد
    QString resourcesPath = QDir(QApplication::applicationDirPath()).filePath("resources");
    
    // تحميل ملف HTML المحلي
    QUrl localUrl = QUrl::fromLocalFile(QDir(resourcesPath).filePath("index.html"));
    webView->load(localUrl);
}