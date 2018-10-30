import React, {Component} from 'react';
import {
  Container,
  Text,
  Spinner,
} from 'native-base';
import { StyleSheet, Image } from 'react-native';
import bonbonLogo from '../assets/images/bonbon-logo.png';


export default class Splash extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container style={styles.container}>
        <Spinner color="white" />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(32, 53, 70)',
    opacity: 0.9,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16
  }
});