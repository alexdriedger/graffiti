import React from "react";
import { Image, View, Text } from "react-native";
import { MapView, Location, Permissions } from "expo";
import { Marker, Callout } from "react-native-maps";

import CustomCallout from "../components/CustomCallout";
import CustomMarker from "../components/CustomMarker";

/*
<Image
                  style={{ height: 50, width: 50 }}
                  source={require(marker.image_url)}
                  source={require("../assets/images/acdc_lane.jpg")}
                />
*/

// const image = require("../assets/images/acdc_lane.jpg");

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
    image_url: require("../assets/images/hosier_lane.jpg"),
    description: "One of the most well known street art locations"
  },
  {
    name: "AC/DC Lane",
    latitude: -37.815739,
    longitude: 144.970971,
    image_url: require("../assets/images/acdc_lane.jpg"),
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
        {this.state.markers.map((m, index) => (
          <Marker
            coordinate={{
              latitude: m.latitude,
              longitude: m.longitude
            }}
            title={m.name}
            description={m.description}
            key={index}
          >
            <CustomMarker image_url={m.image_url} />
          </Marker>
        ))}
      </MapView>
    );
  }

  //<Image style={{ height: 50, width: 50 }} source={image} />

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
