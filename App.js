/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  NativeModules,
  ActivityIndicator,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './Components/Header';

const App: () => React$Node = () => {
  const [musicAuthStatus, setMusicAuthStatus] = useState(undefined);
  const [hasMrBrightside, setHasMrBrightside] = useState(undefined);

  const setupBrightSideAuth = useCallback(async response => {
    console.log('setupBrightSideAuth');
    const {BrightsideAuth} = NativeModules;

    const authStatus = await new Promise((resolve, reject) => {
      BrightsideAuth.startup(value => {
        resolve(value);
      });
    });
    setMusicAuthStatus(authStatus);

    if (authStatus && authStatus === 'authorized') {
      const hasMrBrightsideStatus = await new Promise((resolve, reject) => {
        BrightsideAuth.checkForMrBrightside(async value => {
          resolve(value);
        });
      });

      console.log('set');
      setHasMrBrightside(hasMrBrightsideStatus);
    }
    return 'done';
  }, []);

  useEffect(() => {
    setupBrightSideAuth();
  }, [setupBrightSideAuth]);

  function renderLoading() {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }
  function renderAuthError() {
    // TODO: link to settings?
    return (
      <Text style={styles.sectionDescription}>
        Could not complete auth check. Please make sure this app has permission
        to access you music library.
      </Text>
    );
  }
  function renderAuthSuccess() {
    return (
      <>
        <Text style={styles.sectionDescription}>
          You have Mr. Brightside on your phone!
        </Text>
        <Text style={styles.sectionDescription}>
          Now you can enjoy the app.
        </Text>
      </>
    );
  }
  function renderAuthFailure() {
    return (
      <>
        <Text style={styles.sectionDescription}>
          You DO NOT have Mr. Brightside on your phone!
        </Text>
        <Text style={styles.sectionDescription}>This is illegal.</Text>
      </>
    );
  }

  function authConditionalRender() {
    console.log('authConditionalRender', {musicAuthStatus, hasMrBrightside});
    if (musicAuthStatus === undefined) {
      console.log('authConditionalRender', 1);
      return renderLoading();
    } else if (musicAuthStatus !== 'authorized') {
      console.log('authConditionalRender', 2);
      return renderAuthError();
    } else {
      if (hasMrBrightside === undefined) {
        return renderLoading();
      }
      console.log('authConditionalRender', 3);
      return hasMrBrightside ? renderAuthSuccess() : renderAuthFailure();
    }
  }

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
          <View style={styles.sectionContainer}>{authConditionalRender()}</View>
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
