@echo off
echo Setting up Git repository...
git init
git add .
git commit -m "Initial commit"
echo.
echo Repository setup complete!
echo.
echo Now you need to:
echo 1. Create a new repository named 'bot250' on GitHub (if not already created)
echo 2. Run the following commands:
echo    git remote add origin https://github.com/nino5145/bot250.git
echo    git push -u origin master
echo.
pause