import React from 'react';
import {Text, Linking, Image} from 'react-native';

function UnAuthorized({styles}) {
  const onLinkPress = () =>
    Linking.openURL('https://www.youtube.com/watch?v=gGdGFtwCNBE').catch(err =>
      console.error('An error occurred', err),
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
      <Image source={require('../assets/facepalm.jpg')} style={styles.image} />
      <Text style={styles.sectionDescription}>
        You are not allow to use this app and you should be ashamed.
      </Text>
    </>
  );
}

export default UnAuthorized;
