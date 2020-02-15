// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;

import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { fcmService } from './src/FCMService'

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    fcmService.register(this.onRegister, this.onNotification, this.onOpenNotification)

  }
  onRegister(token) {
    console.log("[NotificationFCM] onRegister:", token)

  }
  onNotification(notify) {
    //handel push noti
    console.log("[NotificationFCM] onNotification:", notify)
    //for andro
    const channelObj={
      channelId:"SampleChannelID",
      channelName:"SampleChannelName",
      channelDes:"SampleChannelDes"


    }
    const channel=fcmService.buildChannel(channelObj)
    const buildNotify={
      dataId:notify._notificationId,
      title:notify._title,
      content:notify._body,
      sound:'default',
      channel:channel,
      data:{},
      colorBgIcon:"#1A243B",
      largeIcon:'ic_launcher',
      smallIcon:'ic_launcher',
      vibrate:true


    }
    const notification=fcmService.buildNotification(buildNotify)
    fcmService.displayNotification(notification)
  }
  onOpenNotification(notify) {
    console.log("[NotificationFCM] onOpenNotification:", notify)
    alert("Open Notification"+notify._body)
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Sample RN Firebase
      </Text>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})