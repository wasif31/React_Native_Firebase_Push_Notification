# React_Native_Firebase_Push_Notification
 this works in 2020,react native demo push notification worked in android ios after ejecting


1.create a react native app "https://facebook.github.io/react-native/docs/getting-started" ,here we dont use expo
2.change local.properties inside android app c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk as ur user name
3.sign your app and update debug.keystore by "keytool -genkey -v -keystore H:\Testing\RNFirebase\android\app\debug.keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -validity 14000"
and get ssh1 key by (https://stackoverflow.com/questions/27609442/how-to-get-the-sha-1-fingerprint-certificate-in-android-studio-for-debug-mode)
and yous it in firebase project ssh1
4.gradelw clean or sync gradel winh android studio
5.chack project name from manifest and use it in https://console.firebase.google.com/



for ios
1.create firebase app(add in exisiting app)
2.change package name
3.goto ios folder and type cli "install pod"
4.follow https://medium.com/@ankushaggarwal/generate-apns-certificate-for-ios-push-notifications-85e4a917d522
