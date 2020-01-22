import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import logo from '../assets/logo.png';

export default() => (
    <View style={{
            flexDirection: 'row'
        }}>
        <AutoHeightImage
          width={40}
          source={logo}
          style={{marginLeft:15}}
        />
    </View>
)