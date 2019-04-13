import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView, Polyline } from "expo";
import MapViewDirections from 'react-native-maps-directions';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -37.804212,
          longitude: 144.960738,
          latitudeDelta: 0.05,
          longitudeDelta: 0.02
        }}
      >

      <MapViewDirections
        origin={{latitude: -37.801725, longitude: 144.958462}}
        destination={{latitude: -37.801725, longitude: 144.958462}}
        waypoints={[{latitude: -37.800406, longitude: 144.963822}, {latitude: -37.802353, longitude: 144.962223}]}
        mode={"walking"}
        optimizeWaypoints={true}
        apikey={"AIzaSyDebH3jJ_9Z7i-22j9AQZuJYZG5apEJobc"}
        strokeWidth={3}
        strokeColor="hotpink"
      />
        
      </MapView>
    );
  }
}
