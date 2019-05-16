import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import getPermission from '../utils/getPermission';

const options = {
  allowsEditing: true,
};

export default class SelectPhotoScreen extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewPost', { image: result.uri });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={this._selectPhoto}
          style={styles.text}
          title="Pick from Gallery"
        />
        <View style={styles.space} />
        <Button
          onPress={this._takePhoto}
          style={styles.text}
          title="Take Picture"
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
