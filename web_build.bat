@echo off
echo Building Binary Trader DZ Web Application...

REM إنشاء مجلد البناء إذا لم يكن موجودًا
if not exist build mkdir build
cd build

REM تشغيل CMake لتوليد ملفات البناء
echo Generating build files with CMake...
cmake ..

REM بناء المشروع
echo Building the project...
cmake --build . --config Release

echo.
echo Build completed!
echo.
echo To run the server, execute: build\Release\binary_trader_web.exe
echo Then open your browser and navigate to: http://localhost:8080
echo.
pause