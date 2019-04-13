import React from 'react';
import { FlatList, View, TouchableOpacity, Image, StyleSheet} from "react-native";


export default class PhotoGrid extends React.Component {
    constructor(props) {
        super(props)
        }
    render() {
      return (
        <FlatList
          data={[
            {key: 'https://media.timeout.com/images/104686873/1372/1029/image.jpg'},
            {key: 'https://media.apnarm.net.au/media/images/2017/04/28/b88713895z1_20170428175456_000gpgjkc6r3-0-3phna1aadjza1mqc5o2_ct677x380.jpg'},
            
          ]}
          renderItem={({item}) => (
            <View>
              
              <TouchableOpacity onPress={this.onPress()}>
              <Image
                style={styles.image_style}                                                     
                source={{uri: item.key}}
              />
              </TouchableOpacity>
            </View>
          )}
        />
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