import React from "react";
import { View, Text, Image } from "react-native";
import { blue } from "ansi-colors";

/*
<Image
  style={{ height: 50, width: 50 }}
  source={require(this.props.image)}
/>
*/

export default class CustomMarker extends React.Component {
  constructor(props) {
    super(props);
    console.log("Custom Marker constructor");
  }

  render() {
    return (
      <View>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            borderColor: "#4A89F3",
            borderWidth: 2
          }}
          source={this.props.image_url}
        />
      </View>
    );
  }
}
