import React from "react";
import Gallery from "../components/Gallery";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "Gallery"
  };

  render() {
    return <Gallery />;
  }
}
