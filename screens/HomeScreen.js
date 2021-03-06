import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { MapView, OverlayComponent, Location, Permissions } from "expo";
import ActionButton from "react-native-action-button";
import { MaterialIcons } from "@expo/vector-icons";

import CustomMarker from "../components/CustomMarker";
import MapMarker from "../components/MapMarker";

const initialRegion = {
  latitude: -37.804212,
  longitude: 144.960738,
  latitudeDelta: 0.05,
  longitudeDelta: 0.02
};

const defaultMarkers = [
  {
    "1": {
      id: 1,
      name: "Boxer",
      latitude: -37.811524,
      longitude: 144.959319,
      description: "punching boxer",
      time_created: 155123844,
      image_url: "https://i.imgur.com/tXr0IbB.jpg",
      rating: 6
    }
  },
  {
    "2": {
      id: 2,
      name: "Hidden Lady",
      latitude: -37.815864,
      longitude: 144.962366,
      description: "lady peering through curtain",
      time_created: 155123844,
      image_url: "https://i.imgur.com/WvGqsf2.jpg",
      rating: 8
    }
  },
  {
    "3": {
      id: 3,
      name: "Alien",
      latitude: -37.815542,
      longitude: 144.962495,
      description: "pill eating alien",
      time_created: 155123844,
      image_url: "https://i.imgur.com/J8Gnvdo.jpg",
      rating: 25
    }
  },
  {
    "4": {
      id: 4,
      name: "Staring at you",
      latitude: -37.814813,
      longitude: 144.956658,
      description: "lady staring",
      time_created: 155123844,
      image_url: "https://i.imgur.com/WvGqsf2.jpg",
      rating: 3
    }
  },
  {
    "5": {
      id: 5,
      name: "Weird Elephant",
      latitude: -37.812575,
      longitude: 144.956122,
      description: "Freaky lookin elephant",
      time_created: 155123844,
      image_url: "https://i.imgur.com/4qAfwDT.jpg",
      rating: 25
    }
  },
  {
    "6": {
      id: 6,
      name: "Sick Asian",
      latitude: -37.815491,
      longitude: 144.95612,
      description: "big looking asian dude",
      time_created: 155123844,
      image_url: "https://i.imgur.com/LJQLur8.jpg",
      rating: 100
    }
  },
  {
    "7": {
      id: 7,
      name: "Buzz Buzz",
      latitude: -37.813863,
      longitude: 144.95507,
      description: "flying bees",
      time_created: 155123844,
      image_url: "https://i.imgur.com/GCdZnSu.jpg",
      rating: 12
    }
  },
  {
    "8": {
      id: 8,
      name: "Flaming Goddess",
      latitude: -37.81694,
      longitude: 144.962881,
      description: "portrait of woman",
      time_created: 155123844,
      image_url: "https://i.imgur.com/2xVXNIb.jpg",
      rating: 1
    }
  },
  {
    "9": {
      id: 9,
      name: "Rainbow Head",
      latitude: -37.818771,
      longitude: 144.961218,
      description: "ring of rainbows",
      time_created: 155123844,
      image_url: "https://imgur.com/J8Gnvdo.jpg",
      rating: 250
    }
  },
  {
    "10": {
      id: 10,
      name: "Tired Old People",
      latitude: -37.817754,
      longitude: 144.954191,
      description: "Elderly couple",
      time_created: 155123844,
      image_url: "https://i.imgur.com/BulWNDa.jpg",
      rating: 250
    }
  },
  {
    "11": {
      id: 11,
      name: "Cool Koala",
      latitude: 37.821144,
      longitude: 144.956154,
      description: "Koala portrait",
      time_created: 155123844,
      image_url: "https://i.imgur.com/KFFypYn.jpg",
      rating: 300
    }
  },
  {
    "12": {
      id: 12,
      name: "Monsters Incorporated",
      latitude: -37.815321,
      longitude: 144.965263,
      description: "monsters inc character",
      time_created: 155123844,
      image_url: "https://imgur.com/1KAS43H.jpg",
      rating: 30
    }
  },
  {
    "13": {
      id: 13,
      name: "Topping Up",
      latitude: -37.81722,
      longitude: 144.966132,
      description: "girl filling up water bucket",
      time_created: 155123844,
      image_url: "https://i.imgur.com/Y1j74ud.jpg",
      rating: 301
    }
  },
  {
    "14": {
      id: 14,
      name: "Me And My Homies",
      latitude: -37.814898,
      longitude: 144.974028,
      description: "a couple of kids dressed as batman",
      time_created: 155123844,
      image_url: "https://i.imgur.com/IrSVWiI.jpg",
      rating: 350
    }
  },
  {
    "15": {
      id: 15,
      name: "Indigenous Child",
      latitude: -37.813033,
      longitude: 144.972398,
      description: "Indigenous Child",
      time_created: 155123844,
      image_url: "https://imgur.com/QnoAtUf.jpg",
      rating: 67
    }
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
      markers: [],
      markersById: {},
      waypoints: null
    };
    // console.log(this.state);
  }

  async componentDidMount() {
    console.log("Fetching data");
    let json = null;
    try {
      const response = await fetch(
        "https://graffite-api-backend.herokuapp.com/street-art"
      );
      json = await response.json();
      console.log("Fetched data Successfully");
    } catch {
      console.log("Failed to fetch data");
      json = defaultMarkers;
    }
    // console.log(json);
    let markers = [];
    let markersById = {};
    json.forEach(element => {
      // console.log(element);
      let key = Object.keys(element)[0];
      let obj = element[key];
      obj["visible"] = true;
      // console.log("This is the object");
      // console.log(obj);
      markers.push(obj);
      markersById[key] = obj;
    });
    this.setState({ markers: markers, markersById: markersById });
    // console.log("markersById");
    // console.log(this.state.markersById);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <MapView
          showsUserLocation
          style={{ ...StyleSheet.absoluteFillObject }}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
        >
          {this._renderDirections(this.state.waypoints)}
          {this._renderMarkers(this.state.markersById)}
        </MapView>
        {this._renderFloationActionButton(this._renderFloationActionButton())}
      </View>
    );
  }

  _getWaypoints(points) {
    // console.log("getWaypoints state");
    // console.log(this.state.markersById);
    // console.log("_getWaypoints");
    // console.log(this.state.markers);
    let waypoints = points.map(p => {
      return {
        latitude: this.state.markersById[p].latitude,
        longitude: this.state.markersById[p].longitude
      };
    });

    // Make other points invisible
    let toBeInvisible = { ...this.state.markersById };
    for (id in toBeInvisible) {
      toBeInvisible[id].visible = false;
    }
    points.forEach(p => (toBeInvisible[p].visible = true));

    // console.log("waypoints");
    // console.log(waypoints);
    this.setState({
      waypoints: waypoints,
      latitude: waypoints[0].latitude,
      longitude: waypoints[0].longitude,
      latitudeDelta: 0.03,
      longitudeDelta: 0.01,
      markersById: toBeInvisible
    });
    // console.log("end of _getWaypoints");
    // console.log(this.state.markersById);
  }

  componentWillMount() {
    this._getLocationAsync();
  }

  _renderDirections(waypoints) {
    if (waypoints !== null) {
      return (
        <MapViewDirections
          origin={waypoints[0]}
          destination={waypoints[0]}
          waypoints={waypoints}
          mode={"walking"}
          apikey={"AIzaSyDebH3jJ_9Z7i-22j9AQZuJYZG5apEJobc"}
          strokeWidth={5}
          strokeColor="#4A89F3"
        />
      );
    }
  }

  _renderMarkers(markersById) {
    // console.log("renderMarkers");
    // console.log(this.state.markersById);
    let visible = [];
    if (Object.keys(markersById).length !== 0) {
      for (key in markersById) {
        // console.log(key);
        let o = markersById[key];
        // console.log(o);
        if (o["visible"]) {
          // console.log("pushed");
          visible.push(o);
        }
      }
    }

    // console.log("pre return renderMarkers");
    // console.log(this.state.markersById);
    // console.log("visible");
    // console.log(visible);

    return this.state.markers.map((m, index) => (
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
    ));
  }

  _renderFloationActionButton() {
    // red - rgba(231,76,60,1)
    if (this.state.waypoints !== null) {
      return (
        <ActionButton
          buttonColor="rgba(231, 76, 60, 1)"
          renderIcon={active => {
            if (active) {
              return (
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={32}
                  color="white"
                  degrees={180}
                />
              );
            }
            return <MaterialIcons name="clear" size={32} color="white" />;
          }}
        >
          <ActionButton.Item
            buttonColor="rgba(231, 76, 60, 1)"
            title="Cancel"
            onPress={() => {
              let toBeVisible = { ...this.state.markersById };
              for (id in toBeVisible) {
                toBeVisible[id].visible = true;
              }
              this.setState({ markersById: toBeVisible, waypoints: null });
            }}
          >
            <MaterialIcons name="delete" size={32} color="white" />
          </ActionButton.Item>
        </ActionButton>
      );
    }
    return (
      <ActionButton
        buttonColor="#3498db"
        renderIcon={() => (
          <MaterialIcons name="navigation" size={32} color="white" />
        )}
      >
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="CBD Tour"
          onPress={() =>
            this._getWaypoints(["201", "202", "203", "204", "12", "15", "14"])
          }
        >
          <MaterialIcons name="business" size={32} color="white" />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Fitzroy Tour"
          onPress={() => this._getWaypoints(["101", "102", "103", "104"])}
        >
          <MaterialIcons name="store" size={32} color="white" />
        </ActionButton.Item>
      </ActionButton>
    );
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  };
}
