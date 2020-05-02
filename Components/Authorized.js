import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';

function Authorized({stop, styles}) {
  return (
    <>
      <Text style={styles.sectionDescription}>
        You have Mr. Brightside on your phone!
      </Text>
      <TouchableOpacity onLongPress={() => stop()}>
        <Image
          source={require('../assets/success.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.sectionDescription}>Now you can enjoy the app.</Text>
    </>
  );
}

export default Authorized;
