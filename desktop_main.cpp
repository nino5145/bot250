#include "mainwindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    MainWindow window;
    window.setWindowTitle("Binary Trader DZ");
    window.resize(1200, 800);
    window.show();
    
    return app.exec();
}