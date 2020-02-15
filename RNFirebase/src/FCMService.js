import firebase from 'react-native-firebase';
import type{ Notification, NotificationOpen } from 'react-native-firebase';
class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister,onNotification, onOpenNotification)
    }
    checkPermission = (onRegister) => {
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    this.requestPermission(onRegister)
                }
            }).catch(error => {
                console.log("permossion rejected", error)
            })

    }
    getToken = (onRegister) => {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken)

                } else {
                    console.log("User does not have a user Token")
                }
            }).catch(error => {
                console.log("gettoken Rejected", error)
            })
    }
    requestPermission = (onRegister) => {
        firebase.messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch(error => {
                console.log("request permission rejected", error)

            })
    }
    deleteToken = () => {
        firebase.messaging().deleteToken()
            .catch(error => {
                console.log("deklete token errror", error)
            })
    }
    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {
        //triggered when  a particular notification is received in for ground
        this.notificationListener = firebase.notifications()
            .onNotification((notification: Notification) => {
                onNotification(notification)

            })

            //backgroud noti check 

            this.notificationOpenedListener = firebase.notifications()
                .onNotificationOpened((notificationOpen: NotificationOpen) => {
                   if (notificationOpen) {

                    const notification: Notification = notificationOpen.notification
                    onOpenNotification(notification)
                    this.removeDeliveredNotification(notification)
                }
                })
        //app close  but you can check if it was opened by a Notification being clicked
        firebase.notifications().getInitialNotification()
            .then(notificationOpen => {
                if (notificationOpen) {

                    const notification: Notification = notificationOpen.notification
                    onOpenNotification(notification)
                    this.removeDeliveredNotification(notification)
                }
            })

        //triggered when data  only payload in forground
        this.messageListener = firebase.messaging().onMessage((message) => {
            onNotification(message)
        })
        //triggered when have new token

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            console.log("New token refresh", fcmToken)
            onRegister(fcmToken)
        })
    }
    unregister = () => {
        this.notificationListener()
        this.notificationOpenedListener()
        this.messageListener()
        this.onTokenRefreshListener()
    }
    buildChannel = (obj) => {
        return new firebase.notifications.Android.Channel(
            obj.channelId, obj.channelName,
            firebase.notifications.Android.Importance.High)
            .setDescription(obj.channelDes)
    }
    buildNotification = (obj) => {
        //for andro
        firebase.notifications().android.createChannel(obj.channel)
        //for andro and ios
        return new firebase.notifications.Notification()
            .setSound(obj.sound)
            .setNotificationId(obj.dataId)
            .setTitle(obj.title)
            .setBody(obj.content)
            .setData(obj.data)
            //for andro
            .android.setChannelId(obj.channel.channelId)
            .android.setLargeIcon(obj.largeIcon)//create this icon in android studio (app/res/mipmap)
            .android.setSmallIcon(obj.smallIcon)//create this icon in android studio (app/res/drawable)
            .android.setColor(obj.colorBgIcon)
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setVibrate(obj.vibrate)
        //.android.setAutoCancel(true)//auto cancel after receive notifications



    }

    scheduleNotification = (notification, days, minutes) => {
        const date=new Date()
        if (days) {
            date.setDate(date.getDate() + days)

        }
        if (minutes) {
            date.setMinutes(date.getMinutes() + minutes)


        }
        firebase.notifications()
            .scheduleNotification(notification, { fireDate: date.getTime() })


    }
    displayNotification = (notification) => {
        firebase.notifications().displayNotification(notification)
            .catch(error => console.log("display notification Error", error))

    }
    removeDeliveredNotification = (notification) => {
        firebase.notifications().removeDeliveredNotification(notification.notificationId)
    }
}
export const fcmService = new FCMService()