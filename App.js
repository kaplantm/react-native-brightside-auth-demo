/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './Components/Header';

const App: () => React$Node = () => {
  async function setupBrightSideAuth() {
    const {BrightsideAuth} = NativeModules;

    const authStatus = await new Promise((resolve, reject) => {
      BrightsideAuth.startup(value => {
        resolve(value);
      });
    });

    if (authStatus && authStatus === 'authorized') {
      const hasMrBrightside = await new Promise((resolve, reject) => {
        BrightsideAuth.checkForMrBrightside(value => {
          resolve(value);
        });
      });

      console.log({hasMrBrightside});
    }
    return 'done';
  }

  setupBrightSideAuth();

  return (
    <>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{flexGrow: 1}}
        // contentInsetAdjustmentBehavior="automatic"
        bounces={false}
        style={styles.scrollView}>
        <StatusBar barStyle="dark-content" />
        <Header />
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>BrightsideAuth</Text>
            <Text style={styles.sectionDescription}>
              You have Mr. Brightside on your phone!
            </Text>
            <Text style={styles.sectionDescription}>
              Now you can enjoy the app
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  viewWrapper: {
    backgroundColor: 'red',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  safeArea: {
    backgroundColor: 'pink',
    flex: 1,
  },
  body: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
