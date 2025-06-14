@echo off
echo Building Binary Trader DZ Desktop Application...

REM إنشاء مجلد البناء إذا لم يكن موجودًا
if not exist build_desktop mkdir build_desktop
cd build_desktop

REM تشغيل CMake لتوليد ملفات البناء
echo Generating build files with CMake...
cmake ..

REM بناء المشروع
echo Building the project...
cmake --build . --config Release

echo.
echo Build completed!
echo.
echo To run the application, execute: build_desktop\Release\binary_trader_desktop.exe
echo.
pause