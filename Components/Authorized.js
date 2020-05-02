import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

function Authorized({stop, styles}) {
  return (
    <View style={{backgroundColor: 'black'}}>
      <Text style={styles.authorized}>
        You have Mr. Brightside on your phone!
      </Text>
      <Image
        source={require('../assets/dodgecoin.png')}
        style={styles.mainImage}
        resizeMode="stretch"
      />
    </View>
  );
}

export default Authorized;
