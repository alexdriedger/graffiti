import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView } from "expo";

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
      />
    );
  }
}
