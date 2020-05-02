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
  ActivityIndicator,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './Components/Header';
import BrightsideAuth from 'react-native-use-health-kit';

const App: () => React$Node = () => {
  const [musicAuthStatus, setMusicAuthStatus] = useState(undefined);
  const [hasMrBrightside, setHasMrBrightside] = useState(undefined);

  const setupBrightSideAuth = useCallback(async response => {
    const authStatus = await new Promise((resolve, reject) => {
      BrightsideAuth.startup(
        {
          title: 'Mr. Brightside',
          artist: 'The Killers',
          autoCleanup: true,
        },
        value => {
          resolve(value);
        },
      );
    });
    setMusicAuthStatus(authStatus);

    if (authStatus && authStatus === 'authorized') {
      const hasMrBrightsideStatus = await new Promise((resolve, reject) => {
        BrightsideAuth.checkForMrBrightside(async value => {
          resolve(value);
        });
      });

      console.log('authStatus', authStatus);
      setHasMrBrightside(hasMrBrightsideStatus);

      if (hasMrBrightsideStatus) {
        console.log('SHOULD PLAY');
        BrightsideAuth.play();
      }
    }
  }, []);

  useEffect(() => {
    setupBrightSideAuth();
  }, [setupBrightSideAuth]);

  function renderLoading() {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }
  function renderAuthError() {
    // TODO: link to settings?
    const onLinkPress = () => Linking.openURL('app-settings:');
    return (
      <>
        <Text style={styles.sectionDescription}>
          Could not complete auth check.
        </Text>
        <Text
          style={[styles.sectionDescription, styles.link]}
          onPress={onLinkPress}>
          Please make sure this app has permission to access you music library.
        </Text>
      </>
    );
  }
  function renderAuthSuccess() {
    return (
      <>
        <Text style={styles.sectionDescription}>
          You have Mr. Brightside on your phone!
        </Text>
        <TouchableOpacity onLongPress={() => BrightsideAuth.stop()}>
          <Image
            source={require('./assets/success.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Now you can enjoy the app.
        </Text>
      </>
    );
  }

  function renderAuthFailure() {
    const onLinkPress = () =>
      Linking.openURL('https://www.youtube.com/watch?v=gGdGFtwCNBE').catch(
        err => console.error('An error occurred', err),
      );

    const link = (
      <Text
        style={[styles.sectionDescription, styles.link]}
        onPress={onLinkPress}>
        Mr. Brightside
      </Text>
    );
    return (
      <>
        <Text style={styles.sectionDescription}>
          You DO NOT have {link} on your phone!
        </Text>
        <Image source={require('./assets/facepalm.jpg')} style={styles.image} />
        <Text style={styles.sectionDescription}>
          You are not allow to use this app and you should be ashamed.
        </Text>
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

  function debug() {
    console.log('RN debug');
    BrightsideAuth.debug();
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
        <Text onPress={debug}>DEBUG</Text>
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
  link: {
    textDecorationLine: 'underline',
    color: Colors.primary,
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
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  image: {
    width: '100%',
    height: '60%',
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    backgroundColor: 'red',
  },
});

export default App;
