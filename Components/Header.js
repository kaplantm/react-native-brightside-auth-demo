'use strict';
import Colors from '../constants/colors';
import type {Node} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import React from 'react';

const Header = (): Node => (
  <View tyle={styles.container}>
    <Image
      source={require('../assets/header.jpg')}
      style={styles.logo}
      resizeMode="cover"
    />
  </View>
  //   <ImageBackground
  //     accessibilityRole={'image'}
  // source={require('../assets/header.jpg')}
  // style={styles.background}
  //     imageStyle={styles.logo}>
  //     <Text style={styles.text}>Brightside Auth</Text>
  //   </ImageBackground>
);

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: '100%',
    opacity: 0.5,
    overflow: 'visible',
  },
});

export default Header;
