cmake_minimum_required(VERSION 3.10)
project(BinaryTraderDZ)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)
set(CMAKE_AUTOUIC ON)

# البحث عن حزم Qt
find_package(Qt5 COMPONENTS Core Widgets WebEngineWidgets REQUIRED)

# إضافة الملف التنفيذي
add_executable(binary_trader_desktop
    desktop_main.cpp
    mainwindow.cpp
    mainwindow.h
    resources.qrc
)

# ربط مكتبات Qt
target_link_libraries(binary_trader_desktop
    Qt5::Core
    Qt5::Widgets
    Qt5::WebEngineWidgets
)

# نسخ الملفات الثابتة إلى مجلد البناء
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/css DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/js DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/assetsimages DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/imgs DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/imgslogos DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)
file(COPY ${CMAKE_CURRENT_SOURCE_DIR}/index.html DESTINATION ${CMAKE_CURRENT_BINARY_DIR}/resources)