import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import getPermission from '../utils/getPermission';

const options = {
  allowsEditing: true,
};

export default class PictureUploadedScreen extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {'Your picture has been uploaded.'}{'\n'}{'Thank you !'}
        </Text>
        <View style={styles.space} />
        <Button
          onPress={() => {this.props.navigation.navigate('Feed')}}
          style={styles.text}
          title="Home"
        />
        <View style={styles.space} />
        <Button
          onPress={() => {this.props.navigation.navigate('Photo')}}
          style={styles.text}
          title="Upload more pictures"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  space: {
    flex: 0.1,
  },
});
