#include "crow.h"
#include <fstream>
#include <string>
#include <filesystem>

namespace fs = std::filesystem;

std::string readFile(const std::string& path) {
    std::ifstream file(path);
    if (!file.is_open()) {
        return "";
    }
    return std::string((std::istreambuf_iterator<char>(file)), std::istreambuf_iterator<char>());
}

int main() {
    crow::SimpleApp app;

    // تكوين المجلد العام للملفات الثابتة
    std::string publicDir = "public";
    
    // توجيه للصفحة الرئيسية
    CROW_ROUTE(app, "/")([]() {
        return crow::response(readFile("public/index.html"));
    });

    // توجيه للملفات الثابتة (CSS, JS, الصور)
    CROW_ROUTE(app, "/css/<path>")([](const std::string& path) {
        std::string content = readFile("public/css/" + path);
        crow::response res(content);
        res.set_header("Content-Type", "text/css");
        return res;
    });

    CROW_ROUTE(app, "/js/<path>")([](const std::string& path) {
        std::string content = readFile("public/js/" + path);
        crow::response res(content);
        res.set_header("Content-Type", "application/javascript");
        return res;
    });

    CROW_ROUTE(app, "/assetsimages/<path>")([](const std::string& path) {
        std::string filePath = "public/assetsimages/" + path;
        std::string content = readFile(filePath);
        
        crow::response res(content);
        
        // تحديد نوع المحتوى بناءً على امتداد الملف
        if (path.ends_with(".png")) {
            res.set_header("Content-Type", "image/png");
        } else if (path.ends_with(".webp")) {
            res.set_header("Content-Type", "image/webp");
        } else if (path.ends_with(".jpg") || path.ends_with(".jpeg")) {
            res.set_header("Content-Type", "image/jpeg");
        }
        
        return res;
    });

    CROW_ROUTE(app, "/imgs/<path>")([](const std::string& path) {
        std::string filePath = "public/imgs/" + path;
        std::string content = readFile(filePath);
        
        crow::response res(content);
        
        // تحديد نوع المحتوى بناءً على امتداد الملف
        if (path.ends_with(".png")) {
            res.set_header("Content-Type", "image/png");
        } else if (path.ends_with(".webp")) {
            res.set_header("Content-Type", "image/webp");
        } else if (path.ends_with(".jpg") || path.ends_with(".jpeg")) {
            res.set_header("Content-Type", "image/jpeg");
        }
        
        return res;
    });

    // واجهة برمجة التطبيقات (API) لإشارات التداول
    CROW_ROUTE(app, "/api/signal").methods(crow::HTTPMethod::POST)
    ([](const crow::request& req) {
        auto x = crow::json::load(req.body);
        if (!x) {
            return crow::response(400, "Invalid JSON");
        }

        // استخراج البيانات من الطلب
        std::string pair = x["pair"].s();
        std::string time = x["time"].s();
        
        // هنا يمكنك إضافة منطق توليد الإشارة الخاص بك
        // هذا مثال بسيط يعيد إشارة عشوائية
        srand(static_cast<unsigned int>(std::time(nullptr)));
        bool isUp = rand() % 2 == 0;
        
        crow::json::wvalue result;
        result["success"] = true;
        result["direction"] = isUp ? "UP" : "DOWN";
        result["pair"] = pair;
        result["time"] = time;
        
        return crow::response(result);
    });

    // تشغيل الخادم على المنفذ 8080
    app.port(8080).multithreaded().run();

    return 0;
}