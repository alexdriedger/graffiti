import React from "react";
import { View, Text, FlatList, Image } from "react-native";

export default class Gallery extends React.Component {
  constructor(props) {
    super(props);
    let markers = [];
    defaultMarkers.forEach(element => {
      let key = Object.keys(element)[0];
      let obj = element[key];
      markers.push(obj);
    });
    console.log(markers);
    this.state = {
      markers: markers
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: "white"
        }}
      />
    );
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.markers}
          renderItem={item => (
            <View>
              <View style={{ backgroundColor: "#4A89F3" }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    padding: 12,
                    textAlign: "center"
                  }}
                >
                  {item.item.name}
                </Text>
              </View>
              <Image
                style={{ height: 275 }}
                source={{ uri: item.item.image_url }}
              />
            </View>
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
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
    let markers = [];
    json.forEach(element => {
      let key = Object.keys(element)[0];
      let obj = element[key];
      markers.push(obj);
    });
    this.setState({ markers: markers });
  }
}

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
