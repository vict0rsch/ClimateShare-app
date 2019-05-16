import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TextInput, View, StyleSheet } from 'react-native';
import { MapView, Location, Permissions } from 'expo';
import HeaderButtons from 'react-navigation-header-buttons';

import Fire from '../Fire';

export default class SetLocationScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Set Location',
    headerRight: (
      <HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
        <HeaderButtons.Item
          title="Confirm"
          onPress={ async () => {
            navigation.setParams({ itemPressedDisabled: true });
            const text = navigation.getParam('text');
            const image = navigation.getParam('image');
            const location = navigation.getParam('location');
            if ( location && text && image ) {
              navigation.navigate('PictureUploaded');
              const city = await ReverseGeocodeAsync({ location });
              Fire.shared.post({ text: text.trim(), image, location, city: city });
            } else {
              alert('Please choose a location');
            }
            navigation.setParams({ itemPressedDisabled: false });
          }}
        />
        disabled = navigation.getParam('itemPressedDisabled')
      </HeaderButtons>
    ),
  });

  state = { region: {
              latitude: 45.5017,
              longitude: -73.5673,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            itemPressedDisabled: false,
            markers: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({ itemPressedDisabled: false });
  };

  placeMarker(location) {
    this.setState({
      markers: [{ LatLng: location }]
    });
    this.props.navigation.setParams({ location });
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={this.state.region}
        onRegionChange={region => {
          this.setState({ region });
          this.props.navigation.setParams({ region });
        }}
        onPress={(e) => this.placeMarker(e.nativeEvent.coordinate)}
        onLongPress={(e) => this.placeMarker(e.nativeEvent.coordinate)}
      >
        {
          this.state.markers.map((marker, i) => (
            <MapView.Marker coordinate={marker.LatLng} />
          ))
        }
      </MapView>
    );
  };
};

ReverseGeocodeAsync = async ({ location }) => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  try {
    let result = await Location.reverseGeocodeAsync(
      location
    );
    if ("city" in result[0]) {
      return ( result[0].city );
    } else {
      return ( 'no city' );
    }
  } catch (e) {
    return ( 'no city' );
  }
};
