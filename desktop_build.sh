#!/bin/bash

echo "Building Binary Trader DZ Desktop Application..."

# إنشاء مجلد البناء إذا لم يكن موجودًا
mkdir -p build_desktop
cd build_desktop

# تشغيل CMake لتوليد ملفات البناء
echo "Generating build files with CMake..."
cmake ..

# بناء المشروع
echo "Building the project..."
cmake --build .

echo ""
echo "Build completed!"
echo ""
echo "To run the application, execute: ./binary_trader_desktop"
echo ""