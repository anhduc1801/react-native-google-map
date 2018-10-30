import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class LocationItem extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ zIndex: 999, backgroundColor: '#fff' }}
        onPress={() => {
            console.log(this.props.el)
          }
        }
        >
        <Text style={styles.items}>{this.props.description}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  items: {
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc'
  }
});