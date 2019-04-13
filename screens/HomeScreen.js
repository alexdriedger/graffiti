import React from "react";
import { MapView, Location, Permissions } from "expo";
import { Marker } from "react-native-maps";

const initialRegion = {
  latitude: -37.804212,
  longitude: 144.960738,
  latitudeDelta: 0.05,
  longitudeDelta: 0.02
};

const markers = [
  {
    name: "Hosier Lane",
    latitude: -37.816215,
    longitude: 144.969009,
    image_url: "assets/images/hosier_lane.jpg",
    description: "One of the most well known street art locations"
  },
  {
    name: "AC/DC Lane",
    latitude: -37.815739,
    longitude: 144.970971,
    image_url: "assets/images/acdc_lane.jpg",
    description: "Fun street art themed after AC/DC"
  }
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialRegion,
      markers
    };
    console.log(this.state);
  }

  render() {
    return (
      <MapView
        showsUserLocation
        style={{ flex: 1 }}
        region={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }}
      >
        {this.state.markers.map(marker => (
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.name}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  };
}
