import React from 'react';
import {Text, Linking} from 'react-native';

function MissingPermissions({styles}) {
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

export default MissingPermissions;
