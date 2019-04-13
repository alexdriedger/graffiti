import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import { MapView, Location, Permissions } from "expo";

import CustomMarker from "../components/CustomMarker";
import MapMarker from "../components/MapMarker";

const initialRegion = {
  latitude: -37.804212,
  longitude: 144.960738,
  latitudeDelta: 0.05,
  longitudeDelta: 0.02
};

const markers = [
  {
    name: "boxer",
    latitude: -37.811524,
    longitude: 144.959319,
    description: "punching boxer",
    time_created: 155123844,
    image_url: require("../assets/images/boxer.jpg"),
    rating: 6
  },
  {
    name: "hidden lady",
    latitude: -37.815864,
    longitude: 144.962366,
    description: "lady peering through curtain",
    time_created: 155123844,
    image_url: require("../assets/images/lady.jpg"),
    rating: 8
  },
  {
    name: "alien",
    latitude: -37.815542,
    longitude: 144.962495,
    description: "pill eating alien",
    time_created: 155123844,
    image_url: require("../assets/images/alien.jpg"),
    rating: 25
  },
  {
    name: "staring at you",
    latitude: -37.814813,
    longitude: 144.956658,
    description: "lady staring",
    time_created: 155123844,
    image_url: require("../assets/images/lady.jpg"),
    rating: 3
  },
  {
    name: "weird elephant",
    latitude: -37.812575,
    longitude: 144.956122,
    description: "freaky lookin elephant",
    time_created: 155123844,
    image_url: require("../assets/images/elephant.jpg"),
    rating: 25
  },
  {
    name: "sick asian",
    latitude: -37.815491,
    longitude: 144.95612,
    description: "big looking asian dude",
    time_created: 155123844,
    image_url: require("../assets/images/asian_guy.jpg"),
    rating: 100
  },
  {
    name: "buzz buzz",
    latitude: -37.813863,
    longitude: 144.95507,
    description: "flying bees",
    time_created: 155123844,
    image_url: require("../assets/images/bee.jpg"),
    rating: 12
  },
  {
    name: "flaming goddess",
    latitude: -37.81694,
    longitude: 144.962881,
    description: "portrait of woman",
    time_created: 155123844,
    image_url: require("../assets/images/lady.jpg"),
    rating: 1
  },
  {
    name: "rainbow head",
    latitude: -37.818771,
    longitude: 144.961218,
    description: "ring of rainbows",
    time_created: 155123844,
    image_url: require("../assets/images/rainbow.jpg"),
    rating: 250
  },
  {
    name: "tired old people",
    latitude: -37.817754,
    longitude: 144.954191,
    description: "Elderly couple",
    time_created: 155123844,
    image_url: require("../assets/images/old_people.jpg"),
    rating: 250
  },
  {
    name: "cool koala",
    latitude: 37.821144,
    longitude: 144.956154,
    description: "Koala portrait",
    time_created: 155123844,
    image_url: require("../assets/images/koala.jpg"),
    rating: 300
  },
  {
    name: "topping up",
    latitude: -37.81722,
    longitude: 144.966132,
    description: "girl filling up water bucket",
    time_created: 155123844,
    image_url: require("../assets/images/water_filling.jpg"),
    rating: 301
  },
  {
    name: "me and my homies",
    latitude: -37.814898,
    longitude: 144.974028,
    description: "a couple of kids dressed as batman",
    time_created: 155123844,
    image_url: require("../assets/images/da_boys.jpg"),
    rating: 350
  },
  {
    name: "indigenous child",
    latitude: -37.813033,
    longitude: 144.972398,
    description: "portrait of an indigenous Australian child",
    time_created: 155123844,
    image_url: require("../assets/images/indigenous.jpg"),
    rating: 67
  },
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
        
        {this.state.markers.map((m, index) => (
          <MapMarker
            coordinate={{
              latitude: m.latitude,
              longitude: m.longitude
            }}
            title={m.name}
            description={m.description}
            key={index}
          >
            <CustomMarker image_url={m.image_url} />
          </MapMarker>
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
