import React from 'react';
import { ScrollView, StyleSheet, FlatList, TouchableOpacity, Image, ListView, Text, AppRegistry, View, TouchableWithoutFeedback, Dimensions, Modal} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {StreetArt} from '../assets/images/street_art_1.png';
import PhotoGrid from '../components/PhotoGrid';



export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Explore',
  };
  

  render() {
    
      
      let pic1 = {
      uri: 'https://media.timeout.com/images/104686873/1372/1029/image.jpg'
    };
    let pic2 = {
      uri: 'https://media.apnarm.net.au/media/images/2017/04/28/b88713895z1_20170428175456_000gpgjkc6r3-0-3phna1aadjza1mqc5o2_ct677x380.jpg'
    };
    
    return (
        <PhotoGrid />
    );
    
  }

  onPress = () => {
  
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  image_style: {
    aspectRatio: 1.5,
    resizeMode: 'contain'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
