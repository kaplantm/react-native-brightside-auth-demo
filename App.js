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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './Components/Header';
import BrightsideAuth from 'react-native-use-health-kit';
import Authorized from './Components/Authorized';
import UnAuthorized from './Components/UnAuthorized';
import MissingPermissions from './Components/MissingPermissions';

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

  function authConditionalRender() {
    console.log('authConditionalRender', {musicAuthStatus, hasMrBrightside});
    if (musicAuthStatus === undefined) {
      console.log('authConditionalRender', 1);
      return renderLoading();
    } else if (musicAuthStatus !== 'authorized') {
      console.log('authConditionalRender', 2);
      return <MissingPermissions styles={styles} />;
    } else {
      if (hasMrBrightside === undefined) {
        return renderLoading();
      }
      console.log('authConditionalRender', 3);
      return hasMrBrightside ? (
        <Authorized stop={BrightsideAuth.stop} styles={styles} />
      ) : (
        <UnAuthorized styles={styles} />
      );
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
        <View style={styles.body}>
          <View style={styles.sectionContainer}>{authConditionalRender()}</View>
        </View>
      </ScrollView>
    </>
  );
};

// <Text onPress={debug}>DEBUG</Text>

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
  mainImage: {
    width: '100%',
    height: '100%',
  },
  authorized: {
    color: 'white',
    padding: 10,
    backgroundColor: 'hsla(146, 68%, 67%, .8 )',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    padding: 20,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  image: {
    width: '90%',
    height: '60%',
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: 'red',
  },
});

export default App;
