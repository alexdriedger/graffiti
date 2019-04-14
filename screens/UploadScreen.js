const uuidv4 = require('uuid/v4');

import React from 'react';
import { Text, View, TextInput, TouchableHighlight, Dimensions, Image } from 'react-native';
import { Camera, Location, Permissions } from 'expo';

export default class UploadScreen extends React.Component {
  static navigationOpions = {
    title: 'Upload',
  };
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    showCamera: true,
    image: null,
    name: null,
    description: null,
    picture: null,
    latitude: null,
    longitude: null,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    this._getLocationAsync()
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

  async upload() {

    const postRequest = `https://graffite-api.herokuapp.com/street-art?` 
      + `name=` + this.state.name + `&`
      + `description=` + this.state.description + `&`
      + `latitude=` + this.state.latitude + `&`
      + `longitude=` + this.state.longitude

    fetch(postRequest, {method: 'POST', headers: {"Content-Type": "raw"}, body: this.state.picture.base64})
    .then(response => response.json())
    .then(data => console.log(data));

    alert("Uploading");
  }

  _renderCamera() {
    return (
      <View style={{ flex: 1 }}>
        <Camera 
          style={{ flex: 1 }} type={this.state.type}
          ref={ (ref) => {this.camera = ref} }
        >
          <TouchableHighlight
            style = {styles.cameraButton}
            underlayColor = '#ccc'
            onPress = { async () => {
              this.setState({showCamera: false});
              const options = {base64: true};
              let photo = await this.camera.takePictureAsync(options);
              this.setState({picture: photo});
            }}
          >
            <View />
          </TouchableHighlight>
        </Camera>
      </View>
    );
  }

  _renderDetails() {
    return (
      <View>
        <Image 
          source={this.state.picture}
          style={{width: Dimensions.get('window').width,
                  height: Dimensions.get('window').width}}
        />
        <Text>{"Name"}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
        />
        <Text>{"Description"}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({description: text})}
          value={this.state.description}
          multiline={true}
        />
        <TouchableHighlight
            style = {styles.uploadButton}
            underlayColor = '#ccc'
            onPress = { () => {
              this.upload()              
            }}
          >
            <Text>{"Upload"}</Text>
          </TouchableHighlight>
      </View>
    );
  }

  render() {
    if (this.state.showCamera === true) {
      console.log('Taking a picture (rendering camera component)');
      return (this._renderCamera());
    } else {
      return (this._renderDetails());
    }
  }
}

const styles = {
    cameraButton: {
        borderRadius: 35,
        width: 70,
        height: 70,
        backgroundColor:'#fff',
        borderWidth: 7,
        borderColor: 'grey',
        marginBottom: 10,
        position: 'absolute',
        left: Dimensions.get('window').width/2 - 35,
        bottom: 0,
    },
    uploadButton: {
      borderRadius: 5,
        width: 200,
        height: 60,
        backgroundColor:'#fff',
        borderWidth: 3,
        borderColor: 'grey',
        marginBottom: 0,
        position: 'absolute',
        left: Dimensions.get('window').width/2 - 100,
        bottom: -75,
    }
    
}