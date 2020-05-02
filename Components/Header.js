'use strict';
import Colors from '../constants/colors';
import type {Node} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import React from 'react';

const Header = (): Node => (
  <View tyle={styles.container}>
    <Image
      source={require('../assets/header.jpg')}
      style={styles.logo}
      resizeMode="cover"
    />
  </View>
);

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: '100%',
    opacity: 1,
    overflow: 'visible',
  },
});

export default Header;
