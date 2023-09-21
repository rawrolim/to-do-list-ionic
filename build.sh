ionic build
ionic cap sync
cd android
./gradlew assembleDebug
cd ..
cp ./android/app/build/outputs/apk/debug/app-debug.apk app.apk
git status
git add .
git commit -m "Build do APK"
git push