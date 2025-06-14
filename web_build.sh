#!/bin/bash

echo "Building Binary Trader DZ Web Application..."

# إنشاء مجلد البناء إذا لم يكن موجودًا
mkdir -p build
cd build

# تشغيل CMake لتوليد ملفات البناء
echo "Generating build files with CMake..."
cmake ..

# بناء المشروع
echo "Building the project..."
cmake --build .

echo ""
echo "Build completed!"
echo ""
echo "To run the server, execute: ./binary_trader_web"
echo "Then open your browser and navigate to: http://localhost:8080"
echo ""