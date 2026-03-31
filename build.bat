@echo off
set LOG=E:\AI\build_log.txt
echo [%date% %time%] Starting Lani build process > %LOG%

echo [%date% %time%] Step 1: Installing EAS CLI... >> %LOG%
call npm install -g eas-cli >> %LOG% 2>&1
echo [%date% %time%] EAS CLI install done >> %LOG%

E:
cd "E:\AI\Loneliness App\lani-app-v2"

echo [%date% %time%] Step 2: Checking EAS version... >> %LOG%
call eas --version >> %LOG% 2>&1

echo [%date% %time%] Step 3: Running EAS build for Android (internal)... >> %LOG%
call npx eas-cli build --platform android --profile production --non-interactive --no-wait >> %LOG% 2>&1
echo [%date% %time%] Android build submitted >> %LOG%

echo [%date% %time%] Step 4: Running EAS build for iOS... >> %LOG%
call npx eas-cli build --platform ios --profile production --non-interactive --no-wait >> %LOG% 2>&1
echo [%date% %time%] iOS build submitted >> %LOG%

echo [%date% %time%] BUILD SCRIPT COMPLETE >> %LOG%
